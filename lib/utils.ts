// ============================================================
// formatTime
// Mengubah angka detik → tampilan MM:SS
//
// Contoh:
// 1500 → "25:00"
// 65   → "01:05"
// 9    → "00:09"
// ============================================================

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  // padStart(2, "0") → pastikan selalu 2 digit
  // 9 → "09", bukan "9"
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// ============================================================
// formatDate
// Mengubah ISO string → tampilan yang mudah dibaca manusia
//
// Contoh:
// "2024-01-15T14:30:00.000Z" → "15 Jan, 14:30"
// ============================================================

export function formatDate(isoString: string): string {
  const date = new Date(isoString);

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

// ============================================================
// cn (className merger)
// Menggabungkan beberapa string className dengan aman
//
// Contoh:
// cn("base-class", isActive && "active", undefined)
// → "base-class active"
// (undefined/false otomatis dibuang)
// ============================================================

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

// ============================================================
// calculateProgress
// Menghitung persentase timer yang sudah berjalan
// Dipakai untuk animasi lingkaran SVG
//
// Contoh:
// timeRemaining=750, totalDuration=1500 → 50 (50% selesai)
// ============================================================

export function calculateProgress(
  timeRemaining: number,
  totalDuration: number
): number {
  if (totalDuration === 0) return 0;
  return ((totalDuration - timeRemaining) / totalDuration) * 100;
}