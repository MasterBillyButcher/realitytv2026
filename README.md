<div align="center">

<img src="https://capsule-render.vercel.app/api?type=venom&color=0:0f0f1a,50:1a0a3e,100:0a1628&height=300&section=header&text=Reality%20TV%20Intel&fontSize=72&fontColor=ffffff&animation=fadeIn&fontAlignY=40&desc=2026%20Edition%20%E2%80%94%20India%27s%20Premier%20Contestant%20Analytics%20Dashboard&descAlignY=62&descSize=17&descColor=a78bfa&stroke=6d28d9&strokeWidth=2" width="100%" alt="Reality TV Intel 2026 Banner"/>

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Montserrat&weight=800&size=22&duration=3000&pause=1000&color=A78BFA&center=true&vCenter=true&width=600&lines=%F0%9F%93%BA+Track+%C2%B7+Analyze+%C2%B7+Compare+%C2%B7+Export;India%27s+Biggest+Reality+Shows+%E2%80%94+One+Dashboard;Live+Rankings+%C2%B7+Growth+Tracking+%C2%B7+Admin+Controls;Fast+%C2%B7+Cinematic+%C2%B7+Static+%C2%B7+Zero+Backend" alt="Typing SVG" />

<br/><br/>

<a href="https://realitytv2026.vercel.app/" target="_blank">
  <img src="https://img.shields.io/badge/🌐%20Live%20Demo-Visit%20Website-7C3AED?style=for-the-badge&labelColor=1a0a3e" alt="Live Demo"/>
</a>
&nbsp;
<a href="https://github.com/MasterBillyButcher/realitytv2026" target="_blank">
  <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&labelColor=0d1117" alt="Repository"/>
</a>

<br/><br/>

<img src="https://img.shields.io/badge/Version-2026-7C3AED?style=flat-square&labelColor=1a0a3e"/>
<img src="https://img.shields.io/badge/Status-Active%20%E2%9C%85-22C55E?style=flat-square&labelColor=052e16"/>
<img src="https://img.shields.io/badge/JavaScript-Vanilla%20ES2020-F7DF1E?style=flat-square&logo=javascript&logoColor=black&labelColor=1a1a00"/>
<img src="https://img.shields.io/badge/Hosting-Vercel-000000?style=flat-square&logo=vercel&labelColor=111"/>
<img src="https://img.shields.io/badge/Backend-None%20(Static)-FF6B6B?style=flat-square&labelColor=2d0000"/>
<img src="https://img.shields.io/badge/Database-GitHub%20Raw-181717?style=flat-square&logo=github&labelColor=0d1117"/>

<br/><br/>

> *A modern, cinematic analytics dashboard built for fast, reliable tracking of Indian reality TV contestant data — follower counts, growth, rankings, and more.*

</div>

---

<div align="center">

## 🌐 Live at → **[realitytv2026.vercel.app](https://realitytv2026.vercel.app/)**

</div>

---

## 📌 Table of Contents

