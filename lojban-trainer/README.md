# Lojban Logic Trainer - Progressive Web App

> Learn Lojban as a formal logic system - installable, offline-capable, mobile-ready

## Live Demo

**GitHub Pages**: [ekats.github.io/Lojbanana/](https://ekats.github.io/Lojbanana/)

## What is this?

**Lojban Logic Trainer** is a Progressive Web App (PWA) that teaches Lojban from scratch as a **speakable formal logic system**, not a natural language.

### PWA Features

- **Installable**: Add to home screen on mobile/desktop
- **Offline Support**: Works without internet after first visit
- **Fast Loading**: Service worker caching for instant loads
- **Native Feel**: Standalone app experience
- **Auto-Updates**: New versions deployed automatically

### Learning Approach

Think of Lojban like programming:
- **Predicates (selbri)** = functions with place structure
- **Arguments (sumti)** = parameters
- **Logical connectives** = boolean operators (AND, OR, IFF)
- **Articles (gadri)** = type constructors

## Quick Start

### Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:5173` - PWA features enabled even in dev mode!

### Building for Production

```bash
npm run build
```

Output in `dist/` with full PWA support:
- Service worker (`sw.js`)
- Web app manifest (`manifest.webmanifest`)
- App icons (192x192, 512x512)

### Preview Production Build

```bash
npm run preview
```

Test PWA installation locally.

## Deployment to GitHub Pages

### Option 1: Manual Deployment (Post-Session)

After the Claude Code session ends, manually deploy to GitHub Pages:

```bash
# Build the app
npm run build

# Create gh-pages branch (if it doesn't exist)
git checkout --orphan gh-pages

# Clear the branch
git rm -rf .

# Copy dist contents
cp -r dist/* .
touch .nojekyll

# Commit and push
git add -A
git commit -m "Deploy PWA to GitHub Pages"
git push origin gh-pages
```

Then configure GitHub Pages:
1. Go to repository **Settings** → **Pages**
2. Source: Deploy from branch
3. Branch: `gh-pages` / `(root)`
4. Save

### Option 2: GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy PWA to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: lojban-trainer/package-lock.json

      - name: Install dependencies
        working-directory: ./lojban-trainer
        run: npm ci

      - name: Build
        working-directory: ./lojban-trainer
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./lojban-trainer/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Then configure GitHub Pages to deploy from **GitHub Actions**.

### Current Session Deployment

During this Claude Code session, the PWA has been deployed to:
- Branch: `claude/gh-pages-011CUuUHgpdQqogEkstFxD4Z`

**To activate it:**
1. Merge the session branch to `main`
2. Follow Option 1 or 2 above

## PWA Configuration

### App Manifest

Located at `dist/manifest.webmanifest` (auto-generated):

```json
{
  "name": "Lojban Logic Trainer",
  "short_name": "Lojban Trainer",
  "description": "Learn Lojban as a formal logic system",
  "theme_color": "#4ecdc4",
  "background_color": "#f5f6fa",
  "display": "standalone",
  "icons": [...]
}
```

### Service Worker

- **Strategy**: `generateSW` (Workbox)
- **Precaching**: All static assets
- **Runtime Caching**: Google Fonts
- **Auto-Update**: New versions activate automatically

### Icons

App icons in `public/`:
- `icon-192.png` / `icon-192.svg`
- `icon-512.png` / `icon-512.svg`
- `icon.svg` (source design)

**Current icons are placeholders**. For custom icons:
1. Open `public/icon-gen.html` in browser
2. Click "Download Icons"
3. Replace `icon-192.png` and `icon-512.png`

## Project Structure

```
lojban-trainer/
├── public/
│   ├── icon-192.png          # PWA icon (192x192)
│   ├── icon-512.png          # PWA icon (512x512)
│   ├── icon-gen.html         # Icon generator tool
│   └── *.svg                 # SVG icon sources
├── src/
│   ├── components/           # React components
│   │   ├── InteractiveParser.jsx
│   │   ├── LessonView.jsx
│   │   ├── LessonList.jsx
│   │   └── ConstructionMode.jsx
│   ├── lessons/
│   │   └── lessons.js        # Lesson content
│   ├── utils/
│   │   └── lojbanParser.js   # Lojban tokenizer
│   └── App.jsx
├── dist/                     # Build output (gitignored)
│   ├── sw.js                 # Service worker
│   ├── manifest.webmanifest  # PWA manifest
│   └── ...
├── vite.config.js            # Vite + PWA config
└── package.json
```

## Features

### 🎯 Interactive Parser
- Real-time Lojban parsing
- Color-coded word types
- Predicate place structure display
- Validation and suggestions

### 📚 Progressive Lessons
1. Introduction to Lojban as formal logic
2. Predicates (selbri) - building blocks
3. Arguments (sumti) - filling slots
4. Multiple arguments & structure
5. Logical connectives (AND, OR, IFF)
6. Articles and description (lo, le, la)
7. Practice: Putting it together

### 🎮 Construction Mode
- Build sentences by clicking words
- Real-time feedback
- Visual validation

### 💾 Progress Tracking
- localStorage persistence
- Resume where you left off
- Lesson completion tracking

### 📱 PWA Capabilities
- Install on mobile/desktop
- Offline functionality
- App-like experience
- Fast loading with caching

## Technology Stack

- **React 19** - UI framework
- **Vite** - Build tool
- **vite-plugin-pwa** - PWA integration
- **Workbox** - Service worker strategies
- **Custom Lojban Parser** - Tokenization & validation

## Browser Support

PWA features supported in:
- ✅ Chrome/Edge 90+
- ✅ Firefox 90+
- ✅ Safari 15+ (iOS 15+)
- ✅ Samsung Internet 14+

## Learn More

- [Official Lojban Site](https://mw.lojban.org/)
- [The Complete Lojban Language (CLL)](https://lojban.org/publications/cll/cll_v1.1_book.pdf)
- [la sutysisku (Dictionary)](https://la-lojban.github.io/sutysisku/en/)

## Philosophy

This app treats Lojban not as a language for fluency, but as a **precision tool** for formal reasoning:
- Express software specifications unambiguously
- Communicate with AI using formal logic
- Write requirements with zero ambiguity
- Think in pure logical relationships

**Goal: Precision, not fluency.**

---

Built with ❤️ for logical precision. Deployed as a PWA for maximum accessibility.
