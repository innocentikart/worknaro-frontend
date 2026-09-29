"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FileText, Folder, RotateCcw, Trash2, Undo2 } from "lucide-react";
import { StoryNote, StoryTabs } from "@/components/features/story/StoryTabs";
import { useStoryCycle } from "@/components/features/story/useStoryCycle";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Icon } from "@/components/ui/Icon";
import {
  TRASH_FILE,
  TRASH_KEEP,
  TRASH_META,
  TRASH_TABS,
} from "@/components/features/trash-story/trashStoryData";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const ICONS = { active: FileText, trash: Trash2, restore: RotateCcw, back: Undo2 } as const;

export function TrashStory() {
  const reduce = useReducedMotion();
  const { ref, tab, selectTab, pause, resume } = useStoryCycle({
    tabs: TRASH_TABS,
    reducedMotion: !!reduce,
    sceneMs: 2600,
  });
  const inTrash = tab === "trash" || tab === "restore";
  const restored = tab === "back";
  const restoring = tab === "restore";

  return (
    <section
      ref={ref}
      id="trash"
      className="trs-section mig-section scroll-mt-24"
      aria-labelledby="trash-heading"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="why-wrap trs-wrap">
        <div className="mig-intro trs-intro">
          <SectionBadge icon={Trash2} className="mx-auto">
            Trash
          </SectionBadge>
          <h2 id="trash-heading" className="mig-heading font-display">
            Deleted files stay{" "}
            <HeadingAccent>recoverable.</HeadingAccent>
          </h2>
          <p className="mig-lead">
            Trash is for files and documents. Soft-delete starts a 30-day retention.
            Restore returns the file; permanent delete is a separate action.
          </p>
        </div>

        <StoryTabs
          tabs={TRASH_TABS.map((id) => ({ id, label: TRASH_META[id].label }))}
          tab={tab}
          onSelect={selectTab}
          label="Delete and restore"
          prefix="trs"
          icons={ICONS}
        />

        <div
          id="trs-panel"
          role="tabpanel"
          aria-labelledby={`trs-tab-${tab}`}
          aria-live="polite"
          className="pfs-viz trs-viz"
          data-tab={tab}
        >
          <div className="trs-hero">
            <span className="trs-hero-icon" aria-hidden="true">
              <Icon icon={Trash2} size={20} strokeWidth={1.8} />
            </span>
            <div>
              <p className="trs-hero-heading font-display">Deleted files stay recoverable.</p>
              <p className="trs-hero-lead">
                Trash is for files and documents. Soft-delete starts a 30-day retention.
                Restore returns the file; permanent delete is a separate action.
              </p>
            </div>
          </div>

          <div className="trs-stage">
            <article className={`trs-card ${!inTrash ? "is-focus" : ""}`}>
              <header className="trs-card-head">
                <span className="trs-card-label">
                  <Icon icon={Folder} size={14} strokeWidth={2} />
                  {TRASH_FILE.project} · {TRASH_FILE.folder}
                </span>
                <span className="trs-count">{inTrash ? "1 file" : "2 files"}</span>
              </header>

              <ul className="trs-list">
                <li>
                  <FileRow
                    name={TRASH_KEEP.name}
                    meta={`${TRASH_KEEP.folder} · ${TRASH_KEEP.size}`}
                    tone="keep"
                  />
                </li>
                <li>
                  <AnimatePresence initial={false} mode="wait">
                    {!inTrash ? (
                      <motion.div
                        key="active-file"
                        initial={reduce ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? undefined : { opacity: 0, y: 6 }}
                        transition={{ duration: 0.3, ease: EASE }}
                      >
                        <FileRow
                          name={TRASH_FILE.name}
                          meta={`${TRASH_FILE.folder} · ${TRASH_FILE.size}`}
                          badge={restored ? "Restored" : undefined}
                          tone="live"
                        />
                      </motion.div>
                    ) : (
                      <motion.p
                        key="active-empty"
                        className="trs-empty"
                        initial={reduce ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={reduce ? undefined : { opacity: 0 }}
                      >
                        File moved to Trash
                      </motion.p>
                    )}
                  </AnimatePresence>
                </li>
              </ul>
            </article>

            <article className={`trs-card ${inTrash ? "is-focus" : ""}`}>
              <header className="trs-card-head">
                <span className="trs-card-label">
                  <Icon icon={Trash2} size={14} strokeWidth={2} />
                  Trash
                </span>
                <span className="trs-count">{TRASH_FILE.retention} retention</span>
              </header>

              <AnimatePresence initial={false} mode="wait">
                {inTrash ? (
                  <motion.div
                    key="trash-file"
                    className={`trs-bin ${restoring ? "is-restore" : ""}`}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: 6 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <FileRow
                      name={TRASH_FILE.name}
                      meta={`${TRASH_FILE.project} · ${TRASH_FILE.size}`}
                      badge="Soft-deleted"
                      tone="trash"
                    />
                    <div className="trs-retain">
                      <span>
                        <b>30 days</b>
                        remaining
                      </span>
                      <i aria-hidden="true">
                        <b />
                      </i>
                    </div>
                    <div className="trs-actions">
                      <button
                        type="button"
                        className={`trs-restore ${restoring ? "is-on" : ""}`}
                        onClick={() => selectTab("restore")}
                      >
                        <Icon icon={RotateCcw} size={13} strokeWidth={2.2} />
                        Restore
                      </button>
                      <span className="trs-destroy">Delete permanently</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.p
                    key="trash-empty"
                    className="trs-empty is-bin"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                  >
                    Trash is empty
                  </motion.p>
                )}
              </AnimatePresence>
            </article>
          </div>
        </div>
        <StoryNote>{TRASH_META[tab].note}</StoryNote>
      </div>
    </section>
  );
}

function FileRow({
  name,
  meta,
  badge,
  tone,
}: {
  name: string;
  meta: string;
  badge?: string;
  tone: "keep" | "live" | "trash";
}) {
  return (
    <div className={`trs-file is-${tone}`}>
      <span className="trs-file-icon" aria-hidden="true">
        PDF
      </span>
      <span className="trs-file-copy">
        <strong>{name}</strong>
        <small>{meta}</small>
      </span>
      {badge ? <em>{badge}</em> : null}
    </div>
  );
}
