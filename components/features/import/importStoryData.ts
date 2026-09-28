export const IMPORT_TABS = ["preparing", "importing", "organizing", "complete"] as const;
export type ImportTab = (typeof IMPORT_TABS)[number];

export const IMPORT_STEPS = ["Preparing", "Importing", "Organizing", "Complete"] as const;

export const IMPORT_META: Record<ImportTab, { label: string; note: string }> = {
  preparing: {
    label: "Preparing",
    note: "Your existing workspace is ready to move — nothing needs to be rebuilt by hand.",
  },
  importing: {
    label: "Importing",
    note: "Worknaro imports from CSV, Excel, or JSON. Native connectors are not available yet.",
  },
  organizing: {
    label: "Organizing",
    note: "Projects, tasks, workflows, and files land in their Worknaro structures.",
  },
  complete: {
    label: "Complete",
    note: "Your workspace is ready to keep going.",
  },
};

export const IMPORT_SOURCES = [
  { id: "csv", ext: "CSV", name: "projects.csv", meta: "Projects and tasks" },
  { id: "xlsx", ext: "XLSX", name: "workspace.xlsx", meta: "Excel workbook" },
  { id: "json", ext: "JSON", name: "export.json", meta: "Structured export" },
] as const;

export const IMPORT_COUNTS = [
  { id: "projects", label: "Projects", count: 12 },
  { id: "tasks", label: "Tasks", count: 248 },
  { id: "workflows", label: "Team workflows", count: 6 },
  { id: "files", label: "Files/attachments", count: 53 },
] as const;

export const IMPORT_PREVIEW_ROWS = [
  { id: "alpha", title: "Website redesign", tone: "blue", status: "In progress" },
  { id: "bravo", title: "Q3 onboarding", tone: "teal", status: "To do" },
  { id: "charlie", title: "API checklist", tone: "violet", status: "In progress" },
  { id: "delta", title: "Client portal", tone: "amber", status: "To do" },
] as const;

export const IMPORT_STAGE_RANGES: Record<ImportTab, { start: number; end: number }> = {
  preparing: { start: 0, end: 0.24 },
  importing: { start: 0.24, end: 0.5 },
  organizing: { start: 0.5, end: 0.74 },
  complete: { start: 0.74, end: 1.05 },
};
