export const TAG_TABS = ["work", "tag", "filter", "context"] as const;
export type TagTab = (typeof TAG_TABS)[number];

export const TAG_META: Record<TagTab, { label: string; title: string; note: string }> = {
  work: {
    label: "Work",
    title: "Tasks without a filter",
    note: "The tag catalog applies to tasks and project descriptions — not files.",
  },
  tag: {
    label: "Tag",
    title: "Urgent is applied",
    note: "A workspace tag such as Urgent can be attached to a task.",
  },
  filter: {
    label: "Filter",
    title: "Only matching work remains",
    note: "Filter the task list by tag. Multiple tags can sit on one task.",
  },
  context: {
    label: "Context",
    title: "Lightweight structure",
    note: "Tags add context without changing status or project membership.",
  },
};

export const TAG_CHIPS = ["Urgent", "Design", "Development", "Client"] as const;

export const TAG_RECORDS: ReadonlyArray<{
  id: string;
  name: string;
  project: string;
  who: string;
  kind: "Task";
  tags: readonly string[];
}> = [
  { id: "hero", name: "Hero section", project: "Website Redesign", who: "Alex", kind: "Task", tags: ["Urgent", "Design"] },
  { id: "api", name: "API checklist", project: "Website Redesign", who: "Alex", kind: "Task", tags: ["Urgent", "Development"] },
  { id: "review", name: "Client review", project: "Website Redesign", who: "Sarah", kind: "Task", tags: ["Client"] },
  { id: "notes", name: "Kickoff checklist", project: "Website Redesign", who: "David", kind: "Task", tags: ["Design"] },
];
