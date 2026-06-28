# 📺 Reality TV Intel 2026 — BobMasterBillie

> Indian Reality TV tracker — KKK 15, Traitors India S2, Bigg Boss 20, Alliance India, Lock Upp S2.
> Data updates globally in ~30 seconds when you hit 🌐 Save Global.

---

## 🚀 Complete Setup — Zero to Live

### Step 1 — Push to GitHub

Create a **public** repo (e.g. `realitytv2026`) and push the contents of this zip:

```bash
cd realitytv2026
git init
git add .
git commit -m "Initial deploy"
git remote add origin https://github.com/YOUR_USERNAME/realitytv2026.git
git push -u origin main
```

---

### Step 2 — Deploy to Vercel

1. Go to **vercel.com → Add New → Project**
2. Import your `realitytv2026` GitHub repo
3. Framework Preset: **Other**
4. Root Directory: leave blank (/)
5. Click **Deploy** ✓

Your site will be at `https://realitytv2026.vercel.app` (or your custom domain).

---

### Step 3 — Create GitHub Personal Access Token

This lets the site write data back to GitHub.

1. GitHub → **Settings → Developer Settings → Personal Access Tokens → Tokens (classic)**
2. **Generate new token (classic)**
3. Name: `realitytv-dashboard`
4. Expiration: **No expiration** (or 1 year)
5. Scopes: tick **`repo`** (full repository access)
6. Click **Generate token** → **copy it immediately** (you only see it once)

---

### Step 4 — Choose Your Admin Password

1. Open your deployed Vercel site
2. Open browser console (F12)
3. Run:
```javascript
await adminHash('your-chosen-password')
```
4. Copy the 64-character hash that appears in the console

---

### Step 5 — Set Vercel Environment Variables

Vercel → Your Project → **Settings → Environment Variables**

Add these exactly:

| Name | Value |
|---|---|
| `GH_TOKEN` | Your GitHub token from Step 3 |
| `GH_OWNER` | Your GitHub username (e.g. `BobMasterBillie`) |
| `GH_REPO` | Your repo name (e.g. `realitytv2026`) |
| `ADMIN_HASH` | The 64-char hash from Step 4 |

Click **Save** on each one.

---

### Step 6 — Redeploy

Vercel → Your Project → **Deployments → Redeploy** (top deployment).

This loads the new environment variables.

---

### Step 7 — Test It

1. Visit your Vercel URL
2. Click **🔒 Admin** → enter your password → **Unlock Admin Mode**
3. Toggle **✎ Edit Mode** → change something (e.g. a follower count)
4. Click **🌐 Save Global**
5. Wait ~30 seconds
6. Open in a different browser / incognito → you should see the change ✅

---

## 📁 File Structure

```
/
├── vercel.json              ← Routes /api/* to serverless, /* to /public
├── package.json             ← Node 18 runtime
├── api/
│   ├── save.js              ← Commits data.js to GitHub (serverless function)
│   └── verify.js            ← Checks admin password header (serverless function)
└── public/
    ├── index.html           ← Full dashboard app
    ├── css/styles.css       ← All styles — dark + light mode, fully themed
    ├── data/data.js         ← Show + contestant data (auto-updated by global save)
    └── js/
        ├── utils.js         ← Sanitization, validation, debounce
        ├── app.js           ← Core rendering, navigation, CRUD, growth, rankings
        ├── export.js        ← CSV / JSON download helpers
        ├── persistence.js   ← Local save/load + screenshot engine
        └── admin.js         ← Auth + global save to GitHub
```

---

## 🔒 Admin vs Public

| Feature | Public (everyone) | Admin (you) |
|---|---|---|
| Browse shows / rosters | ✅ | ✅ |
| Filter by status / show / gender / search | ✅ | ✅ |
| Screenshot / Capture (2× HD PNG) | ✅ | ✅ |
| Export CSV / Growth CSV | ✅ | ✅ |
| Light / Dark mode toggle | ✅ | ✅ |
| Print / PDF | ✅ | ✅ |
| Edit contestant data (inline) | ❌ | ✅ |
| Add / delete contestants | ❌ | ✅ |
| Add / rename / delete shows | ❌ | ✅ |
| Hide / show contestants | ❌ | ✅ |
| **🌐 Save Global (updates everyone)** | ❌ | ✅ |
| 💾 Local browser backup | ❌ | ✅ |

---

## 🔑 Changing Your Password

1. Open console on your site → run `await adminHash('newpassword')`
2. Copy the hash
3. Vercel → Settings → Environment Variables → update `ADMIN_HASH`
4. Redeploy

---

## ✏️ Updating Data — Day-to-Day Workflow

**On the live site (recommended):**
1. 🔒 Admin → enter password
2. ✎ Edit Mode → click any cell to edit inline, or use **+ Add** buttons
3. 🌐 Save Global → done, everyone sees it in ~30s

**Bulk follower update:**
1. ↑ Load from JSON → Bulk Follower Import
2. Paste lines: `Contestant Name, showKey, 2.5M`
3. ✓ Apply → then 🌐 Save Global

**Edit data.js directly:**
1. Edit `public/data/data.js` in your GitHub repo
2. Commit → Vercel auto-redeploys

---

## 📷 Screenshots

- Every panel has a **📷 Capture** button
- Downloads 2× retina HD PNG
- Also: Copy to clipboard, JPG, or Print

---

*Built for BobMasterBillie · 2026*
