"use client";

import { FadeInWhenVisible } from "@/components/ui/AnimatedSection";
import type { ReactNode } from "react";

/** @deprecated Prefer FadeInWhenVisible / AnimatedSection from @/components/ui */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <FadeInWhenVisible className={className} delay={delay}>
      {children}
    </FadeInWhenVisible>
  );
}
