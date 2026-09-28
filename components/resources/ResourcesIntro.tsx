"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CreditCard,
  LayoutGrid,
  Upload,
  type LucideIcon,
} from "lucide-react";
import { FadeInWhenVisible } from "@/components/ui/AnimatedSection";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { resourceCards } from "@/lib/content";

type ResourceAccent = (typeof resourceCards)[number]["accent"];

const ACCENT_ICONS: Record<ResourceAccent, LucideIcon> = {
  blue: LayoutGrid,
  emerald: CreditCard,
  purple: BookOpen,
};

const HIGHLIGHTS = [
  {
    title: "Product guides",
    description: "Learn how Worknaro works",
    href: "/features",
    icon: BookOpen,
  },
  {
    title: "Plans & pricing",
    description: "Find the right plan for you",
    href: "/pricing",
    icon: CreditCard,
  },
  {
    title: "Import your work",
    description: "CSV, Excel, or JSON into a workspace",
    href: "/features#import",
    icon: Upload,
  },
] as const;

function FeaturedAppPreview() {
  return (
    <div className="resources-intro-app" aria-hidden="true">
      <div className="resources-intro-app-chrome">
        <span className="resources-intro-app-dot" />
        <span className="resources-intro-app-dot" />
        <span className="resources-intro-app-dot" />
        <span className="resources-intro-app-brand">Worknaro</span>
      </div>
      <div className="resources-intro-app-body">
        <div className="resources-intro-app-rail">
          <span />
          <span />
          <span />
        </div>
        <div className="resources-intro-app-main">
          <span className="resources-intro-app-row" />
          <span className="resources-intro-app-row resources-intro-app-row-short" />
          <span className="resources-intro-app-tile" />
        </div>
      </div>
    </div>
  );
}

function ResourcePreview() {
  const [featured, ...rest] = resourceCards;
  const FeaturedIcon = ACCENT_ICONS[featured.accent];
  const categories = Array.from(
    new Map(resourceCards.map((item) => [item.category, item])).values(),
  );

  return (
    <div className="resources-intro-preview">
      <p className="resources-intro-preview-label">Featured</p>

      <Link
        href={featured.href}
        className={`resources-intro-featured resources-intro-featured-${featured.accent}`}
      >
        <div className="resources-intro-featured-copy">
          <span className="resources-intro-featured-icon" aria-hidden="true">
            <FeaturedIcon className="h-4 w-4" strokeWidth={1.9} />
          </span>
          <span className="resources-intro-featured-meta">Featured</span>
          <span className="resources-intro-featured-title">{featured.title}</span>
          <span className="resources-intro-featured-excerpt">{featured.excerpt}</span>
          <span className="resources-intro-featured-cta">
            {featured.cta || "Explore"}
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
          </span>
        </div>
        <FeaturedAppPreview />
      </Link>

      <div className="resources-intro-categories" aria-label="Resource categories">
        {categories.map((item, index) => (
          <Link
            key={item.category}
            href={item.href}
            className={`resources-intro-chip resources-intro-chip-${item.accent}${
              index === 0 ? " is-active" : ""
            }`}
          >
            <span className="resources-intro-chip-icon" aria-hidden="true">
              {(() => {
                const Icon = ACCENT_ICONS[item.accent];
                return <Icon className="h-3 w-3" strokeWidth={2} />;
              })()}
            </span>
            {item.category}
          </Link>
        ))}
      </div>

      <ul className="resources-intro-stack">
        {rest.map((item) => {
          const Icon = ACCENT_ICONS[item.accent];
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`resources-intro-stack-item resources-intro-stack-${item.accent}`}
              >
                <span className="resources-intro-stack-icon" aria-hidden="true">
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.95} />
                </span>
                <span className="resources-intro-stack-copy">
                  <span className="resources-intro-stack-category">{item.category}</span>
                  <span className="resources-intro-stack-title">{item.title}</span>
                </span>
                <ArrowRight
                  className="resources-intro-stack-arrow h-3.5 w-3.5"
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function ResourcesIntro() {
  return (
    <section
      className="resources-intro relative"
      aria-labelledby="resources-hero-heading"
    >
      <div className="resources-intro-bg" aria-hidden="true">
        <span className="resources-intro-glow resources-intro-glow-copy" />
        <span className="resources-intro-glow resources-intro-glow-panel" />
        <span className="resources-intro-orb resources-intro-orb-bl" />
        <span className="resources-intro-orb resources-intro-orb-tr" />
        <span className="resources-intro-orb resources-intro-orb-tr-b" />
        <span className="resources-intro-arc resources-intro-arc-a" />
        <span className="resources-intro-arc resources-intro-arc-b" />
        <span className="resources-intro-dots" />
      </div>

      <div className="resources-intro-wrap relative">
        <div className="resources-intro-grid">
          <div className="resources-intro-copy">
            <FadeInWhenVisible>
              <SectionBadge icon={BookOpen}>Worknaro Resources</SectionBadge>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={40}>
              <h1
                id="resources-hero-heading"
                className="resources-intro-heading font-display"
              >
                <span className="resources-intro-heading-line">Resources to help</span>
                <span className="resources-intro-heading-line">
                  you{" "}
                  <HeadingAccent>work smarter.</HeadingAccent>
                </span>
              </h1>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={80}>
              <p className="resources-intro-lead">
                Explore product capabilities, plans, and guides designed to help your
                team get more from Worknaro—or continue into the authenticated
                application.
              </p>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={120}>
              <a href="#library" className="resources-intro-cta">
                Explore the library
                <ArrowRight className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
              </a>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={160}>
              <ul className="resources-intro-highlights">
                {HIGHLIGHTS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.title}>
                      <Link href={item.href} className="resources-intro-highlight">
                        <span className="resources-intro-highlight-icon" aria-hidden="true">
                          <Icon className="h-3.5 w-3.5" strokeWidth={1.95} />
                        </span>
                        <span className="resources-intro-highlight-copy">
                          <span className="resources-intro-highlight-title">{item.title}</span>
                          <span className="resources-intro-highlight-desc">
                            {item.description}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </FadeInWhenVisible>
          </div>

          <FadeInWhenVisible delay={100} className="resources-intro-visual">
            <ResourcePreview />
          </FadeInWhenVisible>
        </div>

        <FadeInWhenVisible delay={200}>
          <div className="resources-intro-transition">
            <span className="resources-intro-transition-line" aria-hidden="true" />
            <p className="resources-intro-transition-label">Browse the library</p>
            <span className="resources-intro-transition-line" aria-hidden="true" />
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
