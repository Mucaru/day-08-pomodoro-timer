// ============================================================
// ENUMS
// Kenapa Enum bukan string literal?
// Enum memberi kita type safety DAN value yang bisa di-iterate.
// String literal ('work' | 'short' | 'long') tidak bisa di-loop.
// ============================================================

export enum TimerMode {
  WORK = "work",
  SHORT_BREAK = "short_break",
  LONG_BREAK = "long_break",
}

export enum TimerStatus {
  IDLE = "idle",
  RUNNING = "running",
  PAUSED = "paused",
  COMPLETED = "completed",
}

// ============================================================
// CORE INTERFACES
// ============================================================

export interface TimerConfig {
  mode: TimerMode;
  duration: number; // dalam detik
  label: string;
  color: string;       // CSS variable name
  dimColor: string;    // untuk background glow
  glowClass: string;   // Tailwind utility class
}

export interface Session {
  id: string;
  mode: TimerMode;
  label: string;
  duration: number;       // total durasi dalam detik
  completedAt: string;    // ISO string — lebih safe daripada Date object untuk localStorage
}

// ============================================================
// STORE INTERFACE
// Mendefinisikan shape of state + actions secara eksplisit.
// Ini membuat Zustand store lebih predictable dan testable.
// ============================================================

export interface PomodoroState {
  // --- State ---
  mode: TimerMode;
  status: TimerStatus;
  timeRemaining: number;   // dalam detik
  pomodoroCount: number;   // jumlah sesi WORK yang selesai
  sessions: Session[];

  // --- Actions ---
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  tick: () => void;
  switchMode: (mode: TimerMode) => void;
  completeSession: () => void;
  setTimeRemaining: (time: number) => void;
}