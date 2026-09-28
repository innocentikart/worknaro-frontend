"use client";

import { useReducedMotion } from "framer-motion";
import { Check, FolderInput } from "lucide-react";
import { ImportCanvas } from "@/components/features/import/ImportCanvas";
import { IMPORT_STAGES } from "@/components/features/import/importStages";
import {
  IMPORT_STEPS,
  IMPORT_TABS,
  type ImportTab,
} from "@/components/features/import/importStoryData";
import { stageIndexForProgress } from "@/components/features/story/storyUtils";
import { useStoryCycle } from "@/components/features/story/useStoryCycle";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { Icon } from "@/components/ui/Icon";
import { SectionBadge } from "@/components/ui/SectionBadge";

const IMPORTING_PROGRESS = 0.36;

function tabToProgress(tabIndex: number, scene: number) {
  return Math.min(0.98, (tabIndex + scene * 0.92) / IMPORT_TABS.length);
}

function ImportStepper({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (tab: ImportTab) => void;
}) {
  return (
    <ol className="imp-stepper" aria-label="Import progress">
      {IMPORT_STEPS.map((label, index) => {
        const done = index < active;
        const current = index === active;
        return (
          <li
            key={label}
            className={done ? "is-done" : current ? "is-active" : ""}
            aria-current={current ? "step" : undefined}
          >
            <button
              type="button"
              className="imp-stepper-btn"
              onClick={() => onSelect(IMPORT_TABS[index])}
            >
              <span className="imp-stepper-mark" aria-hidden="true">
                {done ? <Icon icon={Check} size={12} strokeWidth={2.6} /> : index + 1}
              </span>
              <span className="imp-stepper-label">{label}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

export function ImportStory({
  id = "import",
  compact,
}: {
  id?: string;
  compact?: boolean;
}) {
  const reduce = useReducedMotion();
  const { ref, tab, progress: scene, selectTab, pause, resume } = useStoryCycle({
    tabs: IMPORT_TABS,
    reducedMotion: !!reduce,
    sceneMs: compact ? 2600 : 3200,
  });

  const progress = reduce
    ? IMPORTING_PROGRESS
    : tabToProgress(IMPORT_TABS.indexOf(tab), scene);
  const active = stageIndexForProgress(IMPORT_STAGES, progress);
  const headingId = `${id}-heading`;

  return (
    <section
      ref={ref}
      id={id}
      className={`imp-section mig-section scroll-mt-24${compact ? " is-compact" : ""}`}
      aria-labelledby={headingId}
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="fst-ambient" aria-hidden="true" />
      <div className="why-wrap imp-wrap">
        <div className="mig-intro imp-intro">
          <SectionBadge icon={FolderInput} className="mx-auto">
            Easy migration
          </SectionBadge>
          <h2 id={headingId} className="mig-heading font-display">
            {compact ? (
              <>
                Bring existing work <HeadingAccent>with you.</HeadingAccent>
              </>
            ) : (
              <>
                Import the workspace, <HeadingAccent>then keep going.</HeadingAccent>
              </>
            )}
          </h2>
          <p className="mig-lead">
            {compact
              ? "Bring existing projects, tasks, and workflows into Worknaro from CSV, Excel, or JSON."
              : "Move existing projects, tasks, and team workflows into Worknaro without rebuilding everything. Import CSV, Excel, or JSON today — native connectors are not available yet."}
          </p>
        </div>
        <ImportStepper active={active} onSelect={selectTab} />
        <ImportCanvas progress={progress} reducedMotion={!!reduce} compact={compact} />
      </div>
    </section>
  );
}
