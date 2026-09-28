import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type SectionBadgeProps = {
  icon: LucideIcon;
  children: ReactNode;
  className?: string;
  variant?: "default" | "on-dark";
};

/** Homepage/hero pill: icon + uppercase label. */
export function SectionBadge({
  icon: Icon,
  children,
  className = "",
  variant = "default",
}: SectionBadgeProps) {
  return (
    <p
      className={[
        "hero-badge",
        variant === "on-dark" ? "hero-badge-on-dark" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" strokeWidth={2} />
      {children}
    </p>
  );
}
