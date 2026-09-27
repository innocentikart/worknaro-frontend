"use client";

import { useReducedMotion } from "framer-motion";
import {
  FeatureStoryCopy,
  FeatureStoryProgress,
} from "@/components/product-features/FeatureStoryCopy";
import {
  FEATURE_STAGES,
  stageIndexForProgress,
} from "@/components/product-features/featureStages";
import { StoryCanvas } from "@/components/product-features/visualization/StoryCanvas";
import { useAutoPlayStory } from "@/components/features/story/useAutoPlayStory";
import { HeadingAccent } from "@/components/ui/HeadingAccent";

/**
 * Homepage product story. Viewport-triggered, then plays on its own.
 * Plan → Organize → Collaborate → Track → Understand
 */
export function ProductFeaturesStory() {
  const reduce = useReducedMotion();
  const { ref, progress } = useAutoPlayStory({
    durationMs: 12000,
    reducedMotion: !!reduce,
  });

  const active = stageIndexForProgress(reduce ? 0.92 : progress);
  const activeId = FEATURE_STAGES[active].id;

  return (
    <section
      ref={ref}
      className="pfs-section"
      aria-labelledby="pfs-heading"
    >
      <div className="pfs-scroll-track is-autoplay">
        <div className="pfs-sticky">
          <div className="pfs-deco pfs-deco-left" aria-hidden="true">
            <span className="pfs-deco-blob" />
          </div>
          <div className="pfs-deco pfs-deco-right" aria-hidden="true">
            <span className="pfs-deco-blob" />
          </div>

          <div className="why-wrap pfs-shell">
            <div className="pfs-layout">
              <div className="pfs-left">
                <FeatureStoryCopy progress={progress} reducedMotion={!!reduce} />
                {!reduce ? (
                  <FeatureStoryProgress progress={progress} activeId={activeId} />
                ) : null}
              </div>

              <div className="pfs-right pfs-desktop-viz">
                <StoryCanvas progress={progress} reducedMotion={!!reduce} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pfs-mobile">
        <div className="why-wrap">
          <div className="pfs-mobile-intro">
            <p className="trust-eyebrow">
              <span className="trust-eyebrow-line" aria-hidden="true" />
              Product Features
              <span className="trust-eyebrow-line" aria-hidden="true" />
            </p>
            <h2 className="pfs-heading font-display">
              Everything your team does{" "}
              <HeadingAccent>stays connected.</HeadingAccent>
            </h2>
            <p className="pfs-lead">
              From the people doing the work to the projects, tasks, time and
              budget behind it — Worknaro keeps the complete picture together.
            </p>
          </div>

          <div className="pfs-mobile-tabs" aria-label="Feature stages">
            {FEATURE_STAGES.map((stage, index) => (
              <span
                key={stage.id}
                className={`pfs-mobile-tab ${index === active ? "is-active" : ""}`}
              >
                {stage.label}
              </span>
            ))}
          </div>

          <div className="pfs-mobile-panel">
            <h3 className="pfs-stage-title">{FEATURE_STAGES[active].title}</h3>
            <p className="pfs-stage-desc is-open">
              {FEATURE_STAGES[active].description}
            </p>
            <div className="pfs-mobile-viz">
              <StoryCanvas progress={progress} reducedMotion={!!reduce} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
