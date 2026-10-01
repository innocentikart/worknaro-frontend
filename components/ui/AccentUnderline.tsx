/**
 * Curved accent underline SVG (data-URI source of truth).
 * Kept for any legacy call sites; HeadingAccent uses CSS background instead
 * so wrapped lines each get their own curve via box-decoration-break.
 */
import type { CSSProperties } from "react";

/** Shared hand-drawn path matching hero “work done.” */
export const ACCENT_UNDERLINE_PATH =
  "M3 11C42 2.2 86 1.2 118 4.2C150 7.2 184 12.2 217 3.5";

export function AccentUnderline({
  className = "heading-accent-underline",
  style,
}: {
  className?: string;
  style?: CSSProperties;
  /** @deprecated Unused. */
  wide?: boolean;
}) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 220 14"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d={ACCENT_UNDERLINE_PATH}
        stroke="currentColor"
        strokeWidth="3.25"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
