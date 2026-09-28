"use client";

import Link from "next/link";
import { CreditCard } from "lucide-react";
import { FadeInWhenVisible } from "@/components/ui/AnimatedSection";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { SectionBadge } from "@/components/ui/SectionBadge";

export function PricingCta() {
  return (
    <section
      className="final-cta-section relative overflow-x-clip"
      aria-labelledby="pricing-cta-heading"
    >
      <div className="final-cta-deco final-cta-deco-left" aria-hidden="true">
        <span className="final-cta-deco-blob" />
      </div>
      <div className="final-cta-deco final-cta-deco-right" aria-hidden="true">
        <span className="final-cta-deco-blob" />
        <span className="final-cta-rings" />
      </div>

      <div className="why-wrap relative">
        <FadeInWhenVisible>
          <div className="final-cta-panel solutions-editions-panel relative overflow-hidden text-center">
            <div className="solutions-editions-deco" aria-hidden="true" />

            <SectionBadge icon={CreditCard} className="mx-auto relative z-[1]">
              Plans that scale
            </SectionBadge>

            <div className="solutions-editions-copy relative z-[1]">
              <span className="solutions-editions-copy-blur" aria-hidden="true" />
              <h2 id="pricing-cta-heading" className="final-cta-heading relative z-[1] font-display">
                Choose a plan that fits the way{" "}
                <HeadingAccent>you work.</HeadingAccent>
              </h2>
              <p className="final-cta-lead relative z-[1]">
                Start with what you need today and move to a plan that grows with
                your team as your work evolves.
              </p>
            </div>

            <div className="final-cta-actions relative z-[1]">
              <Link href="/pricing" className="final-cta-primary">
                <span>View Plans &amp; Pricing</span>
                <span className="final-cta-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
