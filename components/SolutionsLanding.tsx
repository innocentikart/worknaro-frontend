"use client";

import Link from "next/link";
import {
  BookOpen,
  Briefcase,
  Building2,
  Heart,
  Layers,
  Rocket,
  Share2,
  Store,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  FadeInWhenVisible,
  StaggerChildren,
} from "@/components/ui/AnimatedSection";
import { AccentUnderline } from "@/components/ui/AccentUnderline";
import { Icon } from "@/components/ui/Icon";
import { PremiumModuleCard } from "@/components/cards/PremiumModuleCard";
import type { ModuleVisualKind } from "@/components/cards/ModuleCardVisuals";
import { SolutionsIntro } from "@/components/solutions/SolutionsIntro";
import {
  FeatureShowcaseSection,
  type ShowcaseAccent,
} from "@/components/showcase/FeatureShowcaseSection";
import { solutions } from "@/lib/content";
import { djangoRoutes } from "@/lib/site";

type CardAccent = "blue" | "teal" | "purple" | "orange";

const wireAccents: ShowcaseAccent[] = ["blue", "teal", "purple"];

const AUDIENCE_META: Record<
  (typeof solutions)[number]["id"],
  { icon: LucideIcon; accent: CardAccent; visual: ModuleVisualKind }
> = {
  startups: { icon: Rocket, accent: "blue", visual: "projects" },
  agencies: { icon: Briefcase, accent: "teal", visual: "clients" },
  freelancers: { icon: UserRound, accent: "purple", visual: "tasks" },
  "small-businesses": { icon: Store, accent: "orange", visual: "invoice" },
  "larger-organizations": { icon: Share2, accent: "blue", visual: "team" },
  nonprofits: { icon: Heart, accent: "teal", visual: "programs" },
  "education-teams": { icon: BookOpen, accent: "purple", visual: "education" },
  "client-service": { icon: Users, accent: "orange", visual: "clients-handshake" },
};

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
    title: "One product",
    description:
      "Audience labels describe how teams use Organitio—not separate industry editions or SKUs.",
    icon: Layers,
    accent: "blue",
    visual: "one-product",
    href: "#audiences",
    ctaLabel: "Browse audiences",
  },
  {
    title: "Same workspace modules",
    description:
      "Projects, tasks, clients, finance, files, calendar, and Gantt ship in every workspace.",
    icon: Briefcase,
    accent: "teal",
    visual: "same-modules",
    href: "/features",
    ctaLabel: "Explore features",
  },
  {
    title: "Roles that scale",
    description:
      "Owner, Admin, Manager, Member, Viewer, and Guest control who sees what as the team grows.",
    icon: Users,
    accent: "purple",
    visual: "roles",
    href: "/features",
    ctaLabel: "Learn about roles",
  },
  {
    title: "Plans that fit",
    description:
      "Start Free, grow on Starter or Pro, or talk to sales for Enterprise terms.",
    icon: Building2,
    accent: "orange",
    visual: "plans-fit",
    href: "/pricing",
    ctaLabel: "Compare plans",
  },
];

