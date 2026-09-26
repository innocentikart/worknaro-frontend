import type { StoryStage } from "@/components/features/story/storyUtils";

export const INSIGHTS_STAGES: StoryStage[] = [
  {
    id: "activity",
    label: "Activity",
    title: "Project activity",
    description:
      "Completed work, overdue tasks, comments, assignments, and milestones accumulate on the project.",
    start: 0,
    end: 0.2,
  },
  {
    id: "context",
    label: "Patterns",
    title: "Relationships appear",
    description:
      "An overdue task, a blocked dependency, and a delayed milestone become meaningful when viewed together.",
    start: 0.2,
    end: 0.4,
  },
  {
    id: "analysis",
    label: "Analysis",
    title: "Activity is reviewed",
    description:
      "When enabled, AI Insights reviews project and task activity—not comments, files, or invoices.",
    start: 0.4,
    end: 0.6,
  },
  {
    id: "insight",
    label: "Insight",
    title: "A schedule risk is clear",
    description:
      "The pattern becomes an insight: overdue work, blocked dependencies, and a milestone under pressure.",
    start: 0.6,
    end: 0.8,
  },
  {
    id: "action",
    label: "Action",
    title: "A next step is ready",
    description:
      "The insight points back to the work—review overdue tasks and continue in the project.",
    start: 0.8,
    end: 1.01,
  },
];
