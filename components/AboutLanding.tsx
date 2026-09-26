"use client";

import Link from "next/link";
import {
  Database,
  Layers,
  Shield,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { AboutIntro } from "@/components/about/AboutIntro";
import {
  FadeInWhenVisible,
  StaggerChildren,
} from "@/components/ui/AnimatedSection";
import { AccentUnderline } from "@/components/ui/AccentUnderline";
import { PremiumModuleCard } from "@/components/cards/PremiumModuleCard";
import type { ModuleVisualKind } from "@/components/cards/ModuleCardVisuals";
import {
  PRINCIPLE_CARDS,
  PrincipleShowcaseCard,
} from "@/components/about/PrincipleShowcaseCard";
import { djangoRoutes } from "@/lib/site";

type CardAccent = "blue" | "teal" | "purple" | "orange";

const pillars: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
  accent: CardAccent;
  visual: ModuleVisualKind;
  href: string;
  ctaLabel: string;
}> = [
  {
    title: "Our product",
    description:
      "A multi-tenant workspace for projects, tasks, notes, clients, leads, proposals, timesheets, finance, files, calendar, and Gantt.",
    icon: Layers,
    accent: "blue",
    visual: "product",
    href: "/features",
    ctaLabel: "Explore features",
  },
  {
    title: "How we ship",
    description:
      "This public website introduces Organitio. The authenticated application remains the source of truth for accounts, billing, and data.",
    icon: Workflow,
    accent: "teal",
    visual: "ship",
    href: djangoRoutes.register(),
    ctaLabel: "Get Started",
  },
  {
    title: "Collaboration",
    description:
      "Teams work in workspaces with roles, invites, comments, attachments, and notifications.",
    icon: Users,
    accent: "purple",
    visual: "collab",
    href: "/solutions",
    ctaLabel: "See solutions",
  },
  {
    title: "Trust & access",
    description:
      "Workspace roles—Owner, Admin, Manager, Member, Viewer, Guest—control who can see and change what.",
    icon: Shield,
    accent: "orange",
    visual: "trust",
    href: "/pricing",
    ctaLabel: "View plans",
  },
];

export function AboutLanding() {
  return (
    <>
      <AboutIntro />

      <section
        id="what-we-build"
        className="why-section about-pillars-section relative overflow-hidden scroll-mt-28"
        aria-labelledby="about-pillars-heading"
      >
        <div className="why-deco why-deco-left" aria-hidden="true">
          <span className="why-deco-blob" />
          <span className="why-deco-dots" />
        </div>
        <div className="why-deco why-deco-right" aria-hidden="true">
          <span className="why-deco-blob" />
          <span className="why-deco-dots" />
        </div>

        <div className="why-wrap relative py-16 lg:py-20">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-5xl text-center">
              <p className="trust-eyebrow mx-auto">
                <span className="trust-eyebrow-line" aria-hidden="true" />
                What we build
                <span className="trust-eyebrow-line" aria-hidden="true" />
              </p>
              <h2 id="about-pillars-heading" className="why-heading font-display">
                A workspace for the work you already{" "}
                <span className="why-brand">
                  run
                  <svg
                    className="why-underline"
                    viewBox="0 0 80 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 8.5C16 4 34 3 52 4.5C64 5.5 74 7.5 78 5"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h2>
              <p className="why-description">
                Organitio brings projects, clients, time, and finance together so teams stop
                splitting delivery across disconnected tools.
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggerChildren
            delay={40}
            className="about-pillar-grid mx-auto mt-14 grid w-full gap-5 sm:grid-cols-2 sm:gap-6 xl:mt-16 xl:grid-cols-4"
          >
            {pillars.map((item, index) => (
              <FadeInWhenVisible key={item.title} className="h-full" delay={index * 55}>
                <PremiumModuleCard
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  accent={item.accent}
                  index={index}
                  href={item.href}
                  ctaLabel={item.ctaLabel}
                  visual={item.visual}
                />
              </FadeInWhenVisible>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section
        className="principle-section relative overflow-hidden"
        aria-labelledby="about-principles-heading"
      >
        <div className="principle-wrap relative">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-4xl text-center">
              <p className="trust-eyebrow mx-auto">
                <span className="trust-eyebrow-line" aria-hidden="true" />
                Principles
                <span className="trust-eyebrow-line" aria-hidden="true" />
              </p>
              <h2 id="about-principles-heading" className="int-heading font-display">
                Clear boundaries between marketing and the{" "}
                <span className="int-heading-accent">
                  application
                  <AccentUnderline className="int-underline" />
                </span>
              </h2>
            </div>
          </FadeInWhenVisible>

          <StaggerChildren
            delay={70}
            className="principle-grid mt-[3.5rem] grid gap-5 md:grid-cols-2 md:gap-6 lg:mt-16 lg:gap-7"
          >
            {PRINCIPLE_CARDS.map((item, index) => (
              <FadeInWhenVisible key={item.title} className="h-full" delay={index * 80}>
                <PrincipleShowcaseCard item={item} />
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
              <span className="features-search-icon" aria-hidden="true">
                <Database className="h-6 w-6" strokeWidth={1.8} />
              </span>
              <h2 className="features-search-heading relative z-[1] font-display">
                The application is the source of truth
              </h2>
              <p className="features-search-lead relative z-[1]">
                Create your workspace where accounts, tenants, and billing already live.
              </p>
              <div className="relative z-[1] mt-8 flex flex-wrap items-center justify-center gap-3">
                <a href={djangoRoutes.register()} className="hero-cta-primary hero-btn btn-shine">
                  Get Started
                  <span aria-hidden="true">→</span>
                </a>
                <Link href="/contact" className="hero-cta-secondary hero-btn">
                  Contact
                </Link>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </>
  );
}
