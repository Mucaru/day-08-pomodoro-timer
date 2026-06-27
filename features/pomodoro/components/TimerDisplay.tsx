"use client";

import { TimerStatus } from "@/types/pomodoro";
import { TIMER_CONFIGS } from "@/constants/pomodoro";
import { usePomodoroStore } from "@/features/pomodoro/store/pomodoroStore";
import { formatTime, calculateProgress } from "@/lib/utils";
import { cn } from "@/lib/utils";

// Ukuran SVG circle
const RADIUS = 120;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // panjang keliling lingkaran

export function TimerDisplay() {
  const { mode, status, timeRemaining } = usePomodoroStore();
  const config = TIMER_CONFIGS[mode];

  const progress = calculateProgress(timeRemaining, config.duration);

  // strokeDashoffset menentukan seberapa banyak garis yang "terisi"
  // 0 = penuh, CIRCUMFERENCE = kosong
  const strokeDashoffset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;

  const isCompleted = status === TimerStatus.COMPLETED;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Lingkaran Timer */}
      <div
        className={cn(
          "relative flex items-center justify-center",
          "rounded-full transition-all duration-700",
          config.glowClass
        )}
        style={{ width: 280, height: 280 }}
      >
        {/* SVG Progress Ring */}
        <svg
          width="280"
          height="280"
          className="absolute inset-0 -rotate-90"
          // rotate-90 agar progress mulai dari atas, bukan kanan
        >
          {/* Track (background circle) */}
          <circle
            cx="140"
            cy="140"
            r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="6"
          />

          {/* Progress circle */}
          <circle
            cx="140"
            cy="140"
            r={RADIUS}
            fill="none"
            stroke={config.color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>

        {/* Konten tengah lingkaran */}
        <div className="relative flex flex-col items-center gap-1">
          {/* Waktu */}
          <span
            className={cn(
              "text-6xl font-bold tracking-tighter tabular-nums",
              "transition-all duration-300",
              isCompleted ? "scale-105" : "scale-100"
            )}
            style={{ color: isCompleted ? config.color : "white" }}
          >
            {formatTime(timeRemaining)}
          </span>

          {/* Status label */}
          <span className="text-sm text-white/40 font-medium tracking-widest uppercase">
            {status === TimerStatus.IDLE && "ready"}
            {status === TimerStatus.RUNNING && "focus"}
            {status === TimerStatus.PAUSED && "paused"}
            {status === TimerStatus.COMPLETED && "done!"}
          </span>
        </div>
      </div>
    </div>
  );
}