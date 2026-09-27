export const SEARCH_TABS = ["workspace", "query", "match", "open"] as const;
export type SearchTab = (typeof SEARCH_TABS)[number];

export const SEARCH_META: Record<SearchTab, { label: string; title: string; note: string }> = {
  workspace: {
    label: "Workspace",
    title: "Many kinds of work",
    note: "Search looks across projects, tasks, clients, files, leads, proposals, and more.",
  },
  query: {
    label: "Query",
    title: "Type to narrow",
    note: "Results update from the live workspace — there is no separate search index.",
  },
  match: {
    label: "Match",
    title: "The relevant item",
    note: "A tighter query leaves the task, file, or project you meant.",
  },
  open: {
    label: "Open",
    title: "Go to the record",
    note: "Open the result in its own page. File contents are not searched.",
  },
};

export const SEARCH_HITS = [
  { kind: "Projects", title: "Website Redesign", meta: "WR-204 · Active", match: 1 },
  { kind: "Tasks", title: "Alpha design pass", meta: "Website Redesign · Alex", match: 3 },
  { kind: "Files", title: "alpha-brief.pdf", meta: "Project file · 1.2 MB", match: 2 },
  { kind: "Clients", title: "Northwind Studio", meta: "Sarah · Active", match: 1 },
  { kind: "Leads", title: "Brightline Co", meta: "Alex · $12,400", match: 1 },
  { kind: "Proposals", title: "PR-18 Website Redesign", meta: "Viewed · Northwind", match: 1 },
] as const;

export function searchQuery(tab: SearchTab, progress: number) {
  if (tab === "workspace") return "";
  if (tab === "query") {
    const text = "alpha";
    const n = Math.max(1, Math.round(progress * text.length));
    return text.slice(0, n);
  }
  const text = "alpha design";
  if (tab === "match") {
    const n = Math.max(6, Math.round(5 + progress * (text.length - 5)));
    return text.slice(0, n);
  }
  return text;
}

export function searchLevel(tab: SearchTab) {
  if (tab === "workspace") return 1;
  if (tab === "query") return 2;
  return 3;
}
