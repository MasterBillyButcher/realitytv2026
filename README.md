<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://capsule-render.vercel.app/api?type=cylinder&color=0:0d0221,40:1a0533,100:0d1b4b&height=220&section=header&text=Reality%20TV%20Intel%202026&fontSize=58&fontColor=ffffff&animation=scaleIn&fontAlignY=45&desc=Contestant%20analytics%20dashboard%20for%20India%27s%20biggest%20reality%20shows&descAlignY=65&descSize=16&descColor=c4b5fd&stroke=7c3aed&strokeWidth=2"/>
  <source media="(prefers-color-scheme: light)" srcset="https://capsule-render.vercel.app/api?type=cylinder&color=0:ede9fe,50:ddd6fe,100:c4b5fd&height=220&section=header&text=Reality%20TV%20Intel%202026&fontSize=58&fontColor=1e1b4b&animation=scaleIn&fontAlignY=45&desc=Contestant%20analytics%20dashboard%20for%20India%27s%20biggest%20reality%20shows&descAlignY=65&descSize=16&descColor=4c1d95&stroke=7c3aed&strokeWidth=2"/>
  <img width="100%" src="https://capsule-render.vercel.app/api?type=cylinder&color=0:0d0221,40:1a0533,100:0d1b4b&height=220&section=header&text=Reality%20TV%20Intel%202026&fontSize=58&fontColor=ffffff&animation=scaleIn&fontAlignY=45&desc=Contestant%20analytics%20dashboard%20for%20India%27s%20biggest%20reality%20shows&descAlignY=65&descSize=16&descColor=c4b5fd&stroke=7c3aed&strokeWidth=2" alt="Reality TV Intel 2026"/>
</picture>

<div align="center">

