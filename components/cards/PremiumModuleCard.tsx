"use client";

import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import {
  ModuleCardVisual,
  type ModuleVisualKind,
} from "@/components/cards/ModuleCardVisuals";

export type ModuleCardAccent = "blue" | "teal" | "purple" | "orange";

export type PremiumModuleCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: ModuleCardAccent;
  index: number;
  href: string;
  ctaLabel: string;
  visual: ModuleVisualKind;
  className?: string;
  /** When true, the whole card is the link (CTA is non-interactive span). */
  wrapLink?: boolean;
};

function isExternalHref(href: string) {
  return href.startsWith("http") || href.includes("/accounts/");
}

/**
 * Shared premium module card — same UI language as /about pillars.
 */
export function PremiumModuleCard({
  title,
  description,
  icon,
  accent,
  index,
  href,
  ctaLabel,
  visual,
  className = "",
  wrapLink = false,
}: PremiumModuleCardProps) {
  const number = String(index + 1).padStart(2, "0");
  const external = isExternalHref(href);
  const hash = href.startsWith("#");

  const ctaInner = (
    <>
      {ctaLabel}
      <span className="about-pillar-cta-arrow" aria-hidden="true">
        <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} />
      </span>
    </>
  );

  const cta = wrapLink ? (
    <span className="about-pillar-cta">{ctaInner}</span>
  ) : external || hash ? (
    <a href={href} className="about-pillar-cta">
      {ctaInner}
    </a>
  ) : (
    <Link href={href} className="about-pillar-cta">
      {ctaInner}
    </Link>
  );

  const card = (
    <article
      className={`about-pillar-card about-pillar-card-${accent} group ${className}`.trim()}
    >
      <span className="about-pillar-blob" aria-hidden="true" />

      <div className="about-pillar-top">
        <span className="about-pillar-icon" aria-hidden="true">
          <Icon icon={icon} size={22} strokeWidth={1.9} />
        </span>
        <span className="about-pillar-num">{number}</span>
      </div>

      <h3 className="about-pillar-title">{title}</h3>
      <p className="about-pillar-desc">{description}</p>

      {cta}

      <div className="about-pillar-visual">
        <ModuleCardVisual kind={visual} />
      </div>
    </article>
  );

  if (!wrapLink) return card;

  if (external || hash) {
    return (
      <a href={href} className="block h-full no-underline">
        {card}
      </a>
    );
  }

  return (
    <Link href={href} className="block h-full no-underline">
      {card}
    </Link>
  );
}
