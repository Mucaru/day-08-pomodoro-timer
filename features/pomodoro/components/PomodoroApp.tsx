"use client";

import { useState } from "react";
import { TimerMode } from "@/types/pomodoro";
import { POMODOROS_UNTIL_LONG_BREAK, TIMER_CONFIGS } from "@/constants/pomodoro";
import { usePomodoroStore } from "@/features/pomodoro/store/pomodoroStore";
import { useTimer } from "@/features/pomodoro/hooks/useTimer";
import { ModeSelector } from "./ModeSelector";
import { TimerDisplay } from "./TimerDisplay";
import { TimerControls } from "./TimerControls";
import { SessionHistory } from "./SessionHistory";
import { cn } from "@/lib/utils";

// ============================================================
// PROGRESS DOTS COMPONENT
// Menampilkan posisi sesi saat ini dalam satu cycle (1-4)
// ============================================================

function ProgressDots() {
  const { pomodoroCount, mode } = usePomodoroStore();

  // Posisi dalam cycle saat ini (0-3)
  // Contoh: pomodoroCount=5 → 5%4=1 → dot ke-2 yang aktif
  const currentPosition = pomodoroCount % POMODOROS_UNTIL_LONG_BREAK;

  // Warna dot mengikuti warna mode WORK
  const workColor = TIMER_CONFIGS[TimerMode.WORK].color;

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Dots */}
      <div className="flex items-center gap-2">
        {Array.from({ length: POMODOROS_UNTIL_LONG_BREAK }).map((_, index) => {
          // Dot dianggap "filled" kalau index-nya < posisi saat ini
          const isFilled = index < currentPosition;

          return (
            <div
              key={index}
              className={cn(
                "rounded-full transition-all duration-500",
                isFilled ? "w-2.5 h-2.5" : "w-2 h-2"
              )}
              style={{
                backgroundColor: isFilled
                  ? workColor
                  : "rgba(255,255,255,0.15)",
                boxShadow: isFilled
                  ? `0 0 8px ${workColor}80`
                  : "none",
              }}
            />
          );
        })}
      </div>

      {/* Label */}
      <p className="text-xs text-white/25">
        {currentPosition === 0 && pomodoroCount === 0
          ? "Start your first pomodoro"
          : currentPosition === 0
          ? `Cycle ${Math.floor(pomodoroCount / POMODOROS_UNTIL_LONG_BREAK)} complete 🎉`
          : `${currentPosition} of ${POMODOROS_UNTIL_LONG_BREAK} pomodoros`}
      </p>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================

export function PomodoroApp() {
  useTimer();

  const [showHistory, setShowHistory] = useState(false);

  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-4 py-12">
      {/* Header */}
      <div className="flex flex-col items-center gap-1 mb-10">
        <h1 className="text-2xl font-bold tracking-tight">
          Pomodoro Timer
        </h1>
        <p className="text-sm text-white/30">
          Stay focused, one session at a time.
        </p>
      </div>

      {/* Card utama */}
      <div className="w-full max-w-md flex flex-col items-center gap-8 p-8 rounded-3xl border border-white/10 bg-white/[0.03]">
        {/* Tab mode selector */}
        <ModeSelector />

        {/* Lingkaran countdown */}
        <TimerDisplay />

        {/* Tombol kontrol */}
        <TimerControls />

        {/* Progress dots — posisi dalam cycle */}
        <ProgressDots />
      </div>

      {/* Toggle history */}
      <button
        onClick={() => setShowHistory((prev) => !prev)}
        className="mt-8 text-sm text-white/30 hover:text-white/60 transition-colors cursor-pointer"
      >
        {showHistory ? "Hide history ↑" : "Show history ↓"}
      </button>

      {/* Session history panel */}
      {showHistory && (
        <div className="w-full max-w-md mt-4 p-6 rounded-3xl border border-white/10 bg-white/[0.03]">
          <h2 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-4">
            Session History
          </h2>
          <SessionHistory />
        </div>
      )}
    </main>
  );
}