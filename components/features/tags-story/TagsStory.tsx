"use client";

import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { Filter, Layers3, Tag, Tags } from "lucide-react";
import { StoryNote, StoryTabs } from "@/components/features/story/StoryTabs";
import { VizChrome } from "@/components/features/story/VizChrome";
import { useStoryCycle } from "@/components/features/story/useStoryCycle";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
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
  const activeChip = applied ? "Urgent" : null;
  const visible = TAG_RECORDS.filter((row) =>
    filtering ? row.tags.includes("Urgent") : true,
  );

  return (
    <section
      ref={ref}
      id="tags"
      className="tgs-section mig-section scroll-mt-24"
      aria-labelledby="tags-heading"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="fst-ambient" aria-hidden="true" />
      <div className="why-wrap tgs-wrap">
        <div className="mig-intro tgs-intro">
          <p className="audience-eyebrow mx-auto">Tags</p>
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
        >
          <VizChrome title="Worknaro · Tasks" badge={`${visible.length} shown`} />
          <div className="tgs-chips" role="group" aria-label="Tag filters">
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
            <ul className="tgs-list">
              {TAG_RECORDS.map((row) => {
                const faded = filtering && !row.tags.includes("Urgent");
                const tagged = applied && row.tags.includes("Urgent");
                return (
                  <motion.li
                    key={row.id}
                    layout
                    className={`${faded ? "is-fade" : ""} ${tagged ? "is-tagged" : ""}`}
                    animate={{ opacity: faded ? 0.22 : 1 }}
                    transition={{ duration: reduce ? 0 : 0.32, ease: EASE }}
                  >
                    <div>
                      <strong>{row.name}</strong>
                      <span>
                        {row.project} · {row.who}
                      </span>
                    </div>
                    <div className="tgs-row-tags">
                      {row.tags.map((tag) =>
                        applied || tag !== "Urgent" ? (
                          <em key={tag} className={tag === "Urgent" && tagged ? "is-urgent" : ""}>
                            {tag}
                          </em>
                        ) : null,
                      )}
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </LayoutGroup>
        </div>
        <StoryNote>{TAG_META[tab].note}</StoryNote>
      </div>
    </section>
  );
}
