import type { StoryStage } from "@/components/features/story/storyUtils";

export function fourStages(
  items: Array<Pick<StoryStage, "id" | "label" | "title" | "description">>,
): StoryStage[] {
  return items.map((item, index) => ({
    ...item,
    start: index * 0.25,
    end: index === items.length - 1 ? 1.01 : (index + 1) * 0.25,
  }));
}

export const PROJECT_STAGES = fourStages([
  {
    id: "shell",
    label: "Shell",
    title: "An empty project",
    description: "Create a workspace project with a name, code, type, and status.",
  },
  {
    id: "team",
    label: "Team",
    title: "People join",
    description: "Add members with project roles such as manager, contributor, and viewer.",
  },
  {
    id: "work",
    label: "Work",
    title: "Tasks and dates",
    description: "Tasks, milestones, and start/due dates land on the same project.",
  },
  {
    id: "live",
    label: "Live",
    title: "The project is active",
    description:
      "Progress is calculated from task status. Budget is a tier, not a typed dollar amount.",
  },
]);

export const BOARD_STAGES = fourStages([
  {
    id: "board",
    label: "Board",
    title: "The workspace board",
    description:
      "Tasks sit in Backlog, To Do, In Progress, Review, and Completed — the actual board columns.",
  },
  {
    id: "move",
    label: "Move",
    title: "Work is picked up",
    description: "Drag a task to In Progress. The stored status becomes in_progress.",
  },
  {
    id: "review",
    label: "Review",
    title: "It waits in Review",
    description: "Review is the board label for on_hold — there is no separate review status.",
  },
  {
    id: "done",
    label: "Done",
    title: "Completed",
    description: "Drop it on Completed. Activity and progress update on the task.",
  },
]);

export const CALENDAR_STAGES = fourStages([
  {
    id: "month",
    label: "Month",
    title: "Scheduled work",
    description:
      "The calendar shows project dates, open tasks, and milestones — not standalone meetings.",
  },
  {
    id: "select",
    label: "Select",
    title: "A date is in focus",
    description: "Open a day to see what is due. The grid itself is read-only.",
  },
  {
    id: "context",
    label: "Work",
    title: "The task is clear",
    description: "Date, assignee, project, and deadline come from the task record.",
  },
  {
    id: "next",
    label: "Plan",
    title: "Look ahead",
    description: "Move to another date to see the next deadline or milestone.",
  },
]);

export const GANTT_STAGES = fourStages([
  {
    id: "rows",
    label: "Tasks",
    title: "Work as a list",
    description: "The Gantt starts from the same tasks — name, dates, assignee, status.",
  },
  {
    id: "bars",
    label: "Bars",
    title: "A timeline appears",
    description: "Start and due dates become bars. You can reschedule a bar if you can edit the task.",
  },
  {
    id: "links",
    label: "Links",
    title: "Dependencies are visible",
    description:
      "Finish-to-start lines display when dependencies exist. The chart does not create them.",
  },
  {
    id: "schedule",
    label: "Schedule",
    title: "The project schedule",
    description: "Milestones and grouped tasks show how the project sits in time.",
  },
]);

export const TIME_STAGES = fourStages([
  {
    id: "work",
    label: "Work",
    title: "A task is completed",
    description: "Time is logged against a project and optionally a task — separately from billing.",
  },
  {
    id: "time",
    label: "Time",
    title: "Hours are recorded",
    description: "A timesheet entry stores hours, work date, and whether the time is billable.",
  },
  {
    id: "finance",
    label: "Finance",
    title: "Invoices and expenses",
    description:
      "Invoices and approved expenses are recorded in Finance. They are not created from the timesheet.",
  },
  {
    id: "budget",
    label: "Budget",
    title: "Spend against a tier",
    description:
      "Project spend is invoices plus approved expenses, compared to the project budget tier.",
  },
]);

export const CLIENT_STAGES = fourStages([
  {
    id: "profile",
    label: "Client",
    title: "A client record",
    description: "Name, company, status, and a manager live on the client.",
  },
  {
    id: "projects",
    label: "Projects",
    title: "Linked projects",
    description: "Client projects use the client_record on the project — not a separate CRM silo.",
  },
  {
    id: "work",
    label: "Work",
    title: "Tasks and proposals",
    description: "Open tasks and proposals for that client stay on the same record.",
  },
  {
    id: "connected",
    label: "Connected",
    title: "One client view",
    description: "The detail page gathers projects, tasks, proposals, and notes.",
  },
]);

export const LEAD_STAGES = fourStages([
  {
    id: "new",
    label: "New",
    title: "A new lead",
    description: "Capture a lead with owner, source, and expected value.",
  },
  {
    id: "pipeline",
    label: "Pipeline",
    title: "The lead moves",
    description:
      "Stages are New, Contacted, Qualified, Proposal, Negotiation, Won, and Lost.",
  },
  {
    id: "won",
    label: "Won",
    title: "The deal is won",
    description: "Won sets probability to 100. Convert is a separate action.",
  },
  {
    id: "convert",
    label: "Convert",
    title: "It becomes a client",
    description: "Convert can create a client record and optionally a client project.",
  },
]);

