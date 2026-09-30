"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Crown,
  LayoutGrid,
} from "lucide-react";
import {
  FadeInWhenVisible,
  StaggerChildren,
} from "@/components/ui/AnimatedSection";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { ThemeProductImage } from "@/components/ui/ThemeProductImage";
import { resourceCards } from "@/lib/content";

type ResourceCardItem = (typeof resourceCards)[number];

const CATEGORY_ICONS = {
  blue: LayoutGrid,
  emerald: Crown,
  purple: BookOpen,
} as const;

function BrowserChrome() {
  return (
    <div className="resources-chrome resources-chrome-light" aria-hidden="true">
      <span />
      <span />
      <span />
      <div className="resources-chrome-bar" />
    </div>
  );
}

function ResourcePreview({
  lightSrc,
  darkSrc,
  alt,
  width,
  height,
}: {
  lightSrc: string;
  darkSrc: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <div className="resources-preview-shell">
      <div className="resources-billing-frame">
        <BrowserChrome />
        <div className="resources-billing-stage">
          <ThemeProductImage
            lightSrc={lightSrc}
            darkSrc={darkSrc}
            alt={alt}
            width={width}
            height={height}
            className="resources-billing-image"
            sizes="(max-width: 1080px) 90vw, 360px"
          />
        </div>
      </div>
    </div>
  );
}

function ResourceCard({ item }: { item: ResourceCardItem }) {
  const Icon = CATEGORY_ICONS[item.accent] ?? LayoutGrid;
  const lightSrc = item.image;
  const darkSrc = item.imageDark;
  const previewAlt =
    item.preview === "product"
      ? "Worknaro platform capabilities"
      : item.preview === "pricing"
        ? "Worknaro billing plans: Free, Starter, Pro, and Enterprise"
        : "Worknaro guides and links";
  const previewSize =
    item.preview === "product"
      ? { width: 960, height: 540 }
      : item.preview === "pricing"
        ? { width: 1024, height: 481 }
        : { width: 1357, height: 646 };

  return (
    <Link
      href={item.href}
      className={`resources-card resources-card-${item.accent} group flex h-full flex-col overflow-hidden`}
    >
      <div className="resources-media">
        <ResourcePreview
          lightSrc={lightSrc}
          darkSrc={darkSrc}
          alt={previewAlt}
          width={previewSize.width}
          height={previewSize.height}
        />
      </div>

      <div className="resources-card-body flex flex-1 flex-col">
        <div className="resources-category-row">
          <span className="resources-category-icon" aria-hidden="true">
            <Icon size={14} strokeWidth={2.25} />
          </span>
          <p className="resources-category">{item.category}</p>
        </div>

        <h3 className="resources-card-title">{item.title}</h3>
        <p className="resources-card-copy flex-1">{item.excerpt}</p>

        <span className="resources-learn">
          {item.cta}
          <ArrowRight className="resources-learn-arrow" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export function ResourcesPreview() {
  return (
    <section
      className="resources-section relative overflow-hidden"
      aria-labelledby="resources-heading"
    >
      <div className="why-wrap relative">
        <FadeInWhenVisible>
          <div className="mx-auto max-w-3xl text-center">
            <SectionBadge icon={BookOpen} className="mx-auto">
              Resources
            </SectionBadge>
            <h2
              id="resources-heading"
              className="resources-heading font-display text-balance"
            >
              Learn more about{" "}
              <HeadingAccent>Worknaro</HeadingAccent>
            </h2>
            <p className="resources-lead mx-auto">
              Explore product capabilities, plans, and guides—or continue into
              the authenticated application.
            </p>
          </div>
        </FadeInWhenVisible>

        <StaggerChildren className="resources-grid landing-to-content">
          {resourceCards.map((item) => (
            <FadeInWhenVisible key={item.href} className="h-full">
              <ResourceCard item={item} />
            </FadeInWhenVisible>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