[![Live](https://img.shields.io/badge/🌐_Live-realitytv2026.vercel.app-7C3AED?style=for-the-badge&labelColor=0d0221)](https://realitytv2026.vercel.app/)
&nbsp;
[![GitHub](https://img.shields.io/badge/GitHub-MasterBillyButcher-181717?style=for-the-badge&logo=github&labelColor=0d1117)](https://github.com/MasterBillyButcher/realitytv2026)

<br/>

![Status](https://img.shields.io/badge/Status-Live-22C55E?style=flat-square&labelColor=052e16)
![Stack](https://img.shields.io/badge/Stack-Vanilla_JS-F7DF1E?style=flat-square&logo=javascript&logoColor=black&labelColor=1a1500)
![Hosting](https://img.shields.io/badge/Hosting-Vercel-000?style=flat-square&logo=vercel)
![Backend](https://img.shields.io/badge/Backend-None-FF6B6B?style=flat-square&labelColor=2d0000)

</div>

---

Track Instagram follower counts, rankings, and social growth for contestants across India's biggest reality TV shows — Bigg Boss, Lock Upp, Khatron Ke Khiladi, and more. Fully static, zero backend, data lives in a single file on GitHub.

---

## Features

- **Live Rankings** — contestants sorted by follower count, updated on every page load
- **Growth Tracking** — three-point history per contestant: Before Show → Last Checked → Current
- **Multi-Show Dashboard** — per-show views and cross-show comparison in one place
- **Search & Filter** — by name, show, status, gender; seven sort modes on the growth table
- **Inline Editing** — click any cell in Edit Mode to update; no forms, no page reloads
- **Bulk Import** — paste CSV-style lines to update hundreds of follower counts at once
- **Export** — CSV (per show, all rosters, rankings), 2× HD PNG screenshot, JSON, print-to-PDF

---

## Stack

| | Purpose |
|:--|:--|
| HTML5 + CSS3 | App shell, design tokens, dark/light theming, animations |
| Vanilla JS (ES2020) | All rendering, CRUD, filtering, sorting, export logic |
| Montserrat + Inter | Typography |
| html2canvas | 2× HD PNG export |
| GitHub Raw | Live data delivery, cache-busted on every load |
| Vercel | Static hosting + global CDN |

---

## Project Structure

```
public/
├── css/styles.css          # Design system, tokens, themes
├── data/data.js            # ← All show and contestant data lives here
└── js/
    ├── utils.js            # Sanitization, validation, debounce
    ├── app.js              # Rendering, CRUD, growth logic
    ├── export.js           # CSV, JSON, screenshot
    ├── persistence.js      # LocalStorage, bulk import, activity log
    ├── admin.js            # SHA-256 auth, session management
    └── dataloader.js       # GitHub fetch, boot sequence, fallback
```

---

## Getting Started

```bash
git clone https://github.com/MasterBillyButcher/realitytv2026.git
cd realitytv2026
open public/index.html      # no install, no build step
```

Deploy to Vercel: import the repo at [vercel.com/new](https://vercel.com/new) — zero config needed.

---

## Updating Data

All data lives in `public/data/data.js`. The recommended workflow:

1. Open the live site → **🔒 Admin** → enter password → **✎ Edit Mode**
2. Click any cell to edit inline
3. **↓ Save JSON** → `data.js` downloads
4. Push `data.js` to `public/data/data.js` on GitHub
5. All visitors see the update on their next page load

**Bulk import** (fastest for many updates): go to Export → Bulk Follower Import, paste in this format:

```
Gaurav Khanna, kkk, 2.1M
Rubina Dilaik, kkk, 8.6M
Shivangi Joshi, lockupp, 10.5M
```

Accepted formats: `430K` `2.5M` `9200000`

---

## Permissions

| Feature | Public | Admin |
|:--|:-:|:-:|
| Browse, search, filter | ✅ | ✅ |
| Export CSV / screenshot / print | ✅ | ✅ |
| Edit, add, delete contestants | ❌ | ✅ |
| Manage shows | ❌ | ✅ |
| Bulk import / download data.js | ❌ | ✅ |

---

## Keyboard Shortcuts

| Shortcut | Action |
|:--|:--|
| `Ctrl + S` | Save to browser storage |
| `Ctrl + Shift + S` | Download data.js |
| `Ctrl + Shift + P` | Print / Save as PDF |
| `Esc` | Close modal |

---

## Security

Client-side only. The admin password is SHA-256 hashed in the browser — nothing is sent to a server. Intended for trusted users with the password; not a substitute for server-side auth.

---

## Troubleshooting

**Changes not reflecting?** Confirm the file was pushed to `public/data/data.js`, then hard-refresh (`Ctrl+Shift+R`). Vercel deploys take 30–60 seconds.

**Screenshot broken?** Ad blockers can interfere with html2canvas. Try incognito, or use `Ctrl+P → Save as PDF`.

**Yellow warning banner?** The GitHub fetch failed — the bundled `data.js` is serving as fallback. Check the repo is public and the raw URL is reachable.

---

## Contributing

```bash
git checkout -b feature/your-feature
# make changes
git commit -m "feat: short description"
git push origin feature/your-feature
# open a pull request
```

---

## License

[MIT](LICENSE)

---

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://capsule-render.vercel.app/api?type=cylinder&color=0:040d1a,50:0d1b4b,100:1a0533&height=120&section=footer&text=Built%20by%20BobMasterBillie&fontSize=22&fontColor=c4b5fd&animation=fadeIn&fontAlignY=55"/>
  <source media="(prefers-color-scheme: light)" srcset="https://capsule-render.vercel.app/api?type=cylinder&color=0:ede9fe,50:ddd6fe,100:c4b5fd&height=120&section=footer&text=Built%20by%20BobMasterBillie&fontSize=22&fontColor=1e1b4b&animation=fadeIn&fontAlignY=55"/>
  <img width="100%" src="https://capsule-render.vercel.app/api?type=cylinder&color=0:040d1a,50:0d1b4b,100:1a0533&height=120&section=footer&text=Built%20by%20BobMasterBillie&fontSize=22&fontColor=c4b5fd&animation=fadeIn&fontAlignY=55" alt="footer"/>
</picture>
