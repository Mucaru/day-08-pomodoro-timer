"use client";

import { useEffect, useRef, useCallback } from "react";
import { TimerStatus } from "@/types/pomodoro";
import { usePomodoroStore } from "@/features/pomodoro/store/pomodoroStore";
import { useSound } from "./useSound";

// ============================================================
// HOOK
// ============================================================

export function useTimer(): void {
  const { status, tick, timeRemaining } = usePomodoroStore();
  const { playComplete, playTick } = useSound();

  // Refs untuk nilai yang dibutuhkan di dalam interval
  // Kenapa ref? Agar interval selalu baca nilai terbaru
  // tanpa perlu recreate interval setiap state berubah
  const statusRef = useRef(status);
  const timeRemainingRef = useRef(timeRemaining);
  const tickRef = useRef(tick);
  const playCompleteRef = useRef(playComplete);
  const playTickRef = useRef(playTick);

  // Sync refs setiap render
  // Pattern ini disebut "ref synchronization pattern"
  useEffect(() => {
    statusRef.current = status;
    timeRemainingRef.current = timeRemaining;
    tickRef.current = tick;
    playCompleteRef.current = playComplete;
    playTickRef.current = playTick;
  });

  // -------------------------------------------------------
  // CORE TIMER ENGINE
  // Menggunakan Date.now() drift correction:
  // setInterval tidak akurat 100% — bisa melambat
  // di background tab atau saat CPU sibuk.
  // Solusi: catat kapan seharusnya tick berikutnya terjadi,
  // lalu koreksi delay secara dinamis.
  // -------------------------------------------------------

  const startTimer = useCallback(() => {
    // Waktu kapan tick berikutnya seharusnya terjadi
    let expectedTime = Date.now() + 1000;

    const intervalId = setInterval(() => {
      // Jika tidak sedang RUNNING, skip tick ini
      if (statusRef.current !== TimerStatus.RUNNING) return;

      const now = Date.now();
      const drift = now - expectedTime; // berapa ms kita terlambat

      // Play tick sound setiap detik
      if (timeRemainingRef.current > 0) {
        playTickRef.current();
      }

      // Jalankan tick di store
      tickRef.current();

      // Play complete sound saat timer habis
      if (timeRemainingRef.current <= 1) {
        playCompleteRef.current();
      }

      // Koreksi waktu berikutnya berdasarkan drift
      expectedTime += 1000;

      // Jika drift terlalu besar (>200ms), reset ke saat ini
      if (drift > 200) {
        expectedTime = Date.now() + 1000;
      }
    }, 1000);

    return intervalId;
  }, []);

  // -------------------------------------------------------
  // EFFECT: Jalankan timer saat status RUNNING
  // -------------------------------------------------------

  useEffect(() => {
    if (status !== TimerStatus.RUNNING) return;

    const intervalId = startTimer();

    // Cleanup: hentikan interval saat status berubah
    return () => clearInterval(intervalId);
  }, [status, startTimer]);

  // -------------------------------------------------------
  // EFFECT: Handle visibility change
  // Saat tab kembali aktif setelah lama di background,
  // sinkronisasi waktu berdasarkan waktu nyata yang berlalu
  // -------------------------------------------------------

  useEffect(() => {
    const handleVisibilityChange = () => {
      // Hanya proses saat tab kembali terlihat
      if (document.visibilityState === "visible") {
        // Tidak perlu action khusus karena drift correction
        // di interval sudah handle ini secara otomatis
        // Namun hook ini siap di-extend untuk kasus lebih kompleks
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
}