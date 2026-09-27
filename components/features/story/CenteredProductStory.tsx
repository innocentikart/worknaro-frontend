"use client";

import { type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import {
  stageIndexForProgress,
  type StoryStage,
} from "@/components/features/story/storyUtils";
import { useAutoPlayStory } from "@/components/features/story/useAutoPlayStory";
import { HeadingAccent } from "@/components/ui/HeadingAccent";

export function CenteredProductStory({
  id,
  eyebrow,
  heading,
  accent,
  lead,
  stages,
  mobileStages,
  renderCanvas,
  durationMs,
}: {
  id: string;
  eyebrow: string;
  heading: string;
  accent: string;
  lead: string;
  stages: readonly StoryStage[];
  mobileStages?: readonly { id: string; label: string; progress: number }[];
  renderCanvas: (progress: number, reducedMotion: boolean) => ReactNode;
  durationMs?: number;
}) {
  const reduce = useReducedMotion();
  const { ref, progress } = useAutoPlayStory({
    durationMs: durationMs ?? Math.max(7000, stages.length * 1800),
    reducedMotion: !!reduce,
  });
  const tabs = mobileStages ?? stages.map((stage) => ({
    id: stage.id,
    label: stage.label,
    progress: (stage.start + stage.end) / 2,
  }));

  const active = stageIndexForProgress(stages, reduce ? 0.92 : progress);

  return (
    <section
      ref={ref}
      id={id}
      className="mst-section mig-section scroll-mt-24"
      aria-labelledby={`${id}-heading`}
    >
      <div className="mig-scroll-track mst-track is-autoplay">
        <div className="mig-sticky">
          <div className="why-wrap mig-shell">
            <div className="mig-intro">
              <p className="audience-eyebrow mx-auto">{eyebrow}</p>
              <h2 id={`${id}-heading`} className="mig-heading font-display">
                {heading}{" "}
                <HeadingAccent>{accent}</HeadingAccent>
              </h2>
              <p className="mig-lead">{lead}</p>
            </div>

            <div className="mig-desktop">
              {!reduce ? (
                <ol className="mig-stepper" aria-label={`${eyebrow} stages`}>
                  {stages.map((stage, index) => (
                    <li
                      key={stage.id}
                      className={index === active ? "is-active" : ""}
                    >
                      <span>{stage.label}</span>
                    </li>
                  ))}
                </ol>
              ) : null}
              {renderCanvas(progress, !!reduce)}
            </div>
          </div>
        </div>
      </div>

      <div className="mig-mobile">
        <div className="why-wrap">
          <div className="mig-intro">
            <p className="audience-eyebrow">{eyebrow}</p>
            <h2 className="mig-heading font-display">
              {heading}{" "}
              <HeadingAccent>{accent}</HeadingAccent>
            </h2>
            <p className="mig-lead">{lead}</p>
          </div>

          <div className="pfs-mobile-tabs" aria-label={`${eyebrow} stages`}>
            {tabs.map((stage, index) => (
              <span
                key={stage.id}
                className={`pfs-mobile-tab ${
                  stages[active]?.id === stage.id || index === active ? "is-active" : ""
                }`}
              >
                {stage.label}
              </span>
            ))}
          </div>

          <div className="pfs-mobile-panel">
            <div className="pfs-mobile-viz">
              {renderCanvas(progress, !!reduce)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
