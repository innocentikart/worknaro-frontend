import type { ReactNode } from "react";
import { AccentUnderline } from "@/components/ui/AccentUnderline";

/** Hero “work done.” accent: brand-gradient text + curved underline. */
export function HeadingAccent({
  children,
  wide = true,
}: {
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <span className="hero-headline-accent-wrap">
      <span className="hero-gradient-text hero-headline-accent">{children}</span>
      <AccentUnderline className="hero-headline-underline" wide={wide} />
    </span>
  );
}
