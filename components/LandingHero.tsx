"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Sparkles } from "lucide-react";
import { FadeInWhenVisible } from "@/components/ui/AnimatedSection";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { SectionBadge } from "@/components/ui/SectionBadge";

export function LandingHero({
  eyebrow,
  title,
  titleAccent,
  description,
  actions,
  headingId,
  icon = Sparkles,
}: {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  description: string;
  actions?: ReactNode;
  headingId: string;
  icon?: LucideIcon;
}) {
  return (
    <section className="features-page-hero relative overflow-hidden" aria-labelledby={headingId}>
      <div className="features-page-hero-bg" aria-hidden="true" />
      <div className="why-wrap relative text-center">
        <FadeInWhenVisible>
          <div>
            <SectionBadge icon={icon} className="mx-auto">
              {eyebrow}
            </SectionBadge>
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
              <div className="landing-cta-row mt-8 flex flex-wrap items-center justify-center gap-3">
                {actions}
              </div>
            ) : null}
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
