"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ExternalLink,
  FileText,
  LayoutGrid,
  Link2,
  type LucideIcon,
} from "lucide-react";
import { ResourcesIntro } from "@/components/resources/ResourcesIntro";
import {
  FadeInWhenVisible,
  StaggerChildren,
} from "@/components/ui/AnimatedSection";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { ThemeProductImage } from "@/components/ui/ThemeProductImage";
import { PremiumModuleCard } from "@/components/cards/PremiumModuleCard";
import type { ModuleVisualKind } from "@/components/cards/ModuleCardVisuals";
import { resourceCards } from "@/lib/content";
import { djangoRoutes } from "@/lib/site";

const accents = ["blue", "emerald", "purple", "orange"] as const;

type CardAccent = "blue" | "teal" | "purple" | "orange";

const quickLinks: Array<{
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  accent: CardAccent;
  visual: ModuleVisualKind;
  ctaLabel: string;
}> = [
  {
    title: "Features",
    description: "Modules that exist in the Worknaro application today.",
    href: "/features",
    icon: LayoutGrid,
    accent: "blue",
    visual: "features-link",
    ctaLabel: "Explore features",
  },
  {
    title: "Pricing",
    description: "Free, Starter, Pro, and Enterprise plan options.",
    href: "/pricing",
    icon: FileText,
    accent: "teal",
    visual: "pricing-link",
    ctaLabel: "Compare plans",
  },
  {
    title: "Solutions",
    description: "How different teams use the same workspace product.",
    href: "/solutions",
    icon: BookOpen,
    accent: "purple",
    visual: "solutions-link",
    ctaLabel: "Browse solutions",
  },
  {
    title: "Open the application",
    description: "Sign in to continue working in your workspace.",
    href: djangoRoutes.login(),
    icon: ExternalLink,
    accent: "orange",
    visual: "app-link",
    ctaLabel: "Open app",
  },
];

export function ResourcesLanding() {
  return (
    <>
      <ResourcesIntro />

      <div className="landing-page-body">
      <section
        id="library"
        className="resources-section relative overflow-hidden scroll-mt-28"
        aria-labelledby="resources-library-heading"
      >
        <div className="resources-deco resources-deco-left" aria-hidden="true">
          <span className="resources-deco-dots" />
        </div>
        <div className="resources-deco resources-deco-right" aria-hidden="true">
          <span className="resources-deco-dots" />
        </div>

        <div className="why-wrap relative">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-3xl text-center">
              <SectionBadge icon={BookOpen} className="mx-auto">
                Library
              </SectionBadge>
              <h2 id="resources-library-heading" className="resources-heading font-display">
                Learn more about{" "}
                <HeadingAccent>Worknaro</HeadingAccent>
              </h2>
              <p className="resources-lead">
                Explore product capabilities, plans, and guides—or continue into the authenticated application.
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggerChildren className="landing-to-content grid gap-5 md:grid-cols-3">
            {resourceCards.map((item, index) => {
              const accent = item.accent || accents[index % accents.length];
              return (
                <FadeInWhenVisible key={item.href} className="h-full">
                  <Link
                    href={item.href}
                    className={`resources-card resources-card-${accent} group flex h-full flex-col overflow-hidden`}
                  >
                    <div className="resources-media relative overflow-hidden">
                      <ThemeProductImage
                        lightSrc={item.image}
                        darkSrc={item.imageDark}
                        alt=""
                        width={1024}
                        height={481}
                        className="resources-billing-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <span className="resources-media-fade" aria-hidden="true" />
                    </div>
                    <div className="resources-card-body flex flex-1 flex-col">
                      <p className="resources-category">{item.category}</p>
                      <h3 className="resources-card-title">{item.title}</h3>
                      <p className="resources-card-copy flex-1">{item.excerpt}</p>
                      <span className="resources-learn">
                        {item.cta || "Read more"}
                        <ArrowRight className="resources-learn-arrow" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </FadeInWhenVisible>
              );
            })}
          </StaggerChildren>

          <FadeInWhenVisible delay={80} className="mt-10">
            <p className="resources-placeholder">
              More guides are on the way. Meanwhile, explore{" "}
              <Link href="/features" className="resources-placeholder-link">
                Features
              </Link>{" "}
              or{" "}
              <Link href="/contact" className="resources-placeholder-link">
                Contact
              </Link>{" "}
              us with questions.
            </p>
          </FadeInWhenVisible>
        </div>
      </section>

      <section
        className="why-section relative overflow-hidden"
        aria-labelledby="resources-links-heading"
      >
        <div className="why-wrap relative">
          <FadeInWhenVisible>
            <div className="mx-auto max-w-3xl text-center">
              <SectionBadge icon={Link2} className="mx-auto">
                Quick links
              </SectionBadge>
              <h2 id="resources-links-heading" className="why-heading font-display">
                Continue where you need to{" "}
                <HeadingAccent>go</HeadingAccent>
              </h2>
            </div>
          </FadeInWhenVisible>

          <StaggerChildren className="about-pillar-grid landing-to-content mx-auto grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
            {quickLinks.map((item, index) => (
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
            <div className="features-search-panel solutions-editions-panel relative overflow-hidden text-center">
              <div className="solutions-editions-deco" aria-hidden="true" />
              <div className="solutions-editions-copy relative z-[1]">
                <h2 className="features-search-heading relative z-[1] font-display">
                  Ready to work in Worknaro?
                </h2>
                <p className="features-search-lead relative z-[1]">
                  Create a workspace in the application—accounts, billing, and data stay there.
                </p>
              </div>
              <div className="landing-cta-row relative z-[1] mt-8 flex flex-wrap items-center justify-center gap-3">
                <a href={djangoRoutes.register()} className="hero-cta-primary hero-btn btn-shine">
                  Get Started
                  <span aria-hidden="true">→</span>
                </a>
                <a href={djangoRoutes.login()} className="hero-cta-secondary hero-btn">
                  Sign In
                </a>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
      </div>
    </>
  );
}
