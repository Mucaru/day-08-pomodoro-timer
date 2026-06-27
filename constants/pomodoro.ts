import { TimerMode, type TimerConfig } from "@/types/pomodoro";

// ============================================================
// TIMER DURATIONS (dalam detik)
// Kenapa detik, bukan menit?
// Karena timer engine bekerja per-detik.
// Konversi menit→detik sekali di sini, bukan di setiap komponen.
// ============================================================

export const DURATIONS = {
  WORK: 25 * 60,         // 1500 detik
  SHORT_BREAK: 5 * 60,   // 300 detik
  LONG_BREAK: 15 * 60,   // 900 detik
} as const;

// ============================================================
// POMODORO CYCLE RULE
// Setelah 4x sesi WORK → otomatis Long Break
// Ini adalah aturan teknik Pomodoro original
// ============================================================

export const POMODOROS_UNTIL_LONG_BREAK = 4;

// ============================================================
// TIMER CONFIG MAP
// Struktur ini memungkinkan kita lookup config by mode:
// TIMER_CONFIGS[TimerMode.WORK] → dapat semua config sekaligus
// Lebih scalable daripada if-else atau switch statement
// ============================================================

export const TIMER_CONFIGS: Record<TimerMode, TimerConfig> = {
  [TimerMode.WORK]: {
    mode: TimerMode.WORK,
    duration: DURATIONS.WORK,
    label: "Work",
    color: "var(--accent-work)",
    dimColor: "var(--accent-work-dim)",
    glowClass: "timer-glow-work",
  },
  [TimerMode.SHORT_BREAK]: {
    mode: TimerMode.SHORT_BREAK,
    duration: DURATIONS.SHORT_BREAK,
    label: "Short Break",
    color: "var(--accent-short)",
    dimColor: "var(--accent-short-dim)",
    glowClass: "timer-glow-short",
  },
  [TimerMode.LONG_BREAK]: {
    mode: TimerMode.LONG_BREAK,
    duration: DURATIONS.LONG_BREAK,
    label: "Long Break",
    color: "var(--accent-long)",
    dimColor: "var(--accent-long-dim)",
    glowClass: "timer-glow-long",
  },
};

// ============================================================
// NEXT MODE LOGIC
// Menentukan mode apa yang datang setelah mode saat ini selesai.
// Disimpan sebagai constant map — bukan if-else di store.
// ============================================================

export const NEXT_MODE: Record<TimerMode, TimerMode> = {
  [TimerMode.WORK]: TimerMode.SHORT_BREAK,
  [TimerMode.SHORT_BREAK]: TimerMode.WORK,
  [TimerMode.LONG_BREAK]: TimerMode.WORK,
};

// ============================================================
// LOCALSTORAGE KEY
// Satu constant untuk key — kalau typo, error langsung ketahuan
// ============================================================

export const STORAGE_KEY = "pomodoro-sessions" as const;

// ============================================================
// ANIMATION
// Durasi transition dalam ms — konsisten di seluruh app
// ============================================================

export const TRANSITION_DURATION = 300;