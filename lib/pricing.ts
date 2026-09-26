/**
 * Display catalog aligned with Django `/billing/pricing/` and
 * `billing/migrations/0003_saas_billing_expansion.py` + `billing/services/plan_catalog.py`.
 * Amounts only — no Stripe Price IDs.
 */

export type BillingInterval = "monthly" | "yearly";

export type PlanCode = "free" | "starter" | "pro" | "enterprise";

export const TRIAL_DAYS = 14;
export const RECOMMENDED_PLAN_CODE: PlanCode = "pro";

/** Matches `CORE_FEATURE_ROWS` + enabled `GATED_FEATURE_ROWS` from plan_catalog. */
const CORE_FEATURES = [
  "Kanban boards",
  "File attachments",
  "In-app notifications",
] as const;

export type PricingPlan = {
  code: PlanCode;
  name: string;
  description: string;
  /** null = custom / contact sales (Enterprise on marketing UI). */
  monthlyPriceCents: number | null;
  yearlyPriceCents: number | null;
  highlighted?: boolean;
  ctaLabel: string;
  ctaKind: "register" | "contact";
  /** Quota lines shown first on Django plan cards. */
  quotas: string[];
  /** Positive feature flags only (same order as plan_catalog). */
  features: string[];
};

export const pricingPlans: PricingPlan[] = [
  {
    code: "free",
    name: "Free",
    description: "For personal users, trials, and onboarding.",
    monthlyPriceCents: 0,
    yearlyPriceCents: 0,
    ctaLabel: "Get Started",
    ctaKind: "register",
    quotas: ["5 projects", "10 members", "512 MB storage"],
    features: [...CORE_FEATURES],
  },
  {
    code: "starter",
    name: "Starter",
    description: "For small teams, startups, and growing businesses.",
    monthlyPriceCents: 2900,
    yearlyPriceCents: 29000,
    ctaLabel: "Get Started",
    ctaKind: "register",
    quotas: ["25 projects", "50 members", "5 GB storage"],
    features: [
      ...CORE_FEATURES,
      "Client portal",
      "Automation & templates",
    ],
  },
  {
    code: "pro",
    name: "Pro",
    description: "For operational businesses, agencies, and scaling teams.",
    monthlyPriceCents: 7900,
    yearlyPriceCents: 79000,
    highlighted: true,
    ctaLabel: "Get Started",
    ctaKind: "register",
    quotas: ["100 projects", "200 members", "50 GB storage"],
    features: [
      ...CORE_FEATURES,
      "Client portal",
      "Automation & templates",
      "Advanced analytics",
      "Integrations & API",
      "Audit logs",
    ],
  },
  {
    code: "enterprise",
    name: "Enterprise",
    description: "For large organizations with advanced governance and security.",
    monthlyPriceCents: null,
    yearlyPriceCents: null,
    ctaLabel: "Contact Sales",
    ctaKind: "contact",
    quotas: ["Unlimited projects", "Unlimited members", "Unlimited storage"],
    features: [
      ...CORE_FEATURES,
      "Client portal",
      "Automation & templates",
      "Advanced analytics",
      "Integrations & API",
      "Audit logs",
      "Single sign-on (SSO)",
    ],
  },
];

function formatCents(cents: number): string {
  if (cents === 0) return "$0";
  return cents % 100 === 0
    ? `$${cents / 100}`
    : `$${(cents / 100).toFixed(2)}`;
}

export function savingsPercent(monthlyCents: number, yearlyCents: number): number {
  if (!monthlyCents || !yearlyCents) return 0;
  const annualAtMonthly = monthlyCents * 12;
  if (annualAtMonthly <= 0) return 0;
  return Math.max(0, Math.round((1 - yearlyCents / annualAtMonthly) * 100));
}

/** Max annual savings across paid public plans — Django "Save up to N%". */
export function maxAnnualSavingsPercent(): number {
  return pricingPlans.reduce((max, plan) => {
    if (plan.monthlyPriceCents == null || plan.yearlyPriceCents == null) return max;
    if (plan.monthlyPriceCents <= 0) return max;
    return Math.max(max, savingsPercent(plan.monthlyPriceCents, plan.yearlyPriceCents));
  }, 0);
}

/** Primary amount label — mirrors `billing-pricing.js` updatePrices(). */
export function formatPlanPrice(
  plan: PricingPlan,
  interval: BillingInterval,
): string {
  if (plan.monthlyPriceCents === null) return "Custom";

  if (interval === "yearly" && plan.yearlyPriceCents != null && plan.yearlyPriceCents > 0) {
    return formatCents(plan.yearlyPriceCents);
  }

  return formatCents(plan.monthlyPriceCents);
}

export function priceSuffix(plan: PricingPlan, interval: BillingInterval): string {
  if (plan.monthlyPriceCents === null) return "";
  if (interval === "yearly" && (plan.yearlyPriceCents ?? 0) > 0) return "/yr";
  return "/mo";
}

/** Secondary note under the price (Django `.billing-price__note`). */
export function priceNote(
  plan: PricingPlan,
  interval: BillingInterval,
): string | null {
  if (plan.monthlyPriceCents === null) {
    return "Contact sales for volume pricing";
  }
  if (
    interval === "yearly" &&
    plan.monthlyPriceCents > 0 &&
    plan.yearlyPriceCents != null &&
    plan.yearlyPriceCents > 0
  ) {
    const perMonth = Math.round(plan.yearlyPriceCents / 12);
    const pct = savingsPercent(plan.monthlyPriceCents, plan.yearlyPriceCents);
    return `≈ ${formatCents(perMonth)}/mo · save ${pct}% vs monthly`;
  }
  return null;
}

export function planFeatureLines(plan: PricingPlan): string[] {
  return [...plan.quotas, ...plan.features];
}
