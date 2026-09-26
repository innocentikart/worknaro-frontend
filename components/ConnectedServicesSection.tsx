"use client";

import { FadeInWhenVisible } from "@/components/ui/AnimatedSection";
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

      <div
        className={[
          "why-wrap relative",
          compact ? "py-10 lg:py-12" : "py-12 lg:py-16",
        ].join(" ")}
      >
        <FadeInWhenVisible>
          <div className="mx-auto max-w-[920px] text-center">
            <p className="trust-eyebrow mx-auto">
              <span className="trust-eyebrow-line" aria-hidden="true" />
              {eyebrow}
              <span className="trust-eyebrow-line" aria-hidden="true" />
            </p>
            <h2 id={headingId} className="why-heading font-display">
              {title}
            </h2>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={80} className={compact ? "mt-6" : "mt-8"}>
          <IntegrationBrandTicker label={title} />
        </FadeInWhenVisible>

        <IntegrationCardsGrid
          idPrefix={idPrefix}
          className={[
            "grid gap-5 sm:grid-cols-2 xl:grid-cols-4",
            compact ? "mt-6" : "mt-8",
          ].join(" ")}
        />
      </div>
    </section>
  );
}
