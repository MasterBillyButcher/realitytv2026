<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://capsule-render.vercel.app/api?type=cylinder&color=0:0d0221,40:1a0533,100:0d1b4b&height=160&section=header&text=Reality%20TV%20Intel%202026&fontSize=44&fontColor=ffffff&animation=scaleIn&fontAlignY=45&desc=%F0%9F%87%AE%F0%9F%87%B3%20India%27s%20Biggest%20Shows.%20One%20Dashboard.&descAlignY=70&descSize=16&descColor=c4b5fd&stroke=7c3aed&strokeWidth=2"/>
  <source media="(prefers-color-scheme: light)" srcset="https://capsule-render.vercel.app/api?type=cylinder&color=0:ede9fe,50:ddd6fe,100:c4b5fd&height=160&section=header&text=Reality%20TV%20Intel%202026&fontSize=44&fontColor=1e1b4b&animation=scaleIn&fontAlignY=45&desc=%F0%9F%87%AE%F0%9F%87%B3%20India%27s%20Biggest%20Shows.%20One%20Dashboard.&descAlignY=70&descSize=16&descColor=4c1d95&stroke=7c3aed&strokeWidth=2"/>
  <img width="100%" src="https://capsule-render.vercel.app/api?type=cylinder&color=0:0d0221,40:1a0533,100:0d1b4b&height=160&section=header&text=Reality%20TV%20Intel%202026&fontSize=44&fontColor=ffffff&animation=scaleIn&fontAlignY=45&desc=%F0%9F%87%AE%F0%9F%87%B3%20India%27s%20Biggest%20Shows.%20One%20Dashboard.&descAlignY=70&descSize=16&descColor=c4b5fd&stroke=7c3aed&strokeWidth=2" alt="Reality TV Intel 2026"/>
</picture>

<br/>

<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Montserrat&weight=900&size=20&duration=2600&pause=900&color=A78BFA&center=true&vCenter=true&width=680&lines=%F0%9F%93%8A+Track+%C2%B7+Rank+%C2%B7+Analyze+%E2%80%94+All+in+One+Place;%F0%9F%8E%AC+Bigg+Boss+%C2%B7+Lock+Upp+%C2%B7+Khatron+%C2%B7+Every+Show;%E2%9A%A1+Zero+Backend+%C2%B7+Zero+Build+%C2%B7+100%25+Static;%F0%9F%93%88+Follower+Growth+%C2%B7+Live+Rankings+%C2%B7+Bulk+Import" alt="Typing SVG"/>

<br/><br/>

