"use client";

import { motion } from "framer-motion";
import {
  Check,
  CheckSquare,
  ChevronLeft,
  CloudUpload,
  FolderKanban,
  Info,
  Paperclip,
  Workflow,
} from "lucide-react";
import { IMPORT_STAGES } from "@/components/features/import/importStages";
import {
  IMPORT_COUNTS,
  IMPORT_PREVIEW_ROWS,
  IMPORT_SOURCES,
  type ImportTab,
} from "@/components/features/import/importStoryData";
import {
  scenePresence,
  stageIndexForProgress,
} from "@/components/features/story/storyUtils";
import { Icon } from "@/components/ui/Icon";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const COUNT_ICONS = {
  projects: FolderKanban,
  tasks: CheckSquare,
  workflows: Workflow,
  files: Paperclip,
} as const;

const MAP_OFFSET = {
  projects: 0,
  tasks: 0.05,
  workflows: 0.1,
  files: 0.15,
} as const;

function countLit(
  id: (typeof IMPORT_COUNTS)[number]["id"],
  tab: ImportTab,
  progress: number,
) {
  if (tab === "preparing") return false;
  if (tab === "importing") return true;
  if (tab === "complete") return true;
  return progress >= 0.5 + MAP_OFFSET[id];
}

function DropZone({
  tab,
  progress,
  reducedMotion,
}: {
  tab: ImportTab;
  progress: number;
  reducedMotion: boolean;
}) {
  const fileIn = scenePresence(progress, 0.24, 0.5);
  const mapIn = scenePresence(progress, 0.5, 0.74);
  const done = tab === "complete";
  const organizing = tab === "organizing";
  const preparing = tab === "preparing";

  return (
    <div
      className={`imp-drop${preparing ? " is-source" : ""}${organizing ? " is-mapped" : ""}${done ? " is-done" : ""}`}
    >
      {preparing ? (
        <>
          <p className="imp-drop-kicker">Existing workspace</p>
          <ul className="imp-source-list">
            {IMPORT_SOURCES.map((file, fileIndex) => (
              <li key={file.id} className={fileIndex === 1 ? "is-active" : ""}>
                <em>{file.ext}</em>
                <span>
                  <strong>{file.name}</strong>
                  <small>{file.meta}</small>
                </span>
              </li>
            ))}
          </ul>
          <p className="imp-drop-meta">Ready to move into Worknaro from CSV, XLSX, or JSON.</p>
        </>
      ) : organizing ? (
        <>
          <p className="imp-drop-kicker">Mapping into Worknaro</p>
          <ul className="imp-map-flow">
            {IMPORT_COUNTS.map((item) => {
              const on = reducedMotion || progress >= 0.5 + MAP_OFFSET[item.id];
              return (
                <motion.li
                  key={item.id}
                  initial={false}
                  animate={{
                    opacity: on ? 1 : 0.28,
                    x: on ? 0 : 10,
                  }}
                  transition={{ duration: reducedMotion ? 0 : 0.35, ease: EASE }}
                >
                  <span>{item.label}</span>
                  <i aria-hidden="true" />
                  <strong>Worknaro</strong>
                </motion.li>
              );
            })}
          </ul>
        </>
      ) : done ? (
        <>
          <span className="imp-drop-icon is-success" aria-hidden="true">
            <Icon icon={Check} size={28} strokeWidth={2.2} />
          </span>
          <p className="imp-drop-title">Workspace imported</p>
          <p className="imp-drop-meta">Your workspace is ready to keep going.</p>
        </>
      ) : (
        <>
          <motion.span
            className="imp-drop-file"
            aria-hidden="true"
            initial={false}
            animate={{
              opacity: reducedMotion ? 1 : fileIn,
              x: "-50%",
              y: reducedMotion || fileIn > 0.55 ? 0 : -16,
              scale: 0.96 + (reducedMotion ? 1 : fileIn) * 0.04,
            }}
            transition={{ duration: reducedMotion ? 0 : 0.4, ease: EASE }}
          >
            <em>XLSX</em>
            workspace.xlsx
          </motion.span>
          <span className="imp-drop-icon" aria-hidden="true">
            <Icon icon={CloudUpload} size={28} strokeWidth={1.7} />
          </span>
          <p className="imp-drop-title">
            Drop a file here or <span>browse</span>
          </p>
          <p className="imp-drop-meta">Supported formats: CSV, XLSX, JSON</p>
        </>
      )}

      <motion.span
        className="imp-drop-progress"
        aria-hidden="true"
        initial={false}
        animate={{
          opacity: organizing && !reducedMotion ? mapIn : 0,
          scaleX: organizing ? Math.min(1, Math.max(0.12, (progress - 0.5) / 0.24)) : 0,
        }}
        transition={{ duration: reducedMotion ? 0 : 0.3, ease: EASE }}
      />
    </div>
  );
}

