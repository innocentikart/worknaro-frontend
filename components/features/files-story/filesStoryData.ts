export const FILE_TABS = ["upload", "organize", "open", "linked"] as const;
export type FileTab = (typeof FILE_TABS)[number];

export const FILE_META: Record<FileTab, { label: string; title: string; note: string }> = {
  upload: {
    label: "Upload",
    title: "A file enters the project",
    note: "Attach files to a project, task, proposal, or client.",
  },
  organize: {
    label: "Organize",
    title: "Files sit in folders",
    note: "The project files hub lists folders and attached files.",
  },
  open: {
    label: "Open",
    title: "A file in context",
    note: "Download, version, share, favorite, or archive — from the file record.",
  },
  linked: {
    label: "Linked",
    title: "It stays with the work",
    note: "The file remains attached to the project it belongs to.",
  },
};

export const FILE_FOLDERS = [
  { id: "design", name: "Design", count: "1 file" },
  { id: "docs", name: "Documents", count: "2 files" },
] as const;

export const FILE_ITEMS = [
  {
    id: "proposal",
    name: "Proposal.pdf",
    kind: "PDF",
    size: "2.4 MB",
    folder: "Documents",
    folderId: "docs",
    attached: "Proposal",
  },
  {
    id: "contract",
    name: "Contract.pdf",
    kind: "PDF",
    size: "1.1 MB",
    folder: "Documents",
    folderId: "docs",
    attached: "Website Redesign",
  },
  {
    id: "fig",
    name: "Homepage.fig",
    kind: "FIG",
    size: "8.6 MB",
    folder: "Design",
    folderId: "design",
    attached: "Task · Hero section",
  },
] as const;

export const FILE_RECORD = FILE_ITEMS[1];

export const FILE_ACTIONS = [
  { id: "download", label: "Download" },
  { id: "version", label: "Version" },
  { id: "share", label: "Share" },
  { id: "favorite", label: "Favorite" },
  { id: "archive", label: "Archive" },
] as const;
