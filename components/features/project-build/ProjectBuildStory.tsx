"use client";

import { type KeyboardEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { Activity, Layers, SquareKanban, Users } from "lucide-react";
import {
  LiveScene,
  ShellScene,
  TeamScene,
  WorkScene,
} from "@/components/features/project-build/ProjectBuildScenes";
import {
  PROJECT_BUILD_META,
  PROJECT_BUILD_TABS,
  type ProjectBuildTab,
} from "@/components/features/project-build/projectBuildData";
import { useProjectBuildStory } from "@/components/features/project-build/useProjectBuildStory";

const TAB_ICONS = {
  shell: Layers,
  team: Users,
  work: SquareKanban,
  live: Activity,
} as const;

function Scene({
  tab,
  progress,
  reducedMotion,
}: {
  tab: ProjectBuildTab;
  progress: number;
  reducedMotion: boolean;
}) {
  if (tab === "team") return <TeamScene progress={progress} reducedMotion={reducedMotion} />;
  if (tab === "work") return <WorkScene progress={progress} reducedMotion={reducedMotion} />;
  if (tab === "live") return <LiveScene progress={progress} reducedMotion={reducedMotion} />;
  return <ShellScene progress={progress} reducedMotion={reducedMotion} />;
}

export function ProjectBuildStory() {
  const reduce = useReducedMotion();
  const { ref, tab, progress, selectTab } = useProjectBuildStory({
    reducedMotion: !!reduce,
  });

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = PROJECT_BUILD_TABS.indexOf(tab);
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      selectTab(PROJECT_BUILD_TABS[(index + 1) % PROJECT_BUILD_TABS.length]);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      selectTab(PROJECT_BUILD_TABS[(index - 1 + PROJECT_BUILD_TABS.length) % PROJECT_BUILD_TABS.length]);
    }
    if (event.key === "Home") {
      event.preventDefault();
      selectTab("shell");
    }
    if (event.key === "End") {
      event.preventDefault();
      selectTab("live");
    }
  };

  return (
    <section
      ref={ref}
      id="projects"
      className="pbs-section mig-section scroll-mt-24"
      aria-labelledby="projects-heading"
    >
      <div className="why-wrap pbs-wrap">
        <div className="mig-intro pbs-intro">
          <p className="audience-eyebrow mx-auto">Project management</p>
          <h2 id="projects-heading" className="mig-heading font-display">
            Build the project <span className="pfs-heading-accent">in one place.</span>
          </h2>
          <p className="mig-lead">
            A project in Organitio brings people, tasks, dates, and a budget tier together.
            Progress is calculated from task status — it is not a field you type.
          </p>
        </div>

        <div
          className="pbs-tabs"
          role="tablist"
          aria-label="Project build story"
          onKeyDown={onKeyDown}
        >
          {PROJECT_BUILD_TABS.map((id) => {
            const Icon = TAB_ICONS[id];
            const selected = tab === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                id={`pbs-tab-${id}`}
                aria-selected={selected}
                aria-controls="pbs-panel"
                tabIndex={selected ? 0 : -1}
                className={selected ? "is-active" : ""}
                onClick={() => selectTab(id)}
              >
                <Icon size={15} strokeWidth={2.1} aria-hidden="true" />
                {PROJECT_BUILD_META[id].label}
              </button>
            );
          })}
        </div>

        <div
          id="pbs-panel"
          role="tabpanel"
          aria-labelledby={`pbs-tab-${tab}`}
          className="pbs-panel"
        >
          <Scene tab={tab} progress={reduce ? 1 : progress} reducedMotion={!!reduce} />
        </div>
      </div>
    </section>
  );
}
