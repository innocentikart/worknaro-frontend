export const REPORT_TABS = ["activity", "group", "metrics", "report"] as const;
export type ReportTab = (typeof REPORT_TABS)[number];

export const REPORT_META: Record<ReportTab, { label: string; title: string; note: string }> = {
  activity: {
    label: "Activity",
    title: "Raw project work",
    note: "Reports assemble from projects and timesheets that already exist.",
  },
  group: {
    label: "Group",
    title: "Work is grouped",
    note: "Project and timesheet reports group entries by project, person, and period.",
  },
  metrics: {
    label: "Metrics",
    title: "Counts become clear",
    note: "See completion, hours, and billable time. These reports require Pro or above.",
  },
  report: {
    label: "Report",
    title: "A report you can use",
    note: "Open the project or timesheet report. Timesheets can export to CSV.",
  },
};

export const REPORT_POINTS = [28, 34, 41, 48, 52, 58, 64] as const;

export const REPORT_ACTIVITY = [
  { label: "Hero section completed", when: "Today" },
  { label: "2h 30m logged · Alex", when: "18 Sep" },
  { label: "Client review waiting", when: "3 days" },
] as const;

export const REPORT_GROUPS = [
  { name: "Website Redesign", kind: "Project", detail: "12 tasks", hours: "18.5h" },
  { name: "Alex", kind: "Person", detail: "Timesheet", hours: "12.0h" },
  { name: "18–24 Sep", kind: "Period", detail: "This week", hours: "18.5h" },
] as const;
