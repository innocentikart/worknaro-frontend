"use client";

import type { ReactNode } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import {
  FEATURE_STAGES,
  stageIndexForProgress,
  type FeatureStageId,
} from "@/components/product-features/featureStages";
import { ActivityStream } from "@/components/product-features/visualization/ActivityStream";
import { OutcomePanel } from "@/components/product-features/visualization/OutcomePanel";
import { PersonPanel } from "@/components/product-features/visualization/PersonPanel";
import { ProjectMetrics } from "@/components/product-features/visualization/ProjectMetrics";
import { ProjectPanel } from "@/components/product-features/visualization/ProjectPanel";
import { TeamPanel } from "@/components/product-features/visualization/TeamPanel";
import { WorkflowPanel } from "@/components/product-features/visualization/WorkflowPanel";

const panelTransition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1] as const,
};

function PanelShell({
  id,
  children,
}: {
  id: FeatureStageId;
  children: ReactNode;
}) {
  return (
    <motion.div
      key={id}
      className="pfs-viz-layer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={panelTransition}
    >
      {children}
    </motion.div>
  );
}

export function StoryCanvas({
  progress,
  reducedMotion,
}: {
  progress: number;
  reducedMotion?: boolean;
}) {
  const index = stageIndexForProgress(reducedMotion ? 0.5 : progress);
  const activeId = FEATURE_STAGES[index].id;
  // Keep activity emphasis into the people handoff so the selected row morphs cleanly.
  const emphasizeActivity = activeId === "activity";

  return (
    <LayoutGroup id="organitio-feature-story">
      <div className="pfs-viz" aria-live="polite">
        <div className="pfs-viz-chrome">
          <span className="pfs-viz-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="pfs-viz-title">Organitio</span>
          <span className="pfs-viz-badge">{FEATURE_STAGES[index].label}</span>
        </div>
        <div className="pfs-viz-body">
          {/* sync mode keeps outgoing/incoming panels briefly overlapping so layoutId morphs */}
          <AnimatePresence mode="sync" initial={false}>
            {activeId === "activity" ? (
              <PanelShell id="activity">
                <ActivityStream emphasize={emphasizeActivity} />
              </PanelShell>
            ) : null}
            {activeId === "people" ? (
              <PanelShell id="people">
                <PersonPanel />
              </PanelShell>
            ) : null}
            {activeId === "projects" ? (
              <PanelShell id="projects">
                <ProjectPanel />
              </PanelShell>
            ) : null}
            {activeId === "workflows" ? (
              <PanelShell id="workflows">
                <WorkflowPanel />
              </PanelShell>
            ) : null}
            {activeId === "team" ? (
              <PanelShell id="team">
                <TeamPanel />
              </PanelShell>
            ) : null}
            {activeId === "metrics" ? (
              <PanelShell id="metrics">
                <ProjectMetrics active={!reducedMotion} />
              </PanelShell>
            ) : null}
            {activeId === "outcome" ? (
              <PanelShell id="outcome">
                <OutcomePanel />
              </PanelShell>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </LayoutGroup>
  );
}
