import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  color?: string;       // warna teks & border via inline style
  className?: string;
}

export function Badge({ label, color, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5",
        "text-xs font-medium rounded-full",
        "border",
        className
      )}
      style={
        color
          ? {
              color,
              borderColor: `${color}40`, // 40 = 25% opacity dalam hex
              backgroundColor: `${color}15`, // 15 = 8% opacity dalam hex
            }
          : undefined
      }
    >
      {label}
    </span>
  );
}