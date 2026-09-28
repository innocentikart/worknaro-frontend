"use client";

import {
  Building2,
  CalendarDays,
  CheckSquare,
  Home,
  ListOrdered,
  type LucideIcon,
} from "lucide-react";
import {
  FadeInWhenVisible,
  StaggerChildren,
} from "@/components/ui/AnimatedSection";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { PremiumModuleCard } from "@/components/cards/PremiumModuleCard";
import { SectionBadge } from "@/components/ui/SectionBadge";
import type { ModuleVisualKind } from "@/components/cards/ModuleCardVisuals";
import { howItWorksCompact } from "@/lib/content";
import { djangoRoutes } from "@/lib/site";

type StepAccent = "blue" | "teal" | "purple" | "orange";

type StepMeta = {
  accent: StepAccent;
  icon: LucideIcon;
  visual: ModuleVisualKind;
  ctaLabel: string;
  href: string;
};

const STEP_META: StepMeta[] = [
  {
    accent: "blue",
    icon: Home,
    visual: "setup",
    ctaLabel: "Setup quick-start",
    href: djangoRoutes.register(),
  },
  {
    accent: "teal",
    icon: CheckSquare,
    visual: "organize",
    ctaLabel: "Explore dashboard view",
    href: "/features",
  },
  {
    accent: "purple",
    icon: Building2,
    visual: "collaborate-step",
    ctaLabel: "Learn about roles",
    href: "/features",
  },
  {
    accent: "orange",
    icon: CalendarDays,
    visual: "track-bill",
    ctaLabel: "Try timesheet demo",
    href: "/pricing",
  },
];

export function HowItWorks({
  cmsSteps,
}: {
  cmsSteps?: Array<{ title: string; body: string }> | null;
}) {
  const steps = cmsSteps?.length
    ? cmsSteps.slice(0, 4).map((step) => ({
        title: step.title,
        description: step.body,
      }))
    : howItWorksCompact;

  const count = Math.min(steps.length, 4);

  return (
    <section className="how-section relative overflow-hidden" aria-labelledby="how-heading">
      <div className="how-ambient" aria-hidden="true" />

      <div className="how-wrap">
        <FadeInWhenVisible>
          <div className="how-intro">
            <SectionBadge icon={ListOrdered} className="mx-auto">
              How it works
            </SectionBadge>
            <h2 id="how-heading" className="how-heading how-heading-stack font-display">
              <span className="how-heading-line">
                Create a tenant workspace, organize projects and tasks,
              </span>
              <span className="how-heading-line">
                then track time and invoices in the{" "}
                <HeadingAccent>same application.</HeadingAccent>
              </span>
            </h2>
          </div>
        </FadeInWhenVisible>

        <div
          className="how-workflow"
          style={{ ["--how-count" as string]: String(count) }}
        >
          <StaggerChildren className="how-cards">
            {steps.slice(0, 4).map((step, index) => {
              const meta = STEP_META[index % STEP_META.length];
              return (
                <FadeInWhenVisible
                  key={`${step.title}-${index}`}
                  className="how-card-slot"
                  delay={index * 60}
                >
                  <PremiumModuleCard
                    title={step.title}
                    description={step.description}
                    icon={meta.icon}
                    accent={meta.accent}
                    index={index}
                    href={meta.href}
                    ctaLabel={meta.ctaLabel}
                    visual={meta.visual}
                    className="how-workflow-card"
                  />
                </FadeInWhenVisible>
              );
            })}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}
