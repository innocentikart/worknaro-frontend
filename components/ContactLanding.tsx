"use client";

import Link from "next/link";
import {
  Building2,
  LifeBuoy,
  Mail,
  MessageSquare,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { ContactIntro } from "@/components/contact/ContactIntro";
import {
  FadeInWhenVisible,
  StaggerChildren,
} from "@/components/ui/AnimatedSection";
import { PremiumModuleCard } from "@/components/cards/PremiumModuleCard";
import type { ModuleVisualKind } from "@/components/cards/ModuleCardVisuals";
import { djangoRoutes } from "@/lib/site";

type CardAccent = "blue" | "teal" | "purple" | "orange";

const paths: Array<{
  title: string;
  description: string;
  cta: string;
  href: string;
  accent: CardAccent;
  icon: LucideIcon;
  visual: ModuleVisualKind;
}> = [
  {
    title: "Sales & Enterprise",
    description:
      "Discuss unlimited catalog quotas and sales-managed terms. There is no self-serve SSO product in the application today.",
    cta: "Contact Sales",
    href: djangoRoutes.contactSales(),
    accent: "blue",
    icon: Building2,
    visual: "enterprise",
  },
  {
    title: "Get Started",
    description:
      "Create your account in the Organitio application. Authentication and onboarding stay on Django—no separate signup here.",
    cta: "Create account",
    href: djangoRoutes.register(),
    accent: "teal",
    icon: Rocket,
    visual: "setup",
  },
];

const channels: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  accent: CardAccent;
  visual: ModuleVisualKind;
  ctaLabel: string;
}> = [
  {
    title: "Contact sales",
    description: "Enterprise and commercial questions via the application form.",
    icon: Mail,
    href: djangoRoutes.contactSales(),
    accent: "blue",
    visual: "enterprise",
    ctaLabel: "Contact sales",
  },
  {
    title: "Sign in",
    description: "Continue in your existing Organitio workspace.",
    icon: MessageSquare,
    href: djangoRoutes.login(),
    accent: "teal",
    visual: "app-link",
    ctaLabel: "Open app",
  },
  {
    title: "Product pages",
    description: "Review features, solutions, and pricing before you reach out.",
    icon: LifeBuoy,
    href: "/features",
    accent: "purple",
    visual: "features-link",
    ctaLabel: "Explore features",
  },
];

export function ContactLanding() {
  return (
    <>
      <ContactIntro />

      <section
        id="how-to-reach-us"
        className="contact-section relative overflow-hidden scroll-mt-28"
        aria-labelledby="contact-paths-heading"
      >
        <div className="contact-deco contact-deco-left" aria-hidden="true">
          <span className="contact-deco-blob" />
          <span className="contact-deco-dots" />
        </div>
        <div className="contact-deco contact-deco-right" aria-hidden="true">
          <span className="contact-deco-blob" />
          <span className="contact-deco-dots" />
        </div>

        <div className="why-wrap relative py-16 lg:py-20">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-3xl text-center">
              <p className="trust-eyebrow mx-auto">
                <span className="trust-eyebrow-line" aria-hidden="true" />
                How to reach us
                <span className="trust-eyebrow-line" aria-hidden="true" />
              </p>
              <h2 id="contact-paths-heading" className="why-heading font-display">
                Two clear paths—sales or{" "}
                <span className="why-brand">
                  self-serve
                  <svg className="why-underline" viewBox="0 0 180 12" fill="none" aria-hidden="true">
                    <path d="M2 8.5C28 3.5 58 2 90 3.5C122 5 152 8 178 4.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>
              <p className="why-description">
                This page does not collect emails or create accounts. Sales and registration
                continue in the Organitio application.
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggerChildren className="about-pillar-grid mx-auto mt-12 grid w-full max-w-4xl gap-5 sm:grid-cols-2 sm:gap-6">
            {paths.map((item, index) => (
              <FadeInWhenVisible key={item.title} className="h-full" delay={index * 55}>
                <PremiumModuleCard
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  accent={item.accent}
                  index={index}
                  href={item.href}
                  ctaLabel={item.cta}
                  visual={item.visual}
                />
              </FadeInWhenVisible>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section className="why-section relative overflow-hidden" aria-labelledby="contact-channels-heading">
        <div className="why-wrap relative py-16 lg:py-20">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-3xl text-center">
              <p className="trust-eyebrow mx-auto">
                <span className="trust-eyebrow-line" aria-hidden="true" />
                Quick links
                <span className="trust-eyebrow-line" aria-hidden="true" />
              </p>
              <h2 id="contact-channels-heading" className="why-heading font-display">
                Prefer a shorter jump?
              </h2>
            </div>
          </FadeInWhenVisible>

          <StaggerChildren className="about-pillar-grid mx-auto mt-12 grid w-full gap-5 sm:grid-cols-3 sm:gap-6">
            {channels.map((item, index) => (
              <FadeInWhenVisible key={item.title} className="h-full" delay={index * 50}>
                <PremiumModuleCard
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  accent={item.accent}
                  index={index}
                  href={item.href}
                  ctaLabel={item.ctaLabel}
                  visual={item.visual}
                  wrapLink
                />
              </FadeInWhenVisible>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section className="features-search-band relative overflow-x-clip">
        <div className="why-wrap relative pb-16 lg:pb-20">
          <FadeInWhenVisible>
            <div className="features-search-panel relative overflow-hidden text-center">
              <span className="final-cta-glow" aria-hidden="true" />
              <h2 className="features-search-heading relative z-[1] font-display">
                Already have an account?
              </h2>
              <p className="features-search-lead relative z-[1]">
                Sign in to manage workspaces, billing, and day-to-day work in the application.
              </p>
              <div className="relative z-[1] mt-8 flex flex-wrap items-center justify-center gap-3">
                <a href={djangoRoutes.login()} className="hero-cta-primary hero-btn btn-shine">
                  Sign In
                  <span aria-hidden="true">→</span>
                </a>
                <Link href="/pricing" className="hero-cta-secondary hero-btn">
                  View pricing
                </Link>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </>
  );
}
