/* ═══════════════════════════════════════════════════════════
   admin.js  —  Reality TV Intelligence Dashboard 2026
   Password-protected admin mode + GitHub global save.

   HOW TO CHANGE YOUR PASSWORD:
   1. Open console on your live site → run: await adminHash('newpass')
   2. Copy the 64-char hash
   3. Vercel → Settings → Environment Variables → update ADMIN_HASH
   4. Redeploy once
═══════════════════════════════════════════════════════════ */

const ADMIN_SESSION_KEY = 'rtv2026_admin_v1';
const ADMIN_SESSION_TTL = 4 * 60 * 60 * 1000; // 4 hours

/* ─── HASH HELPER (also available in browser console) ────── */
async function adminHash(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  const hex = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  console.log('[Admin] Hash:', hex);
  return hex;
}

/* ─── SESSION ────────────────────────────────────────────── */
function _getSession() {
  try { return JSON.parse(sessionStorage.getItem(ADMIN_SESSION_KEY) || '{}'); }
  catch { return {}; }
}
function _isAdminSession() {
  const { ts, hash } = _getSession();
  return !!hash && !!ts && (Date.now() - ts) < ADMIN_SESSION_TTL;
}
function _getSessionHash() { return _getSession().hash || ''; }
function _setSession(hash) {
  sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({ ts: Date.now(), hash }));
}
function _clearSession() { sessionStorage.removeItem(ADMIN_SESSION_KEY); }

/* ─── STATE ──────────────────────────────────────────────── */
let _isAdmin = false;
function isAdmin() { return _isAdmin; }

/* ─── VERIFY PASSWORD AGAINST /api/verify ────────────────── */
async function _verifyPassword(pw) {
  const hash = await adminHash(pw);
  try {
    const r = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Hash': hash },
      body: JSON.stringify({ probe: true }),
    });
    return r.ok ? hash : null;
  } catch {
    return null;
  }
}

/* ─── LOGIN MODAL ────────────────────────────────────────── */
function openAdminLogin() {
  document.getElementById('admin-modal').classList.add('open');
  setTimeout(() => document.getElementById('admin-pw-input')?.focus(), 80);
}
function closeAdminLogin() {
  document.getElementById('admin-modal').classList.remove('open');
  const inp = document.getElementById('admin-pw-input');
  if (inp) inp.value = '';
  const err = document.getElementById('admin-login-err');
  if (err) err.textContent = '';
}

async function submitAdminLogin() {
  const pw  = (document.getElementById('admin-pw-input')?.value || '').trim();
  const err = document.getElementById('admin-login-err');
  const btn = document.getElementById('admin-login-btn');
  if (!pw) { if (err) err.textContent = 'Enter your password.'; return; }
  if (btn) { btn.textContent = 'Verifying…'; btn.disabled = true; }
  if (err) err.textContent = '';

  const hash = await _verifyPassword(pw);

  if (btn) { btn.textContent = 'Unlock Admin Mode'; btn.disabled = false; }

  if (hash) {
    _setSession(hash);
    _isAdmin = true;
    closeAdminLogin();
    applyAdminUI(true);
    toast('✓ Admin mode unlocked');
  } else {
    if (err) err.textContent = 'Incorrect password. Try again.';
    const inp = document.getElementById('admin-pw-input');
    if (inp) { inp.value = ''; inp.focus(); }
  }
}

function adminLogout() {
  _clearSession();
  _isAdmin = false;
  // Turn off edit mode if on
  if (typeof editMode !== 'undefined' && editMode && typeof toggleEdit === 'function') {
    toggleEdit();
  }
  applyAdminUI(false);
  toast('Logged out of admin mode', 'warn');
}

/* ─── APPLY ADMIN UI ─────────────────────────────────────── */
function applyAdminUI(on) {
  // body class drives all .admin-only visibility via CSS
  document.body.classList.toggle('admin-active', on);

  // Update the admin toggle button
  const btn = document.getElementById('admin-toggle-btn');
  if (btn) {
    btn.textContent       = on ? '🔓 Admin: ON' : '🔒 Admin';
    btn.style.color       = on ? 'var(--grn)'  : '';
    btn.style.borderColor = on ? 'var(--grn)'  : '';
    btn.onclick = on ? adminLogout : openAdminLogin;
    btn.title   = on ? 'Click to log out' : 'Admin login';
  }

  // Viewer banner & activity section
  const vb = document.getElementById('viewer-banner');
  const as = document.getElementById('activity-section');
  if (vb) vb.style.display = on ? 'none' : '';
  if (as) as.style.display = on ? '' : 'none';

  // Re-render after a tick so guard patches apply to freshly built rows
  if (typeof renderAll === 'function') {
    setTimeout(() => {
      renderAll();
      _applyPublicHideToShowPanels(on);
    }, 60);
  }
}

