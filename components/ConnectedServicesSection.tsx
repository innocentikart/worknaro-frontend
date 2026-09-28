"use client";

import type { LucideIcon } from "lucide-react";
import { Shield } from "lucide-react";
import { FadeInWhenVisible } from "@/components/ui/AnimatedSection";
import { SectionBadge } from "@/components/ui/SectionBadge";
import {
  IntegrationBrandTicker,
  IntegrationCardsGrid,
} from "@/components/integrations/IntegrationShared";

export type ConnectedServicesSectionProps = {
  eyebrow?: string;
  title: string;
  headingId?: string;
  idPrefix: string;
  className?: string;
  compact?: boolean;
  icon?: LucideIcon;
};

/**
 * Shared connected-services block used by TrustBar / Built on services.
 * Brand ticker + Integration Hub cards.
 */
export function ConnectedServicesSection({
  eyebrow = "Connected services",
  title,
  headingId = "connected-services-heading",
  idPrefix,
  className = "",
  compact = false,
  icon = Shield,
}: ConnectedServicesSectionProps) {
  return (
    <section
      className={[
        "trust-section relative overflow-hidden",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby={headingId}
    >
      <div className="hub-mesh opacity-30" aria-hidden="true" />

      <div className="why-wrap relative">
        <FadeInWhenVisible>
          <div className="mx-auto max-w-[920px] text-center">
            <SectionBadge icon={icon} className="mx-auto">
              {eyebrow}
            </SectionBadge>
            <h2 id={headingId} className="why-heading font-display">
              {title}
            </h2>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={80} className="landing-to-content">
          <IntegrationBrandTicker label={title} />
        </FadeInWhenVisible>

        <IntegrationCardsGrid idPrefix={idPrefix} />
      </div>
    </section>
  );
}
