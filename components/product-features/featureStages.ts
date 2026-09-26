export type FeatureStageId =
  | "activity"
  | "people"
  | "projects"
  | "workflows"
  | "team"
  | "metrics"
  | "outcome";

export type FeatureStage = {
  id: FeatureStageId;
  label: string;
  title: string;
  description: string;
  /** Inclusive start of scroll progress for this stage (0–1). */
  start: number;
  /** Exclusive end of scroll progress for this stage (0–1). */
  end: number;
};

export const FEATURE_STAGES: FeatureStage[] = [
  {
    id: "activity",
    label: "Plan",
    title: "Plan the work",
    description: "See what's happening across your workspace before you organize it.",
    start: 0,
    end: 0.14,
  },
  {
    id: "people",
    label: "People",
    title: "People",
    description:
      "Know who owns the work and how each contribution connects to the project.",
    start: 0.14,
    end: 0.28,
  },
  {
    id: "projects",
    label: "Organize",
    title: "Organize the work",
    description: "Keep tasks, files, communication and milestones together.",
    start: 0.28,
    end: 0.42,
  },
  {
    id: "workflows",
    label: "Collaborate",
    title: "Collaborate in motion",
    description:
      "See work move from planning to completion without losing context.",
    start: 0.42,
    end: 0.57,
  },
  {
    id: "team",
    label: "Team",
    title: "Team collaboration",
    description:
      "Give everyone a clear view of what they own and what's happening next.",
    start: 0.57,
    end: 0.71,
  },
  {
    id: "metrics",
    label: "Track",
    title: "Track time and budget",
    description:
      "Connect project activity to the time and resources behind it.",
    start: 0.71,
    end: 0.86,
  },
  {
    id: "outcome",
    label: "Understand",
    title: "Understand the outcome",
    description:
      "See the complete picture of your work in one connected workspace.",
    start: 0.86,
    end: 1.01,
  },
];

export const STORY_PROJECT = {
  name: "Website Redesign",
  code: "WR-204",
};

export const STORY_PEOPLE = [
  {
    id: "sarah",
    name: "Sarah Johnson",
    role: "Product Designer",
    initials: "SJ",
    accent: "blue" as const,
  },
  {
    id: "michael",
    name: "Michael Chen",
    role: "Frontend Engineer",
    initials: "MC",
    accent: "teal" as const,
  },
  {
    id: "david",
    name: "David Okonkwo",
    role: "QA Lead",
    initials: "DO",
    accent: "purple" as const,
  },
] as const;

export const STORY_ACTIVITIES = [
  {
    id: "a1",
    personId: "sarah",
    action: "completed Homepage Design",
    project: STORY_PROJECT.name,
    time: "2m",
    highlight: true,
  },
  {
    id: "a2",
    personId: "michael",
    action: "uploaded project files",
    project: STORY_PROJECT.name,
    time: "5m",
    highlight: false,
  },
  {
    id: "a3",
    personId: "david",
    action: 'moved "API Integration"',
    project: "Development",
    time: "8m",
    highlight: false,
  },
  {
    id: "a4",
    personId: "sarah",
    action: "commented on Mobile UI",
    project: STORY_PROJECT.name,
    time: "11m",
    highlight: false,
  },
  {
    id: "a5",
    personId: "michael",
    action: "Client approved milestone",
    project: STORY_PROJECT.name,
    time: "14m",
    highlight: false,
  },
] as const;

export const STORY_TASKS = [
  { id: "t1", name: "Discovery", done: true },
  { id: "t2", name: "Wireframes", done: true },
  { id: "t3", name: "Homepage Design", done: true, featured: true },
  { id: "t4", name: "Mobile UI", done: false },
  { id: "t5", name: "Client Review", done: false },
] as const;

export const STORY_WORKFLOW = [
  { id: "brief", label: "Brief", status: "done" as const },
  { id: "planning", label: "Planning", status: "done" as const },
  { id: "design", label: "Design", status: "done" as const, featured: true },
  { id: "development", label: "Development", status: "active" as const },
  { id: "review", label: "Review", status: "todo" as const },
  { id: "completed", label: "Completed", status: "todo" as const },
] as const;

export const STORY_METRICS = {
  progress: 78,
  tasksDone: 42,
  tasksTotal: 54,
  hoursLogged: 86,
  hoursBudget: 120,
  budgetSpent: 4820,
  budgetTotal: 7500,
};

export const STORY_OUTCOME = {
  progress: 100,
  tasksDone: 48,
  tasksTotal: 54,
  hours: 120,
  budget: 7500,
  team: 6,
  milestones: 5,
};

export function stageIndexForProgress(progress: number): number {
  const p = Math.min(1, Math.max(0, progress));
  const idx = FEATURE_STAGES.findIndex((s) => p >= s.start && p < s.end);
  return idx === -1 ? FEATURE_STAGES.length - 1 : idx;
}

/** Soft weight for a stage so adjacent stages can blend. */
export function stageWeight(progress: number, start: number, end: number): number {
  const mid = (start + end) / 2;
  const half = (end - start) / 2 + 0.04;
  const dist = Math.abs(progress - mid);
  return Math.max(0, 1 - dist / half);
}