// When not admin: hide Edit/Add/CSV/Delete buttons inside each show panel
function _applyPublicHideToShowPanels(isAdminOn) {
  if (typeof getShowKeys !== 'function') return;
  getShowKeys().forEach(k => {
    const panel = document.getElementById('panel-show-' + k);
    if (!panel) return;
    panel.querySelectorAll('.ph-act .btn, .tb-r .btn').forEach(b => {
      const txt = (b.textContent || '').trim();
      const isCapture = txt.includes('📷') || txt.toLowerCase().includes('capture');
      if (!isCapture) b.style.display = isAdminOn ? '' : 'none';
    });
    // Also hide action column buttons (edit/delete/hide) in table rows
    if (!isAdminOn) {
      panel.querySelectorAll('.hide-btn, .btn.b-xs, .btn.b-red').forEach(b => b.style.display = 'none');
      panel.querySelectorAll('.ccard-footer').forEach(f => f.style.display = 'none');
    }
  });
}

/* ─── GUARD WRITE OPERATIONS ─────────────────────────────── */
// Called once after DOMContentLoaded when all functions are defined
function _installGuards() {
  function guard(name, fn) {
    const orig = window[name];
    if (typeof orig === 'function') {
      window[name] = function(...args) {
        if (!_isAdmin) { openAdminLogin(); return; }
        return fn ? fn.apply(this, args) : orig.apply(this, args);
      };
    }
  }
  guard('toggleEdit');
  guard('openAdd');
  guard('openEdit');
  guard('delRow');
  guard('openShowMgr');
  guard('openShowEdit');
  guard('openHideMgr');
  guard('showAll');
  guard('hideRumoured');
  guard('hideAllVisible');
  guard('showAllInShow');

  // toggleH is a silent no-op for non-admins (called from row clicks)
  const _origToggleH = window.toggleH;
  if (typeof _origToggleH === 'function') {
    window.toggleH = function(k, id) {
      if (!_isAdmin) return;
      _origToggleH(k, id);
    };
  }

  // toggleSaveBar — redirect to login if not admin
  const _origSaveBar = window.toggleSaveBar;
  if (typeof _origSaveBar === 'function') {
    window.toggleSaveBar = function() {
      if (!_isAdmin) { openAdminLogin(); return; }
      _origSaveBar();
    };
  }

  // Patch renderTable: after render, hide action buttons for public
  const _origRT = window.renderTable;
  if (typeof _origRT === 'function') {
    window.renderTable = function(key) {
      _origRT(key);
      if (!_isAdmin) {
        const tbody = document.getElementById('tb-' + key);
        if (tbody) tbody.querySelectorAll('.hide-btn, .btn.b-xs, .btn.b-red').forEach(b => b.style.display = 'none');
      }
    };
  }

  // Patch renderCards: hide footer buttons for public
  const _origRC = window.renderCards;
  if (typeof _origRC === 'function') {
    window.renderCards = function(key) {
      _origRC(key);
      if (!_isAdmin) {
        const grid = document.getElementById('sw-' + key + '-cgrid');
        if (grid) grid.querySelectorAll('.ccard-footer').forEach(f => f.style.display = 'none');
      }
    };
  }
}

/* ─── GLOBAL SAVE TO GITHUB ─────────────────────────────── */
let _saveInProgress = false;

async function globalSave() {
  if (!_isAdmin) { openAdminLogin(); return; }
  if (_saveInProgress) { toast('Save already in progress…', 'warn'); return; }

  const hash = _getSessionHash();
  if (!hash) { toast('Session expired — please log in again', 'err'); adminLogout(); return; }

  _saveInProgress = true;
  _setSaveStatus('saving', 'Saving to GitHub…');
  toast('💾 Saving to GitHub…');

  try {
    const r = await fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Hash': hash },
      body: JSON.stringify({ shows: window.SHOWS, db: window.DB }),
    });
    const data = await r.json();
    if (r.ok && data.ok) {
      _setSaveStatus('synced', 'Saved ✓ — Vercel rebuilding (~30s) — everyone will see updates shortly');
      toast('✓ Saved! Everyone sees updates in ~30 seconds');
      if (typeof logActivity === 'function') logActivity('Global save to GitHub', Object.keys(window.DB).length + ' shows', '🌐');
    } else {
      throw new Error(data.error || 'Unknown server error');
    }
  } catch (e) {
    _setSaveStatus('error', 'Save failed — ' + e.message);
    toast('Save failed: ' + e.message, 'err');
  } finally {
    _saveInProgress = false;
  }
}

function _setSaveStatus(state, msg) {
  const dot = document.getElementById('global-save-dot');
  const txt = document.getElementById('global-save-txt');
  if (dot) dot.className = 'save-status-dot' + (state ? ' ' + state : '');
  if (txt) txt.innerHTML = msg;
}

/* ─── INIT ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Install guards FIRST (before any render)
  _installGuards();

  // Restore session if still valid
  if (_isAdminSession()) {
    _isAdmin = true;
    applyAdminUI(true);
  } else {
    applyAdminUI(false);
  }

  // Enter key on password input
  document.getElementById('admin-pw-input')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') submitAdminLogin();
  });

  // Keyboard shortcut: Ctrl+Shift+G = global save
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'G') {
      e.preventDefault();
      globalSave();
    }
  });
});
