export const LEAD_TABS = ["new", "pipeline", "won", "convert"] as const;
export type LeadTab = (typeof LEAD_TABS)[number];

export const LEAD_META: Record<LeadTab, { label: string; title: string; note: string }> = {
  new: {
    label: "New",
    title: "A new lead",
    note: "Capture a lead with owner, source, and expected value.",
  },
  pipeline: {
    label: "Pipeline",
    title: "The lead moves",
    note: "Stages are New, Contacted, Qualified, Proposal, Negotiation, Won, and Lost.",
  },
  won: {
    label: "Won",
    title: "The deal is won",
    note: "Won sets probability to 100. Convert is a separate action.",
  },
  convert: {
    label: "Convert",
    title: "It becomes a client",
    note: "Convert can create a client record and optionally a client project.",
  },
};

export const LEAD_COLUMNS = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal",
  "Won",
] as const;

export const LEAD_CARD = {
  name: "Priya Shah",
  company: "Brightline Co",
  source: "Referral",
  value: "$12,400",
  owner: "Alex",
  initials: "AX",
  avatar: "/avatars/visitor-purple.svg",
  followUp: "20 Sep",
};

export function leadColumnFor(tab: LeadTab, progress: number) {
  if (tab === "new") return 0;
  if (tab === "pipeline") {
    if (progress < 0.34) return 1;
    if (progress < 0.67) return 2;
    return 3;
  }
  return 4;
}

export function leadStatusFor(column: number) {
  return LEAD_COLUMNS[column] ?? "New";
}
