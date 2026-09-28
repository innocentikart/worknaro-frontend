"use client";

import type { ReactNode } from "react";
import {
  CalendarDays,
  CheckSquare,
  LayoutGrid,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  FadeInWhenVisible,
  StaggerChildren,
} from "@/components/ui/AnimatedSection";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { SectionBadge } from "@/components/ui/SectionBadge";
import {
  FeatureCard,
  type FeatureAccentColor,
} from "@/components/feature-bento/FeatureCard";
import {
  ClientsProposalsPreview,
  ProjectsTasksPreview,
  TimeFinanceFilesPreview,
  WorkspaceRolesPreview,
} from "@/components/feature-bento/FeaturePreviews";
import { highlightFeatures } from "@/lib/content";

export type FeatureCardsSectionProps = {
  cmsHighlights?: Array<{ title: string; body: string }> | null;
};

type FeatureSlot = {
  key: string;
  match: RegExp;
  title: string;
  description: string;
  accentColor: FeatureAccentColor;
  icon: LucideIcon;
  href: string;
  featured?: boolean;
  split?: boolean;
  span: string;
  previewGraphic: ReactNode;
};

const DEFAULT_SLOTS: FeatureSlot[] = [
  {
    key: "projects",
    match: /project|task/i,
    title: highlightFeatures[1].title,
    description: highlightFeatures[1].description,
    accentColor: "emerald",
    icon: CheckSquare,
    href: "/#projects",
    featured: true,
    split: true,
    span: "md:col-span-2 lg:col-span-6",
    previewGraphic: <ProjectsTasksPreview />,
  },
  {
    key: "workspaces",
    match: /workspace|role/i,
    title: highlightFeatures[0].title,
    description: highlightFeatures[0].description,
    accentColor: "purple",
    icon: Users,
    href: "/features",
    split: true,
    span: "md:col-span-2 lg:col-span-4",
    previewGraphic: <WorkspaceRolesPreview />,
  },
  {
    key: "clients",
    match: /client|proposal|lead/i,
    title: highlightFeatures[2].title,
    description: highlightFeatures[2].description,
    accentColor: "indigo",
    icon: UserRound,
    href: "/features#clients",
    split: true,
    span: "md:col-span-1 lg:col-span-5",
    previewGraphic: <ClientsProposalsPreview />,
  },
  {
    key: "ops",
    match: /time|finance|file|invoice/i,
    title: highlightFeatures[3].title,
    description: highlightFeatures[3].description,
    accentColor: "orange",
    icon: CalendarDays,
    href: "/#time-budget",
    split: true,
    span: "md:col-span-1 lg:col-span-5",
    previewGraphic: <TimeFinanceFilesPreview />,
  },
];

function resolveSlots(
  cmsHighlights?: Array<{ title: string; body: string }> | null,
): FeatureSlot[] {
  if (!cmsHighlights?.length) return DEFAULT_SLOTS;

  const used = new Set<number>();
  return DEFAULT_SLOTS.map((slot) => {
    const idx = cmsHighlights.findIndex(
      (item, i) => !used.has(i) && slot.match.test(`${item.title} ${item.body}`),
    );
    if (idx >= 0) {
      used.add(idx);
      return {
        ...slot,
        title: cmsHighlights[idx].title || slot.title,
        description: cmsHighlights[idx].body || slot.description,
      };
    }

    const leftover = cmsHighlights.findIndex((_, i) => !used.has(i));
    if (leftover >= 0) {
      used.add(leftover);
      return {
        ...slot,
        title: cmsHighlights[leftover].title || slot.title,
        description: cmsHighlights[leftover].body || slot.description,
      };
    }
    return slot;
  });
}

/**
 * Premium workspace features section — asymmetric product-preview cards.
 */
export function FeatureCardsSection({ cmsHighlights }: FeatureCardsSectionProps) {
  const slots = resolveSlots(cmsHighlights);

  return (
    <section
      className="why-section relative overflow-hidden"
      aria-labelledby="why-worknaro-heading"
    >
      <div className="why-ambient" aria-hidden="true" />

      <div className="why-wrap relative">
        <FadeInWhenVisible>
          <div className="mx-auto max-w-5xl text-center">
            <SectionBadge icon={LayoutGrid} className="mx-auto">
              Workspace Features
            </SectionBadge>

            <h2
              id="why-worknaro-heading"
              className="why-heading why-heading-stack font-display"
            >
              <span className="why-heading-line">
                A workspace for the work you already
              </span>
              <span className="why-heading-line">
                run in{" "}
                <HeadingAccent>Worknaro</HeadingAccent>
              </span>
            </h2>

            <p className="why-description">
              Everything you need to organize projects, manage your team, track
              progress, and keep your business moving — all in one place.
            </p>
          </div>
        </FadeInWhenVisible>

        <StaggerChildren className="landing-to-content grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-10 lg:gap-6">
          {slots.map((slot) => (
            <FadeInWhenVisible key={slot.key} className={`h-full ${slot.span}`}>
              <FeatureCard
                title={slot.title}
                description={slot.description}
                icon={slot.icon}
                accentColor={slot.accentColor}
                href={slot.href}
                featured={slot.featured}
                split={slot.split}
                previewGraphic={slot.previewGraphic}
              />
            </FadeInWhenVisible>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
