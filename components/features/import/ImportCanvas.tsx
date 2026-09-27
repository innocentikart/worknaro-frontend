"use client";

import { motion } from "framer-motion";
import { IMPORT_STAGES } from "@/components/features/import/importStages";
import {
  scenePresence,
  stageIndexForProgress,
} from "@/components/features/story/storyUtils";

const OBJECTS = [
  { id: "projects", label: "Projects", count: "24" },
  { id: "tasks", label: "Tasks", count: "438" },
  { id: "members", label: "Members", count: "18" },
  { id: "files", label: "Files", count: "126" },
  { id: "comments", label: "Comments", count: "892" },
] as const;

const DATA_TYPES = [
  "Projects",
  "Tasks",
  "Members",
  "Comments",
  "Files",
  "Labels",
  "Statuses",
  "Due dates",
] as const;

const GENERIC_BOARD = [
  {
    column: "To Do",
    cards: [{ title: "API checklist", meta: "Alex · Backend" }],
  },
  {
    column: "Doing",
    cards: [{ title: "Homepage refresh", meta: "Due 12 Sep · Design" }],
  },
  {
    column: "Done",
    cards: [{ title: "Client review", meta: "3 comments · File" }],
  },
] as const;

const STATUS_MAP = [
  { from: "To Do", to: "Not Started" },
  { from: "Doing", to: "In Progress" },
  { from: "Done", to: "Completed" },
] as const;

const CHECKS = [
  "Statuses mapped",
  "Assignees matched",
  "Due dates recognized",
] as const;

const ORGANITIO_BOARD = [
  {
    column: "Not Started",
    cards: [{ title: "API checklist", meta: "Alex · tag: backend" }],
  },
  {
    column: "In Progress",
    cards: [{ title: "Homepage refresh", meta: "Due 12 Sep · Design" }],
  },
  {
    column: "Completed",
    cards: [{ title: "Client review", meta: "Files attached" }],
  },
] as const;

const PROGRESS_TARGETS = [
  { id: "projects", label: "Projects", target: 100, completeAt: 0.28 },
  { id: "tasks", label: "Tasks", target: 100, completeAt: 0.45 },
  { id: "members", label: "Members", target: 100, completeAt: 0.62 },
  { id: "files", label: "Files", target: 78, completeAt: 1 },
  { id: "comments", label: "Comments", target: 42, completeAt: 1 },
] as const;

function Layer({
  active,
  reducedMotion,
  children,
}: {
  active: number;
  reducedMotion?: boolean;
  children: React.ReactNode;
}) {
  const opacity = reducedMotion ? (active > 0.4 ? 1 : 0) : active;
  if (opacity < 0.04) return null;
  return (
    <motion.div
      className="mig-layer"
      initial={false}
      animate={{
        opacity,
        y: reducedMotion ? 0 : (1 - active) * 10,
      }}
      transition={{ duration: reducedMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function importFill(progress: number, completeAt: number, target: number) {
  const t = Math.min(1, Math.max(0, (progress - 0.6) / 0.08));
  return Math.round(Math.min(1, t / completeAt) * target);
}

export function ImportCanvas({
  progress,
  reducedMotion,
}: {
  progress: number;
  reducedMotion?: boolean;
}) {
  const index = stageIndexForProgress(IMPORT_STAGES, progress);
  const existing = scenePresence(progress, 0, 0.2);
  const prepare = scenePresence(progress, 0.2, 0.4);
  const map = scenePresence(progress, 0.4, 0.6);
  const importing = scenePresence(progress, 0.6, 0.8);
  const workspace = scenePresence(progress, 0.8, 1.05);

  return (
    <div className="pfs-viz mig-viz" aria-live="polite">
      <div className="pfs-viz-chrome">
        <span className="pfs-viz-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="pfs-viz-title">
          {index >= 4 ? "Worknaro · Website Redesign" : "Bring work into Worknaro"}
        </span>
        <span className="pfs-viz-badge">{IMPORT_STAGES[index].label}</span>
      </div>

      <div className="mig-stage">
        <Layer active={existing} reducedMotion={reducedMotion}>
          <div className="mig-generic">
            <div className="mig-generic-head">
              <span>Current workspace</span>
              <span>To Do · Doing · Done</span>
            </div>
            <div className="mig-generic-board">
              {GENERIC_BOARD.map((col) => (
                <div key={col.column} className="mig-col">
                  <p>{col.column}</p>
                  {col.cards.map((card) => (
                    <article key={card.title}>
                      <strong>{card.title}</strong>
                      <span>{card.meta}</span>
                    </article>
                  ))}
                </div>
              ))}
            </div>
            <ul className="mig-types">
              {DATA_TYPES.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </Layer>

        <Layer active={prepare} reducedMotion={reducedMotion}>
          <div className="mig-objects">
            <p className="mig-kicker">Preparing your export</p>
            <ul>
              {OBJECTS.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={false}
                  animate={{
                    y: reducedMotion ? 0 : (1 - prepare) * (8 + i * 2),
                  }}
                  transition={{ duration: reducedMotion ? 0 : 0.35 }}
                >
                  <strong>{item.count}</strong>
                  <span>{item.label}</span>
                </motion.li>
              ))}
            </ul>
            <div className="mig-rail">
              <span>Worknaro import</span>
              <span>CSV · Excel · JSON</span>
            </div>
          </div>
        </Layer>

        <Layer active={map} reducedMotion={reducedMotion}>
          <div className="mig-map">
            <p className="mig-kicker">Map your workflow</p>
            <ul className="mig-map-rows">
              {STATUS_MAP.map((row) => (
                <li key={row.from}>
                  <span>{row.from}</span>
                  <i aria-hidden="true" />
                  <strong>{row.to}</strong>
                </li>
              ))}
            </ul>
            <ul className="mig-checks">
              {CHECKS.map((item) => (
                <li key={item}>
                  <em aria-hidden="true">✓</em>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Layer>

        <Layer active={importing} reducedMotion={reducedMotion}>
          <div className="mig-progress">
            <p className="mig-kicker">Preparing your workspace</p>
            <ul>
              {PROGRESS_TARGETS.map((row) => {
                const value = importFill(progress, row.completeAt, row.target);
                const done = row.target === 100 && value >= 100;
                return (
                  <li key={row.id}>
                    <div>
                      <span>{row.label}</span>
                      <strong>{done ? "✓" : `${value}%`}</strong>
                    </div>
                    <span className="mig-bar" aria-hidden="true">
                      <span style={{ width: `${value}%` }} />
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="mig-note">Importing your work…</p>
          </div>
        </Layer>

        <Layer active={workspace} reducedMotion={reducedMotion}>
          <div className="mig-workspace">
            <div className="mig-workspace-head">
              <span>Website Redesign</span>
              <span>WR-204</span>
            </div>
            <div className="mig-board">
              {ORGANITIO_BOARD.map((col) => (
                <div key={col.column} className="mig-col is-organitio">
                  <p>{col.column}</p>
                  {col.cards.map((card) => (
                    <article key={card.title}>
                      <strong>{card.title}</strong>
                      <span>{card.meta}</span>
                    </article>
                  ))}
                </div>
              ))}
            </div>
            <div className="mig-workspace-meta">
              <span>Team · 4</span>
              <span>Statuses · mapped</span>
              <span>Files · attached</span>
              <span>Activity · live</span>
            </div>
          </div>
        </Layer>
      </div>
    </div>
  );
}
