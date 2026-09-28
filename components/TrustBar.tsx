"use client";

import { Shield } from "lucide-react";
import { ConnectedServicesSection } from "@/components/ConnectedServicesSection";

/**
 * “Built on services teams already trust” — same UI language as the
 * Connected services / Integration Hub cards.
 */
export function BuiltOnServicesSection() {
  return (
    <ConnectedServicesSection
      className="trust-section-continue"
      eyebrow="Trusted infrastructure"
      icon={Shield}
      title="Built on services teams already trust"
      headingId="built-on-services-heading"
      idPrefix="built"
    />
  );
}

/**
 * Legacy alias — Connected services strip under the hero.
 */
export function TrustBar() {
  return (
    <ConnectedServicesSection
      eyebrow="Connected services"
      title="Connected to the services Worknaro already uses"
      headingId="trust-services-heading"
      idPrefix="trust"
    />
  );
}
