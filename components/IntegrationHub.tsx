"use client";

import { FadeInWhenVisible } from "@/components/ui/AnimatedSection";
import {
  IntegrationBrandTicker,
  IntegrationCardsGrid,
} from "@/components/integrations/IntegrationShared";

export function IntegrationHub() {
  return (
    <div
      className="integration-hub relative overflow-hidden"
      aria-labelledby="integrations-heading"
    >
      <div className="hub-mesh" aria-hidden="true" />

      <div className="why-wrap relative">
        <FadeInWhenVisible>
          <div className="mx-auto max-w-[920px] text-center">
            <h2 id="integrations-heading" className="why-heading font-display !mt-0">
              Integration Hub
            </h2>
            <p className="why-description">
              Connected to the services Worknaro already uses
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="landing-to-content">
          <IntegrationBrandTicker />
        </div>

        <IntegrationCardsGrid idPrefix="hub" />
      </div>
    </div>
  );
}
