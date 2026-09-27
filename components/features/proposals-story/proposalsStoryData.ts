export const PROPOSAL_TABS = ["draft", "send", "viewed", "convert"] as const;
export type ProposalTab = (typeof PROPOSAL_TABS)[number];

export const PROPOSAL_META: Record<
  ProposalTab,
  { label: string; title: string; status: string; note: string }
> = {
  draft: {
    label: "Draft",
    title: "The proposal is built",
    status: "Draft",
    note: "Add items, pricing (fixed, hourly, or itemized), and dates.",
  },
  send: {
    label: "Send",
    title: "A public link is sent",
    status: "Sent",
    note: "Send emails a public link. The client opens it without a login.",
  },
  viewed: {
    label: "Viewed",
    title: "The client opens it",
    status: "Viewed",
    note: "Viewing moves the proposal from sent to viewed.",
  },
  convert: {
    label: "Convert",
    title: "Approved work continues",
    status: "Approved",
    note: "The client can approve or reject on the public link. Approved proposals convert to a project.",
  },
};

export const PROPOSAL_DOC = {
  code: "PR-18",
  title: "Website Redesign proposal",
  client: "Northwind Studio",
  contact: "Sarah Johnson",
  valid: "30 Sep",
};

export const PROPOSAL_ITEMS = [
  { name: "Discovery", price: "$1,800" },
  { name: "Design", price: "$4,200" },
  { name: "Build", price: "$6,400" },
] as const;

export const PROPOSAL_TOTAL = "$12,400";

export const PROPOSAL_STEPS = ["Draft", "Sent", "Viewed", "Approved"] as const;
