"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FileText, Folder, Link2, Star, Upload } from "lucide-react";
import { StoryNote, StoryTabs } from "@/components/features/story/StoryTabs";
import { useStoryCycle } from "@/components/features/story/useStoryCycle";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Icon } from "@/components/ui/Icon";
import {
  FILE_ACTIONS,
  FILE_FOLDERS,
  FILE_ITEMS,
  FILE_META,
  FILE_RECORD,
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
  const scene = reduce ? 1 : progress;
  const uploadPct = tab === "upload" ? Math.round(scene * 100) : 100;
  const uploading = tab === "upload";
  const recordOpen = tab === "open" || tab === "linked";
  const linked = tab === "linked";
  const activeFolder = recordOpen ? "docs" : "design";
  const openId = recordOpen ? "contract" : tab === "organize" ? "fig" : null;
  const files = uploading ? FILE_ITEMS.filter((file) => file.id !== "fig") : FILE_ITEMS;

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
        <div className="mig-intro fls-intro">
          <SectionBadge icon={Folder} className="mx-auto">
            Files
          </SectionBadge>
          <h2 id="files-heading" className="mig-heading font-display">
            Files stay with{" "}
            <HeadingAccent>the work they belong to.</HeadingAccent>
          </h2>
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
          data-tab={tab}
        >
          <div className="fls-hero">
            <span className="fls-hero-icon" aria-hidden="true">
              <Icon icon={Folder} size={20} strokeWidth={1.8} />
            </span>
            <div>
              <p className="fls-hero-heading font-display">Files stay with the work they belong to.</p>
              <p className="fls-hero-lead">
                Attach files to a project, task, proposal, or client. Download, version, share,
                favorite, or archive from the file record.
              </p>
            </div>
          </div>

          <div className="fls-stage">
            <article className={`fls-pane ${!recordOpen ? "is-focus" : ""}`}>
              <header className="fls-pane-head">
                <span className="fls-pane-label">
                  <Icon icon={Folder} size={14} strokeWidth={2} />
                  Website Redesign · Files
                </span>
                <span className="fls-chip">{uploading ? "Uploading" : "Hub"}</span>
              </header>

              <ul className="fls-dir">
                {FILE_FOLDERS.map((folder) => (
                  <li key={folder.id} className={folder.id === activeFolder ? "is-active" : ""}>
                    <Icon icon={Folder} size={14} strokeWidth={2} />
                    <span>{folder.name}</span>
                    <em>{folder.id === "design" && uploading ? "Uploading" : folder.count}</em>
                  </li>
                ))}
              </ul>

              <AnimatePresence initial={false}>
                {uploading ? (
                  <motion.div
                    key="upload"
                    className="fls-drop"
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <span className="fls-file-icon" aria-hidden="true">
                      FIG
                    </span>
                    <span>
                      <strong>Homepage.fig</strong>
                      <small>Attaching to Website Redesign</small>
                    </span>
                    <b>{uploadPct}%</b>
                    <i aria-hidden="true">
                      <b style={{ width: `${uploadPct}%` }} />
                    </i>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <ul className="fls-files">
                {files.map((file) => (
                  <li key={file.id}>
                    <div className={`fls-file ${openId === file.id ? "is-open" : ""}`}>
                      <span className="fls-file-icon" aria-hidden="true">
                        {file.kind}
                      </span>
                      <span className="fls-file-copy">
                        <strong>{file.name}</strong>
                        <small>
                          {file.folder} · {file.size}
                        </small>
                      </span>
                      {linked && file.id === "contract" ? (
                        <Icon icon={Star} size={14} strokeWidth={2.2} className="fls-star" />
                      ) : (
                        <em>{file.attached}</em>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </article>

            <aside className={`fls-pane ${recordOpen ? "is-focus" : ""}`}>
              <header className="fls-pane-head">
                <span className="fls-pane-label">
                  <Icon icon={FileText} size={14} strokeWidth={2} />
                  File record
                </span>
                {recordOpen ? (
                  <span className={`fls-chip ${linked ? "is-live" : ""}`}>
                    {linked ? "Attached" : "Open"}
                  </span>
                ) : null}
              </header>

              <AnimatePresence initial={false} mode="wait">
                {recordOpen ? (
                  <motion.div
                    key="record"
                    className="fls-record"
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.32, ease: EASE }}
                  >
                    <div className="fls-record-head">
                      <span className="fls-file-icon is-lg" aria-hidden="true">
                        PDF
                      </span>
                      <div>
                        <strong>{FILE_RECORD.name}</strong>
                        <p>
                          {FILE_RECORD.size} · {FILE_RECORD.folder}
                        </p>
                      </div>
                    </div>
                    <p className="fls-record-link">
                      {linked
                        ? "Remains attached to Website Redesign."
                        : "Website Redesign · project file"}
                    </p>
                    <ul className="fls-actions">
                      {FILE_ACTIONS.map((action) => (
                        <li
                          key={action.id}
                          className={linked && action.id === "favorite" ? "is-on" : ""}
                        >
                          {action.label}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ) : (
                  <motion.p
                    key="wait"
                    className="fls-wait"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                  >
                    {uploading
                      ? "Attach to a project, task, proposal, or client. There is no separate drive."
                      : "Open a file to download, version, share, favorite, or archive."}
                  </motion.p>
                )}
              </AnimatePresence>
            </aside>
          </div>
        </div>
        <StoryNote>{FILE_META[tab].note}</StoryNote>
      </div>
    </section>
  );
}
