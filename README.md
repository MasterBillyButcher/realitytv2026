<div align="center">

# 📺 Reality TV Intel 2026

### Track contestants, follower counts, rankings, and social media growth across India's biggest reality TV shows.

<p>

<a href="https://realitytv2026.vercel.app/" target="_blank">
<img src="https://img.shields.io/badge/🌐_Live_Demo-Visit_Website-16A34A?style=for-the-badge" alt="Live Demo">
</a>

<a href="https://github.com/MasterBillyButcher/realitytv2026" target="_blank">
<img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github" alt="Repository">
</a>

</p>

<p>

<img src="https://img.shields.io/badge/Version-2026-2563EB?style=flat-square">
<img src="https://img.shields.io/badge/Status-Active-22C55E?style=flat-square">
<img src="https://img.shields.io/badge/Vanilla-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/Responsive-Yes-success?style=flat-square">
<img src="https://img.shields.io/badge/Backend-None-orange?style=flat-square">
<img src="https://img.shields.io/badge/Database-None-red?style=flat-square">

</p>

*A modern, lightweight dashboard built for fast, reliable tracking of reality TV contestant analytics.*

</div>

---

# 🌐 Live Website

### **https://realitytv2026.vercel.app/**

Visit the live application to browse contestant rankings, follower counts, growth statistics, and show data.

---

# ✨ Overview

Reality TV Intel 2026 is a modern web dashboard designed to monitor contestants from Indian reality television shows.

Built as a fully static application, it delivers fast performance without relying on servers, databases, or external APIs. All data is stored in a single version-controlled file, making updates simple while keeping deployments reliable and maintenance minimal.

---

# 🚀 Features

## 📊 Analytics

- Live contestant rankings
- Social media follower tracking
- Growth analytics
- Multi-show dashboard
- Smart search
- Advanced filtering
- Responsive data tables

---

## ✏️ Administration

- Inline editing
- Add contestants
- Remove contestants
- Create and manage shows
- Hide or restore contestants
- Bulk follower imports
- Download updated dataset
- Local browser backup

---

## 📤 Export

- CSV Export
- Print-ready reports
- High-resolution screenshots
- Data export

---

## 🎨 User Experience

- Dark Mode
- Light Mode
- Mobile responsive
- Fast page loading
- Keyboard-friendly navigation

---

# 🏗 Architecture

```text
                 Browser
                    │
                    ▼
        Load latest application data
                    │
                    ▼
         Render dashboard interface
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
     Public Access      Administrator
          │                   │
          └─────────┬─────────┘
                    ▼
        Download updated dataset
                    │
                    ▼
     Replace public/data/data.js
                    │
                    ▼
             Commit & Deploy
                    │
                    ▼
        Latest data available online
```

---

# ⚙ Technology Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Structure |
| CSS3 | Styling |
| Vanilla JavaScript | Application Logic |
| Git | Version Control |
| Static Hosting | Deployment |

---

# 📁 Project Structure

```text
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

# 🚀 Quick Start

Clone the repository.

```bash
git clone https://github.com/MasterBillyButcher/realitytv2026.git

cd realitytv2026
```

Open

```text
public/index.html
```

or deploy the repository to your preferred static hosting provider.

---

# 📝 Updating Data

Application data is stored in

```text
public/data/data.js
```

Publishing updates:

1. Open the dashboard.
2. Sign in as an administrator.
3. Enable Edit Mode.
4. Make your changes.
5. Download the updated data.
6. Replace `public/data/data.js`.
7. Commit and push the changes.

---

# 📥 Bulk Import

Example format:

```text
Contestant Name, Show Key, Followers

Contestant A, show1, 8.7M
Contestant B, show2, 9200000
Contestant C, show3, 430K
```

Supported values:

- 430K
- 2.5M
- 8.7M
- 9200000

---

# 👥 Permissions

| Feature | Public | Admin |
|:------------------------------|:------:|:------:|
| Browse Dashboard | ✅ | ✅ |
| Search | ✅ | ✅ |
| Filter | ✅ | ✅ |
| Export CSV | ✅ | ✅ |
| Print | ✅ | ✅ |
| Screenshot | ✅ | ✅ |
| Edit Contestants | ❌ | ✅ |
| Add Contestants | ❌ | ✅ |
| Delete Contestants | ❌ | ✅ |
| Manage Shows | ❌ | ✅ |
| Bulk Import | ❌ | ✅ |
| Download Data | ❌ | ✅ |

---

# 🌍 Browser Support

- ✅ Google Chrome
- ✅ Microsoft Edge
- ✅ Mozilla Firefox
- ✅ Safari

---

# 🔧 Troubleshooting

If updates are not visible:

- Confirm `public/data/data.js` has been replaced.
- Commit and push the latest changes.
- Perform a hard refresh (`Ctrl + Shift + R`).
- Allow a short time for deployment caches to refresh.

---

# 🔒 Security

This project is a client-side application.

Administrative tools provide basic client-side access control and are intended for trusted users. They should not be treated as a substitute for server-side authentication.

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Open a Pull Request.

---

# 📄 License

Choose and include an appropriate license before distributing the project.

---

<div align="center">

## ⭐ Reality TV Intel 2026

**Fast • Lightweight • Static • Easy to Maintain**

### 🌐 Live Website

https://realitytv2026.vercel.app/

</div>
