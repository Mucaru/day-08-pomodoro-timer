"use client";

import { TimerMode } from "@/types/pomodoro";
import { TIMER_CONFIGS } from "@/constants/pomodoro";
import { usePomodoroStore } from "@/features/pomodoro/store/pomodoroStore";
import { cn } from "@/lib/utils";

// Urutan tab yang tampil di UI
const MODES = [TimerMode.WORK, TimerMode.SHORT_BREAK, TimerMode.LONG_BREAK];

export function ModeSelector() {
  const { mode, status, switchMode } = usePomodoroStore();

  return (
    <div className="flex items-center gap-1 p-1 rounded-2xl bg-white/5 border border-white/10">
      {MODES.map((m) => {
        const config = TIMER_CONFIGS[m];
        const isActive = mode === m;

        return (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={cn(
              "relative px-4 py-2 rounded-xl text-sm font-medium",
              "transition-all duration-300 cursor-pointer",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
              isActive
                ? "text-white"
                : "text-white/40 hover:text-white/70"
            )}
            style={
              isActive
                ? { backgroundColor: `${config.color}25` }
                : undefined
            }
          >
            {/* Active indicator dot */}
            {isActive && (
              <span
                className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full"
                style={{ backgroundColor: config.color }}
              />
            )}
            {config.label}
          </button>
        );
      })}
    </div>
  );
}