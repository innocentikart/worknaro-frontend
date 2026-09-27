"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Activity, Lightbulb, ListTodo, ScanSearch } from "lucide-react";
import { StoryNote, StoryTabs } from "@/components/features/story/StoryTabs";
import { VizChrome } from "@/components/features/story/VizChrome";
import { useStoryCycle } from "@/components/features/story/useStoryCycle";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import {
  INSIGHT_ACTIVITY,
  INSIGHT_META,
  INSIGHT_TABS,
} from "@/components/features/insights/insightsStoryData";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const ICONS = {
  activity: Activity,
  analysis: ScanSearch,
  insight: Lightbulb,
  action: ListTodo,
} as const;

export function InsightsStory({
  id = "insights",
  compact,
}: {
  id?: string;
  compact?: boolean;
}) {
  const reduce = useReducedMotion();
  const { ref, tab, selectTab, pause, resume } = useStoryCycle({
    tabs: INSIGHT_TABS,
    reducedMotion: !!reduce,
    sceneMs: compact ? 2600 : 3200,
  });
  const analyzing = tab === "analysis";
  const showInsight = tab === "insight" || tab === "action";
  const showAction = tab === "action";
  const headingId = `${id}-heading`;

  return (
    <section
      ref={ref}
      id={id}
      className={`ais-section mig-section scroll-mt-24 ${compact ? "is-compact" : ""}`}
      aria-labelledby={headingId}
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="fst-ambient" aria-hidden="true" />
      <div className="why-wrap ais-wrap">
        <div className="ais-intro">
          <div>
            <p className="audience-eyebrow">AI-powered insights</p>
            <h2 id={headingId} className="mig-heading font-display">
              {compact ? (
                <>
                  Activity becomes <HeadingAccent>a next step.</HeadingAccent>
                </>
              ) : (
                <>
                  Work data becomes{" "}
                  <HeadingAccent>something you can act on.</HeadingAccent>
                </>
              )}
            </h2>
          </div>
          <p className="mig-lead">
            {compact
              ? "When AI Insights is enabled, project activity becomes a pattern, then an insight, then a next step."
              : "When AI Insights is enabled, Worknaro reviews project and task activity — delays, workload, and bottlenecks — and points back to the work."}
          </p>
        </div>

        <StoryTabs
          tabs={INSIGHT_TABS.map((item) => ({ id: item, label: INSIGHT_META[item].label }))}
          tab={tab}
          onSelect={selectTab}
          label="How AI Insights works"
          prefix={`${id}-ais`}
          icons={ICONS}
        />

        <div
          id={`${id}-ais-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-ais-tab-${tab}`}
          aria-live="polite"
          className="pfs-viz ais-viz"
        >
          <VizChrome title="Worknaro · Website Redesign" badge={INSIGHT_META[tab].label} />
          <div className={`ais-body ${showInsight ? "has-insight" : ""}`}>
            <div className="ais-feed">
              <p className="ais-kicker">
                WR-204 {analyzing ? "· Reviewing activity" : "· Project activity"}
              </p>
              <ul>
                {INSIGHT_ACTIVITY.map((row) => {
                  const quiet = (analyzing || showInsight) && !row.linked;
                  return (
                    <motion.li
                      key={row.id}
                      className={`${row.linked && (analyzing || showInsight) ? "is-linked" : ""} ${
                        quiet ? "is-quiet" : ""
                      }`}
                      animate={{ opacity: quiet ? 0.28 : 1 }}
                      transition={{ duration: reduce ? 0 : 0.3 }}
                    >
                      <strong>{row.actor}</strong>
                      <span>{row.action}</span>
                      <em>{row.time}</em>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
            <AnimatePresence initial={false}>
              {showInsight ? (
                <motion.aside
                  className="ais-card"
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <p className="ais-kicker">Insight</p>
                  <strong>Delivery is slowing around the review stage.</strong>
                  <p>Overdue work, a blocked task, and a review waiting 3 days sit together.</p>
                  <ul>
                    <li>
                      <b>3</b> tasks overdue
                    </li>
                    <li>
                      <b>2</b> dependencies blocked
                    </li>
                    <li>
                      <b>1</b> review waiting
                    </li>
                  </ul>
                  {showAction ? (
                    <div className="ais-action">
                      <p>Recommended next step</p>
                      <span className="ffs-action-btn">Open overdue tasks</span>
                    </div>
                  ) : null}
                </motion.aside>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
        {!compact ? <StoryNote>{INSIGHT_META[tab].note}</StoryNote> : null}
      </div>
    </section>
  );
}