export const PROPOSAL_STAGES = fourStages([
  {
    id: "opportunity",
    label: "Opportunity",
    title: "A client needs a quote",
    description: "Proposals always belong to a client. A project is optional.",
  },
  {
    id: "draft",
    label: "Draft",
    title: "The proposal is built",
    description: "Add items, pricing (fixed, hourly, or itemized), and dates.",
  },
  {
    id: "sent",
    label: "Sent",
    title: "The client opens it",
    description: "Send emails a public link. Viewing moves the proposal from sent to viewed.",
  },
  {
    id: "convert",
    label: "Convert",
    title: "Approved work continues",
    description:
      "The client can approve or reject on the public link. Approved proposals convert to a project.",
  },
]);

export const FILE_STAGES = fourStages([
  {
    id: "project",
    label: "Project",
    title: "Open the project",
    description: "Files can belong to a project, task, proposal, or client.",
  },
  {
    id: "files",
    label: "Files",
    title: "Related files appear",
    description: "The project files hub lists folders and attached files.",
  },
  {
    id: "open",
    label: "Open",
    title: "A file in context",
    description: "Download, version, share, favorite, or archive — from the file record.",
  },
  {
    id: "linked",
    label: "Linked",
    title: "It stays with the work",
    description: "The file remains attached to the project it belongs to.",
  },
]);

export const TAG_STAGES = fourStages([
  {
    id: "work",
    label: "Work",
    title: "Tasks without context",
    description: "The tag catalog applies to tasks and project descriptions — not files.",
  },
  {
    id: "apply",
    label: "Tag",
    title: "Urgent is applied",
    description: "A workspace tag such as Urgent can be attached to a task.",
  },
  {
    id: "group",
    label: "Group",
    title: "Tagged work is easier to find",
    description: "Filter the task list by tag. Multiple tags can sit on one task.",
  },
  {
    id: "context",
    label: "Context",
    title: "Lightweight structure",
    description: "Tags add context without changing status or project membership.",
  },
]);

export const TRASH_STAGES = fourStages([
  {
    id: "active",
    label: "Active",
    title: "A file in the project",
    description: "Trash is for files and documents — not clients, leads, or proposals.",
  },
  {
    id: "removed",
    label: "Trash",
    title: "It leaves the project",
    description: "Soft-delete moves the file to /files/trash/ and starts a 30-day retention.",
  },
  {
    id: "restore",
    label: "Restore",
    title: "Bring it back",
    description: "Restore clears the delete flags and returns the file to its folder.",
  },
  {
    id: "back",
    label: "Back",
    title: "It is in context again",
    description: "Permanent delete and empty trash remove the file. That is a separate action.",
  },
]);

export const SEARCH_STAGES = fourStages([
  {
    id: "all",
    label: "Workspace",
    title: "Many kinds of work",
    description:
      "Search looks across projects, tasks, clients, files, leads, proposals, and more.",
  },
  {
    id: "query",
    label: "Query",
    title: "Type to narrow",
    description: "Results update from the live workspace — there is no separate search index.",
  },
  {
    id: "match",
    label: "Match",
    title: "The relevant item",
    description: "A tighter query leaves the task, file, or project you meant.",
  },
  {
    id: "open",
    label: "Open",
    title: "Go to the record",
    description: "Open the result in its own page. File contents are not searched.",
  },
]);

export const REPORT_STAGES = fourStages([
  {
    id: "activity",
    label: "Activity",
    title: "Raw project work",
    description: "Reports assemble from projects and timesheets that already exist.",
  },
  {
    id: "group",
    label: "Group",
    title: "Work is grouped",
    description: "Project and timesheet reports group entries by project, person, and period.",
  },
  {
    id: "metrics",
    label: "Metrics",
    title: "Counts become clear",
    description: "See completion, hours, and billable time. These reports require Pro or above.",
  },
  {
    id: "report",
    label: "Report",
    title: "A report you can use",
    description: "Open the project or timesheet report. Timesheets can export to CSV.",
  },
]);

export const ACCESS_STAGES = fourStages([
  {
    id: "workspace",
    label: "Workspace",
    title: "One tenant workspace",
    description: "People join a workspace. Owner is the creator — you cannot invite someone as Owner.",
  },
  {
    id: "members",
    label: "Members",
    title: "The team is here",
    description: "Invite Admin, Manager, Member, Viewer, or Guest.",
  },
  {
    id: "roles",
    label: "Roles",
    title: "Access changes",
    description: "Changing a role updates what that person can see and do.",
  },
  {
    id: "access",
    label: "Access",
    title: "Guests stay isolated",
    description: "Guest is a client-isolated role. They do not see the full internal catalog.",
  },
]);
