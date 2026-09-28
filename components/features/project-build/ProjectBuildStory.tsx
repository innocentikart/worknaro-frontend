"use client";

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
import { StoryTabs } from "@/components/features/story/StoryTabs";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { SectionBadge } from "@/components/ui/SectionBadge";

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

  return (
    <section
      ref={ref}
      id="projects"
      className="pbs-section mig-section scroll-mt-24"
      aria-labelledby="projects-heading"
    >
      <div className="why-wrap pbs-wrap">
        <div className="mig-intro pbs-intro">
          <SectionBadge icon={SquareKanban} className="mx-auto">
            Project management
          </SectionBadge>
          <h2 id="projects-heading" className="mig-heading font-display">
            Build the project <HeadingAccent>in one place.</HeadingAccent>
          </h2>
          <p className="mig-lead">
            A project in Worknaro brings people, tasks, dates, and a budget tier together.
            Progress is calculated from task status — it is not a field you type.
          </p>
        </div>

        <StoryTabs
          tabs={PROJECT_BUILD_TABS.map((id) => ({ id, label: PROJECT_BUILD_META[id].label }))}
          tab={tab}
          onSelect={selectTab}
          label="Project build story"
          prefix="pbs"
          icons={TAB_ICONS}
          className="pbs-tabs"
        />

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
