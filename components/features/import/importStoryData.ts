export const IMPORT_TABS = ["source", "map", "import", "ready"] as const;
export type ImportTab = (typeof IMPORT_TABS)[number];

export const IMPORT_META: Record<ImportTab, { label: string; title: string; note: string }> = {
  source: {
    label: "Source",
    title: "Choose a file",
    note: "Worknaro imports from CSV, Excel, or JSON. Native connectors are not available yet.",
  },
  map: {
    label: "Map",
    title: "Fields are matched",
    note: "Statuses, assignees, and due dates map to Worknaro fields before anything is written.",
  },
  import: {
    label: "Import",
    title: "The workspace is built",
    note: "Projects, tasks, members, and files import with progress and validation.",
  },
  ready: {
    label: "Ready",
    title: "Work lives here now",
    note: "The same projects and people appear in a Worknaro workspace — ready to continue.",
  },
};

export const IMPORT_SOURCES = [
  { id: "csv", ext: "CSV", name: "projects.csv", meta: "Projects and tasks" },
  { id: "xlsx", ext: "XLSX", name: "workspace.xlsx", meta: "Excel workbook" },
  { id: "json", ext: "JSON", name: "export.json", meta: "Structured export" },
] as const;

export const IMPORT_MAP = [
  { from: "To Do", to: "To Do" },
  { from: "Doing", to: "In Progress" },
  { from: "Done", to: "Completed" },
] as const;

export const IMPORT_STEPS = ["Preparing", "Importing", "Organizing", "Complete"] as const;

export const IMPORT_ROWS = [
  { label: "Projects", target: 100 },
  { label: "Tasks", target: 100 },
  { label: "Members", target: 100 },
  { label: "Files", target: 78 },
] as const;
