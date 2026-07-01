/* ═══════════════════════════════════════════════════════════
   /api/followers.js — Reality TV Intel 2026
   Server-side proxy to Apify's Instagram Followers Count Scraper.

   WHY THIS EXISTS:
   This site is otherwise 100% static (no backend). Instagram follower
   counts can't be fetched directly from the browser — Instagram blocks
   cross-origin requests, and even if it didn't, putting an Apify API
   token in client-side JS would expose it to every visitor.

   This function is the ONE place the Apify token is used. It runs on
   Vercel's servers, never ships to the browser, and is only reachable
   by this deployment.

   SETUP (one-time, in the Vercel dashboard — NOT in this file):
   1. Project → Settings → Environment Variables
   2. Add: APIFY_TOKEN = <your Apify API token>
   3. Redeploy
   Never commit the token itself to GitHub. This file only reads it
   from process.env, which Vercel injects at runtime.
═══════════════════════════════════════════════════════════ */

const APIFY_ACTOR = 'apify~instagram-followers-count-scraper';
const APIFY_URL = `https://api.apify.com/v2/acts/${APIFY_ACTOR}/run-sync-get-dataset-items`;
const MAX_USERNAMES_PER_REQUEST = 60; // safety cap — avoid accidental huge/expensive runs
const APIFY_TIMEOUT_MS = 90000; // Apify runs aren't instant; give it real time before giving up

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Use POST' });
    return;
  }

  const token = process.env.APIFY_TOKEN;
  if (!token) {
    res.status(500).json({
      error: 'APIFY_TOKEN is not configured on the server. Add it in Vercel → Project → Settings → Environment Variables, then redeploy.'
    });
    return;
  }

  let usernames;
  try {
    usernames = Array.isArray(req.body?.usernames) ? req.body.usernames : [];
  } catch {
    usernames = [];
  }

  // Clean up: strip @ prefixes, whitespace, drop empties/N-V placeholders, dedupe
  usernames = [...new Set(
    usernames
      .map(u => String(u || '').trim().replace(/^@/, ''))
      .filter(u => u && u.toLowerCase() !== 'n/v')
  )];

  if (!usernames.length) {
    res.status(400).json({ error: 'No valid Instagram usernames provided.' });
    return;
  }
  if (usernames.length > MAX_USERNAMES_PER_REQUEST) {
    res.status(400).json({
      error: `Too many usernames in one request (${usernames.length}). Max is ${MAX_USERNAMES_PER_REQUEST} — split into batches.`
    });
    return;
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), APIFY_TIMEOUT_MS);

    const apifyRes = await fetch(`${APIFY_URL}?token=${encodeURIComponent(token)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usernames,
        proxyConfiguration: { useApifyProxy: true, apifyProxyGroups: ['RESIDENTIAL'] },
      }),
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!apifyRes.ok) {
      const errText = await apifyRes.text().catch(() => '');
      res.status(apifyRes.status).json({
        error: `Apify returned ${apifyRes.status}: ${errText.slice(0, 300)}`
      });
      return;
    }

    const items = await apifyRes.json();
    const itemsArr = Array.isArray(items) ? items : [];

    if (itemsArr.length === 0) {
      res.status(200).json({
        results: [],
        requested: usernames.length,
        received: 0,
        note: 'Apify run completed but returned zero dataset items. This usually means Instagram blocked every request (residential proxy is now enabled by default — if this still happens, check the run in your Apify Console → Runs tab for the actual error per profile), or the actor input format changed since this was written.'
      });
      return;
    }

    // Normalize output — this actor's field names have shifted between
    // versions historically, so check a few common shapes defensively
    // rather than assuming one exact key.
    const results = itemsArr.map(item => {
      const username = item.username || item.handle || item.user || '';
      const followers =
        item.followers ?? item.followersCount ?? item.follower_count ??
        item.followersCount1 ?? null;
      return { username: String(username).replace(/^@/, ''), followers, raw: item };
    }).filter(r => r.username);

    res.status(200).json({ results, requested: usernames.length, received: results.length });

  } catch (err) {
    const isAbort = err.name === 'AbortError';
    res.status(isAbort ? 504 : 500).json({
      error: isAbort
        ? 'Apify run timed out. Try a smaller batch, or check the run status in your Apify console.'
        : `Server error calling Apify: ${err.message}`
    });
  }
}
