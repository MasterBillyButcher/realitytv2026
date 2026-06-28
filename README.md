<div align="center">

# 📺 Reality TV Intel 2026

### A modern, static dashboard for tracking Indian reality TV contestants, follower counts, rankings, and growth analytics.

![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-2026-blue?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/Vanilla-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-Custom-lightgrey?style=for-the-badge)

*A fast, lightweight, zero-backend solution built for simplicity.*

</div>

---

## ✨ Overview

Reality TV Intel 2026 is a fully static web application designed to manage and visualize contestant data across multiple Indian reality television shows.

The project eliminates the need for databases, APIs, or backend infrastructure by storing all application data in a single version-controlled file.

This approach provides:

- ⚡ Fast performance
- 🔒 Minimal maintenance
- 🌐 Easy deployment
- 📁 Complete data ownership
- 💰 Zero hosting infrastructure

---

# 🚀 Features

## 📊 Dashboard

- Live contestant rankings
- Social media follower tracking
- Growth analytics
- Multi-show support
- Smart search
- Advanced filtering
- Responsive tables

---

## ✏️ Administration

- Inline editing
- Add contestants
- Delete contestants
- Create and manage shows
- Hide or restore contestants
- Bulk follower updates
- Download updated dataset
- Local browser backup

---

## 📤 Export Options

- CSV Export
- Print-ready pages
- High-resolution screenshots
- JSON/Data export

---

## 🎨 User Experience

- Light & Dark Mode
- Responsive layout
- Mobile friendly
- Keyboard shortcuts
- Instant search
- Zero page reloads

---

# 🏗 Architecture

```
               Browser
                  │
                  ▼
        Load latest data file
                  │
                  ▼
        Render Dashboard UI
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
 Public Viewing      Admin Editing
        │                   │
        └─────────┬─────────┘
                  ▼
         Download Updated Data
                  │
                  ▼
        Replace public/data/data.js
                  │
                  ▼
           Commit & Deploy
```

---

# 🛠 Technology Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Application Structure |
| CSS3 | Styling |
| Vanilla JavaScript | Application Logic |
| GitHub | Version Control |
| Vercel / Netlify / GitHub Pages | Static Hosting |

**No backend required.**

**No database required.**

**No server required.**

**No API keys required.**

---

# 📁 Project Structure

```
.
├── public
│
├── css
│   └── styles.css
│
├── data
│   └── data.js
│
├── js
│   ├── admin.js
│   ├── app.js
│   ├── dataloader.js
│   ├── export.js
│   ├── persistence.js
│   └── utils.js
│
├── index.html
│
├── vercel.json
│
└── README.md
```

---

# 🚀 Getting Started

## Clone

```bash
git clone <repository-url>

cd <project-folder>
```

---

## Local Development

No installation is required.

Simply open:

```
public/index.html
```

or serve the folder using any static web server.

---

## Deployment

Deploy to any static hosting platform.

Recommended providers:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

No build process is required.

---

# 📝 Updating Data

All application data lives inside:

```
public/data/data.js
```

Publishing updates is straightforward:

1. Open the dashboard.
2. Sign in as an administrator.
3. Enable Edit Mode.
4. Make changes.
5. Download the updated data file.
6. Replace `public/data/data.js`.
7. Commit and push.

The latest version will be available after deployment.

---

# 📥 Bulk Import

Import multiple follower updates using plain text.

Example:

```text
Contestant A, show1, 8.7M
Contestant B, show2, 9200000
Contestant C, show3, 430K
```

Supported values:

- 430K
- 8.7M
- 9200000

---

# 👥 Permissions

| Feature | Public | Admin |
|:---------------------------|:------:|:------:|
| View Dashboard | ✅ | ✅ |
| Search | ✅ | ✅ |
| Filter | ✅ | ✅ |
| Export CSV | ✅ | ✅ |
| Print | ✅ | ✅ |
| Screenshot | ✅ | ✅ |
| Edit Data | ❌ | ✅ |
| Add Contestants | ❌ | ✅ |
| Delete Contestants | ❌ | ✅ |
| Manage Shows | ❌ | ✅ |
| Bulk Import | ❌ | ✅ |
| Download Data | ❌ | ✅ |

---

# 🌐 Browser Support

| Browser | Supported |
|----------|-----------|
| Chrome | ✅ |
| Edge | ✅ |
| Firefox | ✅ |
| Safari | ✅ |

---

# 🔍 Troubleshooting

### Changes are not visible

- Verify `public/data/data.js` has been updated.
- Confirm the latest changes have been committed.
- Refresh the page using a hard reload.
- Allow a short time for hosting caches to refresh.

---

# 🔒 Security

This application is entirely client-side.

Administrative features are intended for trusted users and provide basic client-side access control. They are not a replacement for server-side authentication.

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Submit a pull request.

Please keep code clean, documented, and consistent with the existing architecture.

---

# 📄 License

Add your preferred license before distributing or publishing this project.

---

<div align="center">

### Built for speed, simplicity, and maintainability.

**Reality TV Intel 2026**

</div>
