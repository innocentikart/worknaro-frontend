"use client";

import { motion } from "framer-motion";
import { LayoutGrid } from "lucide-react";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { SectionBadge } from "@/components/ui/SectionBadge";
import {
  FEATURE_STAGES,
  type FeatureStageId,
  stageIndexForProgress,
} from "@/components/product-features/featureStages";

export function FeatureStoryCopy({
  progress,
  reducedMotion,
}: {
  progress: number;
  reducedMotion?: boolean;
}) {
  const active = stageIndexForProgress(reducedMotion ? 0 : progress);

  return (
    <div className="pfs-copy">
      <SectionBadge icon={LayoutGrid}>Product Features</SectionBadge>
      <h2 id="pfs-heading" className="pfs-heading font-display">
        Everything your team does{" "}
        <HeadingAccent>stays connected.</HeadingAccent>
      </h2>
      <p className="pfs-lead">
        From the people doing the work to the projects, tasks, time and budget
        behind it — Worknaro keeps the complete picture together.
      </p>

      <div className="pfs-stage-list" role="list">
        {FEATURE_STAGES.map((stage, index) => {
          const isActive = index === active;
          return (
            <div
              key={stage.id}
              role="listitem"
              className={`pfs-stage-item ${isActive ? "is-active" : ""}`}
              aria-current={isActive ? "true" : undefined}
            >
              <span className="pfs-stage-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="pfs-stage-body">
                <h3 className="pfs-stage-title">{stage.title}</h3>
                <motion.p
                  className="pfs-stage-desc"
                  initial={false}
                  animate={{
                    opacity: isActive || reducedMotion ? 1 : 0.45,
                    height: isActive || reducedMotion ? "auto" : 0,
                  }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  {stage.description}
                </motion.p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function FeatureStoryProgress({
  progress,
  activeId,
}: {
  progress: number;
  activeId: FeatureStageId;
}) {
  return (
    <div className="pfs-progress" aria-hidden="true">
      <div className="pfs-progress-track">
        <div
          className="pfs-progress-fill"
          style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
        />
      </div>
      <div className="pfs-progress-labels">
        {FEATURE_STAGES.map((stage) => (
          <span
            key={stage.id}
            className={`pfs-progress-label ${stage.id === activeId ? "is-active" : ""}`}
          >
            {stage.label}
          </span>
        ))}
      </div>
    </div>
  );
}
