"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { StoryNote, StorySteps } from "@/components/features/story/StoryTabs";
import { VizChrome } from "@/components/features/story/VizChrome";
import { useStoryCycle } from "@/components/features/story/useStoryCycle";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import {
  IMPORT_MAP,
  IMPORT_META,
  IMPORT_ROWS,
  IMPORT_SOURCES,
  IMPORT_STEPS,
  IMPORT_TABS,
} from "@/components/features/import/importStoryData";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function ImportStory({
  id = "import",
  compact,
}: {
  id?: string;
  compact?: boolean;
}) {
  const reduce = useReducedMotion();
  const { ref, tab, progress, selectTab, pause, resume } = useStoryCycle({
    tabs: IMPORT_TABS,
    reducedMotion: !!reduce,
    sceneMs: compact ? 2600 : 3200,
  });
  const scene = reduce ? 1 : progress;
  const headingId = `${id}-heading`;

  return (
    <section
      ref={ref}
      id={id}
      className={`imp-section mig-section scroll-mt-24 ${compact ? "is-compact" : ""}`}
      aria-labelledby={headingId}
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="fst-ambient" aria-hidden="true" />
      <div className="why-wrap imp-wrap">
        <div className="mig-intro imp-intro">
          <p className="audience-eyebrow mx-auto">Easy migration</p>
          <h2 id={headingId} className="mig-heading font-display">
            {compact ? (
              <>
                Bring existing work <HeadingAccent>with you.</HeadingAccent>
              </>
            ) : (
              <>
                Import the workspace,{" "}
                <HeadingAccent>then keep going.</HeadingAccent>
              </>
            )}
          </h2>
          <p className="mig-lead">
            {compact
              ? "Bring existing projects, tasks, and workflows into Worknaro from CSV, Excel, or JSON."
              : "Move existing projects, tasks, and team workflows into Worknaro without rebuilding everything. Import CSV, Excel, or JSON today — native connectors are not available yet."}
          </p>
        </div>

        <StorySteps
          steps={IMPORT_TABS.map((item, index) => ({
            id: item,
            label: IMPORT_STEPS[index],
          }))}
          active={tab}
          onSelect={selectTab}
          label="Import progress"
        />

        <div id={`${id}-panel`} role="tabpanel" aria-live="polite" className="pfs-viz imp-viz">
          <VizChrome
            title={tab === "ready" ? "Worknaro · Website Redesign" : "Bring work into Worknaro"}
            badge={IMPORT_META[tab].label}
          />
          <div className="imp-stage">
            <AnimatePresence mode="wait" initial={false}>
              {tab === "source" ? (
                <motion.div
                  key="source"
                  className="imp-sources"
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  {IMPORT_SOURCES.map((file, index) => (
                    <article key={file.id} className={index === 0 ? "is-selected" : ""}>
                      <em>{file.ext}</em>
                      <strong>{file.name}</strong>
                      <span>{file.meta}</span>
                    </article>
                  ))}
                </motion.div>
              ) : null}
              {tab === "map" ? (
                <motion.div
                  key="map"
                  className="imp-map"
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <p>Map statuses to the Worknaro board</p>
                  <ul>
                    {IMPORT_MAP.map((row) => (
                      <li key={row.from}>
                        <span>{row.from}</span>
                        <i aria-hidden="true" />
                        <strong>{row.to}</strong>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ) : null}
              {tab === "import" ? (
                <motion.div
                  key="import"
                  className="imp-progress"
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  {IMPORT_ROWS.map((row, index) => {
                    const value = Math.round(Math.min(row.target, scene * row.target + index * 4));
                    return (
                      <div key={row.label}>
                        <p>
                          <span>{row.label}</span>
                          <strong>
                            {value >= row.target && row.target === 100 ? "Done" : `${value}%`}
                          </strong>
                        </p>
                        <i aria-hidden="true">
                          <b style={{ width: `${value}%` }} />
                        </i>
                      </div>
                    );
                  })}
                </motion.div>
              ) : null}
              {tab === "ready" ? (
                <motion.div
                  key="ready"
                  className="imp-ready"
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <p className="imp-kicker">WR-204</p>
                  <strong>Website Redesign</strong>
                  <span>Team · 4 · Statuses mapped · Files attached</span>
                  <ul>
                    <li>
                      <b>To Do</b>
                      <em>API checklist</em>
                    </li>
                    <li>
                      <b>In Progress</b>
                      <em>Hero section</em>
                    </li>
                    <li>
                      <b>Completed</b>
                      <em>Homepage design</em>
                    </li>
                  </ul>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
        {!compact ? <StoryNote>{IMPORT_META[tab].note}</StoryNote> : null}
      </div>
    </section>
  );
}
