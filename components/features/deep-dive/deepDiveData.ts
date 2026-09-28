import {
  BOARD_COLUMNS,
  DEMO_MEMBERS,
  DEMO_PROJECT,
  DEMO_TASKS,
  taskCompletionPercent,
} from "@/components/features/project-build/projectBuildData";
import { ACCESS_MATRIX, ACCESS_PEOPLE } from "@/components/features/access-story/accessStoryData";
import { CLIENT_PROFILE } from "@/components/features/client-story/clientStoryData";
import { WEEK_DAYS } from "@/components/features/calendar-story/calendarStoryData";

export const DIVE_TABS = ["project", "board", "calendar", "clients", "access"] as const;
export type DiveTab = (typeof DIVE_TABS)[number];

export const DIVE_META: Record<DiveTab, { label: string; note: string }> = {
  project: {
    label: "Project",
    note: "Website Redesign holds the team, dates, and a budget tier. Progress is calculated from task status.",
  },
  board: {
    label: "Board",
    note: "The same tasks sit on the workspace board — Backlog, To Do, In Progress, Review, and Completed.",
  },
  calendar: {
    label: "Calendar",
    note: "Those tasks appear on the calendar from their start and due dates. Launch is a milestone.",
  },
  clients: {
    label: "Clients",
    note: "Website Redesign is a client project for Northwind Studio. The work stays attached to the client.",
  },
  access: {
    label: "Access",
    note: "Workspace roles are Owner, Admin, Manager, Member, Viewer, and Guest. You cannot invite someone as Owner.",
  },
};

export const DIVE_PROJECT = DEMO_PROJECT;
export const DIVE_MEMBERS = DEMO_MEMBERS;
export const DIVE_TASKS = DEMO_TASKS;
export const DIVE_COLUMNS = BOARD_COLUMNS;
export const DIVE_PEOPLE = ACCESS_PEOPLE;
export const DIVE_MATRIX = ACCESS_MATRIX;
export const DIVE_CLIENT = CLIENT_PROFILE;
export const DIVE_WEEK = WEEK_DAYS;
export const DIVE_EVENTS = [
  { id: "home", short: "Homepage design", startDay: 21, endDay: 22, tone: "violet", milestone: false },
  { id: "hero", short: "Hero section", startDay: 23, endDay: 24, tone: "blue", milestone: false },
  { id: "content", short: "Content outline", startDay: 24, endDay: 26, tone: "amber", milestone: false },
  { id: "launch", short: "Launch", startDay: 24, endDay: 24, tone: "green", milestone: true },
  { id: "api", short: "API checklist", startDay: 25, endDay: 27, tone: "teal", milestone: false },
] as const;

export const DIVE_TASK_TOTAL = DEMO_TASKS.length;
export const DIVE_TASK_DONE = DEMO_TASKS.filter((task) => task.status === "completed").length;
export const DIVE_PROGRESS = taskCompletionPercent(DIVE_TASK_DONE, DIVE_TASK_TOTAL);

export const DIVE_CLIENT_PROJECTS = [
  {
    id: "web",
    name: DEMO_PROJECT.name,
    code: DEMO_PROJECT.code,
    status: DEMO_PROJECT.liveStatus,
    dates: `${DEMO_PROJECT.start} – ${DEMO_PROJECT.due}`,
    focus: true,
  },
  {
    id: "brand",
    name: "Brand Strategy",
    code: "Northwind Studio",
    status: "Review",
    dates: "5 Sep – 20 Oct",
    focus: false,
  },
] as const;

export type BoardColumnKey = (typeof BOARD_COLUMNS)[number]["key"];

export const DIVE_BOARD: Record<BoardColumnKey, Array<{ id: string; name: string; who: string; due: string }>> = {
  not_started: [
    { id: "system", name: "Design system", who: "Sarah", due: "22 Sep" },
    { id: "backend", name: "Backend integration", who: "Alex", due: "30 Sep" },
    { id: "qa", name: "Testing & QA", who: "David", due: "8 Oct" },
  ],
  pending: [
    { id: "content", name: "Content outline", who: "Emily", due: "20 Sep" },
    { id: "api", name: "API checklist", who: "Alex", due: "26 Sep" },
  ],
  in_progress: [],
  on_hold: [],
  completed: [
    { id: "setup", name: "Project setup", who: "Sarah", due: "12 Sep" },
    { id: "home", name: "Homepage design", who: "Sarah", due: "15 Sep" },
  ],
};

export const DIVE_HERO = {
  id: "hero",
  name: "Hero section",
  who: "Alex",
  due: "18 Sep",
  meta: "Alex · High · WR-204",
} as const;

export function heroBoardColumn(tab: DiveTab, progress: number): BoardColumnKey {
  if (tab === "project") return "pending";
  if (tab !== "board") return "in_progress";
  if (progress >= 0.72) return "on_hold";
  if (progress >= 0.38) return "in_progress";
  return "pending";
}

export function columnLabel(key: BoardColumnKey) {
  return DIVE_COLUMNS.find((column) => column.key === key)?.label ?? key;
}
