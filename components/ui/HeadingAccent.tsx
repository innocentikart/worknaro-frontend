import type { ReactNode } from "react";

/**
 * Shared landing heading accent: brand-gradient text + curved underline.
 * Visual reference: hero “work done.”
 *
 * Outer span owns the curved underline with box-decoration-break: clone
 * so each wrapped line gets its own stroke. Inner span owns the gradient fill.
 */
export function HeadingAccent({
  children,
}: {
  children: ReactNode;
  /** @deprecated Unused — kept so existing call sites type-check. */
  wide?: boolean;
}) {
  return (
    <span className="heading-accent">
      <span className="heading-accent-fill hero-gradient-text">{children}</span>
    </span>
  );
}
