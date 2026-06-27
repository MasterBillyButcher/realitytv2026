# 📺 Reality TV Intelligence Dashboard 2026

**BobMasterBillie's Indian Reality TV Season Tracker**

Live tracking for Alliance India, Lock Upp S2, KKK 15, Traitors India S2, and Bigg Boss 20.

## 🔗 Live Site

Deploy via GitHub Pages — see setup below.

---

## 🚀 GitHub Pages Setup

1. Push this folder to a GitHub repo (e.g. `realitytv2026`)
2. Go to **Settings → Pages**
3. Set Source to **main branch / root**
4. Your site will be live at `https://yourusername.github.io/realitytv2026/`

---

## 🔒 Admin vs Public

| Feature | Public (everyone) | Admin (you only) |
|---|---|---|
| Browse all shows / rosters | ✅ | ✅ |
| Filter by status, show, gender | ✅ | ✅ |
| Search contestants | ✅ | ✅ |
| Screenshot / Capture panels | ✅ | ✅ |
| Export CSV / Growth CSV | ✅ | ✅ |
| Print / PDF | ✅ | ✅ |
| Light / Dark mode | ✅ | ✅ |
| Edit contestant data (inline) | ❌ | ✅ |
| Add / delete contestants | ❌ | ✅ |
| Manage shows | ❌ | ✅ |
| Show/Hide contestants | ❌ | ✅ |
| Save / restore data | ❌ | ✅ |

---

## 🔑 Changing Your Admin Password

The default password is: **`BobAdmin2026!`**

**To change it:**

1. Open any browser and go to the browser console (F12)
2. Run: `await adminHash('your-new-password')`
3. Copy the 64-character hash that appears
4. Open `js/admin.js`
5. Replace the `ADMIN_HASH` value on line ~18 with your new hash
6. Push to GitHub

---

## 📁 File Structure

```
index.html          ← Main page
css/
  styles.css        ← All styles (Montserrat, dark/light, responsive)
js/
  utils.js          ← Sanitization, validation, debounce
  app.js            ← Rendering, navigation, CRUD
  export.js         ← CSV / JSON download helpers
  persistence.js    ← Save/load, screenshots, activity log
  admin.js          ← Password-protected admin mode
data/
  data.js           ← All show metadata and contestant data
RealityTV2026.json  ← Backup/export file
```

---

## ✏️ Updating Data

**Option A — Edit `data/data.js` directly** (best for bulk updates):
- Open the file, find the show array, add/edit contestants
- Push to GitHub

**Option B — Admin mode on the live site**:
1. Click **🔒 Admin** in the top bar
2. Enter your password
3. Use **Edit Mode** (inline editing) or the **+ Add** buttons
4. Click **💾 Save** → **Save as JSON**
5. Replace `RealityTV2026.json` in your repo with the downloaded file
6. Optionally update `data/data.js` for permanent data

---

## 📷 Screenshots (Captures)

- Click **📷 Capture** on any panel to get a 2× HD PNG
- Works for: Roster tables, Card view, Growth tables, Rankings
- Download as PNG/JPG, copy to clipboard, or print

---

## 📊 Follower Bulk Import (Admin only)

In **Load from JSON** → **Bulk Follower Import**, paste lines like:
```
Rubina Dilaik, kkk, 8.7M
Jasmin Bhasin, kkk, 9.2M
```

Format: `Contestant Name, showKey, currentFollowers`

---

## 🎨 Customization

- **Accent color / show colors**: edit `data/data.js` per show
- **Font**: Montserrat (Google Fonts CDN)
- **Add a show**: Admin → ⚙ Shows → Create Show
- **Password**: see above

---

*Built by BobMasterBillie · 2026*
