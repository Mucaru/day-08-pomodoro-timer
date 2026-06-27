import { type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ============================================================
// TYPES
// Extend dari ButtonHTMLAttributes agar semua props HTML
// button (onClick, disabled, type, dll) otomatis tersedia
// ============================================================

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

// ============================================================
// VARIANT STYLES
// Dipisah dari komponen agar mudah dibaca dan diubah
// ============================================================

const variantStyles = {
  primary: [
    "bg-white text-black font-semibold",
    "hover:bg-white/90",
    "active:scale-95",
  ].join(" "),

  secondary: [
    "bg-white/10 text-white font-medium",
    "hover:bg-white/15",
    "active:scale-95",
    "border border-white/10",
  ].join(" "),

  ghost: [
    "bg-transparent text-white/60 font-medium",
    "hover:text-white hover:bg-white/5",
    "active:scale-95",
  ].join(" "),
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-8 py-3.5 text-base rounded-2xl",
};

// ============================================================
// COMPONENT
// ============================================================

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles — selalu ada
        "inline-flex items-center justify-center gap-2",
        "transition-all duration-200 cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
        "select-none",

        // Variant & size
        variantStyles[variant],
        sizeStyles[size],

        // Disabled state
        disabled && "opacity-40 cursor-not-allowed active:scale-100",

        // Custom className dari luar (bisa override)
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}