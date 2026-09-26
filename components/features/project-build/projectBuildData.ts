export const PROJECT_BUILD_TABS = ["shell", "team", "work", "live"] as const;

export type ProjectBuildTab = (typeof PROJECT_BUILD_TABS)[number];

export const PROJECT_BUILD_META: Record<
  ProjectBuildTab,
  {
    label: string;
    title: string;
    description: string;
    checks: string[];
    chrome: string;
  }
> = {
  shell: {
    label: "Shell",
    title: "Set up your project",
    description:
      "Give the project a name, description, priority, and budget tier. That shell is the foundation for everything else.",
    checks: ["Basic details", "Priority and status", "Budget tier", "Date range"],
    chrome: "New project",
  },
  team: {
    label: "Team",
    title: "Add your team",
    description:
      "Invite people and assign a project role. Access stays on the project — Owner, Manager, Contributor, Reviewer, or Viewer.",
    checks: ["Invite members", "Assign roles", "Set project access", "Team assembled"],
    chrome: "Project members",
  },
  work: {
    label: "Work",
    title: "Add tasks and track progress",
    description:
      "Break the project into tasks. Status lives on the board — progress is calculated from completed work, not a field you type.",
    checks: ["Create tasks", "Assign owners", "Move status", "Progress updates"],
    chrome: "Workflow board",
  },
  live: {
    label: "Live",
    title: "See it from the work",
    description:
      "Activity, dates, and completion land on the same project. The overview changes because the work changed.",
    checks: ["Activity feed", "Milestones and dates", "Task totals", "Progress from status"],
    chrome: "Project overview",
  },
};

export const DEMO_PROJECT = {
  name: "Website Redesign",
  code: "WR-204",
  type: "Client project",
  description: "Modernize the company site with a clearer structure and a faster first visit.",
  status: "Not Started",
  liveStatus: "In Progress",
  priority: "High",
  budget: "Tier 2",
  budgetHint: "$1,000 – $4,999",
  start: "12 Sep",
  due: "30 Oct",
  milestone: "Launch",
  milestoneDate: "24 Sep",
};

export const DEMO_MEMBERS = [
  { initials: "SJ", name: "Sarah Johnson", email: "sarah@organitio.dev", role: "Project Manager", tone: "blue" },
  { initials: "AX", name: "Alex Carter", email: "alex@organitio.dev", role: "Contributor", tone: "teal" },
  { initials: "DV", name: "David Wilson", email: "david@organitio.dev", role: "Viewer", tone: "purple" },
  { initials: "ED", name: "Emily Davis", email: "emily@organitio.dev", role: "Contributor", tone: "blue" },
] as const;

export const DEMO_TASKS = [
  { id: "setup", name: "Project setup", status: "completed", assignee: "Sarah", due: "12 Sep" },
  { id: "home", name: "Homepage design", status: "completed", assignee: "Sarah", due: "15 Sep" },
  { id: "hero", name: "Hero section", status: "pending", assignee: "Alex", due: "18 Sep" },
  { id: "content", name: "Content outline", status: "pending", assignee: "Emily", due: "20 Sep" },
  { id: "system", name: "Design system", status: "not_started", assignee: "Sarah", due: "22 Sep" },
  { id: "api", name: "API checklist", status: "pending", assignee: "Alex", due: "26 Sep" },
  { id: "backend", name: "Backend integration", status: "not_started", assignee: "Alex", due: "30 Sep" },
  { id: "qa", name: "Testing & QA", status: "not_started", assignee: "David", due: "8 Oct" },
] as const;

export const BOARD_COLUMNS = [
  { key: "not_started", label: "Backlog" },
  { key: "pending", label: "To Do" },
  { key: "in_progress", label: "In Progress" },
  { key: "on_hold", label: "Review" },
  { key: "completed", label: "Completed" },
] as const;

export function typedText(value: string, amount: number) {
  const chars = Math.round(value.length * Math.min(1, Math.max(0, amount)));
  return value.slice(0, chars);
}

export function taskCompletionPercent(completed: number, total: number) {
  if (total <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((completed / total) * 100)));
}

export function heroColumn(progress: number) {
  if (progress >= 0.78) return 4;
  if (progress >= 0.58) return 3;
  if (progress >= 0.38) return 2;
  if (progress >= 0.18) return 1;
  return 1;
}

export function workCompletedCount(progress: number) {
  return progress >= 0.78 ? 3 : 2;
}

export function liveCompletedCount(progress: number) {
  if (progress >= 0.62) return 5;
  if (progress >= 0.42) return 4;
  return 3;
}
