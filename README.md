# 📺 Reality TV Intel 2026

A lightweight, browser-based dashboard for tracking Indian reality TV contestants, social media followers, rankings, and growth trends.

Built as a **fully static web application**, it requires no backend, database, or external APIs. All data is managed through a single file, making deployment simple, maintenance minimal, and performance fast.

---

## Features

### Dashboard
- 📊 Contestant rankings
- 📈 Follower growth tracking
- 🔍 Search and filtering
- 🏆 Multi-show support
- 👁 Show or hide contestants

### Exports
- 📄 CSV export
- 🖨 Print-friendly layout
- 📷 High-resolution screenshot capture

### Administration
- ✏️ Inline editing
- ➕ Add or remove contestants
- 🗂 Manage shows
- 💾 Download updated dataset
- 💻 Automatic local backup

### User Experience
- 🌙 Light & Dark themes
- 📱 Responsive design
- ⚡ Fast loading
- 🌐 No installation required

---

## Technology Stack

- HTML5
- CSS3
- Vanilla JavaScript
- GitHub (Data Storage)
- Vercel (Hosting)

No frameworks, databases, servers, or API keys are required.

---

## Architecture

```
Browser
    │
    ▼
Loads latest data.js
    │
    ▼
Renders dashboard
    │
    ▼
Admin edits data
    │
    ▼
Download updated file
    │
    ▼
Commit & Push
    │
    ▼
Updated data available to all visitors
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Install

No installation is required.

Open `public/index.html` for local development or deploy the repository to any static hosting platform.

### 3. Deploy

This project works with any static hosting provider, including:

- Vercel
- GitHub Pages
- Netlify
- Cloudflare Pages

Recommended deployment settings:

| Setting | Value |
|---------|-------|
| Framework | Other |
| Build Command | None |
| Output Directory | public |

---

## Updating Data

All application data is stored in:

```
public/data/data.js
```

To publish updates:

1. Open the dashboard.
2. Sign in as an administrator.
3. Enable Edit Mode.
4. Make your changes.
5. Download the updated data file.
6. Replace `public/data/data.js`.
7. Commit and push the changes.

The latest data will be served on the next page refresh after deployment.

---

## Bulk Import

Bulk updates use the following format:

```text
Contestant Name, Show Key, Followers
```

Example:

```text
Contestant A, show1, 8.7M
Contestant B, show2, 9200000
Contestant C, show3, 430K
```

Supported follower formats:

- 8.7M
- 430K
- 9200000

---

## Project Structure

```
.
├── public
│   ├── css
│   │   └── styles.css
│   │
│   ├── data
│   │   └── data.js
│   │
│   ├── js
│   │   ├── admin.js
│   │   ├── app.js
│   │   ├── dataloader.js
│   │   ├── export.js
│   │   ├── persistence.js
│   │   └── utils.js
│   │
│   └── index.html
│
├── vercel.json
└── README.md
```

---

## Permissions

| Feature | Public | Admin |
|:--------------------------|:------:|:------:|
| View Dashboard | ✅ | ✅ |
| Browse Shows | ✅ | ✅ |
| Search & Filter | ✅ | ✅ |
| Export CSV | ✅ | ✅ |
| Screenshot Export | ✅ | ✅ |
| Print / PDF | ✅ | ✅ |
| Edit Contestants | ❌ | ✅ |
| Add Contestants | ❌ | ✅ |
| Delete Contestants | ❌ | ✅ |
| Manage Shows | ❌ | ✅ |
| Hide / Show Contestants | ❌ | ✅ |
| Download Updated Data | ❌ | ✅ |
| Local Backup | ❌ | ✅ |

---

## Browser Support

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari

---

## Troubleshooting

### Changes do not appear

- Confirm `public/data/data.js` has been updated.
- Verify changes have been committed and pushed.
- Perform a hard refresh (`Ctrl + Shift + R` or `Cmd + Shift + R`).
- Allow a short time for hosting cache to refresh if applicable.

---

## Security

This is a static web application.

Administrative features provide client-side access control intended for trusted users. They should not be considered a substitute for server-side authentication or authorization.

---

## License

Add your preferred open-source or proprietary license before distributing the project.

---

## Contributing

Contributions are welcome.

If you would like to improve the project:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Submit a pull request.

Please ensure code is well documented and follows the existing project structure.

---

## Overview

Reality TV Intel 2026 provides a simple, fast, and maintainable solution for tracking contestant statistics without relying on a backend infrastructure. All data is version-controlled, deployments are straightforward, and updates can be published with a single file replacement.