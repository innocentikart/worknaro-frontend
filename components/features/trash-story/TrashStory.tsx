"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { RotateCcw, Trash2, Undo2, FileText } from "lucide-react";
import { StoryNote, StoryTabs } from "@/components/features/story/StoryTabs";
import { VizChrome } from "@/components/features/story/VizChrome";
import { useStoryCycle } from "@/components/features/story/useStoryCycle";
import { TRASH_FILE, TRASH_META, TRASH_TABS } from "@/components/features/trash-story/trashStoryData";
import { HeadingAccent } from "@/components/ui/HeadingAccent";

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

  return (
    <section
      ref={ref}
      id="trash"
      className="trs-section mig-section scroll-mt-24"
      aria-labelledby="trash-heading"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="fst-ambient" aria-hidden="true" />
      <div className="why-wrap trs-wrap">
        <div className="trs-intro">
          <p className="audience-eyebrow">Trash</p>
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
        >
          <VizChrome title="Worknaro · Files" badge={inTrash ? "Trash" : "Project"} />
          <div className="trs-split">
            <div className={`trs-col ${!inTrash ? "is-active" : ""}`}>
              <p>Website Redesign · Documents</p>
              <AnimatePresence initial={false} mode="wait">
                {!inTrash ? (
                  <FileCard key="active" label={restored ? "Restored" : TRASH_FILE.folder} />
                ) : (
                  <motion.p
                    key="empty"
                    className="trs-empty"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    File removed
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <div className={`trs-col ${inTrash ? "is-active" : ""}`}>
              <p>Trash · {TRASH_FILE.retention}</p>
              <AnimatePresence initial={false} mode="wait">
                {inTrash ? (
                  <FileCard
                    key="trash"
                    label={tab === "restore" ? "Restore selected" : "Restore or delete permanently"}
                    restore={tab === "restore"}
                  />
                ) : (
                  <motion.p
                    key="clear"
                    className="trs-empty"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Empty
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <StoryNote>{TRASH_META[tab].note}</StoryNote>
      </div>
    </section>
  );
}

function FileCard({ label, restore }: { label: string; restore?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      className={`trs-card ${restore ? "is-restore" : ""}`}
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, y: 6 }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      <strong>{TRASH_FILE.name}</strong>
      <span>{label}</span>
      {restore ? <em>Restore</em> : null}
    </motion.article>
  );
}
