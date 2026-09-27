"use client";

import { IntegrationHub } from "@/components/IntegrationHub";
import { FeatureShowcaseSection } from "@/components/showcase/FeatureShowcaseSection";
import { featureSections } from "@/lib/content";

export function FeatureShowcase() {
  const projects = featureSections.find((section) => section.id === "projects")!;
  const collaboration = featureSections.find((section) => section.id === "collaboration")!;
  const operations = featureSections.find((section) => section.id === "time-budget")!;

  return (
    <section className="showcase-section relative overflow-hidden">
      <div className="showcase-deco showcase-deco-left" aria-hidden="true">
        <span className="showcase-deco-blob" />
        <span className="showcase-deco-dots" />
      </div>
      <div className="showcase-deco showcase-deco-right" aria-hidden="true">
        <span className="showcase-deco-blob" />
        <span className="showcase-deco-dots" />
      </div>

      <div className="why-wrap relative landing-stack-blocks">
        <FeatureShowcaseSection feature={projects} accent="blue" />
      </div>

      <IntegrationHub />

      <div className="why-wrap relative landing-stack-blocks">
        <FeatureShowcaseSection
          feature={collaboration}
          accent="teal"
          reverse
          cta
        />
        <FeatureShowcaseSection feature={operations} accent="purple" />
      </div>
    </section>
  );
}
