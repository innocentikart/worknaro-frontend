import type { StoryStage } from "@/components/features/story/storyUtils";
import { IMPORT_STAGE_RANGES } from "@/components/features/import/importStoryData";

export const IMPORT_STAGES: StoryStage[] = [
  {
    id: "preparing",
    label: "Preparing",
    title: "Ready to migrate",
    description:
      "Existing projects, tasks, and workflows are collected so they can move into Worknaro together.",
    ...IMPORT_STAGE_RANGES.preparing,
  },
  {
    id: "importing",
    label: "Importing",
    title: "Bring the file in",
    description:
      "Import CSV, Excel, or JSON today — native connectors are not available yet.",
    ...IMPORT_STAGE_RANGES.importing,
  },
  {
    id: "organizing",
    label: "Organizing",
    title: "Mapped into Worknaro",
    description:
      "Imported work is placed into projects, tasks, team workflows, and files.",
    ...IMPORT_STAGE_RANGES.organizing,
  },
  {
    id: "complete",
    label: "Complete",
    title: "Keep going",
    description: "Your workspace is ready to keep going.",
    ...IMPORT_STAGE_RANGES.complete,
  },
];