export function ImportCanvas({
  progress,
  reducedMotion,
  compact,
}: {
  progress: number;
  reducedMotion?: boolean;
  compact?: boolean;
}) {
  const reduce = !!reducedMotion;
  const index = stageIndexForProgress(IMPORT_STAGES, progress);
  const tab = IMPORT_STAGES[index].id as ImportTab;
  const previewFill =
    tab === "complete"
      ? 1
      : tab === "organizing"
        ? scenePresence(progress, 0.5, 0.74)
        : tab === "importing"
          ? 0.42
          : 0.16;

  return (
    <div className={`imp-card${compact ? " is-compact" : ""}`} data-stage={tab} aria-live="polite">
      <div className="imp-card-grid">
        <div className="imp-card-main">
          <p className="imp-card-context">Acme workspace</p>
          <DropZone tab={tab} progress={progress} reducedMotion={reduce} />

          <div className="imp-card-footer">
            <p className="imp-footnote">
              <Icon icon={Info} size={14} strokeWidth={2} />
              Native connectors are not available yet.
            </p>
            <div className="imp-card-actions">
              <span className="imp-back">
                <Icon icon={ChevronLeft} size={14} strokeWidth={2.2} />
                Back to Preparing
              </span>
              <span className={`imp-continue${tab === "complete" ? " is-ready" : ""}`}>
                {tab === "complete" ? "Keep going" : "Continue"}
              </span>
            </div>
          </div>
        </div>

        <aside className="imp-card-side">
          <p className="imp-side-kicker">What gets imported</p>
          <ul className="imp-count-list">
            {IMPORT_COUNTS.map((item, itemIndex) => {
              const lit = countLit(item.id, tab, progress);
              const IconType = COUNT_ICONS[item.id];
              return (
                <motion.li
                  key={item.id}
                  className={lit ? "is-on" : ""}
                  initial={false}
                  animate={{
                    opacity: reduce ? 1 : lit ? 1 : 0.48,
                    x: reduce || lit ? 0 : 8,
                  }}
                  transition={{
                    duration: reduce ? 0 : 0.32,
                    delay: reduce ? 0 : itemIndex * 0.04,
                    ease: EASE,
                  }}
                >
                  <span className="imp-count-icon" aria-hidden="true">
                    <Icon icon={IconType} size={15} strokeWidth={2} />
                  </span>
                  <span>{item.label}</span>
                  <strong>e.g. {item.count}</strong>
                </motion.li>
              );
            })}
          </ul>

          <div className="imp-preview">
            <p className="imp-side-kicker">Example workspace preview</p>
            <div className="imp-preview-card">
              <p className="imp-preview-title">Acme Projects</p>
              <ul>
                {IMPORT_PREVIEW_ROWS.map((row, rowIndex) => {
                  const shown = previewFill > rowIndex * 0.18;
                  return (
                    <motion.li
                      key={row.id}
                      className={`is-${row.tone}`}
                      initial={false}
                      animate={{
                        opacity: reduce ? (tab === "preparing" && rowIndex > 1 ? 0.28 : 1) : shown ? 1 : 0.22,
                        y: reduce || shown ? 0 : 8,
                      }}
                      transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
                    >
                      <i aria-hidden="true" />
                      <span>{row.title}</span>
                      <b />
                      <b />
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
