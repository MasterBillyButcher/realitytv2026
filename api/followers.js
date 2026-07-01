/* ═══════════════════════════════════════════════════════════
   /api/followers.js — Reality TV Intel 2026
   Server-side proxy to Apify's Instagram Followers Count Scraper
   (apify/instagram-followers-count-scraper).

   Field names below are CONFIRMED from a real successful run
   (2026-07-02, ravikishann → 4,001,622 followers), not guessed:
   { profilePic, userName, followersCount, followsCount, timestamp,
     userUrl, userFullName, userId }

   WHY THIS EXISTS:
   Instagram blocks browser-side requests, and an Apify token can't
   safely live in client-side JS (any visitor could steal it from
   page source). This function is the only place the token is used —
   it runs on Vercel's servers, never ships to the browser.

   ONE-TIME SETUP (already done for this actor, keep for reference):
   1. Open https://apify.com/apify/instagram-followers-count-scraper
   2. Click Start once, logged into the account whose token is below —
      required for ANY paid actor before API calls work, platform-wide.
   3. Vercel → Project → Settings → Environment Variables:
      APIFY_TOKEN = <your Apify API token>
   4. Redeploy.
   Never commit the token to GitHub — this file only reads it from
   process.env, injected by Vercel at runtime.
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
      body: JSON.stringify({ usernames }),
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

    // Confirmed real field names for successful items — see header comment.
    // Failed items' shape isn't confirmed (we've only seen this actor's
    // success case), so check common failure-indicator patterns
    // defensively rather than assuming a silent success/omit split.
    const results = itemsArr.map(item => {
      const errMsg =
        item.error || item.errorMessage ||
        (item.status && item.status !== 'ok' ? String(item.status) : null) ||
        (item.success === false ? 'Marked unsuccessful by Apify' : null);
      return {
        username: String(item.userName || item.username || '').replace(/^@/, ''),
        followers: item.followersCount ?? null,
        fullName: item.userFullName || null,
        error: errMsg,
        raw: item,
      };
    }).filter(r => r.username || r.error);

    // Usernames we sent that never appear in the response at all — this
    // actor may simply omit failed profiles instead of returning an
    // error object for them, which is the most likely explanation for
    // "some succeed, one fails with no message."
    const returnedHandles = new Set(results.map(r => r.username.toLowerCase()));
    const missing = usernames.filter(u => !returnedHandles.has(u.toLowerCase()));
    missing.forEach(u => results.push({
      username: u,
      followers: null,
      error: 'Not present in Apify response — likely private account, wrong/renamed handle, deleted account, or Instagram blocked this specific lookup. Check Apify Console → this run → Log tab for the per-profile reason.',
      raw: null,
    }));

    res.status(200).json({
      results,
      requested: usernames.length,
      received: results.filter(r => r.followers !== null).length,
      rawItemCount: itemsArr.length,
      sampleRaw: itemsArr.slice(0, 2),
      note: itemsArr.length === 0
        ? 'Apify run completed but returned zero dataset items. Check Apify Console → this actor → Runs tab.'
        : (results.filter(r => r.followers !== null).length === 0
          ? 'Apify returned data, but field extraction found no userName values — check sampleRaw in the browser console.'
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
