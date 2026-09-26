"use client";

import { motion } from "framer-motion";
import { StageLayer } from "@/components/features/story/StageLayer";
import { VizChrome } from "@/components/features/story/VizChrome";
import {
  BOARD_STAGES,
  CALENDAR_STAGES,
  GANTT_STAGES,
  PROJECT_STAGES,
} from "@/components/features/modules/catalog";
import {
  scenePresence,
  stageIndexForProgress,
} from "@/components/features/story/storyUtils";

const MEMBERS = [
  { initials: "SJ", name: "Sarah", role: "Manager" },
  { initials: "AX", name: "Alex", role: "Contributor" },
  { initials: "DV", name: "David", role: "Viewer" },
];

const PROJECT_TASKS = [
  { name: "Homepage design", status: "Completed" },
  { name: "Hero section", status: "In Progress" },
  { name: "API checklist", status: "To Do" },
];

export function ProjectCanvas({
  progress,
  reducedMotion,
}: {
  progress: number;
  reducedMotion?: boolean;
}) {
  const index = stageIndexForProgress(PROJECT_STAGES, progress);
  const live = scenePresence(progress, 0.75, 1.05);
  const showTeam = progress >= 0.22;
  const showWork = progress >= 0.48;
  const showLive = progress >= 0.72;

  return (
    <div className="pfs-viz mst-viz" aria-live="polite">
      <VizChrome title="Organitio · New project" badge={PROJECT_STAGES[index].label} />
      <div className="mst-stage mst-construct">
        <div className={`mst-project ${showLive ? "is-live" : ""}`}>
          <div className="mst-project-head">
            <div>
              <p className="mst-kicker">Client project</p>
              <h3>Website Redesign</h3>
              <p className="mst-meta">WR-204 · Not started · High</p>
            </div>
            {showLive ? <span className="pfs-chip">{live > 0.5 ? "64%" : "0%"}</span> : null}
          </div>

          {showTeam ? (
            <ul className="mst-people">
              {MEMBERS.map((member) => (
                <li key={member.initials}>
                  <span className="pfs-avatar pfs-avatar-blue">{member.initials}</span>
                  <span>
                    <strong>{member.name}</strong>
                    <em>{member.role}</em>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mst-empty">Add members to this project</p>
          )}

          {showWork ? (
            <ul className="mst-mini-list">
              {PROJECT_TASKS.map((task) => (
                <li key={task.name}>
                  <span>{task.name}</span>
                  <strong>{task.status}</strong>
                </li>
              ))}
            </ul>
          ) : null}

          {showLive ? (
            <div className="mst-project-foot">
              <span>12 Sep – 30 Oct</span>
              <span>Budget · Tier 2</span>
              <span>Milestone · Launch</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const BOARD_COLUMNS = [
  { key: "not_started", label: "Backlog" },
  { key: "pending", label: "To Do" },
  { key: "in_progress", label: "In Progress" },
  { key: "on_hold", label: "Review" },
  { key: "completed", label: "Completed" },
] as const;

function boardColumn(progress: number) {
  if (progress >= 0.75) return 4;
  if (progress >= 0.5) return 3;
  if (progress >= 0.25) return 2;
  return 1;
}

export function BoardCanvas({
  progress,
  reducedMotion,
}: {
  progress: number;
  reducedMotion?: boolean;
}) {
  const index = stageIndexForProgress(BOARD_STAGES, progress);
  const col = boardColumn(progress);
  const x = `${col * 20}%`;

  return (
    <div className="pfs-viz mst-viz" aria-live="polite">
      <VizChrome title="Organitio · Workflow board" badge={BOARD_STAGES[index].label} />
      <div className="mst-stage mst-board">
        <div className="mst-board-cols">
          {BOARD_COLUMNS.map((column) => (
            <div key={column.key}>
              <p>{column.label}</p>
              {column.key === "pending" && col === 1 ? <span className="mst-slot" /> : null}
              {column.key === "in_progress" && col === 2 ? <span className="mst-slot" /> : null}
              {column.key === "on_hold" && col === 3 ? <span className="mst-slot" /> : null}
              {column.key === "completed" && col === 4 ? <span className="mst-slot is-done" /> : null}
            </div>
          ))}
          <motion.article
            className="mst-board-card"
            initial={false}
            animate={{ left: `calc(${x} + 0.35rem)` }}
            transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <strong>Hero section</strong>
            <span>Alex · High · WR-204</span>
          </motion.article>
        </div>
        <p className="mst-note">
          {col === 4
            ? "Completed · activity updated"
            : col === 3
              ? "On hold · shown as Review"
              : col === 2
                ? "Status → in_progress"
                : "Pending · To Do"}
        </p>
      </div>
    </div>
  );
}

const CAL_DAYS = [15, 16, 17, 18, 19, 22, 23, 24];

export function CalendarCanvas({
  progress,
  reducedMotion,
}: {
  progress: number;
  reducedMotion?: boolean;
}) {
  const index = stageIndexForProgress(CALENDAR_STAGES, progress);
  const focus = progress >= 0.72 ? 24 : 18;
  const showPreview = progress >= 0.25;

  return (
    <div className="pfs-viz mst-viz" aria-live="polite">
      <VizChrome title="Organitio · Calendar" badge={CALENDAR_STAGES[index].label} />
      <div className="mst-stage mst-cal">
        <div className="mst-cal-grid">
          {CAL_DAYS.map((day) => (
            <button
              key={day}
              type="button"
              tabIndex={-1}
              className={day === focus ? "is-active" : day === 18 || day === 24 ? "has-work" : ""}
            >
              <span>{day}</span>
              {day === 18 ? <i>Task</i> : null}
              {day === 24 ? <i>Milestone</i> : null}
            </button>
          ))}
        </div>
        {showPreview ? (
          <aside className="mst-cal-preview">
            <p className="mst-kicker">{focus === 24 ? "Milestone" : "Task"}</p>
            <strong>{focus === 24 ? "Launch milestone" : "Hero section"}</strong>
            <p>Website Redesign · {focus === 24 ? "Due 24 Sep" : "Due 18 Sep · Alex"}</p>
            <span className="ffs-action-btn">Open record</span>
          </aside>
        ) : null}
        {!reducedMotion && !showPreview ? (
          <p className="mst-note">Project dates, open tasks, and milestones</p>
        ) : null}
      </div>
    </div>
  );
}

const GANTT_ROWS = [
  { name: "Homepage design", start: 6, width: 26, done: true },
  { name: "Hero section", start: 36, width: 24, done: false },
  { name: "API checklist", start: 64, width: 16, done: false },
] as const;

const GANTT_TICKS = [
  { label: "8", at: 6 },
  { label: "15", at: 32 },
  { label: "22", at: 60 },
  { label: "24", at: 80, mile: true },
  { label: "29", at: 94 },
] as const;

function ganttElbow(fromRow: number, toRow: number, x1: number, x2: number, rows: number) {
  const mid = (fromRow + 0.5) * (100 / rows);
  const dest = (toRow + 0.5) * (100 / rows);
  const stub = Math.max(x1 + 2.4, (x1 + x2) / 2);
  return `M ${x1} ${mid} H ${stub} V ${dest} H ${x2}`;
}

export function GanttCanvas({
  progress,
  reducedMotion,
}: {
  progress: number;
  reducedMotion?: boolean;
}) {
  const index = stageIndexForProgress(GANTT_STAGES, progress);
  const showBars = progress >= 0.22;
  const showLinks = progress >= 0.48;
  const showMiles = progress >= 0.72;
  const motionMs = reducedMotion ? 0 : 0.5;

  return (
    <div className="pfs-viz mst-viz" aria-live="polite">
      <VizChrome title="Organitio · Gantt" badge={GANTT_STAGES[index].label} />
      <div className="mst-stage mst-gantt">
        <div className="mst-gantt-head">
          <p className="mst-kicker">Website Redesign</p>
          <span>September</span>
        </div>

        {showMiles ? (
          <div className="mst-gantt-group">
            <i aria-hidden="true" />
            <strong>Launch</strong>
            <em>24 Sep</em>
          </div>
        ) : null}

        <div className="mst-gantt-table">
          <div className="mst-gantt-side" aria-hidden={false}>
            {GANTT_ROWS.map((row) => (
              <span key={row.name}>{row.name}</span>
            ))}
          </div>

          <div className="mst-gantt-main">
            <div className="mst-gantt-ruler" aria-hidden="true">
              {GANTT_TICKS.map((tick) => (
                <span
                  key={tick.label}
                  className={tick.mile && showMiles ? "is-mile" : ""}
                  style={{ left: `${tick.at}%` }}
                >
                  {tick.label}
                </span>
              ))}
            </div>

            <div className="mst-gantt-lanes">
              {GANTT_ROWS.map((row) => (
                <div key={row.name} className="mst-gantt-track">
                  {showBars ? (
                    <motion.b
                      initial={false}
                      animate={{
                        left: `${row.start}%`,
                        width: `${row.width}%`,
                        opacity: 1,
                      }}
                      transition={{ duration: motionMs, ease: [0.22, 1, 0.36, 1] }}
                      className={row.done ? "is-done" : ""}
                    />
                  ) : (
                    <em />
                  )}
                </div>
              ))}

              {showLinks ? (
                <svg
                  className="mst-gantt-links"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <motion.path
                    d={ganttElbow(0, 1, 32, 36, GANTT_ROWS.length)}
                    initial={{ pathLength: reducedMotion ? 1 : 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: motionMs, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <motion.path
                    d={ganttElbow(1, 2, 60, 64, GANTT_ROWS.length)}
                    initial={{ pathLength: reducedMotion ? 1 : 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      duration: motionMs,
                      delay: reducedMotion ? 0 : 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </svg>
              ) : null}

              {showMiles ? (
                <span className="mst-gantt-mile" style={{ left: "80%" }}>
                  <b />
                </span>
              ) : null}
            </div>
          </div>
        </div>

        {showLinks ? (
          <p className="mst-gantt-caption">
            Finish-to-start links
            <span>Display-only</span>
          </p>
        ) : null}
      </div>
    </div>
  );
}
