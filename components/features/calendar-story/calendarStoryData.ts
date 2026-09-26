export const CALENDAR_TIME_TABS = ["tasks", "bars", "links", "schedule"] as const;

export type CalendarTimeTab = (typeof CALENDAR_TIME_TABS)[number];

export const CALENDAR_TIME_META: Record<
  CalendarTimeTab,
  { label: string; title: string; description: string; chrome: string; note: string }
> = {
  tasks: {
    label: "Tasks",
    title: "Tasks",
    description: "See your tasks and open the related record.",
    chrome: "Tasks",
    note: "Open a task to see the related record.",
  },
  bars: {
    label: "Bars",
    title: "Bars",
    description: "View project timelines at a glance.",
    chrome: "Timeline",
    note: "Bars come from task start and due dates.",
  },
  links: {
    label: "Links",
    title: "Links",
    description: "Quick access to related records and dependencies.",
    chrome: "Links",
    note: "Finish-to-start lines display when dependencies exist. The chart does not create them.",
  },
  schedule: {
    label: "Schedule",
    title: "Schedule",
    description: "See project dates, open tasks and milestones.",
    chrome: "Schedule",
    note: "Read-only · Open the related record.",
  },
};

export const BAR_RANGE = { start: 21, end: 28 } as const;
export const WEEK_RANGE = { start: 21, end: 28 } as const;

export const TIME_WORK = [
  {
    id: "home",
    name: "Homepage design",
    short: "Homepage design",
    status: "Completed",
    who: "SJ",
    startDay: 21,
    endDay: 22,
    tone: "violet",
    dependsOn: [] as const,
  },
  {
    id: "hero",
    name: "Hero section",
    short: "Hero section",
    status: "In Progress",
    who: "AX",
    startDay: 23,
    endDay: 24,
    tone: "blue",
    dependsOn: ["home"] as const,
  },
  {
    id: "api",
    name: "API checklist",
    short: "API checklist",
    status: "To Do",
    who: "AX",
    startDay: 25,
    endDay: 27,
    tone: "teal",
    dependsOn: ["hero"] as const,
  },
  {
    id: "content",
    name: "Content review",
    short: "Content review",
    status: "To Do",
    who: "ED",
    startDay: 24,
    endDay: 26,
    tone: "amber",
    dependsOn: [] as const,
  },
  {
    id: "launch",
    name: "Launch",
    short: "Launch",
    status: "Milestone",
    who: "SJ",
    startDay: 24,
    endDay: 24,
    tone: "green",
    milestone: true,
    dependsOn: [] as const,
  },
] as const;

export type TimeWorkItem = (typeof TIME_WORK)[number];

export const TIME_LINKS = TIME_WORK.flatMap((item) =>
  item.dependsOn.map((from) => ({ from, to: item.id })),
);

const LINKED_IDS = new Set(TIME_LINKS.flatMap((link) => [link.from, link.to]));

export function workForTab(tab: CalendarTimeTab) {
  if (tab !== "links") return TIME_WORK;
  return TIME_WORK.filter((item) => LINKED_IDS.has(item.id));
}

export const WEEK_DAYS = [
  { label: "Mon", num: 21 },
  { label: "Tue", num: 22 },
  { label: "Wed", num: 23 },
  { label: "Thu", num: 24, today: true },
  { label: "Fri", num: 25 },
  { label: "Sat", num: 26 },
  { label: "Sun", num: 27 },
] as const;

export const BAR_TICKS = [
  { label: "21", day: 21 },
  { label: "23", day: 23 },
  { label: "24", day: 24, mile: true },
  { label: "26", day: 26 },
  { label: "27", day: 27 },
] as const;

type DateRange = { start: number; end: number };

export function dayPct(day: number, range: DateRange) {
  return ((day - range.start) / (range.end - range.start)) * 100;
}

export function itemSpan(item: TimeWorkItem, range: DateRange) {
  const start = Math.max(item.startDay, range.start);
  const endExclusive = Math.min(item.endDay + 1, range.end);
  const visible = item.endDay >= range.start && item.startDay < range.end;
  const left = dayPct(start, range);
  const width = Math.max(dayPct(endExclusive, range) - left, item.milestone ? 12 : 10);
  return { left, width, visible };
}

export function geometryForTab(item: TimeWorkItem, tab: CalendarTimeTab) {
  return itemSpan(item, tab === "schedule" ? WEEK_RANGE : BAR_RANGE);
}

export function workById(id: string) {
  return TIME_WORK.find((item) => item.id === id) ?? TIME_WORK[0];
}