- [✨ Features](#-features)
- [🏗 Architecture](#-architecture)
- [⚙ Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Quick Start](#-quick-start)
- [📝 Updating Data](#-updating-data)
- [👥 Permissions](#-permissions)
- [⌨️ Keyboard Shortcuts](#-keyboard-shortcuts)
- [🌍 Browser Support](#-browser-support)
- [🔧 Troubleshooting](#-troubleshooting)
- [🔒 Security](#-security-note)
- [🤝 Contributing](#-contributing)

---

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

### 📊 Analytics Engine
- **Live Rankings** — Contestants sorted by follower count in real time
- **Growth Tracking** — Before Show → Last Checked → Current, all in one row
- **Multi-Show Dashboard** — Per-show views and cross-show comparison
- **Smart Search** — Filter by status, show, gender with instant results
- **7 Sort Modes** — Drag-to-reorder growth tables, your way

</td>
<td width="50%" valign="top">

### ✏️ Admin Controls
- **Inline Editing** — Click any cell in Edit Mode to update it instantly
- **Full CRUD** — Add, edit, delete contestants without touching code
- **Show Management** — Create, rename, and remove shows on the fly
- **Bulk Import** — Paste CSV-style lines to update hundreds of followers at once
- **One-Click Deploy** — Download `data.js` → push to GitHub → everyone sees it

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 📤 Export Suite
- **CSV Export** — Per show, all rosters, growth tables, rankings
- **HD Screenshot** — 2× PNG capture of any panel via html2canvas
- **Print-Ready** — `Ctrl+P` → PDF in one step
- **JSON Export** — Full data file download for backup or migration

</td>
<td width="50%" valign="top">

### 🎨 User Experience
- **Cinematic Dark Mode** (default) + clean Light Mode
- **Montserrat + Inter** typography system
- **Animated Entrances** — Smooth transitions on every render
- **Fully Responsive** — Desktop, tablet, and mobile
- **Keyboard Shortcuts** — Power-user navigation built in

</td>
</tr>
</table>

---

## 🏗 Architecture

```
╔══════════════════════════════════════════════════════════════╗
║                   Browser  (Any Visitor)                     ║
╚══════════════════════════╦═══════════════════════════════════╝
                           ║
                           ▼
           ┌───────────────────────────────┐
           │  Loads bundled data/data.js   │  ← instant, no wait
           └──────────────┬────────────────┘
                          ║
                          ▼
           ┌───────────────────────────────┐
           │  Fetches latest from GitHub   │  ← cache-busted on every load
           │  (raw.githubusercontent.com)  │
           └──────────────┬────────────────┘
                          ║
                          ▼
           ┌───────────────────────────────┐
           │   Re-renders with fresh data  │
           └───────┬───────────────┬───────┘
                   ║               ║
            ┌──────▼──────┐ ┌─────▼───────────┐
            │ Public View │ │  Administrator   │
            │  (read only)│ │ (edit + export)  │
            └──────┬──────┘ └─────┬────────────┘
                   ║               ║
                   └───────┬───────┘
                           ▼
              ┌────────────────────────┐
              │  Download data.js      │
              └────────────┬───────────┘
                           ▼
              ┌────────────────────────┐
              │  Push to GitHub        │
              └────────────┬───────────┘
                           ▼
              ┌────────────────────────┐
              │  Live for everyone ✓   │
              └────────────────────────┘
```

---

## ⚙ Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|:------|:-----------|:--------|
| 🏗 Structure | HTML5 | Semantic app shell + all modals |
| 🎨 Styling | CSS3 + Custom Properties | Design tokens, dark/light mode, animations |
| ⚡ Logic | Vanilla JavaScript (ES2020) | All rendering, CRUD, filtering, export |
| 🔤 Typography | Montserrat + Inter | Cinematic headline + clean body type |
| 📸 Screenshot | html2canvas | 2× HD PNG export from any panel |
| 📡 Data Delivery | GitHub Raw CDN | Live data, cache-busted on every load |
| 🚀 Hosting | Vercel | Static deployment + global CDN |

</div>

---

## 📁 Project Structure

```
realitytv2026/
│
├── 📂 public/
│   │
│   ├── 📂 css/
│   │   └── styles.css          ← Full design system with CSS tokens
│   │
│   ├── 📂 data/
│   │   └── data.js             ← All show + contestant data (edit & upload to update)
│   │
│   ├── 📂 js/
│   │   ├── utils.js            ← Sanitization, validation, debounce  (loads first)
│   │   ├── app.js              ← Rendering, navigation, CRUD, growth logic
│   │   ├── export.js           ← CSV, JSON export, screenshot capture
│   │   ├── persistence.js      ← LocalStorage, bulk import, activity log
│   │   ├── admin.js            ← SHA-256 password auth + session management
│   │   └── dataloader.js       ← GitHub fetch + boot sequence
│   │
│   └── index.html              ← App shell + all modals
│
├── vercel.json                 ← Routing + cache headers
└── README.md
```

---

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/MasterBillyButcher/realitytv2026.git

# 2. Enter the project folder
cd realitytv2026

# 3. Open in browser — no build step required
open public/index.html
```

> **Deploy to Vercel:** Import the repo at [vercel.com/new](https://vercel.com/new) — zero config needed.

---

## 📝 Updating Data

All data lives in `public/data/data.js`. No database. No backend. Just a file.

### Standard Workflow

```
1. Open the live dashboard  →  https://realitytv2026.vercel.app/
2. Click 🔒 Admin           →  Enter password
3. Click ✎ Edit Mode        →  Click any cell to edit inline
4. Click ↓ Save JSON        →  data.js downloads to your machine
5. Push data.js to GitHub   →  public/data/data.js
6. Done ✓                   →  Everyone sees the update on next load
```

### ⚡ Bulk Follower Import (Fastest Method)

Navigate to **Export → Load from JSON → Bulk Follower Import**, then paste:

```
Gaurav Khanna,    kkk,      2.1M
Rubina Dilaik,    kkk,      8.6M
Shivangi Joshi,   lockupp,  10.5M
```

**Format:** `Contestant Name, showKey, newFollowers`

**Accepted values:** `430K` · `2.5M` · `8.7M` · `9200000`

---

## 👥 Permissions

<div align="center">

| Feature | 🌐 Public | 🔐 Admin |
|:--------|:---------:|:--------:|
| Browse Dashboard | ✅ | ✅ |
| Search + Filter | ✅ | ✅ |
| Export CSV | ✅ | ✅ |
| Screenshot / Print | ✅ | ✅ |
| Edit Contestants | ❌ | ✅ |
| Add Contestants | ❌ | ✅ |
| Delete Contestants | ❌ | ✅ |
| Manage Shows | ❌ | ✅ |
| Bulk Import | ❌ | ✅ |
| Download data.js | ❌ | ✅ |

</div>

---

## ⌨️ Keyboard Shortcuts

<div align="center">

| Shortcut | Action |
|:---------|:-------|
| `Ctrl + S` | Save to browser storage |
| `Ctrl + Shift + S` | Download data.js |
| `Ctrl + Shift + P` | Print / Save as PDF |
| `Escape` | Close any open modal |

</div>

---

## 🌍 Browser Support

<div align="center">

| Browser | Supported |
|:--------|:---------:|
| Google Chrome | ✅ |
| Microsoft Edge | ✅ |
| Mozilla Firefox | ✅ |
| Safari | ✅ |

</div>

---

## 🔧 Troubleshooting

<details>
<summary><strong>📭 Updates not showing after I pushed data.js</strong></summary>

1. Confirm the file was replaced at `public/data/data.js` on GitHub — not somewhere else.
2. Hard refresh: `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac).
3. Allow 30–60 seconds for Vercel to finish deploying.

</details>

<details>
<summary><strong>📸 Screenshot button not working</strong></summary>

- Some ad blockers interfere with html2canvas. Try in an incognito/private window.
- Use `Ctrl + P → Save as PDF` as a reliable alternative.

</details>

<details>
<summary><strong>🌐 GitHub data fetch is failing</strong></summary>

- The bundled `data.js` loads as a fallback — the site still works without the fetch.
- Check the repo visibility: it must be **public** for raw GitHub URLs to work.
- Look for the yellow warning banner at the top of the page.

</details>

---

## 🔒 Security Note

This is a **client-side only** application. The admin password is hashed with SHA-256 in the browser and is never transmitted to a server. Admin controls are intended for trusted users who know the password — they are not a substitute for server-side authentication.

---

## 🤝 Contributing

All contributions are welcome — bug fixes, new features, design improvements.

```bash
# 1. Fork the repository on GitHub

# 2. Create your feature branch
git checkout -b feature/your-feature-name

# 3. Commit your changes with a clear message
git commit -m "feat: describe what you added"

# 4. Push and open a Pull Request
git push origin feature/your-feature-name
```

Please keep PRs focused and include a short description of what changed and why.

---

## 📄 License

Distributed under the **MIT License** — see the `LICENSE` file for details.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=venom&color=0:0a1628,50:1a0a3e,100:0f0f1a&height=160&section=footer&text=Reality%20TV%20Intel%202026&fontSize=36&fontColor=ffffff&animation=fadeIn&fontAlignY=55&desc=Fast%20%C2%B7%20Cinematic%20%C2%B7%20Static%20%C2%B7%20Easy%20to%20Maintain&descAlignY=75&descSize=14&descColor=a78bfa" width="100%" alt="Footer Banner"/>

**Built with ❤️ by [BobMasterBillie](https://github.com/MasterBillyButcher)**

🌐 **[realitytv2026.vercel.app](https://realitytv2026.vercel.app/)**

</div>
