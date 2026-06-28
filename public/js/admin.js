/* ═══════════════════════════════════════════════════════════
   admin.js  —  Reality TV Intelligence Dashboard 2026
   Simple password-protected admin mode.
   No server. No API. No tokens.

   HOW TO CHANGE PASSWORD:
   1. Open browser console on your site
   2. Run:  await adminHash('your-new-password')
   3. Copy the 64-character hash
   4. Replace ADMIN_HASH below with it
   5. Commit + push → done
═══════════════════════════════════════════════════════════ */

/* ── YOUR PASSWORD HASH ─────────────────────────────────────
   Default password: BobAdmin2026!
   Change it: run adminHash('newpass') in console, paste result here
─────────────────────────────────────────────────────────── */
const ADMIN_HASH = 'c34e14750f49b0b8ba7a9635143ab6345faa98b57a9ce23d20f6d611586a4704';

const ADMIN_SESSION_KEY = 'rtv2026_admin_v1';
const ADMIN_SESSION_TTL = 8 * 60 * 60 * 1000; // 8 hours

/* ── HASH HELPER (use in browser console) ────────────────── */
async function adminHash(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  const hex = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
  console.log('[Admin] Hash for your password:', hex);
  console.log('[Admin] Paste this into ADMIN_HASH in admin.js');
  return hex;
}

/* ── SESSION ─────────────────────────────────────────────── */
function _isAdminSession() {
  try {
    const { ts } = JSON.parse(sessionStorage.getItem(ADMIN_SESSION_KEY) || '{}');
    return !!ts && (Date.now() - ts) < ADMIN_SESSION_TTL;
  } catch { return false; }
}
function _setSession()   { sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({ ts: Date.now() })); }
function _clearSession() { sessionStorage.removeItem(ADMIN_SESSION_KEY); }

/* ── STATE ───────────────────────────────────────────────── */
let _isAdmin = false;
function isAdmin() { return _isAdmin; }

/* ── LOGIN MODAL ─────────────────────────────────────────── */
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
  const hash = await adminHash(pw);
  if (btn) { btn.textContent = 'Unlock Admin Mode'; btn.disabled = false; }

  if (hash === ADMIN_HASH) {
    _setSession();
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
  if (typeof editMode !== 'undefined' && editMode && typeof toggleEdit === 'function') {
    toggleEdit(); // turn off edit mode
  }
  applyAdminUI(false);
  toast('Logged out of admin mode', 'warn');
}

/* ── APPLY ADMIN UI ──────────────────────────────────────── */
function applyAdminUI(on) {
  document.body.classList.toggle('admin-active', on);

  const btn = document.getElementById('admin-toggle-btn');
  if (btn) {
    btn.textContent       = on ? '🔓 Admin: ON' : '🔒 Admin';
    btn.style.color       = on ? 'var(--grn)' : '';
    btn.style.borderColor = on ? 'var(--grn)' : '';
    btn.onclick = on ? adminLogout : openAdminLogin;
    btn.title   = on ? 'Click to log out' : 'Admin login';
  }

  const vb = document.getElementById('viewer-banner');
  const as = document.getElementById('activity-section');
  const sw = document.getElementById('save-workflow');
  if (vb) vb.style.display = on ? 'none' : '';
  if (as) as.style.display = on ? '' : 'none';
  if (sw) sw.style.display = on ? '' : 'none';

  if (typeof renderAll === 'function') {
    setTimeout(() => {
      renderAll();
      _fixShowPanelButtons(on);
    }, 60);
  }
}

function _fixShowPanelButtons(on) {
  if (typeof getShowKeys !== 'function') return;
  getShowKeys().forEach(k => {
    const panel = document.getElementById('panel-show-' + k);
    if (!panel) return;
    panel.querySelectorAll('.ph-act .btn, .tb-r .btn').forEach(b => {
      const txt = (b.textContent || '').trim();
      if (!txt.includes('📷') && !txt.toLowerCase().includes('capture')) {
        b.style.display = on ? '' : 'none';
      }
    });
    if (!on) {
      panel.querySelectorAll('.hide-btn, .btn.b-xs, .btn.b-red').forEach(b => b.style.display = 'none');
      panel.querySelectorAll('.ccard-footer').forEach(f => f.style.display = 'none');
    }
  });
}

/* ── GUARD ALL WRITE OPERATIONS ─────────────────────────── */
function _installGuards() {
  function guard(name) {
    const orig = window[name];
    if (typeof orig === 'function') {
      window[name] = function(...args) {
        if (!_isAdmin) { openAdminLogin(); return; }
        return orig.apply(this, args);
      };
    }
  }
  ['toggleEdit','openAdd','openEdit','delRow','openShowMgr',
   'openShowEdit','openHideMgr','showAll','hideRumoured',
   'hideAllVisible','showAllInShow','toggleSaveBar'].forEach(guard);

  // toggleH is silent no-op for non-admins
  const _origH = window.toggleH;
  if (typeof _origH === 'function') {
    window.toggleH = function(k, id) { if (_isAdmin) _origH(k, id); };
  }

  // Patch renderTable: hide action buttons for public
  const _origRT = window.renderTable;
  if (typeof _origRT === 'function') {
    window.renderTable = function(key) {
      _origRT(key);
      if (!_isAdmin) {
        const tb = document.getElementById('tb-' + key);
        if (tb) tb.querySelectorAll('.hide-btn,.btn.b-xs,.btn.b-red').forEach(b => b.style.display = 'none');
      }
    };
  }

  // Patch renderCards: hide footer buttons for public
  const _origRC = window.renderCards;
  if (typeof _origRC === 'function') {
    window.renderCards = function(key) {
      _origRC(key);
      if (!_isAdmin) {
        const g = document.getElementById('sw-' + key + '-cgrid');
        if (g) g.querySelectorAll('.ccard-footer').forEach(f => f.style.display = 'none');
      }
    };
  }
}

/* ── INIT ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  _installGuards();

  if (_isAdminSession()) {
    _isAdmin = true;
    applyAdminUI(true);
  } else {
    applyAdminUI(false);
  }

  document.getElementById('admin-pw-input')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') submitAdminLogin();
  });
});
