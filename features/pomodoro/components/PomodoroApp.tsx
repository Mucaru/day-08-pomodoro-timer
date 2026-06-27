"use client";

import { useState } from "react";
import { useTimer } from "@/features/pomodoro/hooks/useTimer";
import { ModeSelector } from "./ModeSelector";
import { TimerDisplay } from "./TimerDisplay";
import { TimerControls } from "./TimerControls";
import { SessionHistory } from "./SessionHistory";

export function PomodoroApp() {
  // Aktifkan timer engine — cukup dipanggil sekali di sini
  // Semua komponen di bawah otomatis reaktif via Zustand
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