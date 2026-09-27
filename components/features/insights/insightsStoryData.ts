export const INSIGHT_TABS = ["activity", "analysis", "insight", "action"] as const;
export type InsightTab = (typeof INSIGHT_TABS)[number];

export const INSIGHT_META: Record<InsightTab, { label: string; title: string; note: string }> = {
  activity: {
    label: "Activity",
    title: "Project activity",
    note: "Completed work, overdue tasks, and blocked dependencies accumulate on the project.",
  },
  analysis: {
    label: "Analysis",
    title: "Activity is reviewed",
    note: "When enabled, AI Insights reviews project and task activity — not comments, files, or invoices.",
  },
  insight: {
    label: "Insight",
    title: "A pattern is clear",
    note: "Delivery is slowing around review. Overdue work and blocked tasks sit together.",
  },
  action: {
    label: "Action",
    title: "A next step is ready",
    note: "The insight points back to the work — review overdue tasks and continue in the project.",
  },
};

export const INSIGHT_ACTIVITY = [
  { id: "done", actor: "Sarah", action: "completed Homepage design", time: "2m", linked: false },
  { id: "overdue", actor: "Hero section", action: "is 4 days overdue", time: "Now", linked: true },
  { id: "blocked", actor: "API checklist", action: "is blocked by Hero section", time: "Today", linked: true },
  { id: "review", actor: "Client review", action: "has been waiting in Review", time: "3d", linked: true },
  { id: "time", actor: "Alex", action: "logged 2h 30m on Hero section", time: "1h", linked: false },
] as const;
