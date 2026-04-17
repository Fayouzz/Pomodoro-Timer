# 🍅 Pomodoro Timer

A beautifully crafted, fully accessible Pomodoro Timer built with **React** and **Vite**. Designed with a deep cosmic noir aesthetic, responsive across all screen sizes.

![Pomodoro Timer](https://img.shields.io/badge/React-18-61DAFB?logo=react) ![Vite](https://img.shields.io/badge/Vite-4-646CFF?logo=vite) ![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

- **Start / Pause / Resume** — full control over the timer with persistent state
- **Skip Session** — jump to the next session at any time
- **Reset** — restart the current session countdown
- **Session Types** — Focus (work), Short Break, Long Break
- **Automatic Progression** — sessions advance automatically; timer pauses between them for user confirmation
- **Configurable Intervals** — adjust durations and cycle length via the Settings panel
- **Persistent Settings** — configuration saved to `localStorage`
- **Session Tracking** — tracks completed work sessions and full cycles with visual dot indicators
- **Sound Notifications** — synthesized chime (Web Audio API, no external files) when a session ends
- **Dynamic Page Title** — browser tab shows live countdown and session type
- **Animated Progress Ring** — SVG arc with glowing dot tracks elapsed time
- **Responsive Design** — optimised for mobile and desktop
- **Accessibility** — ARIA labels, live regions, keyboard navigation, focus management, reduced-motion support

---

## 🗂 Project Structure

```
pomodoro-timer/
├── index.html
├── vite.config.js
├── package.json
├── .eslintrc.cjs
├── .gitignore
├── README.md
└── src/
    ├── main.jsx               # Entry point
    ├── App.jsx                # Root component
    ├── App.module.css
    ├── hooks/
    │   ├── useTimer.js        # Core timer state machine
    │   └── useConfig.js       # Settings management + localStorage
    ├── components/
    │   ├── BackgroundOrbs.jsx       # Ambient background animation
    │   ├── BackgroundOrbs.module.css
    │   ├── SessionBadge.jsx         # Current session type indicator
    │   ├── SessionBadge.module.css
    │   ├── TimerDisplay.jsx         # SVG ring + countdown digits
    │   ├── TimerDisplay.module.css
    │   ├── TimerControls.jsx        # Play/Pause/Reset/Skip buttons
    │   ├── TimerControls.module.css
    │   ├── SessionStats.jsx         # Dot tracker + session counter
    │   ├── SessionStats.module.css
    │   ├── SettingsPanel.jsx        # Slide-over settings drawer
    │   └── SettingsPanel.module.css
    ├── utils/
    │   ├── constants.js       # Session types, defaults, limits
    │   ├── sound.js           # Web Audio API synthesized sounds
    │   └── time.js            # Time formatting helpers
    └── styles/
        └── global.css         # CSS variables, reset, keyframes
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 16
- **npm** >= 8 (or `pnpm` / `yarn`)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/pomodoro-timer.git
cd pomodoro-timer

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
# Output goes to ./dist
```

### Preview Production Build

```bash
npm run preview
```

---

## ⚙️ Default Configuration

| Setting | Default | Range |
|---|---|---|
| Focus Duration | 25 min | 1 – 90 |
| Short Break | 5 min | 1 – 30 |
| Long Break | 15 min | 1 – 60 |
| Sessions per Cycle | 4 | 2 – 8 |

Settings are persisted to `localStorage` and restored on next visit.

---

## ♿ Accessibility

- All interactive elements have descriptive `aria-label` attributes
- Timer uses `role="timer"` and `aria-live="polite"` regions for screen-reader announcements
- Session type changes announced via live region
- Full keyboard navigation — `Tab`, `Enter`, `Space`, `Escape` (to close settings)
- Focus is trapped inside the Settings panel when open
- `prefers-reduced-motion` media query disables animations for users who prefer it

---

## 🧩 Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| Vite 4 | Build tool + dev server |
| CSS Modules | Scoped component styles |
| Web Audio API | Synthesized notification sounds |
| localStorage | Settings persistence |

---

## 📄 License

MIT © 2025 — see [LICENSE](LICENSE) for details.