[![Live Demo](https://img.shields.io/badge/🌐_LIVE_DEMO-realitytv2026.vercel.app-7C3AED?style=for-the-badge&labelColor=0d0221)](https://realitytv2026.vercel.app/)
&nbsp;&nbsp;
[![GitHub](https://img.shields.io/badge/⭐_GitHub-Source_Code-181717?style=for-the-badge&logo=github&labelColor=0d1117)](https://github.com/MasterBillyButcher/realitytv2026)

<br/>

![Status](https://img.shields.io/badge/🟢_Status-Live-22C55E?style=flat-square&labelColor=052e16)
&nbsp;
![Stack](https://img.shields.io/badge/⚡_Vanilla_JS-ES2020-F7DF1E?style=flat-square&logo=javascript&logoColor=black&labelColor=1a1500)
&nbsp;
![Hosting](https://img.shields.io/badge/🚀_Vercel-Hosted-000?style=flat-square&logo=vercel)
&nbsp;
![Backend](https://img.shields.io/badge/🚫_Backend-None-FF6B6B?style=flat-square&labelColor=2d0000)

</div>

---

<div align="center">

Track Instagram followers, rankings, and growth for contestants across India's biggest reality TV shows. Fully static — no backend, no build step, no database.

</div>

---

## ✨ Features

<div align="center">

| 📊 Analytics | 🔍 Search & Filter | ✏️ Admin | 📤 Export |
|:---:|:---:|:---:|:---:|
| Live follower rankings | Filter by show, status, gender | Inline cell editing | CSV per show or all |
| 3-point growth history | 7 sort modes | Add / edit / delete contestants | 2× HD PNG screenshot |
| Per-show & cross-show view | Instant name search | Create & rename shows | JSON + Print-to-PDF |

</div>

---

## 🛠️ Tech Stack

<div align="center">

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com)

</div>

---

## 📁 Project Structure

```
📦 realitytv2026/
├── 📂 public/
│   ├── 🎨 css/styles.css       # Design system & themes
│   ├── 📦 data/data.js         # ← All show & contestant data
│   └── ⚡ js/
│       ├── app.js              # Rendering & CRUD
│       ├── export.js           # CSV, JSON, screenshot
│       ├── persistence.js      # Storage & bulk import
│       ├── admin.js            # Auth & session
│       └── dataloader.js       # Data fetch & fallback
├── ⚙️ vercel.json
└── 📖 README.md
```

---

## 🚀 Quick Start

```bash
git clone https://github.com/MasterBillyButcher/realitytv2026.git
cd realitytv2026
open public/index.html
```

> Deploy to Vercel: [vercel.com/new](https://vercel.com/new) → import repo → done.

---

## 📝 Updating Data

1. Open the site → **🔒 Admin** → **✎ Edit Mode**
2. Click any cell to edit inline
3. **↓ Save JSON** → push `data.js` to `public/data/data.js` on GitHub
4. All visitors see the update on next page load ✓

### ⚡ Bulk Import

Go to **Export → Bulk Follower Import** and paste:

```
Gaurav Khanna,  kkk,      2.1M
Rubina Dilaik,  kkk,      8.6M
Shivangi Joshi, lockupp,  10.5M
```

**Format:** `Name, showKey, followers` — accepts `430K`, `2.5M`, `9200000`

---

## 👥 Permissions

<div align="center">

| Feature | 🌐 Public | 🔐 Admin |
|:--------|:---------:|:--------:|
| Browse, search, filter | ✅ | ✅ |
| Export CSV / screenshot / print | ✅ | ✅ |
| Edit, add, delete contestants | ❌ | ✅ |
| Manage shows | ❌ | ✅ |
| Bulk import / download data.js | ❌ | ✅ |

</div>

---

## ⌨️ Shortcuts

<div align="center">

| Keys | Action |
|:-----|:-------|
| `Ctrl + S` | 💾 Save to browser |
| `Ctrl + Shift + S` | 📥 Download data.js |
| `Ctrl + Shift + P` | 🖨️ Print / PDF |
| `Escape` | ✖️ Close modal |

</div>

---

## 🌍 Browser Support

<div align="center">

[![Chrome](https://img.shields.io/badge/Chrome-✅-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white&labelColor=1a1a2e)](https://www.google.com/chrome/)
[![Edge](https://img.shields.io/badge/Edge-✅-0078D7?style=for-the-badge&logo=microsoftedge&logoColor=white&labelColor=1a1a2e)](https://www.microsoft.com/edge)
[![Firefox](https://img.shields.io/badge/Firefox-✅-FF7139?style=for-the-badge&logo=firefox&logoColor=white&labelColor=1a1a2e)](https://www.mozilla.org/firefox/)
[![Safari](https://img.shields.io/badge/Safari-✅-006CFF?style=for-the-badge&logo=safari&logoColor=white&labelColor=1a1a2e)](https://www.apple.com/safari/)

</div>

---

## 🔧 Troubleshooting

<details>
<summary>🔄 <b>Changes not showing after push</b></summary>
<br/>

- Confirm file is at `public/data/data.js`
- Hard refresh: `Ctrl + Shift + R`
- Vercel deploys take ~30–60 seconds

</details>

<details>
<summary>📸 <b>Screenshot not working</b></summary>
<br/>

- Try incognito (ad blockers interfere)
- Use `Ctrl + P → Save as PDF` as fallback

</details>

<details>
<summary>🌐 <b>Yellow warning banner showing</b></summary>
<br/>

- Repo must be **public** for data fetch to work
- Site still loads using the bundled fallback

</details>

---

## 🤝 Contributing

```bash
git checkout -b feature/your-feature
git commit -m "feat: what and why"
git push origin feature/your-feature
# open a Pull Request
```

---

## 📄 License

**MIT** — see [`LICENSE`](LICENSE)

---

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://capsule-render.vercel.app/api?type=cylinder&color=0:040d1a,50:0d1b4b,100:1a0533&height=120&section=footer&text=Built%20with%20%E2%9D%A4%EF%B8%8F%20by%20BobMasterBillie&fontSize=22&fontColor=c4b5fd&animation=fadeIn&fontAlignY=55"/>
  <source media="(prefers-color-scheme: light)" srcset="https://capsule-render.vercel.app/api?type=cylinder&color=0:ede9fe,50:ddd6fe,100:c4b5fd&height=120&section=footer&text=Built%20with%20%E2%9D%A4%EF%B8%8F%20by%20BobMasterBillie&fontSize=22&fontColor=1e1b4b&animation=fadeIn&fontAlignY=55"/>
  <img width="100%" src="https://capsule-render.vercel.app/api?type=cylinder&color=0:040d1a,50:0d1b4b,100:1a0533&height=120&section=footer&text=Built%20with%20%E2%9D%A4%EF%B8%8F%20by%20BobMasterBillie&fontSize=22&fontColor=c4b5fd&animation=fadeIn&fontAlignY=55" alt="footer"/>
</picture>

<div align="center">

**[🌐 realitytv2026.vercel.app](https://realitytv2026.vercel.app/)** &nbsp;·&nbsp; **[⭐ Star on GitHub](https://github.com/MasterBillyButcher/realitytv2026)**

</div>
