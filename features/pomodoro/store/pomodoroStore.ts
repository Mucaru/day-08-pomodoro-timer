import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TimerMode, TimerStatus, type PomodoroState, type Session } from "@/types/pomodoro";
import {
  TIMER_CONFIGS,
  NEXT_MODE,
  POMODOROS_UNTIL_LONG_BREAK,
  STORAGE_KEY,
} from "@/constants/pomodoro";

// ============================================================
// HELPER
// Dibuat di luar store agar pure function — mudah di-test
// ============================================================

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function determineNextMode(currentMode: TimerMode, pomodoroCount: number): TimerMode {
  // Hanya sesi WORK yang dihitung untuk Long Break trigger
  if (currentMode !== TimerMode.WORK) {
    return NEXT_MODE[currentMode];
  }

  const newCount = pomodoroCount + 1;

  if (newCount % POMODOROS_UNTIL_LONG_BREAK === 0) {
    return TimerMode.LONG_BREAK;
  }

  return TimerMode.SHORT_BREAK;
}

// ============================================================
// STORE
// ============================================================

export const usePomodoroStore = create<PomodoroState>()(
  persist(
    (set, get) => ({
      // -------------------------------------------------------
      // INITIAL STATE
      // -------------------------------------------------------
      mode: TimerMode.WORK,
      status: TimerStatus.IDLE,
      timeRemaining: TIMER_CONFIGS[TimerMode.WORK].duration,
      pomodoroCount: 0,
      sessions: [],

      // -------------------------------------------------------
      // ACTIONS
      // -------------------------------------------------------

      start: () => {
        set({ status: TimerStatus.RUNNING });
      },

      pause: () => {
        set({ status: TimerStatus.PAUSED });
      },

      resume: () => {
        set({ status: TimerStatus.RUNNING });
      },

      reset: () => {
        const { mode } = get();
        set({
          status: TimerStatus.IDLE,
          timeRemaining: TIMER_CONFIGS[mode].duration,
        });
      },

      tick: () => {
        const { timeRemaining, completeSession } = get();

        if (timeRemaining <= 1) {
          completeSession();
          return;
        }

        set({ timeRemaining: timeRemaining - 1 });
      },

      setTimeRemaining: (time: number) => {
        set({ timeRemaining: time });
      },

      switchMode: (mode: TimerMode) => {
        set({
          mode,
          status: TimerStatus.IDLE,
          timeRemaining: TIMER_CONFIGS[mode].duration,
        });
      },

      completeSession: () => {
        const { mode, pomodoroCount, sessions } = get();
        const config = TIMER_CONFIGS[mode];

        // Buat session record
        const newSession: Session = {
          id: generateId(),
          mode,
          label: config.label,
          duration: config.duration,
          completedAt: new Date().toISOString(),
        };

        // Hitung pomodoroCount baru (hanya tambah jika WORK)
        const newPomodoroCount =
          mode === TimerMode.WORK ? pomodoroCount + 1 : pomodoroCount;

        // Tentukan mode berikutnya
        const nextMode = determineNextMode(mode, pomodoroCount);

        set({
          status: TimerStatus.COMPLETED,
          timeRemaining: 0,
          pomodoroCount: newPomodoroCount,
          sessions: [newSession, ...sessions], // terbaru di atas
          mode: nextMode,
        });

        // Setelah 1.5 detik, otomatis pindah ke mode berikutnya dalam status IDLE
        setTimeout(() => {
          set({
            status: TimerStatus.IDLE,
            timeRemaining: TIMER_CONFIGS[nextMode].duration,
          });
        }, 1500);
      },
    }),

    // -------------------------------------------------------
    // PERSIST CONFIG
    // Hanya sessions dan pomodoroCount yang perlu disimpan.
    // Timer state (status, timeRemaining) sengaja TIDAK disimpan
    // karena tidak ada gunanya melanjutkan timer yang sudah lama.
    // -------------------------------------------------------
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        sessions: state.sessions,
        pomodoroCount: state.pomodoroCount,
      }),
    }
  )
);