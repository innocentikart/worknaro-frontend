"use client";

import type { ReactNode } from "react";
import { FadeInWhenVisible } from "@/components/ui/AnimatedSection";
import { HeadingAccent } from "@/components/ui/HeadingAccent";

export function LandingHero({
  eyebrow,
  title,
  titleAccent,
  description,
  actions,
  headingId,
}: {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  description: string;
  actions?: ReactNode;
  headingId: string;
}) {
  return (
    <section className="features-page-hero relative overflow-hidden" aria-labelledby={headingId}>
      <div className="features-page-hero-bg" aria-hidden="true" />
      <div className="why-wrap relative text-center">
        <FadeInWhenVisible>
          <div>
            <p className="trust-eyebrow mx-auto">
              <span className="trust-eyebrow-line" aria-hidden="true" />
              {eyebrow}
              <span className="trust-eyebrow-line" aria-hidden="true" />
            </p>
            <h1 id={headingId} className="features-page-heading font-display">
              {title}
              {titleAccent ? (
                <>
                  {" "}
                  <HeadingAccent>{titleAccent}</HeadingAccent>
                </>
              ) : null}
            </h1>
            <p className="features-page-lead">{description}</p>
            {actions ? (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {actions}
              </div>
            ) : null}
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
