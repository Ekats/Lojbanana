# Lojban Logic Trainer

> Learn Lojban as a formal logic system - Progressive Web App, installable & offline-capable

## 🚀 Live Demo

**Coming soon at**: [ekats.github.io/Lojbanana](https://ekats.github.io/Lojbanana/)

## What is this?

**Lojban Logic Trainer** is a Progressive Web App (PWA) that teaches Lojban from the ground up - but with a twist. Instead of teaching it like a natural language, it teaches Lojban as a **speakable formal logic system**.

Think of it like learning programming:
- **Predicates (selbri)** = functions/methods
- **Arguments (sumti)** = parameters
- **Logical connectives** = boolean operators (AND, OR, IFF, etc.)
- **Articles (gadri)** = type constructors

## Why Lojban?

Lojban is designed for:
- **Zero ambiguity** - Every sentence has exactly one parse
- **Explicit logic** - All logical relationships must be marked
- **Machine-parseability** - Perfect for human-AI communication
- **Formal reasoning** - Express first-order predicate logic in natural speech

## PWA Features

- **📱 Installable** - Add to home screen on mobile/desktop
- **⚡ Offline Support** - Works without internet after first visit
- **🚀 Fast Loading** - Service worker caching for instant loads
- **📦 Auto-Updates** - New versions deployed automatically via GitHub Actions
- **🎨 App Icons** - Custom logic gate design representing formal logic

## Features

### 🎯 Interactive Parser
Real-time Lojban parsing with visual feedback showing:
- Word types (predicates, arguments, connectives)
- Place structure for predicates
- Validation and suggestions

### 📚 Progressive Lessons
7 comprehensive lessons covering:
1. Introduction to Lojban as formal logic
2. Predicates (selbri) - the core building blocks
3. Arguments (sumti) - filling in the slots
4. Multiple arguments and sentence structure
5. Logical connectives (AND, OR, IFF)
6. Articles and description (lo, le, la)
7. Putting it all together

### 🎮 Construction Mode
Build sentences by clicking words - like visual programming for logic:
- Drag-and-drop word selection
- Real-time feedback
- Instant validation

### 💾 Progress Tracking
Your progress is automatically saved to localStorage:
- Track completed exercises
- Resume where you left off
- See lesson completion percentages

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Navigate to the app directory
cd lojban-trainer

# Install dependencies
npm install

# Start development server
npm run dev
```

Then open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory with full PWA support.

## Deployment

### Automatic Deployment (GitHub Actions)

This repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically deploys to GitHub Pages on every push to `main`.

**To activate:**
1. Go to repository **Settings** → **Pages**
2. Source: **GitHub Actions**
3. Push to `main` branch - deployment happens automatically!

The app will be live at: `https://ekats.github.io/Lojbanana/`

### Manual Deployment

If you prefer manual deployment:

```bash
cd lojban-trainer
npm run deploy
```

This builds and deploys to the `gh-pages` branch.

## Curriculum Overview

### Lesson 1-2: Foundation
Learn predicates (selbri) as functions with place structure, and basic arguments (sumti) like pronouns.

**Example:** `mi gleki` = "I am happy"

### Lesson 3-4: Structure
Add multiple arguments and the separator `cu` to build complete sentences.

**Example:** `mi cu prami do` = "I love you"

### Lesson 5: Logic
Master logical connectives - the real power of Lojban:
- `je` = AND (for predicates)
- `ja` = OR (for predicates)
- `.e` = AND (for arguments)
- `.a` = OR (for arguments)

**Example:** `mi gleki je tavla` = "I am-happy AND talk"

### Lesson 6: Description
Learn articles (gadri) to create descriptions from predicates:
- `lo` = "one or more that are..."
- `le` = "the specific one(s)..."
- `la` = "the one(s) named..."

**Example:** `lo gleki cu tavla` = "A happy-one talks"

### Lesson 7: Practice
Put it all together with complex logical sentences.

## How It Teaches Differently

Traditional Lojban courses teach it like a natural language - vocabulary, conversation, etc.

This app teaches it like **programming**:

| Programming | Lojban Logic Trainer |
|------------|----------------------|
| Function definition | Predicate with place structure |
| Function call | Filling predicate places |
| Boolean operators | Logical connectives |
| Type system | Articles (gadri) |
| Parameters | Arguments (sumti) |

## Design Philosophy

1. **Zero to logic** - Assumes no Lojban knowledge
2. **Explicit structure** - Shows grammatical role of every word
3. **Interactive learning** - Parse and construct, don't just read
4. **Practical focus** - Learn to express specs, requirements, logic
5. **Visual feedback** - Color-coded parsing, real-time validation

## Technical Stack

- **React 19** - UI framework
- **Vite** - Build tool with PWA plugin
- **vite-plugin-pwa** - Progressive Web App support
- **Workbox** - Service worker strategies
- **Custom Lojban Parser** - Tokenization and validation
- **localStorage** - Progress persistence
- **GitHub Actions** - Automated deployment

## Project Structure

```
lojban-trainer/
├── src/
│   ├── components/         # React components
│   │   ├── InteractiveParser.jsx
│   │   ├── LessonView.jsx
│   │   ├── LessonList.jsx
│   │   └── ConstructionMode.jsx
│   ├── lessons/           # Lesson content
│   │   └── lessons.js
│   ├── utils/             # Lojban parser
│   │   └── lojbanParser.js
│   ├── App.jsx            # Main app component
│   └── index.css          # Global styles
├── public/                # Static assets
└── package.json
```

## Future Enhancements

Potential additions:
- Quantifiers (all, some, none)
- Tense system (past, future, ongoing)
- Questions and interrogatives
- Relative clauses
- Modal logic
- Export/import progress
- Spaced repetition scheduling
- Community-contributed lessons

## Contributing

This is an educational project. Contributions welcome:
- Additional lessons
- Improved parser
- Better exercises
- Bug fixes

## License

See LICENSE file in repository root.

## Learn More About Lojban

- [Official Lojban Site](https://mw.lojban.org/)
- [The Complete Lojban Language (CLL)](https://lojban.org/publications/cll/cll_v1.1_book.pdf)
- [la sutysisku (Lojban Dictionary)](https://la-lojban.github.io/sutysisku/en/)

## Philosophy: Lojban as a Tool

This app treats Lojban not as a language to become fluent in, but as a **precision tool** for formal reasoning.

Just like you don't need to be fluent in lambda calculus to use functional programming, you don't need conversational Lojban fluency to use it for expressing:
- Software specifications
- Logical requirements
- Mathematical statements
- Unambiguous instructions to AI

**That's the goal: precision, not fluency.**

---

Built to teach Lojban the way it should be taught - as speakable formal logic.
