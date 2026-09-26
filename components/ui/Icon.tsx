import { memo, type ComponentProps } from "react";
import type { LucideIcon } from "lucide-react";

type IconSize = "sm" | "md" | "lg";

const sizeMap: Record<IconSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

type IconProps = {
  icon: LucideIcon;
  size?: IconSize | number;
  strokeWidth?: number;
  className?: string;
  label?: string;
} & Omit<ComponentProps<"svg">, "strokeWidth" | "className" | "children">;

function IconComponent({
  icon: Lucide,
  size = "md",
  strokeWidth = 1.75,
  className = "",
  label,
  ...rest
}: IconProps) {
  const px = typeof size === "number" ? size : sizeMap[size];

  return (
    <Lucide
      size={px}
      strokeWidth={strokeWidth}
      className={`ui-icon shrink-0 transition duration-200 ${className}`}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      {...rest}
    />
  );
}

export const Icon = memo(IconComponent);

export function IconBadge({
  icon,
  accent = "blue",
  size = "md",
  className = "",
}: {
  icon: LucideIcon;
  accent?: "blue" | "teal" | "purple" | "orange";
  size?: IconSize;
  className?: string;
}) {
  return (
    <span className={`ui-icon-badge ui-icon-badge-${accent} ${className}`}>
      <Icon icon={icon} size={size} />
    </span>
  );
}
