"use client";

import { AccessStory } from "@/components/features/access-story/AccessStory";
import { BoardStory } from "@/components/features/board-story/BoardStory";
import { CalendarTimeStory } from "@/components/features/calendar-story/CalendarTimeStory";
import { ClientStory } from "@/components/features/client-story/ClientStory";
import { FilesStory } from "@/components/features/files-story/FilesStory";
import { GanttStory } from "@/components/features/gantt-story/GanttStory";
import { LeadsStory } from "@/components/features/leads-story/LeadsStory";
import { ProjectBuildStory } from "@/components/features/project-build/ProjectBuildStory";
import { ProposalsStory } from "@/components/features/proposals-story/ProposalsStory";
import { ReportsStory } from "@/components/features/reports-story/ReportsStory";
import { SearchStory } from "@/components/features/search-story/SearchStory";
import { TagsStory } from "@/components/features/tags-story/TagsStory";
import { TimeFinanceStory } from "@/components/features/time-story/TimeFinanceStory";
import { TrashStory } from "@/components/features/trash-story/TrashStory";

export function ModuleStories() {
  return (
    <>
      <ProjectBuildStory />
      <BoardStory />
      <CalendarTimeStory />
      <GanttStory />
      <ClientStory />
      <TimeFinanceStory />
      <LeadsStory />
      <ProposalsStory />
      <FilesStory />
      <TagsStory />
      <TrashStory />
      <SearchStory />
      <ReportsStory />
      <AccessStory />
    </>
  );
}
