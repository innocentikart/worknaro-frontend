"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ScanSearch, Search, Sparkles, Target } from "lucide-react";
import { StoryNote, StoryTabs } from "@/components/features/story/StoryTabs";
import { VizChrome } from "@/components/features/story/VizChrome";
import { useStoryCycle } from "@/components/features/story/useStoryCycle";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import {
  SEARCH_HITS,
  SEARCH_META,
  SEARCH_TABS,
  searchLevel,
  searchQuery,
} from "@/components/features/search-story/searchStoryData";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const ICONS = { workspace: Search, query: ScanSearch, match: Target, open: Sparkles } as const;
const GROUPS = ["Projects", "Tasks", "Clients", "Files", "Leads", "Proposals"] as const;

export function SearchStory() {
  const reduce = useReducedMotion();
  const { ref, tab, progress, selectTab, pause, resume } = useStoryCycle({
    tabs: SEARCH_TABS,
    reducedMotion: !!reduce,
    sceneMs: 2800,
  });
  const query = searchQuery(tab, reduce ? 1 : progress);
  const level = searchLevel(tab);
  const rows = SEARCH_HITS.filter((hit) => hit.match >= level);
  const grouped = GROUPS.map((kind) => ({
    kind,
    items: rows.filter((hit) => hit.kind === kind),
  })).filter((group) => group.items.length > 0);
  const open = tab === "open";

  return (
    <section
      ref={ref}
      id="search"
      className="srh-section mig-section scroll-mt-24"
      aria-labelledby="workspace-search-heading"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="fst-ambient" aria-hidden="true" />
      <div className="why-wrap srh-wrap">
        <div className="mig-intro srh-intro">
          <p className="audience-eyebrow mx-auto">Search</p>
          <h2 id="workspace-search-heading" className="mig-heading font-display">
            One query across{" "}
            <HeadingAccent>the workspace.</HeadingAccent>
          </h2>
          <p className="mig-lead">
            Search looks across projects, tasks, clients, files, leads, proposals, and more
            in the live workspace. It does not search inside file contents.
          </p>
        </div>

        <StoryTabs
          tabs={SEARCH_TABS.map((id) => ({ id, label: SEARCH_META[id].label }))}
          tab={tab}
          onSelect={selectTab}
          label="How search narrows"
          prefix="srh"
          icons={ICONS}
        />

        <div
          id="srh-panel"
          role="tabpanel"
          aria-labelledby={`srh-tab-${tab}`}
          aria-live="polite"
          className="pfs-viz srh-viz"
        >
          <VizChrome title="Worknaro · Search" badge={`${rows.length} results`} />
          <div className="srh-palette">
            <div className="srh-box">
              <Search size={16} strokeWidth={2} aria-hidden="true" />
              <span>{query || "Search the workspace"}</span>
              <kbd>⌘K</kbd>
            </div>
            <div className="srh-results">
              {grouped.map((group) => (
                <div key={group.kind}>
                  <p className="srh-group">{group.kind}</p>
                  <ul>
                    {group.items.map((hit) => (
                      <li
                        key={hit.title}
                        className={open && hit.title.startsWith("Alpha") ? "is-open" : ""}
                      >
                        <strong>{hit.title}</strong>
                        <span>{hit.meta}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <AnimatePresence initial={false}>
              {open ? (
                <motion.p
                  className="srh-open"
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.28, ease: EASE }}
                >
                  Opening Alpha design pass · file contents are not searched
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
        <StoryNote>{SEARCH_META[tab].note}</StoryNote>
      </div>
    </section>
  );
}
