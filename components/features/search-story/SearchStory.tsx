"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, FileText, ScanSearch, Search, Sparkles, Target } from "lucide-react";
import { StoryNote, StoryTabs } from "@/components/features/story/StoryTabs";
import { useStoryCycle } from "@/components/features/story/useStoryCycle";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Icon } from "@/components/ui/Icon";
import {
  SEARCH_HITS,
  SEARCH_KINDS,
  SEARCH_META,
  SEARCH_OPEN,
  SEARCH_TABS,
  searchLevel,
  searchQuery,
} from "@/components/features/search-story/searchStoryData";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const ICONS = { workspace: Search, query: ScanSearch, match: Target, open: Sparkles } as const;

export function SearchStory() {
  const reduce = useReducedMotion();
  const { ref, tab, progress, selectTab, pause, resume } = useStoryCycle({
    tabs: SEARCH_TABS,
    reducedMotion: !!reduce,
    sceneMs: 2800,
  });
  const query = searchQuery(tab, reduce ? 1 : progress);
  const ready = query.trim().length >= 2;
  const level = searchLevel(tab);
  const rows = ready ? SEARCH_HITS.filter((hit) => hit.match >= level) : [];
  const grouped = SEARCH_KINDS.map((kind) => ({
    kind,
    items: rows.filter((hit) => hit.kind === kind),
  })).filter((group) => group.items.length > 0);
  const opening = tab === "open";
  const matching = tab === "match" || opening;

  return (
    <section
      ref={ref}
      id="search"
      className="srh-section mig-section scroll-mt-24"
      aria-labelledby="workspace-search-heading"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="why-wrap srh-wrap">
        <div className="mig-intro srh-intro">
          <SectionBadge icon={Search} className="mx-auto">
            Search
          </SectionBadge>
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
          data-tab={tab}
        >
          <div className="srh-hero">
            <span className="srh-hero-icon" aria-hidden="true">
              <Icon icon={Search} size={20} strokeWidth={1.8} />
            </span>
            <div>
              <p className="srh-hero-heading font-display">One query across the workspace.</p>
              <p className="srh-hero-lead">
                Results come from the live workspace — there is no separate search index.
                File contents are not searched.
              </p>
            </div>
          </div>

          <div className="srh-stage">
            <article className={`srh-pane ${!opening ? "is-focus" : ""}`}>
              <header className="srh-pane-head">
                <span className="srh-pane-label">
                  <Icon icon={Search} size={14} strokeWidth={2} />
                  Workspace search
                </span>
                <span className="srh-chip">{ready ? `${rows.length} results` : "Live"}</span>
              </header>

              <div className="srh-box">
                <Icon icon={Search} size={16} strokeWidth={2} />
                <span>{query || "Search projects, tasks, files…"}</span>
              </div>

              {ready ? (
                <div className="srh-results">
                  {grouped.map((group) => (
                    <div key={group.kind}>
                      <p className="srh-group">{group.kind}</p>
                      <ul>
                        {group.items.map((hit) => (
                          <li key={hit.id}>
                            <div
                              className={`srh-hit ${opening && hit.id === SEARCH_OPEN.id ? "is-open" : ""}`}
                            >
                              <strong>{hit.title}</strong>
                              <small>{hit.meta}</small>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="srh-empty">Type at least 2 characters to search the live workspace.</p>
              )}
            </article>

            <aside className={`srh-pane ${ready ? "is-focus" : ""}`}>
              <header className="srh-pane-head">
                <span className="srh-pane-label">
                  <Icon icon={opening ? FileText : ScanSearch} size={14} strokeWidth={2} />
                  {opening ? "Open the record" : "Looks across"}
                </span>
                <span className={`srh-chip ${matching ? "is-live" : ""}`}>
                  {opening ? "Task" : matching ? "Match" : "Workspace"}
                </span>
              </header>

              <AnimatePresence initial={false} mode="wait">
                {opening ? (
                  <motion.div
                    key="open"
                    className="srh-record"
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <strong>{SEARCH_OPEN.title}</strong>
                    <p>
                      {SEARCH_OPEN.kind.slice(0, -1)} · {SEARCH_OPEN.meta}
                    </p>
                    <button type="button" className="srh-go" tabIndex={-1}>
                      Open task
                      <Icon icon={ArrowUpRight} size={14} strokeWidth={2.1} />
                    </button>
                    <small>Opens on its own page. File contents are not searched.</small>
                  </motion.div>
                ) : (
                  <motion.div
                    key="scope"
                    className="srh-scope"
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <ul className="srh-kinds">
                      {SEARCH_KINDS.map((kind) => (
                        <li
                          key={kind}
                          className={grouped.some((group) => group.kind === kind) ? "is-on" : ""}
                        >
                          {kind}
                        </li>
                      ))}
                      <li>And more</li>
                    </ul>
                    <p className="srh-hint">
                      {matching
                        ? "A tighter query leaves the task, file, or project you meant."
                        : ready
                          ? "Results update from the live workspace. File names can match — contents cannot."
                          : "Projects, tasks, clients, files, leads, proposals, and more. Not file contents."}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </aside>
          </div>
        </div>
        <StoryNote>{SEARCH_META[tab].note}</StoryNote>
      </div>
    </section>
  );
}
