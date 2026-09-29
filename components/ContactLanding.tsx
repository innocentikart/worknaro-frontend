"use client";

import Link from "next/link";
import {
  Building2,
  LifeBuoy,
  Link2,
  LogIn,
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
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { SectionBadge } from "@/components/ui/SectionBadge";
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
      "Create your account in the Worknaro application. Authentication and onboarding stay on Django—no separate signup here.",
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
    description: "Continue in your existing Worknaro workspace.",
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

      <div className="landing-page-body">
      <section
        id="how-to-reach-us"
        className="contact-section relative overflow-hidden scroll-mt-28"
        aria-labelledby="contact-paths-heading"
      >
        <div className="contact-deco contact-deco-left" aria-hidden="true">
          <span className="contact-deco-dots" />
        </div>
        <div className="contact-deco contact-deco-right" aria-hidden="true">
          <span className="contact-deco-dots" />
        </div>

        <div className="why-wrap relative">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-3xl text-center">
              <SectionBadge icon={Mail} className="mx-auto">
                How to reach us
              </SectionBadge>
              <h2 id="contact-paths-heading" className="why-heading font-display">
                Two clear paths—sales or{" "}
                <HeadingAccent>self-serve</HeadingAccent>
              </h2>
              <p className="why-description">
                This page does not collect emails or create accounts. Sales and registration
                continue in the Worknaro application.
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggerChildren className="about-pillar-grid landing-to-content mx-auto grid w-full max-w-4xl gap-5 sm:grid-cols-2 sm:gap-6">
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
        <div className="why-wrap relative">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-3xl text-center">
              <SectionBadge icon={Link2} className="mx-auto">
                Quick links
              </SectionBadge>
              <h2 id="contact-channels-heading" className="why-heading font-display">
                Prefer a shorter jump?
              </h2>
            </div>
          </FadeInWhenVisible>

          <StaggerChildren className="about-pillar-grid landing-to-content mx-auto grid w-full gap-5 sm:grid-cols-3 sm:gap-6">
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

      <section className="final-cta-section relative overflow-x-clip" aria-labelledby="contact-account-heading">
        <div className="why-wrap relative">
          <FadeInWhenVisible>
            <div className="final-cta-panel solutions-editions-panel relative overflow-hidden text-center">
              <div className="solutions-editions-deco" aria-hidden="true" />

              <SectionBadge icon={LogIn} className="mx-auto relative z-[1]">
                Sign in
              </SectionBadge>

              <div className="solutions-editions-copy relative z-[1]">
                <h2 id="contact-account-heading" className="final-cta-heading relative z-[1] font-display">
                  Already have an{" "}
                  <HeadingAccent>account?</HeadingAccent>
                </h2>
                <p className="final-cta-lead relative z-[1]">
                  Sign in to manage workspaces, billing, and day-to-day work in the application.
                </p>
              </div>

              <div className="final-cta-actions relative z-[1]">
                <a href={djangoRoutes.login()} className="final-cta-primary">
                  <span>Sign In</span>
                  <span className="final-cta-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
                <Link href="/pricing" className="final-cta-secondary">
                  View pricing
                </Link>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
      </div>
    </>
  );
}
