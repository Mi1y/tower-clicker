# 🤖 Tower Clicker – Idle Game

Welcome to **Tower Clicker** – a simple, fun, and addictive idle/incremental game where you climb a massive tower, unlock powerful machines, and defeat epic bosses on higher floors!

---

## 🎮 How to Play

- **Click the "Collect Clicks" button** to collect clicks manually
- **Buy and upgrade machines** to automate click production and increase your Clicks Per Second (CPS)
- **Unlock new floors** by defeating bosses. Each floor has its own boss and unlocks new machines
- **Defeat bosses** by spending clicks. Each boss requires a certain number of clicks to defeat and rewards you with bonus clicks
- **Progress as far as you can** and optimize your factory!

---

## 🚀 Live Demo

- **Local Version**: (https://mi1y.github.io/tower-clicker/)

---

## 🛠️ Features

- **Idle gameplay** – your machines produce clicks even when you are away!
- **Multiple machines** – each with unique upgrades and production rates
- **Boss fights** – spend clicks to defeat bosses and unlock new floors
- **Multiple versions** – choose between local or server-based branches
- **Responsive design** – play on desktop, tablet, or mobile
- **Multi-language support** – Polish and English
- **Polished UI** – clean, responsive, and easy to use

---

## 🌿 Available Branches

### **`local` Branch** (Offline Version)
- **Auto-save** to browser localStorage
- **Export/Import** JSON files for backup and transfer
- **No server required** – works completely offline

```bash
git checkout local
```

### **`server` Branch** (Online Version)
- **PostgreSQL** database support for persistent saves
- **MSSQL** database support as alternative
- **Auto-sync** across devices

```bash
git checkout server
```

---
## 🚀 Getting Started

### Option 1: Local Version (Recommended for most users)
```bash
git clone https://github.com/yourusername/tower-clicker.git
cd tower-clicker
git checkout local
# Open tower-clicker.html in your browser
```

### Option 2: Server Version (Advanced)
```bash
git clone https://github.com/yourusername/tower-clicker.git
cd tower-clicker
git checkout server
```
**For PostgreSQL:**
1. Edit `backend/server-pg.js` and update the `dbConfig` object:
```javascript
const dbConfig = {
    user: 'your_username',
    password: 'your_password', 
    host: 'localhost',
    database: 'your_database',
    port: 5432,
};
```

**For MSSQL:**
1. Edit `backend/server-mssql.js` and update the `dbConfig` object:
```javascript
const dbConfig = {
    user: 'your_username',
    password: 'your_password',
    server: 'localhost',
    database: 'your_database',
    options: {
        trustServerCertificate: true
    }
};
```

2. Run your preferred backend:
```bash
# For PostgreSQL
node backend/server-pg.js

# For MSSQL  
node backend/server-mssql.js
```

3. Open tower-clicker.html in your browser

---

## 📁 Project Structure

```
tower-clicker/
├── tower-clicker.html          # Main HTML file
├── tower-clicker.js            # Main game logic (init, save/load, import/export)
├── components/
│   ├── language.js             # Multi-language system
│   └── modal.js                # Modal dialogs and notifications
├── mechanics/
│   ├── clicks-logic.js         # Click collection and CPS logic
│   ├── machines-logic.js       # Machine buying, upgrading, and rendering
│   └── floors-logic.js         # Floor progression and boss battles
├── data/
│   ├── translations.js         # Language translations (PL/EN)
│   ├── pl/
│   │   ├── machines-pl.js      # Polish machine definitions
│   │   └── floors-pl.js        # Polish floor and boss definitions
│   └── en/
│       ├── machines-en.js      # English machine definitions
│       └── floors-en.js        # English floor and boss definitions
├── assets/
│   ├── styles.css              # Responsive game styles
│   └── public/
│       └── logo.svg            # Game logo
└── README.md                   # This file
```

---

## 💾 Saving & Loading

**Local Branch:**
- Auto-saves to browser localStorage every few seconds
- Use **Export** button to download save as `.json` file
- Use **Import** button to load save from file

**Server Branch:**
- Auto-saves to database every few seconds
- Cross-device synchronization
- No manual export/import needed

---

## 📝 Credits

Created by <b>Mi1y & wojciech-karcz</b> <br>
Inspired by classic idle/clicker games

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

Enjoy building your Tower Clicker! 🚀
