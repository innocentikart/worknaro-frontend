"use client";

import Link from "next/link";
import {
  ArrowRight,
  Layers,
  Shield,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { FadeInWhenVisible } from "@/components/ui/AnimatedSection";
import { AccentUnderline } from "@/components/ui/AccentUnderline";
import { AboutSectionBackground } from "@/components/about/AboutSectionBackground";
import { PRINCIPLE_CARDS } from "@/components/about/PrincipleShowcaseCard";
import { siteConfig } from "@/lib/site";

type ApproachItem = {
  title: string;
  icon: LucideIcon;
  tone: "blue" | "teal" | "purple" | "orange";
};

/** Existing About pillar titles — identity map, not new company claims. */
const APPROACH_ITEMS: ApproachItem[] = [
  { title: "Our product", icon: Layers, tone: "blue" },
  { title: "How we ship", icon: Workflow, tone: "teal" },
  { title: "Collaboration", icon: Users, tone: "purple" },
  { title: "Trust & access", icon: Shield, tone: "orange" },
];

function BrandStoryVisual() {
  const approach = PRINCIPLE_CARDS[0];
  const ApproachIcon = approach.icon;

  return (
    <div className="about-intro-preview">
      <p className="about-intro-preview-label">
        <span className="about-intro-eyebrow-line" aria-hidden="true" />
        Our approach
      </p>

      <Link
        href={approach.href}
        className={`about-intro-statement about-intro-statement-${approach.accent}`}
      >
        <span className="about-intro-statement-icon" aria-hidden="true">
          <ApproachIcon className="h-4 w-4" strokeWidth={2.1} />
        </span>
        <span className="about-intro-statement-meta">{approach.label}</span>
        <span className="about-intro-statement-body">
          The application is the source of truth. It connects your teams, projects,
          and data in one place.
        </span>
        <span className="about-intro-statement-cta">
          {approach.ctaLabel}
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
        </span>
        <span className="about-intro-statement-shape" aria-hidden="true" />
      </Link>

      <ul className="about-intro-pillars" aria-label="Our approach">
        {APPROACH_ITEMS.map((item, index) => {
          const Icon = item.icon;
          return (
            <li key={item.title}>
              <FadeInWhenVisible delay={140 + index * 50}>
                <a
                  href="#what-we-build"
                  className={`about-intro-pillar about-intro-pillar-${item.tone}`}
                >
                  <span className="about-intro-pillar-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="about-intro-pillar-icon" aria-hidden="true">
                    <Icon className="h-3.5 w-3.5" strokeWidth={2.1} />
                  </span>
                  <span className="about-intro-pillar-title">{item.title}</span>
                  <ArrowRight
                    className="about-intro-pillar-arrow h-3.5 w-3.5"
                    strokeWidth={2.2}
                    aria-hidden="true"
                  />
                </a>
              </FadeInWhenVisible>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function AboutIntro() {
  return (
    <section
      className="about-intro relative"
      aria-labelledby="about-hero-heading"
    >
      <AboutSectionBackground />

      <div className="about-intro-wrap relative z-10">
        <div className="about-intro-grid">
          <div className="about-intro-copy">
            <FadeInWhenVisible>
              <p className="about-intro-eyebrow">
                <span className="about-intro-eyebrow-line" aria-hidden="true" />
                About {siteConfig.name}
              </p>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={40}>
              <h1 id="about-hero-heading" className="about-intro-heading font-display">
                <span className="about-intro-heading-line">Built for the way</span>
                <span className="about-intro-heading-line">
                  <span className="about-intro-accent">
                    modern teams
                    <AccentUnderline className="about-intro-underline" wide />
                  </span>{" "}
                  work.
                </span>
              </h1>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={80}>
              <p className="about-intro-lead">
                {siteConfig.name} brings projects, clients, time, and finance together
                so teams stop splitting delivery across disconnected tools—with roles,
                invites, and billing in the same application.
              </p>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={120}>
              <a href="#what-we-build" className="about-intro-cue">
                Our story
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
              </a>
            </FadeInWhenVisible>
          </div>

          <FadeInWhenVisible delay={100} className="about-intro-visual">
            <BrandStoryVisual />
          </FadeInWhenVisible>
        </div>

        <FadeInWhenVisible delay={220}>
          <div className="about-intro-transition">
            <span className="about-intro-transition-line" aria-hidden="true" />
            <p className="about-intro-transition-label">01 — What we build</p>
            <span className="about-intro-transition-line" aria-hidden="true" />
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
