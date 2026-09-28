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

function BrowserChrome({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <div className={`resources-chrome resources-chrome-${tone}`} aria-hidden="true">
      <span />
      <span />
      <span />
      <div className="resources-chrome-bar" />
    </div>
  );
}

function ProductPreview({
  lightSrc,
  darkSrc,
  alt,
}: {
  lightSrc: string;
  darkSrc: string;
  alt: string;
}) {
  return (
    <div className="resources-preview-shell resources-preview-product">
      <div className="resources-app-frame">
        <BrowserChrome tone="dark" />
        <div className="resources-app-stage">
          <ThemeProductImage
            lightSrc={lightSrc}
            darkSrc={darkSrc}
            alt={alt}
            width={960}
            height={540}
            className="resources-preview-image"
            sizes="(max-width: 1080px) 90vw, 360px"
          />
        </div>
      </div>
    </div>
  );
}

function PricingPreview({
  lightSrc,
  darkSrc,
}: {
  lightSrc: string;
  darkSrc: string;
}) {
  return (
    <div className="resources-preview-shell resources-preview-pricing">
      <div className="resources-billing-frame">
        <BrowserChrome tone="light" />
        <div className="resources-billing-stage">
          <ThemeProductImage
            lightSrc={lightSrc}
            darkSrc={darkSrc}
            alt="Worknaro billing plans: Free, Starter, Pro, and Enterprise"
            width={1024}
            height={481}
            className="resources-billing-image"
            sizes="(max-width: 1080px) 90vw, 360px"
          />
        </div>
      </div>
    </div>
  );
}

function GuidesPreview({
  lightSrc,
  darkSrc,
  alt,
}: {
  lightSrc: string;
  darkSrc: string;
  alt: string;
}) {
  return (
    <div className="resources-preview-shell resources-preview-guides">
      <div className="resources-app-frame">
        <BrowserChrome tone="dark" />
        <div className="resources-app-stage">
          <ThemeProductImage
            lightSrc={lightSrc}
            darkSrc={darkSrc}
            alt={alt}
            width={1357}
            height={646}
            className="resources-preview-image"
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
  const darkSrc = "imageDark" in item && item.imageDark ? item.imageDark : item.image;
  const previewAlt =
    item.preview === "product"
      ? "Worknaro platform projects view"
      : item.preview === "guides"
        ? "Worknaro workspaces"
        : "";

  return (
    <Link
      href={item.href}
      className={`resources-card resources-card-${item.accent} group flex h-full flex-col overflow-hidden`}
    >
      <div className="resources-media">
        {item.preview === "product" ? (
          <ProductPreview lightSrc={lightSrc} darkSrc={darkSrc} alt={previewAlt} />
        ) : item.preview === "pricing" ? (
          <PricingPreview lightSrc={lightSrc} darkSrc={darkSrc} />
        ) : (
          <GuidesPreview lightSrc={lightSrc} darkSrc={darkSrc} alt={previewAlt} />
        )}
        <span className="resources-media-glow" aria-hidden="true" />
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
      <div className="resources-ambient" aria-hidden="true" />
      <div className="resources-deco resources-deco-left" aria-hidden="true">
        <span className="resources-deco-blob" />
      </div>
      <div className="resources-deco resources-deco-right" aria-hidden="true">
        <span className="resources-deco-blob" />
      </div>

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
