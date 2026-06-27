# 🍅 Pomodoro Timer

> Stay focused, one session at a time.

![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-brown?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Vercel-black?style=for-the-badge&logo=vercel)

**Day 08 of 100** — [Live Demo →](https://day-08-pomodoro-timer.vercel.app)

---

## ✨ Features

- 🍅 **Pomodoro Cycle** — Auto-switch Work → Short Break → Long Break every 4 sessions
- ⏱️ **Accurate Timer** — Drift correction engine, stays accurate even in background tabs
- 🔔 **Sound Notifications** — Web Audio API generated tones, zero dependencies
- 💾 **Persistent History** — Session history saved to localStorage via Zustand persist
- 🎯 **Session Tracker** — Track total pomodoros completed per day
- 🎨 **Mode-aware UI** — Color theme shifts per mode (red / green / blue)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 15 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| Zustand + persist | State management + localStorage |
| Web Audio API | Sound notifications (no library) |

---

## 📁 Folder Structure

```
day-08-pomodoro-timer/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   └── ui/
│       ├── Button.tsx
│       └── Badge.tsx
├── features/
│   └── pomodoro/
│       ├── components/
│       │   ├── PomodoroApp.tsx
│       │   ├── TimerDisplay.tsx
│       │   ├── TimerControls.tsx
│       │   ├── ModeSelector.tsx
│       │   └── SessionHistory.tsx
│       ├── hooks/
│       │   ├── useTimer.ts
│       │   └── useSound.ts
│       └── store/
│           └── pomodoroStore.ts
├── lib/
│   └── utils.ts
├── types/
│   └── pomodoro.ts
└── constants/
    └── pomodoro.ts
```

---

## 🚀 Getting Started

```bash
# Clone repo
git clone https://github.com/Mucaru/day-08-pomodoro-timer.git

# Install dependencies
cd day-08-pomodoro-timer
npm install

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🧠 What I Learned

- **Finite State Machine** — Modeling timer states (IDLE → RUNNING → PAUSED → COMPLETED) cleanly
- **Drift Correction** — Using `Date.now()` to keep `setInterval` accurate over time
- **Ref Sync Pattern** — Using `useRef` inside intervals to always read latest state values
- **Web Audio API** — Generating sound programmatically without any audio files
- **Zustand persist + partialize** — Selectively persisting only necessary state to localStorage
- **Record<K, V>** — Using map-style lookup instead of arrays for O(1) config access

---

## 🔗 Part of 100 Days 100 Web Apps

| Day | Project | Live |
|---|---|---|
| 01 | Spotify UI Clone | [→](https://github.com/Mucaru/spotify-ui-clone) |
| 02 | WeatherNow | [→](https://github.com/Mucaru/weather-now) |
| 03 | Todo List | [→](https://github.com/Mucaru/day-03-todo-app) |
| 04 | ResepKu | [→](https://github.com/Mucaru/day-04-recipe-app) |
| 05 | MarkNotes | [→](https://github.com/Mucaru/day-05-markdown-notes) |
| 06 | BMI Calculator | [→](https://github.com/Mucaru/day-06-bmi-calculator) |
| **08** | **Pomodoro Timer** | [→](https://day-08-pomodoro-timer.vercel.app) |

---

Built by [Mucaru](https://github.com/Mucaru) · Part of [#100Days100WebApps](https://github.com/Mucaru)