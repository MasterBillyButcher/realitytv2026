/* ═══════════════════════════════════════════════════════════
   /api/followers.js — Reality TV Intel 2026
   Server-side proxy to Apify's Instagram Followers Count Bulk Scraper
   (automation-lab/instagram-followers-count-bulk-scraper).

   WHY THIS ACTOR:
   Pay-Per-Event pricing — $0.005 per run + $0.002 per profile on the
   free tier. A full 46-contestant refresh costs about 10 cents, and
   Apify gives every new account $5/month free — this never gets
   anywhere near that. Residential proxy is used automatically
   (Instagram blocks datacenter IPs), so no proxy config is required
   in the request below.

   ONE-TIME SETUP STEP (unavoidable — this is an Apify platform rule
   for ANY actor with a price tag, not specific to this one):
   1. Open https://apify.com/automation-lab/instagram-followers-count-bulk-scraper
   2. Click "Try for free" once, logged into the account whose token
      you're using below. This authorizes your token to run it via API.
   3. In Vercel → Project → Settings → Environment Variables, add:
      APIFY_TOKEN = <your Apify API token>
   4. Redeploy.
   Never commit the token itself to GitHub — this file only reads it
   from process.env, which Vercel injects at runtime.

   Documented output shape (confirmed from the actor's own docs, not
   guessed): { username, fullName, followersCount, followingCount,
   postsCount, isVerified, isPrivate, biography, externalUrl,
   profilePicUrl, profileUrl, error }
═══════════════════════════════════════════════════════════ */

const APIFY_ACTOR = 'automation-lab~instagram-followers-count-bulk-scraper';
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
        delayBetweenRequestsMs: 300,
        // proxyConfiguration intentionally omitted — the actor uses
        // residential proxy automatically when this is left out.
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

    // This actor's output shape is documented and stable — no guessing.
    const results = itemsArr.map(item => ({
      username: String(item.username || '').replace(/^@/, ''),
      followers: item.followersCount ?? null,
      error: item.error || null,
      raw: item,
    })).filter(r => r.username);

    const succeeded = results.filter(r => r.followers !== null && !r.error);

    res.status(200).json({
      results,
      requested: usernames.length,
      received: succeeded.length,
      rawItemCount: itemsArr.length,
      sampleRaw: itemsArr.slice(0, 2),
      note: itemsArr.length === 0
        ? 'Apify run completed but returned zero dataset items. Check Apify Console → this actor → Runs tab for the actual error.'
        : (succeeded.length === 0
          ? 'Apify returned data, but every profile failed individually — check the `error` field per result (often: username not found, or temporarily rate-limited).'
          : undefined),
    });

  } catch (err) {
    const isAbort = err.name === 'AbortError';
    res.status(isAbort ? 504 : 500).json({
      error: isAbort
        ? 'Apify run timed out. Try a smaller batch, or check the run status in your Apify console.'
        : `Server error calling Apify: ${err.message}`
    });
  }
}
