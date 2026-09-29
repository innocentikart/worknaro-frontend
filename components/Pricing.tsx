"use client";

import { useMemo, useState } from "react";
import { Check, CreditCard, Star } from "lucide-react";
import {
  FadeInWhenVisible,
  StaggerChildren,
} from "@/components/ui/AnimatedSection";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { SectionBadge } from "@/components/ui/SectionBadge";
import {
  TRIAL_DAYS,
  formatPlanPrice,
  maxAnnualSavingsPercent,
  planFeatureLines,
  priceNote,
  priceSuffix,
  pricingPlans,
  type BillingInterval,
} from "@/lib/pricing";
import { djangoRoutes } from "@/lib/site";

export function Pricing({
  showHeading = true,
  compact = false,
  interval: controlledInterval,
  onIntervalChange,
  hideBillingControls = false,
  afterIntro = false,
}: {
  showHeading?: boolean;
  compact?: boolean;
  /** Controlled billing interval (e.g. from PricingIntro). */
  interval?: BillingInterval;
  onIntervalChange?: (interval: BillingInterval) => void;
  /** Hide trial + toggle when those live in the page intro. */
  hideBillingControls?: boolean;
  /** Tighter top spacing when following a dedicated pricing intro. */
  afterIntro?: boolean;
}) {
  const [uncontrolledInterval, setUncontrolledInterval] =
    useState<BillingInterval>("monthly");
  const isControlled = controlledInterval !== undefined;
  const interval = isControlled ? controlledInterval : uncontrolledInterval;
  const setBillingInterval = (value: BillingInterval) => {
    if (isControlled) {
      onIntervalChange?.(value);
      return;
    }
    setUncontrolledInterval(value);
  };
  const savePct = useMemo(() => maxAnnualSavingsPercent(), []);
  const showControls = !hideBillingControls;

  return (
    <section
      className={`pricing-section relative${
        afterIntro ? " pricing-section-follow" : ""
      }`}
      aria-labelledby={showHeading ? "pricing-heading" : undefined}
    >
      <div
        className={`why-wrap relative ${
          afterIntro ? "pricing-follow-wrap" : ""
        }`}
      >
        {showHeading ? (
          <FadeInWhenVisible>
            <div className="mx-auto max-w-3xl text-center">
              <SectionBadge icon={CreditCard} className="mx-auto">
                Plan & Pricing
              </SectionBadge>
              <h2 id="pricing-heading" className="pricing-heading font-display">
                Choose the plan that fits your{" "}
                <HeadingAccent>team</HeadingAccent>
              </h2>
              <p className="pricing-lead">
                Scale projects, members, and storage as you grow. Every plan includes
                kanban boards, attachments, and notifications.
              </p>
            </div>
          </FadeInWhenVisible>
        ) : null}

        {showControls ? (
          <>
            <FadeInWhenVisible delay={showHeading ? 60 : 0}>
              <p className={`pricing-trial text-center ${showHeading ? "" : "mt-0"}`}>
                Start Starter or Pro with a {TRIAL_DAYS}-day free trial — no charge until
                the trial ends.
              </p>
            </FadeInWhenVisible>

            <div
              className={`flex flex-col items-center gap-2.5 ${
                showHeading ? "mt-8" : "mt-6"
              }`}
            >
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
                    onClick={() => setBillingInterval(value)}
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
            </div>
          </>
        ) : null}

        <StaggerChildren
          className={`pricing-cards-grid grid items-stretch gap-5 lg:grid-cols-4 ${
            afterIntro ? "mt-0" : "landing-to-content"
          }`}
        >
          {pricingPlans.map((plan) => {
            const href =
              plan.ctaKind === "contact"
                ? djangoRoutes.contactSales()
                : djangoRoutes.register();
            const featured = Boolean(plan.highlighted);
            const note = priceNote(plan, interval);
            const lines = compact
              ? plan.quotas
              : planFeatureLines(plan);

            return (
              <FadeInWhenVisible key={plan.code} className="h-full">
                <article
                  className={`pricing-card group transition duration-300 hover:-translate-y-1 ${
                    featured ? "is-featured" : ""
                  }`}
                >
                  {featured ? (
                    <span className="pricing-recommended">
                      <Star className="h-3 w-3" strokeWidth={2.4} aria-hidden="true" />
                      Recommended
                    </span>
                  ) : (
                    <span className="pricing-recommended-spacer" />
                  )}
                  <h3 className="pricing-plan-name">{plan.name}</h3>
                  <p className="pricing-plan-desc">{plan.description}</p>
                  <div className="mt-6">
                    <div className="flex items-end gap-1">
                      <span className="pricing-price">
                        {formatPlanPrice(plan, interval)}
                      </span>
                      {priceSuffix(plan, interval) ? (
                        <span className="pricing-suffix">
                          {priceSuffix(plan, interval)}
                        </span>
                      ) : null}
                    </div>
                    {note ? <p className="pricing-price-note">{note}</p> : null}
                  </div>
                  <ul className="pricing-features mt-6 flex-1 space-y-2.5">
                    {lines.map((feature) => (
                      <li key={feature} className="pricing-feature">
                        <span className="pricing-check" aria-hidden="true">
                          <Check className="h-3 w-3" strokeWidth={2.6} />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7">
                    <a
                      href={href}
                      className={
                        featured
                          ? "hero-cta-primary hero-btn btn-shine w-full"
                          : "pricing-cta-secondary"
                      }
                    >
                      {plan.ctaLabel}
                      {featured ? <span aria-hidden="true">→</span> : null}
                    </a>
                  </div>
                </article>
              </FadeInWhenVisible>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
