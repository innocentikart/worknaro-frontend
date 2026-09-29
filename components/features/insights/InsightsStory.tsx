"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Activity, Lightbulb, ListTodo, ScanSearch, Sparkles } from "lucide-react";
import { StoryNote, StoryTabs } from "@/components/features/story/StoryTabs";
import { useStoryCycle } from "@/components/features/story/useStoryCycle";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Icon } from "@/components/ui/Icon";
import {
  INSIGHT_ACTIVITY,
  INSIGHT_META,
  INSIGHT_METRICS,
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
      className={`ais-section mig-section scroll-mt-24${compact ? " is-compact" : ""}`}
      aria-labelledby={headingId}
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="why-wrap ais-wrap">
        <div className="mig-intro ais-intro">
          <SectionBadge icon={Sparkles} className="mx-auto">
            AI-powered insights
          </SectionBadge>
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
          data-tab={tab}
        >
          {!compact ? (
            <div className="ais-hero">
              <span className="ais-hero-icon" aria-hidden="true">
                <Icon icon={Sparkles} size={20} strokeWidth={1.8} />
              </span>
              <div>
                <p className="ais-hero-heading font-display">
                  Work data becomes something you can act on.
                </p>
                <p className="ais-hero-lead">
                  When AI Insights is enabled, Worknaro reviews project and task activity — not
                  comments, files, or invoices — and points back to the work.
                </p>
              </div>
            </div>
          ) : null}

          <div className="ais-stage">
            <article className={`ais-pane ${!showInsight ? "is-focus" : ""}`}>
              <header className="ais-pane-head">
                <span className="ais-pane-label">
                  <Icon icon={Activity} size={14} strokeWidth={2} />
                  WR-204 · Project activity
                </span>
                {analyzing ? (
                  <span className="ais-chip is-live">Reviewing activity</span>
                ) : (
                  <span className="ais-chip">Website Redesign</span>
                )}
              </header>

              <ul className="ais-feed">
                {INSIGHT_ACTIVITY.map((row) => {
                  const quiet = (analyzing || showInsight) && !row.linked;
                  const linked = (analyzing || showInsight) && row.linked;
                  return (
                    <motion.li
                      key={row.id}
                      className={`${linked ? "is-linked" : ""} ${quiet ? "is-quiet" : ""}`}
                      initial={false}
                      animate={{ opacity: quiet ? 0.34 : 1 }}
                      transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
                    >
                      <span className={`ais-dot is-${row.tone}`} aria-hidden="true" />
                      <span>
                        <strong>{row.actor}</strong> {row.action}
                      </span>
                      <em>{row.time}</em>
                    </motion.li>
                  );
                })}
              </ul>
            </article>

            <aside className={`ais-pane ais-insight ${showInsight ? "is-focus" : ""}`}>
              <header className="ais-pane-head">
                <span className="ais-pane-label">
                  <Icon icon={Sparkles} size={14} strokeWidth={2} />
                  AI Insight
                </span>
                {showInsight ? <span className="ais-chip is-risk">Needs attention</span> : null}
              </header>

              <AnimatePresence initial={false} mode="wait">
                {showInsight ? (
                  <motion.div
                    key="insight"
                    className="ais-insight-body"
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.32, ease: EASE }}
                  >
                    <p className="ais-insight-title">Delivery is slowing around the review stage.</p>
                    <p className="ais-insight-why">
                      Based on overdue tasks, a blocked dependency, and a review waiting 3 days.
                    </p>
                    <ul className="ais-metrics">
                      {INSIGHT_METRICS.map((item) => (
                        <li key={item.label}>
                          <b>{item.value}</b>
                          <span>{item.label}</span>
                        </li>
                      ))}
                    </ul>
                    {showAction ? (
                      <div className="ais-next">
                        <p>Recommended next step</p>
                        <button
                          type="button"
                          className="ais-next-btn"
                          onClick={() => selectTab("action")}
                        >
                          Open overdue tasks
                        </button>
                      </div>
                    ) : null}
                  </motion.div>
                ) : (
                  <motion.p
                    key="wait"
                    className="ais-wait"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                  >
                    {analyzing
                      ? "Reviewing project and task activity — not comments, files, or invoices."
                      : "Insights appear when AI Insights is enabled in the workspace."}
                  </motion.p>
                )}
              </AnimatePresence>
            </aside>
          </div>
        </div>
        {!compact ? <StoryNote>{INSIGHT_META[tab].note}</StoryNote> : null}
      </div>
    </section>
  );
}
