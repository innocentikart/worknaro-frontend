export const CLIENT_TABS = ["client", "projects", "work", "connected"] as const;

export type ClientTab = (typeof CLIENT_TABS)[number];

export const CLIENT_META: Record<
  ClientTab,
  { label: string; title: string; description: string }
> = {
  client: {
    label: "Client",
    title: "Client",
    description: "View client details, contact info, and account status.",
  },
  projects: {
    label: "Projects",
    title: "Projects",
    description: "See all client projects and their progress at a glance.",
  },
  work: {
    label: "Work",
    title: "Work",
    description: "View related tasks, proposals, and activity.",
  },
  connected: {
    label: "Connected",
    title: "Connected",
    description: "Everything is linked — so you stay in sync.",
  },
};

export const CLIENT_PROFILE = {
  name: "Northwind Studio",
  initials: "NW",
  avatar: "/avatars/visitor-green.svg",
  status: "Active",
  email: "hello@northwind.studio",
  phone: "+1 415 555 0148",
  lastContact: "Sep 12, 2025",
  manager: "Sarah",
} as const;

export const CLIENT_NAV = [
  { id: "clients", label: "Clients", active: true },
  { id: "projects", label: "Projects", active: false },
  { id: "tasks", label: "Tasks", active: false },
  { id: "proposals", label: "Proposals", active: false },
  { id: "files", label: "Files", active: false },
  { id: "settings", label: "Settings", active: false },
] as const;

export const CLIENT_PAGE_TABS = ["Overview", "Projects", "Tasks", "Proposals", "Activity"] as const;

export function pageTabFor(tab: ClientTab) {
  if (tab === "projects") return "Projects";
  if (tab === "work") return "Tasks";
  return "Overview";
}

export const CLIENT_STATS = [
  { id: "projects", value: "3", label: "Projects" },
  { id: "tasks", value: "12", label: "Tasks" },
  { id: "proposals", value: "4", label: "Proposals" },
  { id: "contact", value: "12 Sep", label: "Last contact" },
] as const;

export const CLIENT_PROJECTS = [
  {
    id: "web",
    name: "Website Redesign",
    status: "In Progress",
    progress: 65,
    dates: "Aug 1 – Sep 30",
    tone: "teal",
  },
  {
    id: "app",
    name: "Mobile App Development",
    status: "In Progress",
    progress: 20,
    dates: "Aug 15 – Nov 30",
    tone: "violet",
  },
  {
    id: "brand",
    name: "Brand Strategy",
    status: "Review",
    progress: 80,
    dates: "Sep 5 – Oct 20",
    tone: "purple",
  },
] as const;

export const CLIENT_TASKS = [
  {
    id: "home",
    name: "Design homepage",
    project: "Website Redesign",
    status: "Completed",
    tone: "teal",
  },
  {
    id: "hero",
    name: "Hero section",
    project: "Website Redesign",
    status: "In Progress",
    tone: "violet",
  },
  {
    id: "api",
    name: "API checklist",
    project: "Website Redesign",
    status: "Not started",
    tone: "amber",
  },
] as const;

export const CLIENT_PROPOSALS = [
  {
    id: "pr18",
    name: "Brand Strategy Proposal",
    status: "Sent",
    date: "11 Sep",
  },
] as const;

export const CLIENT_ACTIVITY = [
  {
    id: "upd",
    title: "Project updated",
    detail: "Website Redesign",
    time: "2 hours ago",
  },
  {
    id: "done",
    title: "Task completed",
    detail: "Design homepage",
    time: "4 hours ago",
  },
  {
    id: "sent",
    title: "Proposal sent",
    detail: "Brand Strategy Proposal",
    time: "1 day ago",
  },
] as const;
