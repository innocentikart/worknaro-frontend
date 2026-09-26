export const GANTT_TABS = ["tasks", "bars", "links", "schedule"] as const;

export type GanttTab = (typeof GANTT_TABS)[number];

export const GANTT_META: Record<
  GanttTab,
  { label: string; title: string; description: string }
> = {
  tasks: {
    label: "Tasks",
    title: "Tasks → Schedule",
    description: "See your project as a timeline with clear start and due dates.",
  },
  bars: {
    label: "Bars",
    title: "Reschedule",
    description: "Bars represent task duration and can be rescheduled.",
  },
  links: {
    label: "Links",
    title: "Dependencies",
    description: "Links show task relationships when they exist. The chart does not create them.",
  },
  schedule: {
    label: "Schedule",
    title: "The project schedule",
    description: "The complete schedule shows timing and relationships at a glance.",
  },
};

export const GANTT_RANGE = { start: 8, end: 30 } as const;

export const GANTT_WORK = [
  {
    id: "design",
    name: "Design homepage",
    startDay: 8,
    endDay: 13,
    done: true,
    status: "completed",
    tone: "teal",
    milestone: false,
    dependsOn: [] as const,
  },
  {
    id: "develop",
    name: "Develop features",
    startDay: 14,
    endDay: 18,
    done: false,
    status: "in_progress",
    tone: "violet",
    milestone: false,
    dependsOn: ["design"] as const,
  },
  {
    id: "api",
    name: "API integration",
    startDay: 19,
    endDay: 22,
    done: false,
    status: "not_started",
    tone: "purple",
    milestone: false,
    dependsOn: ["develop"] as const,
  },
  {
    id: "qa",
    name: "Testing & QA",
    startDay: 23,
    endDay: 26,
    done: false,
    status: "not_started",
    tone: "amber",
    milestone: false,
    dependsOn: ["api"] as const,
  },
  {
    id: "launch",
    name: "Launch",
    startDay: 27,
    endDay: 29,
    done: false,
    status: "not_started",
    tone: "green",
    milestone: true,
    dependsOn: ["qa"] as const,
  },
] as const;

export type GanttWorkItem = (typeof GANTT_WORK)[number];

export const GANTT_STATUS: Record<GanttWorkItem["status"], string> = {
  completed: "Done",
  in_progress: "In progress",
  not_started: "Not started",
};

export const GANTT_LINKS = GANTT_WORK.flatMap((item) =>
  item.dependsOn.map((from) => ({ from, to: item.id })),
);

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export const GANTT_DAYS = Array.from({ length: GANTT_RANGE.end - GANTT_RANGE.start }, (_, index) => {
  const day = GANTT_RANGE.start + index;
  const label = WEEKDAYS[index % 7];
  return {
    day,
    label,
    weekend: label === "Sat" || label === "Sun",
    today: day === 24,
  };
});

type DateRange = { start: number; end: number };

export function dayPct(day: number, range: DateRange = GANTT_RANGE) {
  return ((day - range.start) / (range.end - range.start)) * 100;
}

export function barSpan(item: GanttWorkItem) {
  const left = dayPct(item.startDay);
  const width = Math.max(dayPct(item.endDay + 1) - left, 6);
  return { left, width };
}
