# Phaser 3 Starter Template

A modern starter template for Phaser 3 game development with Vite.

## Features

- 🎮 Phaser 3.88.2 (latest version)
- ⚡ Vite for fast development and optimized builds
- 📁 Organized project structure
- 🎭 Scene management system
- 🎨 Preloader with loading bar
- 🎯 Input handling
- 🎵 Audio management
- 🎬 Animation system
- 🧩 Utility functions
- 📱 Responsive design

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v14.0.0 or newer)
- npm (comes with Node.js)

## Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

This will start a development server at `http://localhost:8080` with hot-reloading enabled.

### Production Build

```bash
# Create production build
npm run build
```

This will create a production-ready build in the `dist` folder.

### Preview Production Build

```bash
# Preview production build
npm run preview
```

## Project Structure

```
/
├── public/                  # Static assets
│   ├── assets/              # Game assets
│   │   ├── images/          # Image files
│   │   ├── spritesheets/    # Sprite sheets
│   │   └── audio/           # Audio files
│   └── style.css            # Global styles
├── src/                     # Source code
│   ├── scenes/              # Game scenes
│   │   ├── BootScene.js     # Initial boot scene
│   │   ├── PreloadScene.js  # Asset preloading scene
│   │   ├── MenuScene.js     # Main menu scene
│   │   ├── GameScene.js     # Main gameplay scene
│   │   └── GameOverScene.js # Game over scene
│   ├── utils/               # Utility functions
│   │   └── gameUtils.js     # Common game utilities
│   └── main.js              # Entry point
├── index.html               # HTML entry point
├── vite.config.js           # Vite configuration
└── package.json             # Project dependencies and scripts
```

## Customizing the Game

1. Replace the placeholder assets in the `public/assets` folder with your own assets.
2. Update the asset loading in `PreloadScene.js` to match your assets.
3. Modify the game scenes to create your game logic.
4. Update the game configuration in `main.js` as needed.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
