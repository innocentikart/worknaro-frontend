export const TIME_TABS = ["work", "time", "finance", "budget"] as const;
export type TimeTab = (typeof TIME_TABS)[number];

export const TIME_META: Record<TimeTab, { label: string; title: string; note: string }> = {
  work: {
    label: "Work",
    title: "A task is in progress",
    note: "Time is logged against a project and optionally a task — separately from billing.",
  },
  time: {
    label: "Time",
    title: "Hours are recorded",
    note: "A timesheet entry stores hours, work date, and whether the time is billable.",
  },
  finance: {
    label: "Finance",
    title: "Invoices and expenses",
    note: "Invoices and approved expenses are recorded in Finance. They are not created from the timesheet.",
  },
  budget: {
    label: "Budget",
    title: "Spend against a tier",
    note: "Project spend is invoices plus approved expenses, compared to the project budget tier.",
  },
};

export const TIME_TASK = {
  name: "Hero section",
  project: "Website Redesign",
  code: "WR-204",
  assignee: "Alex",
  initials: "AX",
  date: "18 Sep",
};

export const TIME_LOG = {
  hours: 2.5,
  label: "2h 30m",
  billable: true,
};

export const TIME_WEEK = {
  logged: 18.5,
  billable: 16,
  nonBillable: 2.5,
};

export const TIME_FINANCE = {
  invoice: "INV-1042",
  invoiceStatus: "Draft",
  invoiceAmount: 1140,
  expense: "Stock photos",
  expenseStatus: "Approved",
  expenseAmount: 100,
  spend: 1240,
  tier: 2,
  cap: 4999,
};
