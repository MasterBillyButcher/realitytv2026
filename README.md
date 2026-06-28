# 📺 Reality TV Intel 2026 — BobMasterBillie

> Indian Reality TV tracker — live follower data, rankings, growth tables.
> **Zero server. Zero tokens. Zero complexity.**

---

## How It Works

Every visitor's browser fetches your latest `data.js` directly from GitHub on each page load.
You update → everyone sees it. That's it.

```
You edit data on site
       ↓
Click ↓ Save JSON
       ↓
Upload file to GitHub as public/data/data.js
       ↓
Every visitor worldwide sees the update immediately ✓
```

---

## Setup — 3 Steps, 10 Minutes

### Step 1 — Push to GitHub

Create a **public** GitHub repo (e.g. `realitytv2026`) and push the zip contents:

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
2. Import your GitHub repo
3. Framework Preset: **Other**  |  Root Directory: **(leave blank)**
4. Click **Deploy**

Done. Your site is live at `https://yourrepo.vercel.app`.

---

### Step 3 — Set Your Password (optional but recommended)

The default admin password is: **`BobAdmin2026!`**

To change it:
1. Open your live site → browser console (F12)
2. Run: `await adminHash('your-new-password')`
3. Copy the 64-character hash
4. Open `public/js/admin.js` in your repo
5. Replace the `ADMIN_HASH` value on line 17
6. Commit + push → done

---

## Day-to-Day Workflow

1. Visit your site → click **🔒 Admin** → enter password
2. Toggle **✎ Edit Mode** → click any cell to edit inline
3. Use **+ Add** buttons to add contestants
4. Click **↓ Save JSON** to download the updated data file
5. Upload it to GitHub as `public/data/data.js` (see below)
6. Everyone sees the update immediately ✓

### How to Upload data.js to GitHub

**Option A — GitHub website (easiest):**
- Go to your repo → `public/data/data.js` → click ✏️ pencil → upload icon → choose file → Commit changes

**Option B — GitHub Desktop:**
- Copy the downloaded file into your local repo → commit → push

**Option C — Terminal:**
```bash
cp ~/Downloads/RealityTV2026.json /path/to/repo/public/data/data.js
git add public/data/data.js
git commit -m "Update data"
git push
```

---

## File Structure

```
/
├── vercel.json              ← Routes all requests to /public
├── public/
│   ├── index.html           ← Main dashboard
│   ├── css/styles.css       ← All styles — dark + light mode
│   ├── data/data.js         ← Show + contestant data (you update this)
│   └── js/
│       ├── utils.js         ← Helpers
│       ├── app.js           ← Rendering, navigation, CRUD
│       ├── export.js        ← CSV / JSON exports
│       ├── persistence.js   ← Local backup + screenshots
│       ├── admin.js         ← Password auth
│       └── dataloader.js    ← Fetches fresh data from GitHub on load
└── README.md
```

---

## Admin vs Public

| Feature | Everyone | Admin |
|---|---|---|
| Browse shows / rosters | ✅ | ✅ |
| Filter + search | ✅ | ✅ |
| Screenshot / Capture (2× HD) | ✅ | ✅ |
| Export CSV | ✅ | ✅ |
| Light / Dark mode | ✅ | ✅ |
| Print / PDF | ✅ | ✅ |
| Edit data (inline) | ❌ | ✅ |
| Add / delete contestants | ❌ | ✅ |
| Manage shows | ❌ | ✅ |
| Hide / show contestants | ❌ | ✅ |
| ↓ Save JSON | ❌ | ✅ |
| Local browser backup | ❌ | ✅ |

---

## Bulk Follower Update

Go to **↑ Load from JSON → Bulk Follower Import**, paste:
```
Rubina Dilaik, kkk, 8.7M
Jasmin Bhasin, kkk, 9.2M
```
Format: `Contestant Name, showKey, newFollowers`
Then download JSON → upload to GitHub.

---

*Built for BobMasterBillie · 2026*
