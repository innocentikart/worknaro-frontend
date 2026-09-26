"use client";

import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { AccentUnderline } from "@/components/ui/AccentUnderline";
import { LandingBackground } from "@/components/ui/LandingBackground";
import { HeroVisual } from "@/components/HeroVisual";
import { djangoRoutes } from "@/lib/site";

const trustItems = [
  "No credit card required",
  "Set up in minutes",
  "Built for teams",
] as const;

export function Hero({
  cmsHero,
}: {
  cmsHero?: {
    eyebrow?: string;
    headline_line1?: string;
    headline_line2?: string;
    description?: string;
    primary_cta_label?: string;
    secondary_cta_label?: string;
    secondary_cta_url?: string;
  } | null;
}) {
  const eyebrow = cmsHero?.eyebrow || "Work Management Platform";
  const hasCustomHeadline = Boolean(cmsHero?.headline_line1 || cmsHero?.headline_line2);
  const line1 = (cmsHero?.headline_line1 || "Everything your team needs to get").replace(
    /\s*\n\s*/g,
    " ",
  ).trim();
  const line2 = (cmsHero?.headline_line2 || "work done.").replace(/\s*\n\s*/g, " ").trim();
  const description =
    cmsHero?.description ||
    "Organitio brings projects, tasks, clients, time, finance, files, and team collaboration into one multi-tenant workspace—with roles that control who can see and change what.";
  const primaryLabel = cmsHero?.primary_cta_label || "Get Started Free";
  const secondaryLabel = cmsHero?.secondary_cta_label || "Explore Features";
  const secondaryHref = cmsHero?.secondary_cta_url || "/features";

  return (
    <section className="hero-premium relative overflow-hidden" aria-labelledby="home-hero-heading">
      <div className="hero-premium-bg" aria-hidden="true">
        <LandingBackground variant="home" />
      </div>

      <div className="hero-wrap relative pb-14 pt-4 lg:pb-20 lg:pt-8">
        <div className="hero-stage">
          <div className="hero-copy">
            <div className="animate-fade-up hero-badge">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={2} />
              {eyebrow}
            </div>

            <h1 id="home-hero-heading" className="animate-fade-up-delay hero-headline font-display">
              {hasCustomHeadline ? (
                <>
                  <span className="hero-headline-lead">{line1}</span>{" "}
                  <span className="hero-headline-accent-wrap">
                    <span className="hero-gradient-text hero-headline-accent">{line2}</span>
                    <AccentUnderline className="hero-headline-underline" wide />
                  </span>
                </>
              ) : (
                <>
                  Everything your team needs to get{" "}
                  <span className="hero-headline-accent-wrap">
                    <span className="hero-gradient-text hero-headline-accent">work done.</span>
                    <AccentUnderline className="hero-headline-underline" wide />
                  </span>
                </>
              )}
            </h1>

            <p className="animate-fade-up-delay-2 hero-description">{description}</p>

            <div className="animate-fade-up-delay-2 hero-actions">
              <a
                href={djangoRoutes.register()}
                className="hero-cta-primary hero-btn btn-shine"
              >
                {primaryLabel}
                <span aria-hidden="true">→</span>
              </a>
              <Link
                href={secondaryHref.startsWith("/") ? secondaryHref : "/features"}
                className="hero-cta-secondary hero-btn"
              >
                {secondaryLabel}
                <span className="hero-play" aria-hidden="true">
                  ▷
                </span>
              </Link>
            </div>

            <ul className="animate-fade-up-delay-3 hero-trust" aria-label="Why start with Organitio">
              {trustItems.map((item) => (
                <li key={item} className="hero-trust-item">
                  <span className="hero-trust-check" aria-hidden="true">
                    <Check className="h-3 w-3" strokeWidth={2.6} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hero-visual-wrap animate-fade-up-delay-3">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
