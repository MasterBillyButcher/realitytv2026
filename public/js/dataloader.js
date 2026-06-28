/* ═══════════════════════════════════════════════════════════
   dataloader.js  —  Reality TV Intelligence Dashboard 2026
   Fetches the latest data from GitHub on every page load.
   This means: you update the JSON on GitHub → everyone
   sees the new data immediately (no rebuild needed).

   HOW TO CONFIGURE:
   Set your GitHub username and repo name below.
   That's it. No tokens. No server. No API keys.
═══════════════════════════════════════════════════════════ */

/* ── CONFIG — UPDATE THESE TWO VALUES ────────────────────── */
const DATA_CONFIG = {
  owner:  'BobMasterBillie',        // ← Your GitHub username
  repo:   'realitytv2026',          // ← Your GitHub repo name
  file:   'public/data/data.js',    // ← Path to data file in repo
  branch: 'main',                   // ← Branch name (usually main)
};
/* ─────────────────────────────────────────────────────────── */

/* The raw GitHub URL for your data file */
function _rawUrl() {
  const { owner, repo, file, branch } = DATA_CONFIG;
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${file}`;
}

/* ── LOAD DATA FROM GITHUB ───────────────────────────────── */
async function loadDataFromGitHub() {
  const url = _rawUrl();
  const statusEl = document.getElementById('data-load-status');

  try {
    if (statusEl) statusEl.textContent = 'Loading latest data…';

    // Add cache-bust so browsers always get the freshest version
    const res = await fetch(url + '?cb=' + Date.now(), {
      cache: 'no-cache',
    });

    if (!res.ok) throw new Error(`HTTP ${res.status} — ${res.statusText}`);

    const code = await res.text();

    // Execute the data.js content to populate window.SHOWS and window.DB
    // It's a trusted file from your own private repo
    // eslint-disable-next-line no-new-func
    const fn = new Function(code);
    fn();

    if (statusEl) statusEl.textContent = '';
    console.log('[DataLoader] Loaded from GitHub:', url);
    return true;

  } catch (err) {
    console.warn('[DataLoader] GitHub fetch failed, using bundled data.js:', err.message);
    if (statusEl) {
      statusEl.textContent = '⚠ Using local data — GitHub fetch failed';
      statusEl.style.color = 'var(--gld)';
    }
    // Silently fall back to the bundled data/data.js that was loaded via <script> tag
    return false;
  }
}

/* ── BOOT SEQUENCE ───────────────────────────────────────── */
// We wait for the DOM + bundled scripts, then try GitHub,
// then (re)initialise the whole app with fresh data.
window._dataReady = false;

async function bootApp() {
  // Try to fetch latest data from GitHub
  await loadDataFromGitHub();

  window._dataReady = true;

  // Re-run all the build/render steps with the (possibly new) data
  if (typeof getShowKeys === 'function') {
    // Clear any panels built from the bundled data
    const dp = document.getElementById('dynamic-panels');
    if (dp) dp.innerHTML = '';

    // Rebuild everything
    Object.keys(window.SHOWS || {}).forEach(k => {
      if (typeof buildShowPanel === 'function') buildShowPanel(k);
    });
    if (typeof rebuildSidebar    === 'function') rebuildSidebar();
    if (typeof renderAll         === 'function') renderAll();
    if (typeof renderOverview    === 'function') renderOverview();
    if (typeof updateStats       === 'function') updateStats();
    if (typeof rebuildExportPanel=== 'function') rebuildExportPanel();
    if (typeof renderActivityFeed=== 'function') renderActivityFeed();
    if (typeof _populateRankFilters === 'function') _populateRankFilters();
  }

  // Restore theme
  try {
    const t = localStorage.getItem('realityTV2026_theme') || 'dark';
    if (typeof setTheme === 'function') setTheme(t, false);
  } catch {}
}
