"use client";

import { motion } from "framer-motion";
import { INSIGHTS_STAGES } from "@/components/features/insights/insightsStages";
import { stageIndexForProgress } from "@/components/features/story/storyUtils";
import { STORY_PROJECT } from "@/components/product-features/featureStages";
import { VisitorAvatar } from "@/components/ui/VisitorAvatar";
import { VISITOR_AVATARS } from "@/lib/visitor-avatars";

type ActivityKind =
  | "completed"
  | "overdue"
  | "blocked"
  | "deadline"
  | "assign"
  | "milestone"
  | "time";

type ActivityRow = {
  id: string;
  kind: ActivityKind;
  actor: string;
  initials: string;
  accent: "blue" | "teal" | "purple";
  action: string;
  time: string;
  linked?: boolean;
  avatar?: string;
};

const ACTIVITIES: ActivityRow[] = [
  {
    id: "done",
    kind: "completed",
    actor: "Sarah",
    initials: "SJ",
    accent: "blue",
    action: "completed Homepage Design",
    time: "2m",
    avatar: VISITOR_AVATARS.coral,
  },
  {
    id: "overdue",
    kind: "overdue",
    actor: "Hero section",
    initials: "HS",
    accent: "purple",
    action: "is 4 days overdue",
    time: "Now",
    linked: true,
  },
  {
    id: "blocked",
    kind: "blocked",
    actor: "API Integration",
    initials: "API",
    accent: "purple",
    action: "is blocked by Hero section",
    time: "Today",
    linked: true,
  },
  {
    id: "deadline",
    kind: "deadline",
    actor: "QA review",
    initials: "QA",
    accent: "teal",
    action: "deadline is approaching",
    time: "2d",
  },
  {
    id: "time",
    kind: "time",
    actor: "Sarah",
    initials: "SJ",
    accent: "blue",
    action: "logged 8h on Homepage Design",
    time: "1h",
    avatar: VISITOR_AVATARS.coral,
  },
  {
    id: "assign",
    kind: "assign",
    actor: "David",
    initials: "DO",
    accent: "teal",
    action: "was assigned the QA pass",
    time: "14m",
    avatar: VISITOR_AVATARS.green,
  },
  {
    id: "milestone",
    kind: "milestone",
    actor: "Launch milestone",
    initials: "LN",
    accent: "purple",
    action: "slipped 3 days",
    time: "Today",
    linked: true,
  },
];

const KIND_LABEL: Record<ActivityKind, string> = {
  completed: "Done",
  overdue: "Overdue",
  blocked: "Blocked",
  deadline: "Deadline",
  assign: "Assigned",
  milestone: "Milestone",
  time: "Time",
};

export function InsightsCanvas({
  progress,
  reducedMotion,
}: {
  progress: number;
  reducedMotion?: boolean;
}) {
  const index = stageIndexForProgress(INSIGHTS_STAGES, progress);
  const stage = INSIGHTS_STAGES[index].id;
  const showContext = stage !== "activity";
  const analyzing = stage === "analysis";
  const showInsight = stage === "insight" || stage === "action";
  const showAction = stage === "action";
  const rows = showInsight ? ACTIVITIES.filter((row) => row.linked) : ACTIVITIES;

  return (
    <div className={`pfs-viz ffs-viz is-${stage}`} aria-live="polite">
      <div className="pfs-viz-chrome">
        <span className="pfs-viz-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="pfs-viz-title">Worknaro · {STORY_PROJECT.name}</span>
        <span className="pfs-viz-badge">{INSIGHTS_STAGES[index].label}</span>
      </div>

      <div className={`ffs-insights-body ${showInsight ? "has-insight" : ""}`}>
        <div className="pfs-panel ffs-activity-panel">
          <div className="pfs-panel-header">
            <span className="pfs-panel-eyebrow">{STORY_PROJECT.code}</span>
            {analyzing ? (
              <span className="ffs-analyzing">Analyzing project activity…</span>
            ) : (
              <span className="pfs-chip">{showInsight ? "64%" : "71%"}</span>
            )}
          </div>

          <div className={`ffs-activity-frame ${showContext ? "has-connectors" : ""}`}>
            {showContext ? (
              <svg className="ffs-connectors" viewBox="0 0 12 100" aria-hidden="true">
                <path
                  d="M6 14 V 86"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                />
                <circle cx="6" cy="14" r="2.4" />
                <circle cx="6" cy="50" r="2.4" />
                <circle cx="6" cy="86" r="2.4" />
              </svg>
            ) : null}

            <ul className="pfs-activity-list">
              {rows.map((item) => {
                const quiet = (analyzing || showInsight) && !item.linked;
                const linked = showContext && Boolean(item.linked);
                return (
                  <motion.li
                    key={item.id}
                    layout
                    className={`pfs-activity-row ffs-activity-row ${
                      linked ? "is-linked" : ""
                    } ${quiet ? "is-quiet" : ""}`}
                    initial={false}
                    animate={{
                      opacity: quiet ? 0.28 : 1,
                      y: 0,
                    }}
                    transition={{ duration: reducedMotion ? 0 : 0.35 }}
                  >
                    <span
                      className={`pfs-avatar ${item.avatar ? "has-image" : `pfs-avatar-${item.accent}`}`}
                      aria-hidden="true"
                    >
                      {item.avatar ? <VisitorAvatar src={item.avatar} /> : item.initials}
                    </span>
                    <div className="pfs-activity-copy">
                      <p className="pfs-activity-action">
                        <strong>{item.actor}</strong> {item.action}
                      </p>
                      <p className="pfs-activity-meta">{KIND_LABEL[item.kind]}</p>
                    </div>
                    <span className="pfs-activity-time">{item.time}</span>
                  </motion.li>
                );
              })}
            </ul>

            {analyzing && !reducedMotion ? (
              <span className="ffs-scan" aria-hidden="true" />
            ) : null}
          </div>
        </div>

        {showInsight ? (
          <motion.aside
            className="pfs-panel ffs-insight-panel"
            initial={reducedMotion ? false : { opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="ffs-health-kicker">AI Insight</p>
            <p className="ffs-health-label">Potential schedule risk detected.</p>
            <p className="ffs-health-meta">
              Based on overdue tasks, blocked dependencies, and milestone pressure.
            </p>

            <ul className="ffs-insight-metrics">
              <li>
                <strong>3</strong> tasks overdue
              </li>
              <li>
                <strong>2</strong> dependencies blocked
              </li>
              <li>
                <strong>1</strong> milestone approaching
              </li>
            </ul>

            {showAction ? (
              <div className="ffs-action">
                <p className="ffs-action-kicker">Recommended next step</p>
                <p>Review overdue tasks.</p>
                <span className="ffs-action-btn">Open overdue tasks</span>
              </div>
            ) : null}
          </motion.aside>
        ) : null}
      </div>
    </div>
  );
}
