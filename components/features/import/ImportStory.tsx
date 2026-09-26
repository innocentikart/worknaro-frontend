"use client";

import { CenteredProductStory } from "@/components/features/story/CenteredProductStory";
import { ImportCanvas } from "@/components/features/import/ImportCanvas";
import {
  IMPORT_MOBILE_STAGES,
  IMPORT_STAGES,
} from "@/components/features/import/importStages";

export function ImportStory({
  id = "import",
  compact,
}: {
  id?: string;
  compact?: boolean;
}) {
  return (
    <CenteredProductStory
      id={id}
      eyebrow="Easy migration"
      heading="Bring your work"
      accent="with you."
      lead={
        compact
          ? "Bring existing projects, tasks, and workflows into Organitio from CSV, Excel, or JSON."
          : "Move your existing projects, tasks, and team workflows into Organitio without rebuilding everything from scratch. Import CSV, Excel, or JSON today—native connectors are not available yet."
      }
      stages={IMPORT_STAGES}
      mobileStages={IMPORT_MOBILE_STAGES}
      durationMs={compact ? 7000 : 10000}
      renderCanvas={(progress, reducedMotion) => (
        <ImportCanvas progress={progress} reducedMotion={reducedMotion} />
      )}
    />
  );
}
