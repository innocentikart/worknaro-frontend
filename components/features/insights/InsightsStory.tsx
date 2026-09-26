"use client";

import { ScrollProductStory } from "@/components/features/story/ScrollProductStory";
import { InsightsCanvas } from "@/components/features/insights/InsightsCanvas";
import { INSIGHTS_STAGES } from "@/components/features/insights/insightsStages";

export function InsightsStory({
  id = "insights",
  compact,
}: {
  id?: string;
  compact?: boolean;
}) {
  return (
    <ScrollProductStory
      id={id}
      eyebrow="AI-powered insights"
      heading="Turn project activity"
      accent="into useful insight."
      lead={
        compact
          ? "Activity becomes a pattern, then an insight, then a next step — when AI Insights is enabled."
          : "Let Organitio help your team understand what is happening across projects, identify important patterns, and act on what matters—when AI Insights is enabled."
      }
      stages={INSIGHTS_STAGES}
      durationMs={compact ? 7000 : 10000}
      compact={compact}
      renderCanvas={(progress, reducedMotion) => (
        <InsightsCanvas progress={progress} reducedMotion={reducedMotion} />
      )}
    />
  );
}
