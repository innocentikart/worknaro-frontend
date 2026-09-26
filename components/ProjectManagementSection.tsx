"use client";

import {
  FeatureShowcaseSection,
  buildShowcaseItems,
  type FeatureShowcaseSectionProps,
  type ShowcaseFeatureItem,
} from "@/components/showcase/FeatureShowcaseSection";
import { featureSections } from "@/lib/content";

export type ProjectFeatureItem = ShowcaseFeatureItem;

export type ProjectManagementSectionProps = Omit<
  FeatureShowcaseSectionProps,
  "feature" | "accent"
> & {
  feature?: (typeof featureSections)[number];
};

const projectsFeature = featureSections.find((section) => section.id === "projects")!;

/**
 * Landing “Project management” showcase — thin wrapper around the shared
 * wired FeatureShowcaseSection.
 */
export function ProjectManagementSection({
  feature = projectsFeature,
  features,
  previewKind,
}: ProjectManagementSectionProps = {}) {
  return (
    <FeatureShowcaseSection
      feature={feature}
      accent="blue"
      features={features}
      previewKind={previewKind}
    />
  );
}

export { buildShowcaseItems };
