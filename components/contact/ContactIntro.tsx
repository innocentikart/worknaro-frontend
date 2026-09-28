"use client";

import {
  ArrowRight,
  Building2,
  LifeBuoy,
  Mail,
  MessageSquare,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { FadeInWhenVisible } from "@/components/ui/AnimatedSection";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { AboutSectionBackground } from "@/components/about/AboutSectionBackground";
import { djangoRoutes, siteConfig } from "@/lib/site";

type PathTone = "blue" | "teal";

type ContactPath = {
  title: string;
  description: string;
  cta: string;
  href: string;
  tone: PathTone;
  icon: LucideIcon;
};

/** Existing contact paths from ContactLanding — not invented channels. */
const CONTACT_PATHS: ContactPath[] = [
  {
    title: "Sales & Enterprise",
    description:
      "Discuss unlimited catalog quotas and sales-managed terms. There is no self-serve SSO product in the application today.",
    cta: "Contact Sales",
    href: djangoRoutes.contactSales(),
    tone: "blue",
    icon: Building2,
  },
  {
    title: "Get Started",
    description:
      "Create your account in the Worknaro application. Authentication and onboarding stay on Django—no separate signup here.",
    cta: "Create account",
    href: djangoRoutes.register(),
    tone: "teal",
    icon: Rocket,
  },
];

const QUICK_CHANNELS: Array<{
  title: string;
  href: string;
  icon: LucideIcon;
  tone: "blue" | "teal" | "purple";
}> = [
  {
    title: "Contact sales",
    href: djangoRoutes.contactSales(),
    icon: Mail,
    tone: "blue",
  },
  {
    title: "Sign in",
    href: djangoRoutes.login(),
    icon: MessageSquare,
    tone: "teal",
  },
  {
    title: "Product pages",
    href: "/features",
    icon: LifeBuoy,
    tone: "purple",
  },
];

function ContactPathsPreview() {
  return (
    <div className="contact-intro-preview">
      <SectionBadge icon={Mail}>How to reach us</SectionBadge>

      <ul className="contact-intro-paths">
        {CONTACT_PATHS.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.title}>
              <a
                href={item.href}
                className={`contact-intro-path contact-intro-path-${item.tone}`}
              >
                <span className="contact-intro-path-icon" aria-hidden="true">
                  <Icon className="h-4 w-4" strokeWidth={2.1} />
                </span>
                <span className="contact-intro-path-copy">
                  <span className="contact-intro-path-title">{item.title}</span>
                  <span className="contact-intro-path-desc">{item.description}</span>
                  <span className="contact-intro-path-cta">
                    {item.cta}
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
                  </span>
                </span>
                <ArrowRight
                  className="contact-intro-path-arrow h-4 w-4"
                  strokeWidth={2.1}
                  aria-hidden="true"
                />
              </a>
            </li>
          );
        })}
      </ul>

      <div className="contact-intro-channels" aria-label="Quick links">
        {QUICK_CHANNELS.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.title}
              href={item.href}
              className={`contact-intro-chip contact-intro-chip-${item.tone}`}
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={2.1} aria-hidden="true" />
              {item.title}
            </a>
          );
        })}
      </div>

      <p className="contact-intro-note">
        This page does not collect emails or create accounts. Sales and registration
        continue in the {siteConfig.name} application.
      </p>
    </div>
  );
}

export function ContactIntro() {
  return (
    <section
      className="contact-intro relative"
      aria-labelledby="contact-hero-heading"
    >
      <AboutSectionBackground />

      <div className="contact-intro-wrap relative z-10">
        <div className="contact-intro-grid">
          <div className="contact-intro-copy">
            <FadeInWhenVisible>
              <SectionBadge icon={MessageSquare}>Get in touch</SectionBadge>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={40}>
              <h1 id="contact-hero-heading" className="contact-intro-heading font-display">
                <span className="contact-intro-heading-line">Have a question?</span>
                <span className="contact-intro-heading-line">
                  <HeadingAccent>Let&apos;s talk.</HeadingAccent>
                </span>
              </h1>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={80}>
              <p className="contact-intro-lead">
                For Enterprise and sales questions, reach out through our contact sales
                form. Ready to try {siteConfig.name}? Create an account and start your
                workspace.
              </p>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={120}>
              <a href="#how-to-reach-us" className="contact-intro-cue">
                Start a conversation
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
              </a>
            </FadeInWhenVisible>
          </div>

          <FadeInWhenVisible delay={100} className="contact-intro-visual">
            <ContactPathsPreview />
          </FadeInWhenVisible>
        </div>

        <FadeInWhenVisible delay={200}>
          <div className="contact-intro-transition">
            <span className="contact-intro-transition-line" aria-hidden="true" />
            <p className="contact-intro-transition-label">How can we help?</p>
            <span className="contact-intro-transition-line" aria-hidden="true" />
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
