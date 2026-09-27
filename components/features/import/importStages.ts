import type { StoryStage } from "@/components/features/story/storyUtils";

export const IMPORT_STAGES: StoryStage[] = [
  {
    id: "existing",
    label: "Existing work",
    title: "Your current workspace",
    description:
      "Projects, tasks, members, comments, files, labels, statuses, and due dates already exist somewhere else.",
    start: 0,
    end: 0.2,
  },
  {
    id: "prepare",
    label: "Prepare",
    title: "Work is prepared",
    description:
      "Worknaro imports from CSV, Excel, or JSON. Export from another tool, then bring those objects across.",
    start: 0.2,
    end: 0.4,
  },
  {
    id: "map",
    label: "Map",
    title: "Fields are matched",
    description:
      "Statuses, assignees, and due dates map to Worknaro fields before anything is written.",
    start: 0.4,
    end: 0.6,
  },
  {
    id: "import",
    label: "Import",
    title: "The workspace is built",
    description:
      "Projects, tasks, members, comments, and files import with progress, validation, and rollback.",
    start: 0.6,
    end: 0.8,
  },
  {
    id: "organitio",
    label: "Worknaro",
    title: "Work lives here now",
    description:
      "The same projects and people appear in a Worknaro workspace—ready to continue, not start over.",
    start: 0.8,
    end: 1.01,
  },
];

export const IMPORT_MOBILE_STAGES = [
  { id: "existing", label: "Existing work", progress: 0.1 },
  { id: "map", label: "Map", progress: 0.5 },
  { id: "import", label: "Import", progress: 0.7 },
  { id: "organitio", label: "Worknaro", progress: 0.92 },
] as const;
