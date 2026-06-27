"use client";

import { TimerStatus } from "@/types/pomodoro";
import { usePomodoroStore } from "@/features/pomodoro/store/pomodoroStore";
import { Button } from "@/components/ui/Button";

export function TimerControls() {
  const { status, start, pause, resume, reset } = usePomodoroStore();

  const isIdle = status === TimerStatus.IDLE;
  const isRunning = status === TimerStatus.RUNNING;
  const isPaused = status === TimerStatus.PAUSED;
  const isCompleted = status === TimerStatus.COMPLETED;

  return (
    <div className="flex items-center gap-3">
      {/* Tombol utama — berubah sesuai status */}
      {isIdle && (
        <Button size="lg" onClick={start}>
          Start
        </Button>
      )}

      {isRunning && (
        <Button size="lg" onClick={pause}>
          Pause
        </Button>
      )}

      {isPaused && (
        <>
          <Button size="lg" onClick={resume}>
            Resume
          </Button>
          <Button size="lg" variant="secondary" onClick={reset}>
            Reset
          </Button>
        </>
      )}

      {isCompleted && (
        <Button size="lg" variant="secondary" disabled>
          Completing...
        </Button>
      )}

      {/* Tombol reset — hanya muncul saat running */}
      {isRunning && (
        <Button size="md" variant="ghost" onClick={reset}>
          Reset
        </Button>
      )}
    </div>
  );
}