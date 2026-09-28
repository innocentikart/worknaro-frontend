"use client";

import { useMemo, useState } from "react";
import { CreditCard } from "lucide-react";
import { FadeInWhenVisible } from "@/components/ui/AnimatedSection";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Pricing } from "@/components/Pricing";
import {
  TRIAL_DAYS,
  maxAnnualSavingsPercent,
  type BillingInterval,
} from "@/lib/pricing";

/**
 * Compact pricing-page introduction + plans.
 * Distinct from homepage / Features / Solutions heroes: context → billing → cards.
 */
export function PricingLandingHero() {
  const [interval, setInterval] = useState<BillingInterval>("monthly");
  const savePct = useMemo(() => maxAnnualSavingsPercent(), []);

  return (
    <>
      <section
        className="pricing-intro relative"
        aria-labelledby="pricing-intro-heading"
      >
        <div className="pricing-intro-bg" aria-hidden="true" />

        <div className="pricing-intro-wrap relative">
          <FadeInWhenVisible>
            <SectionBadge icon={CreditCard} className="mx-auto">
              Plans &amp; Pricing
            </SectionBadge>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={40}>
            <h1 id="pricing-intro-heading" className="pricing-intro-heading font-display">
              Plans that grow{" "}
              <HeadingAccent>with your work.</HeadingAccent>
            </h1>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={80}>
            <p className="pricing-intro-lead">
              Choose the workspace that fits your team today, then scale as your
              projects, people, and needs grow.
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={120}>
            <div className="pricing-intro-controls">
              <div
                className="pricing-toggle"
                role="group"
                aria-label="Billing interval"
              >
                {(
                  [
                    { value: "monthly" as const, label: "Monthly" },
                    { value: "yearly" as const, label: "Annual" },
                  ] as const
                ).map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setInterval(value)}
                    className={`pricing-toggle-btn ${
                      interval === value ? "is-active" : ""
                    }`}
                    aria-pressed={interval === value}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {savePct > 0 ? (
                <span className="pricing-save-badge">Save up to {savePct}%</span>
              ) : null}
              <p className="pricing-intro-trust">
                Start Starter or Pro with a {TRIAL_DAYS}-day free trial. Upgrade or
                change plans when your team needs to.
              </p>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={160}>
            <div className="pricing-intro-transition">
              <span className="pricing-intro-transition-line" aria-hidden="true" />
              <p className="pricing-intro-transition-label">Choose your plan</p>
              <span className="pricing-intro-transition-line" aria-hidden="true" />
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      <div id="plans" className="scroll-mt-28">
        <Pricing
          showHeading={false}
          hideBillingControls
          afterIntro
          interval={interval}
          onIntervalChange={setInterval}
        />
      </div>
    </>
  );
}