export function SolutionsLanding() {
  return (
    <>
      <SolutionsIntro />

      <section
        className="why-section relative overflow-hidden"
        aria-labelledby="pillars-heading"
      >
        <div className="why-ambient" aria-hidden="true" />
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
            <div className="mx-auto max-w-3xl text-center">
              <p className="audience-eyebrow mx-auto">One platform</p>
              <h2 id="pillars-heading" className="why-heading font-display mt-5 text-balance">
                Built once. Used by many kinds of{" "}
                <span className="why-brand-gradient">
                  teams
                  <AccentUnderline />
                </span>
              </h2>
              <p className="why-description">
                Organitio adapts to how you organize work. Labels below are examples of
                who uses the product—not separate product lines.
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggerChildren className="about-pillar-grid mx-auto mt-14 grid w-full gap-5 sm:grid-cols-2 xl:mt-16 xl:grid-cols-4 xl:gap-6">
            {pillars.map((item, index) => (
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
                />
              </FadeInWhenVisible>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section
        id="audiences"
        className="solutions-section relative overflow-hidden scroll-mt-24"
        aria-labelledby="audiences-heading"
      >
        <div className="audience-ambient" aria-hidden="true" />

        <div className="why-wrap relative py-16 lg:py-20">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-3xl text-center">
              <p className="audience-eyebrow mx-auto">Audiences</p>
              <h2 id="audiences-heading" className="solutions-heading font-display mt-5 text-balance">
                Find the workspace shape that fits{" "}
                <span className="solutions-heading-accent">
                  your team
                  <AccentUnderline className="solutions-underline" wide />
                </span>
              </h2>
              <p className="solutions-lead">
                Jump to a deep dive below, or start a workspace and invite people when you
                are ready.
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggerChildren className="about-pillar-grid mx-auto mt-12 grid w-full gap-5 sm:grid-cols-2 xl:mt-14 xl:grid-cols-4 xl:gap-6">
            {solutions.map((item, index) => {
              const meta = AUDIENCE_META[item.id];
              return (
                <FadeInWhenVisible key={item.id} className="h-full" delay={index * 45}>
                  <PremiumModuleCard
                    title={item.title}
                    description={item.description}
                    icon={meta.icon}
                    accent={meta.accent}
                    index={index}
                    href={`#${item.id}`}
                    ctaLabel="View details"
                    visual={meta.visual}
                  />
                </FadeInWhenVisible>
              );
            })}
          </StaggerChildren>

          <FadeInWhenVisible delay={80} className="mt-12">
            <nav aria-label="Solution audiences" className="features-jump">
              {solutions.map((item) => {
                const meta = AUDIENCE_META[item.id];
                return (
                  <a key={item.id} href={`#${item.id}`} className="features-jump-link">
                    <span className="features-jump-icon" aria-hidden="true">
                      <Icon icon={meta.icon} size="sm" />
                    </span>
                    {item.title}
                  </a>
                );
              })}
            </nav>
          </FadeInWhenVisible>
        </div>
      </section>

      <section
        className="showcase-section relative overflow-hidden"
        aria-labelledby="solutions-deep-dive-heading"
      >
        <div className="showcase-ambient" aria-hidden="true" />
        <div className="showcase-deco showcase-deco-left" aria-hidden="true">
          <span className="showcase-deco-blob" />
          <span className="showcase-deco-dots" />
        </div>
        <div className="showcase-deco showcase-deco-right" aria-hidden="true">
          <span className="showcase-deco-blob" />
          <span className="showcase-deco-dots" />
        </div>

        <div className="why-wrap relative pt-16 lg:pt-20">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-3xl text-center">
              <p className="audience-eyebrow mx-auto">Deep dive</p>
              <h2 id="solutions-deep-dive-heading" className="int-heading font-display mt-5 text-balance">
                How each audience uses the{" "}
                <span className="int-heading-accent">
                  same application
                  <AccentUnderline className="int-underline" wide />
                </span>
              </h2>
              <p className="int-lead">
                Screens and capabilities below are modules that already ship in Organitio.
              </p>
            </div>
          </FadeInWhenVisible>
        </div>

        <div className="why-wrap relative space-y-20 py-14 lg:space-y-28 lg:py-20">
          {solutions.map((item, index) => (
            <FeatureShowcaseSection
              key={item.id}
              feature={item}
              reverse={index % 2 === 1}
              accent={wireAccents[index % wireAccents.length]}
              cta={index === solutions.length - 1}
              secondaryCta={{ href: "/features", label: "Explore features" }}
              showDescription
            />
          ))}
        </div>
      </section>

      <section className="features-search-band relative overflow-x-clip">
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
            <div className="features-search-panel solutions-editions-panel relative overflow-hidden text-center">
              <div className="solutions-editions-deco" aria-hidden="true" />
              <p className="audience-eyebrow mx-auto relative z-[1]">Same product</p>
              <div className="solutions-editions-copy relative z-[1]">
                <span className="solutions-editions-copy-blur" aria-hidden="true" />
                <h2 className="features-search-heading relative z-[1] font-display">
                  Not separate industry editions
                </h2>
                <p className="features-search-lead relative z-[1]">
                  Whether you are a startup, agency, or client-service team, you get the same
                  workspace modules. Plan limits and Enterprise terms change with your plan—
                  not a different product SKU.
                </p>
              </div>
              <div className="relative z-[1] mt-8 flex flex-wrap items-center justify-center gap-3">
                <a href={djangoRoutes.register()} className="hero-cta-primary hero-btn btn-shine">
                  Create workspace
                  <span aria-hidden="true">→</span>
                </a>
                <Link href="/pricing" className="hero-cta-secondary hero-btn">
                  Compare plans
                </Link>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </>
  );
}
