"use client";

import { useRef, useCallback } from "react";

// ============================================================
// TYPES
// ============================================================

interface SoundOptions {
  frequency: number;    // Hz — tinggi rendahnya nada
  duration: number;     // detik — berapa lama bunyi
  type: OscillatorType; // sine | square | sawtooth | triangle
  volume: number;       // 0.0 - 1.0
}

interface UseSound {
  playComplete: () => void;
  playTick: () => void;
}

// ============================================================
// HOOK
// ============================================================

export function useSound(): UseSound {
  // useRef karena AudioContext tidak perlu trigger re-render
  // Lazy init — hanya dibuat saat pertama kali dipakai
  const audioContextRef = useRef<AudioContext | null>(null);

  // -------------------------------------------------------
  // HELPER: getContext
  // AudioContext harus dibuat setelah user interaction
  // (browser policy — autoplay restriction)
  // -------------------------------------------------------

  const getContext = useCallback((): AudioContext => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    // Resume jika suspended (browser pause saat tab tidak aktif)
    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }

    return audioContextRef.current;
  }, []);

  // -------------------------------------------------------
  // HELPER: playTone
  // Pure function untuk generate satu nada
  // -------------------------------------------------------

  const playTone = useCallback(
    (options: SoundOptions, startTime: number = 0): void => {
      try {
        const ctx = getContext();

        // Oscillator = sumber suara (gelombang)
        const oscillator = ctx.createOscillator();

        // GainNode = volume control
        const gainNode = ctx.createGain();

        // Hubungkan: oscillator → gain → output
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        // Set properties
        oscillator.frequency.setValueAtTime(options.frequency, ctx.currentTime + startTime);
        oscillator.type = options.type;

        // Fade in
        gainNode.gain.setValueAtTime(0, ctx.currentTime + startTime);
        gainNode.gain.linearRampToValueAtTime(
          options.volume,
          ctx.currentTime + startTime + 0.01
        );

        // Fade out (menghindari "click" noise saat suara berhenti)
        gainNode.gain.exponentialRampToValueAtTime(
          0.001,
          ctx.currentTime + startTime + options.duration
        );

        // Start & stop
        oscillator.start(ctx.currentTime + startTime);
        oscillator.stop(ctx.currentTime + startTime + options.duration);
      } catch {
        // Silent fail — jika browser tidak support Web Audio
        console.warn("Web Audio API not supported");
      }
    },
    [getContext]
  );

  // -------------------------------------------------------
  // SOUND: playComplete
  // 3 nada berurutan = chord ascending = "achievement" feel
  // -------------------------------------------------------

  const playComplete = useCallback((): void => {
    // Nada 1: C5
    playTone({ frequency: 523, duration: 0.3, type: "sine", volume: 0.4 }, 0);
    // Nada 2: E5
    playTone({ frequency: 659, duration: 0.3, type: "sine", volume: 0.4 }, 0.2);
    // Nada 3: G5
    playTone({ frequency: 784, duration: 0.5, type: "sine", volume: 0.4 }, 0.4);
  }, [playTone]);

  // -------------------------------------------------------
  // SOUND: playTick
  // Satu klik pendek — subtle, tidak mengganggu
  // -------------------------------------------------------

  const playTick = useCallback((): void => {
    playTone({ frequency: 1000, duration: 0.02, type: "square", volume: 0.05 }, 0);
  }, [playTone]);

  return { playComplete, playTick };
}