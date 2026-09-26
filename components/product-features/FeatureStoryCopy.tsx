"use client";

import { motion } from "framer-motion";
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
      <p className="trust-eyebrow">
        <span className="trust-eyebrow-line" aria-hidden="true" />
        Product Features
        <span className="trust-eyebrow-line" aria-hidden="true" />
      </p>
      <h2 id="pfs-heading" className="pfs-heading font-display">
        Everything your team does{" "}
        <span className="pfs-heading-accent">stays connected.</span>
      </h2>
      <p className="pfs-lead">
        From the people doing the work to the projects, tasks, time and budget
        behind it — Organitio keeps the complete picture together.
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
