/* ═══════════════════════════════════════════════════════════
   admin.js  —  Reality TV Intelligence Dashboard 2026
   Password-protected admin / edit mode.
   Public visitors see read-only; admin unlocks full editing.

   HOW TO CHANGE YOUR PASSWORD:
   1. Open browser console on any page
   2. Run: await adminHash('your-new-password')
   3. Copy the result and replace ADMIN_HASH below
═══════════════════════════════════════════════════════════ */

/* ─── CONFIG ────────────────────────────────────────────── */
// SHA-256 hash of your admin password.
// Default password is:  BobAdmin2026!
// Change it by running adminHash('newpassword') in the console
// and replacing this value.
const ADMIN_HASH = 'c34e14750f49b0b8ba7a9635143ab6345faa98b57a9ce23d20f6d611586a4704';

const ADMIN_SESSION_KEY = 'realityTV2026_admin_v1';
const ADMIN_SESSION_TTL = 4 * 60 * 60 * 1000; // 4 hours

/* ─── HASH HELPER (also exposed for console use) ─────────── */
async function adminHash(str) {
  const buf  = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  const hex  = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
  console.log('[Admin] Hash for "'+str+'":', hex);
  return hex;
}

/* ─── SESSION ────────────────────────────────────────────── */
function _isAdminSession() {
  try {
    const raw = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return false;
    const { ts } = JSON.parse(raw);
    return (Date.now() - ts) < ADMIN_SESSION_TTL;
  } catch { return false; }
}
function _setAdminSession() {
  sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({ ts: Date.now() }));
}
function _clearAdminSession() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
}

/* ─── ADMIN STATE ────────────────────────────────────────── */
let _isAdmin = false;

function isAdmin() { return _isAdmin; }

/* ─── LOGIN MODAL ────────────────────────────────────────── */
function openAdminLogin() {
  document.getElementById('admin-modal').classList.add('open');
  setTimeout(() => document.getElementById('admin-pw-input')?.focus(), 80);
}
function closeAdminLogin() {
  document.getElementById('admin-modal').classList.remove('open');
  document.getElementById('admin-pw-input').value = '';
  document.getElementById('admin-login-err').textContent = '';
}

async function submitAdminLogin() {
  const pw  = document.getElementById('admin-pw-input').value;
  const err = document.getElementById('admin-login-err');
  if (!pw) { err.textContent = 'Enter your password.'; return; }
  const hash = await adminHash(pw);
  if (hash === ADMIN_HASH) {
    _setAdminSession();
    _isAdmin = true;
    closeAdminLogin();
    applyAdminUI(true);
    toast('✓ Admin mode unlocked', '');
  } else {
    err.textContent = 'Incorrect password. Try again.';
    document.getElementById('admin-pw-input').value = '';
    document.getElementById('admin-pw-input').focus();
  }
}

function adminLogout() {
  _clearAdminSession();
  _isAdmin = false;
  // Turn off edit mode if on
  if (typeof editMode !== 'undefined' && editMode) {
    editMode = false;
    document.body.classList.remove('edit-on');
    if (typeof renderAll === 'function') renderAll();
  }
  applyAdminUI(false);
  toast('Logged out of admin mode', 'warn');
}

/* ─── APPLY ADMIN UI ─────────────────────────────────────── */
function applyAdminUI(on) {
  // Toggle body class — CSS handles all .admin-only visibility
  document.body.classList.toggle('admin-active', on);

  // Update the admin button in topbar
  const btn = document.getElementById('admin-toggle-btn');
  if (btn) {
    btn.textContent = on ? '🔓 Admin: ON' : '🔒 Admin';
    btn.className   = on
      ? 'btn b-gh b-sm admin-active'
      : 'btn b-gh b-sm';
    btn.style.color       = on ? 'var(--grn)' : '';
    btn.style.borderColor = on ? 'var(--grn)' : '';
    btn.onclick = on ? adminLogout : openAdminLogin;
    btn.title   = on ? 'Click to log out of admin mode' : 'Admin login';
  }

  // Fire a custom event so index.html inline scripts can react
  document.dispatchEvent(new CustomEvent('adminStateChange', { detail: { admin: on } }));

  // Re-render after a tick so guard patches in app.js take effect
  if (typeof renderAll === 'function') {
    setTimeout(() => {
      renderAll();
      // Re-hide/show per-show panel action buttons
      if (typeof getShowKeys === 'function') {
        getShowKeys().forEach(k => {
          const panel = document.getElementById('panel-show-' + k);
          if (!panel) return;
          panel.querySelectorAll('.ph-act .btn, .tb-r .btn').forEach(b => {
            if (!b.textContent.includes('Capture') && !b.textContent.includes('📷')) {
              b.style.display = on ? '' : 'none';
            }
          });
        });
      }
      // Show/hide the persistence-injected Save button
      document.querySelectorAll('.tb-btns .btn.b-grn').forEach(b => {
        if (b.innerHTML.includes('Save') || b.innerHTML.includes('💾')) {
          b.style.display = on ? '' : 'none';
        }
      });
    }, 50);
  }
}

/* ─── INIT ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Check existing session
  if (_isAdminSession()) {
    _isAdmin = true;
    applyAdminUI(true);
  } else {
    applyAdminUI(false);
  }

  // Enter key in password field
  document.getElementById('admin-pw-input')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') submitAdminLogin();
  });

  // Guard toggleEdit to require admin
  const _origToggleEdit = window.toggleEdit;
  window.toggleEdit = function() {
    if (!_isAdmin) { openAdminLogin(); return; }
    _origToggleEdit?.();
  };
});

/* ─── RE-APPLY GUARDS AFTER ADMIN STATE CHANGES ─────────── */
/* applyAdminUI now handles everything — no additional override needed */
