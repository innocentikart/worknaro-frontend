"use client";

import Link from "next/link";
import {
  Compass,
  Layers,
  Rocket,
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
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { SectionBadge } from "@/components/ui/SectionBadge";
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
      "This public website introduces Worknaro. The authenticated application remains the source of truth for accounts, billing, and data.",
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

      <div className="landing-page-body">
      <section
        id="what-we-build"
        className="why-section about-pillars-section relative overflow-hidden scroll-mt-28"
        aria-labelledby="about-pillars-heading"
      >
        <div className="why-deco why-deco-left" aria-hidden="true">
          <span className="why-deco-dots" />
        </div>
        <div className="why-deco why-deco-right" aria-hidden="true">
          <span className="why-deco-dots" />
        </div>

        <div className="why-wrap relative">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-5xl text-center">
              <SectionBadge icon={Layers} className="mx-auto">
                What we build
              </SectionBadge>
              <h2 id="about-pillars-heading" className="why-heading font-display">
                A workspace for the work you already{" "}
                <HeadingAccent>run</HeadingAccent>
              </h2>
              <p className="why-description">
                Worknaro brings projects, clients, time, and finance together so teams stop
                splitting delivery across disconnected tools.
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggerChildren
            delay={40}
            className="about-pillar-grid landing-to-content mx-auto grid w-full gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4"
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
              <SectionBadge icon={Compass} className="mx-auto">
                Principles
              </SectionBadge>
              <h2 id="about-principles-heading" className="int-heading font-display">
                Clear boundaries between marketing and the{" "}
                <HeadingAccent>application</HeadingAccent>
              </h2>
            </div>
          </FadeInWhenVisible>

          <StaggerChildren
            delay={70}
            className="principle-grid landing-to-content grid gap-5 md:grid-cols-2 md:gap-6 lg:gap-7"
          >
            {PRINCIPLE_CARDS.map((item, index) => (
              <FadeInWhenVisible key={item.title} className="h-full" delay={index * 80}>
                <PrincipleShowcaseCard item={item} />
              </FadeInWhenVisible>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section className="final-cta-section relative overflow-x-clip" aria-labelledby="about-source-heading">
        <div className="why-wrap relative">
          <FadeInWhenVisible>
            <div className="final-cta-panel solutions-editions-panel relative overflow-hidden text-center">
              <div className="solutions-editions-deco" aria-hidden="true" />

              <SectionBadge icon={Rocket} className="mx-auto relative z-[1]">
                Get started
              </SectionBadge>

              <div className="solutions-editions-copy relative z-[1]">
                <h2 id="about-source-heading" className="final-cta-heading relative z-[1] font-display">
                  The application is the{" "}
                  <HeadingAccent>source of truth</HeadingAccent>
                </h2>
                <p className="final-cta-lead relative z-[1]">
                  Create your workspace where accounts, tenants, and billing already live.
                </p>
              </div>

              <div className="final-cta-actions relative z-[1]">
                <a href={djangoRoutes.register()} className="final-cta-primary">
                  <span>Get Started</span>
                  <span className="final-cta-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
                <Link href="/contact" className="final-cta-secondary">
                  Contact
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
