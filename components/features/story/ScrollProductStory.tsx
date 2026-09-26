"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  stageIndexForProgress,
  type StoryStage,
} from "@/components/features/story/storyUtils";
import { useAutoPlayStory } from "@/components/features/story/useAutoPlayStory";

export function ScrollProductStory({
  id,
  eyebrow,
  heading,
  accent,
  lead,
  stages,
  renderCanvas,
  durationMs,
  compact,
}: {
  id: string;
  eyebrow: string;
  heading: string;
  accent: string;
  lead: string;
  stages: readonly StoryStage[];
  renderCanvas: (progress: number, reducedMotion: boolean) => ReactNode;
  durationMs?: number;
  compact?: boolean;
}) {
  const reduce = useReducedMotion();
  const { ref, progress } = useAutoPlayStory({
    durationMs: durationMs ?? Math.max(7000, stages.length * 1800),
    reducedMotion: !!reduce,
  });
  const active = stageIndexForProgress(stages, reduce ? 0.92 : progress);
  const activeId = stages[active].id;

  return (
    <section
      ref={ref}
      id={id}
      className="pfs-section ffs-section scroll-mt-24"
      aria-labelledby={`${id}-heading`}
    >
      <div className="pfs-scroll-track ffs-scroll-track is-autoplay">
        <div className="pfs-sticky">
          <div className="why-wrap pfs-shell">
            <div className="pfs-layout">
              <div className="pfs-left">
                <div className="pfs-copy">
                  <p className="audience-eyebrow">{eyebrow}</p>
                  <h2 id={`${id}-heading`} className="pfs-heading font-display">
                    {heading}{" "}
                    <span className="pfs-heading-accent">{accent}</span>
                  </h2>
                  <p className="pfs-lead">{lead}</p>

                  <div className={`pfs-stage-list ${compact ? "is-compact" : ""}`} role="list">
                    {stages.map((stage, index) => {
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
                                opacity: isActive || reduce ? 1 : 0.45,
                                height: isActive || reduce ? "auto" : 0,
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

                {!reduce ? (
                  <div className="pfs-progress" aria-hidden="true">
                    <div className="pfs-progress-track">
                      <div
                        className="pfs-progress-fill"
                        style={{
                          width: `${Math.min(100, Math.max(0, progress * 100))}%`,
                        }}
                      />
                    </div>
                    <div className="pfs-progress-labels">
                      {stages.map((stage) => (
                        <span
                          key={stage.id}
                          className={`pfs-progress-label ${
                            stage.id === activeId ? "is-active" : ""
                          }`}
                        >
                          {stage.label}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="pfs-right pfs-desktop-viz">
                {renderCanvas(progress, !!reduce)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pfs-mobile">
        <div className="why-wrap">
          <div className="pfs-mobile-intro">
            <p className="audience-eyebrow">{eyebrow}</p>
            <h2 className="pfs-heading font-display">
              {heading}{" "}
              <span className="pfs-heading-accent">{accent}</span>
            </h2>
            <p className="pfs-lead">{lead}</p>
          </div>

          <div className="pfs-mobile-tabs" aria-label={`${eyebrow} stages`}>
            {stages.map((stage, index) => (
              <span
                key={stage.id}
                className={`pfs-mobile-tab ${index === active ? "is-active" : ""}`}
              >
                {stage.label}
              </span>
            ))}
          </div>

          <div className="pfs-mobile-panel">
            <h3 className="pfs-stage-title">{stages[active].title}</h3>
            <p className="pfs-stage-desc is-open">{stages[active].description}</p>
            <div className="pfs-mobile-viz">
              {renderCanvas(progress, !!reduce)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
