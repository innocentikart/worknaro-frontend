"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { Filter, Layers3, Tag, Tags } from "lucide-react";
import { StoryNote, StoryTabs } from "@/components/features/story/StoryTabs";
import { useStoryCycle } from "@/components/features/story/useStoryCycle";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Icon } from "@/components/ui/Icon";
import {
  TAG_CHIPS,
  TAG_META,
  TAG_RECORDS,
  TAG_TABS,
} from "@/components/features/tags-story/tagsStoryData";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const ICONS = { work: Layers3, tag: Tag, filter: Filter, context: Tags } as const;

export function TagsStory() {
  const reduce = useReducedMotion();
  const { ref, tab, selectTab, pause, resume } = useStoryCycle({
    tabs: TAG_TABS,
    reducedMotion: !!reduce,
    sceneMs: 2800,
  });
  const applied = tab !== "work";
  const filtering = tab === "filter" || tab === "context";
  const showingContext = tab === "context";
  const activeChip = applied ? "Urgent" : null;
  const shown = TAG_RECORDS.filter((row) =>
    filtering ? row.tags.includes("Urgent") : true,
  ).length;

  return (
    <section
      ref={ref}
      id="tags"
      className="tgs-section mig-section scroll-mt-24"
      aria-labelledby="tags-heading"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="why-wrap tgs-wrap">
        <div className="mig-intro tgs-intro">
          <SectionBadge icon={Tags} className="mx-auto">
            Tags
          </SectionBadge>
          <h2 id="tags-heading" className="mig-heading font-display">
            Filter work by the{" "}
            <HeadingAccent>context it carries.</HeadingAccent>
          </h2>
          <p className="mig-lead">
            The tag catalog applies to tasks and project descriptions. Files, clients, and
            leads can store their own text tags — they are not catalog tags.
          </p>
        </div>

        <StoryTabs
          tabs={TAG_TABS.map((id) => ({ id, label: TAG_META[id].label }))}
          tab={tab}
          onSelect={selectTab}
          label="How tags filter work"
          prefix="tgs"
          icons={ICONS}
        />

        <div
          id="tgs-panel"
          role="tabpanel"
          aria-labelledby={`tgs-tab-${tab}`}
          aria-live="polite"
          className="pfs-viz tgs-viz"
          data-tab={tab}
        >
          <div className="tgs-hero">
            <span className="tgs-hero-icon" aria-hidden="true">
              <Icon icon={Tag} size={20} strokeWidth={1.8} />
            </span>
            <div>
              <p className="tgs-hero-heading font-display">
                Filter work by the context it carries.
              </p>
              <p className="tgs-hero-lead">
                The tag catalog applies to tasks and project descriptions. Files, clients, and
                leads can store their own text tags — they are not catalog tags.
              </p>
            </div>
          </div>

          <div className="tgs-stage">
            <article className={`tgs-pane ${!showingContext ? "is-focus" : ""}`}>
              <header className="tgs-pane-head">
                <span className="tgs-pane-label">
                  <Icon icon={Layers3} size={14} strokeWidth={2} />
                  Website Redesign · Tasks
                </span>
                <span className="tgs-chip">
                  {filtering ? `${shown} tagged` : `${TAG_RECORDS.length} tasks`}
                </span>
              </header>

              <div className="tgs-filters" role="group" aria-label="Tag filters">
                {TAG_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    className={activeChip === chip ? "is-on" : ""}
                    onClick={() => selectTab(chip === "Urgent" ? "filter" : "work")}
                  >
                    {chip}
                  </button>
                ))}
              </div>

              <LayoutGroup>
                <ul className="tgs-tasks">
                  {TAG_RECORDS.map((row) => {
                    const faded = filtering && !row.tags.includes("Urgent");
                    const tagged = applied && row.tags.includes("Urgent");
                    return (
                      <motion.li
                        key={row.id}
                        layout
                        className={`${faded ? "is-fade" : ""} ${tagged ? "is-tagged" : ""}`}
                        animate={{ opacity: faded ? 0.28 : 1 }}
                        transition={{ duration: reduce ? 0 : 0.32, ease: EASE }}
                      >
                        <div className="tgs-task">
                          <span>
                            <strong>{row.name}</strong>
                            <small>
                              {row.kind} · {row.who}
                            </small>
                          </span>
                          <div className="tgs-row-tags">
                            {row.tags.map((tagName) =>
                              applied || tagName !== "Urgent" ? (
                                <em
                                  key={tagName}
                                  className={tagName === "Urgent" && tagged ? "is-urgent" : ""}
                                >
                                  {tagName}
                                </em>
                              ) : null,
                            )}
                          </div>
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>
              </LayoutGroup>
            </article>

            <aside className={`tgs-pane ${applied ? "is-focus" : ""}`}>
              <header className="tgs-pane-head">
                <span className="tgs-pane-label">
                  <Icon icon={Tags} size={14} strokeWidth={2} />
                  Tag catalog
                </span>
                <span className={`tgs-chip ${applied ? "is-live" : ""}`}>
                  {filtering ? "Filtered" : applied ? "Applied" : "Workspace"}
                </span>
              </header>

              <ul className="tgs-catalog">
                {TAG_CHIPS.map((chip) => {
                  const count = TAG_RECORDS.filter(
                    (row) => row.tags.includes(chip) && (applied || chip !== "Urgent"),
                  ).length;
                  return (
                    <li key={chip} className={activeChip === chip ? "is-on" : ""}>
                      <Icon icon={Tag} size={14} strokeWidth={2} />
                      <span>{chip}</span>
                      <b>{count}</b>
                    </li>
                  );
                })}
              </ul>

              <AnimatePresence initial={false} mode="wait">
                {showingContext ? (
                  <motion.div
                    key="context"
                    className="tgs-facts"
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <p>Tags add context. Status and project membership stay the same.</p>
                    <ul>
                      <li>
                        <span>Status</span>
                        <b>Unchanged</b>
                      </li>
                      <li>
                        <span>Project</span>
                        <b>Website Redesign</b>
                      </li>
                    </ul>
                  </motion.div>
                ) : (
                  <motion.p
                    key="hint"
                    className="tgs-hint"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                  >
                    {filtering
                      ? "Filter the task list by tag. Multiple tags can sit on one task."
                      : applied
                        ? "A workspace tag such as Urgent can be attached to a task."
                        : "Applies to tasks and project descriptions — not files, clients, or leads."}
                  </motion.p>
                )}
              </AnimatePresence>
            </aside>
          </div>
        </div>
        <StoryNote>{TAG_META[tab].note}</StoryNote>
      </div>
    </section>
  );
}
