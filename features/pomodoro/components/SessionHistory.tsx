"use client";

import { TimerMode } from "@/types/pomodoro";
import { TIMER_CONFIGS } from "@/constants/pomodoro";
import { usePomodoroStore } from "@/features/pomodoro/store/pomodoroStore";
import { Badge } from "@/components/ui/Badge";
import { formatDate, formatTime } from "@/lib/utils";

export function SessionHistory() {
  const { sessions, pomodoroCount } = usePomodoroStore();

  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-12 text-center">
        <span className="text-3xl">🍅</span>
        <p className="text-white/40 text-sm">
          No sessions yet. Start your first Pomodoro!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Summary bar */}
      <div className="flex items-center justify-between px-1 mb-1">
        <p className="text-sm text-white/40">
          {sessions.length} session{sessions.length > 1 ? "s" : ""} completed
        </p>
        <p className="text-sm font-medium" style={{ color: "var(--accent-work)" }}>
          🍅 {pomodoroCount} pomodoro{pomodoroCount > 1 ? "s" : ""}
        </p>
      </div>

      {/* Session list */}
      {sessions.map((session) => {
        const config = TIMER_CONFIGS[session.mode];

        return (
          <div
            key={session.id}
            className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
          >
            {/* Kiri: mode badge + waktu selesai */}
            <div className="flex items-center gap-3">
              <Badge label={session.label} color={config.color} />
              <span className="text-sm text-white/30">
                {formatDate(session.completedAt)}
              </span>
            </div>

            {/* Kanan: durasi */}
            <span className="text-sm font-mono text-white/50">
              {formatTime(session.duration)}
            </span>
          </div>
        );
      })}
    </div>
  );
}