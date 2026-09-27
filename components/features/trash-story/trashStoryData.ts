export const TRASH_TABS = ["active", "trash", "restore", "back"] as const;
export type TrashTab = (typeof TRASH_TABS)[number];

export const TRASH_META: Record<TrashTab, { label: string; title: string; note: string }> = {
  active: {
    label: "Active",
    title: "A file in the project",
    note: "Trash is for files and documents — not clients, leads, or proposals.",
  },
  trash: {
    label: "Trash",
    title: "It leaves the project",
    note: "Soft-delete moves the file to /files/trash/ and starts a 30-day retention.",
  },
  restore: {
    label: "Restore",
    title: "Bring it back",
    note: "Restore clears the delete flags and returns the file to its folder.",
  },
  back: {
    label: "Back",
    title: "It is in context again",
    note: "Permanent delete and empty trash remove the file. That is a separate action.",
  },
};

export const TRASH_FILE = {
  name: "Contract.pdf",
  project: "Website Redesign",
  folder: "Documents",
  retention: "30 days",
};
