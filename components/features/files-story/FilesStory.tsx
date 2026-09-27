"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FileText, Folder, Link2, Star, Upload } from "lucide-react";
import { StoryNote, StoryTabs } from "@/components/features/story/StoryTabs";
import { VizChrome } from "@/components/features/story/VizChrome";
import { useStoryCycle } from "@/components/features/story/useStoryCycle";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import {
  FILE_FOLDERS,
  FILE_ITEMS,
  FILE_META,
  FILE_TABS,
} from "@/components/features/files-story/filesStoryData";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const ICONS = {
  upload: Upload,
  organize: Folder,
  open: FileText,
  linked: Link2,
} as const;

export function FilesStory() {
  const reduce = useReducedMotion();
  const { ref, tab, progress, selectTab, pause, resume } = useStoryCycle({
    tabs: FILE_TABS,
    reducedMotion: !!reduce,
  });
  const uploadPct = tab === "upload" ? Math.round((reduce ? 1 : progress) * 100) : 100;
  const showUpload = tab === "upload";
  const openId = tab === "open" || tab === "linked" ? "contract" : tab === "organize" ? "fig" : null;

  return (
    <section
      ref={ref}
      id="files"
      className="fls-section mig-section scroll-mt-24"
      aria-labelledby="files-heading"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="fst-ambient" aria-hidden="true" />
      <div className="why-wrap fls-wrap">
        <div className="fls-intro">
          <div>
            <p className="audience-eyebrow">Files</p>
            <h2 id="files-heading" className="mig-heading font-display">
              Files stay with{" "}
              <HeadingAccent>the work they belong to.</HeadingAccent>
            </h2>
          </div>
          <p className="mig-lead">
            Attach files to a project, task, proposal, or client. Download, version, share,
            favorite, or archive from the file record.
          </p>
        </div>

        <StoryTabs
          tabs={FILE_TABS.map((id) => ({ id, label: FILE_META[id].label }))}
          tab={tab}
          onSelect={selectTab}
          label="How files stay with work"
          prefix="fls"
          icons={ICONS}
        />

        <div
          id="fls-panel"
          role="tabpanel"
          aria-labelledby={`fls-tab-${tab}`}
          aria-live="polite"
          className="pfs-viz fls-viz"
        >
          <VizChrome title="Worknaro · Website Redesign" badge={FILE_META[tab].label} />
          <div className="fls-workspace">
            <aside className="fls-folders">
              <p>Folders</p>
              {FILE_FOLDERS.map((folder) => (
                <div
                  key={folder.id}
                  className={folder.id === "docs" && (tab === "open" || tab === "linked") ? "is-active" : ""}
                >
                  <Folder size={14} strokeWidth={2} aria-hidden="true" />
                  <span>{folder.name}</span>
                  <em>{folder.count}</em>
                </div>
              ))}
            </aside>
            <div className="fls-main">
              <AnimatePresence initial={false}>
                {showUpload ? (
                  <motion.div
                    className="fls-upload"
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <strong>Homepage.fig</strong>
                    <span>{uploadPct}%</span>
                    <i aria-hidden="true">
                      <b style={{ width: `${uploadPct}%` }} />
                    </i>
                  </motion.div>
                ) : null}
              </AnimatePresence>
              <ul>
                {FILE_ITEMS.map((file) => (
                  <li key={file.id} className={openId === file.id ? "is-open" : ""}>
                    <FileText size={15} strokeWidth={1.8} aria-hidden="true" />
                    <div>
                      <strong>{file.name}</strong>
                      <span>
                        {file.folder} · {file.size}
                      </span>
                    </div>
                    {tab === "linked" && file.id === "contract" ? (
                      <Star size={13} strokeWidth={2} aria-hidden="true" />
                    ) : (
                      <em>{file.kind}</em>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <AnimatePresence initial={false}>
              {tab === "open" || tab === "linked" ? (
                <motion.aside
                  className="fls-detail"
                  initial={reduce ? false : { opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.32, ease: EASE }}
                >
                  <p className="fls-kicker">File record</p>
                  <strong>Contract.pdf</strong>
                  <p>Website Redesign · Documents</p>
                  <ul>
                    <li>Download</li>
                    <li>Version</li>
                    <li>Share</li>
                    <li>Favorite</li>
                    <li>Archive</li>
                  </ul>
                </motion.aside>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
        <StoryNote>{FILE_META[tab].note}</StoryNote>
      </div>
    </section>
  );
}
