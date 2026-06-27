import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pomodoro Timer — Stay Focused",
  description:
    "A professional Pomodoro timer to boost your productivity. Track work sessions, take breaks, and build better focus habits.",
  keywords: ["pomodoro", "timer", "productivity", "focus", "work"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}