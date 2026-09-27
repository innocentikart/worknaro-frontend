export const ACCESS_TABS = ["workspace", "invite", "roles", "guest"] as const;
export type AccessTab = (typeof ACCESS_TABS)[number];

export const ACCESS_META: Record<AccessTab, { label: string; title: string; note: string }> = {
  workspace: {
    label: "Workspace",
    title: "One tenant workspace",
    note: "People join a workspace. Owner is the creator — you cannot invite someone as Owner.",
  },
  invite: {
    label: "Invite",
    title: "A member is invited",
    note: "Invite Admin, Manager, Member, Viewer, or Guest.",
  },
  roles: {
    label: "Roles",
    title: "Access changes",
    note: "Changing a role updates what that person can see and do.",
  },
  guest: {
    label: "Guest",
    title: "Guests stay isolated",
    note: "Guest is a client-isolated role. They do not see the full internal catalog.",
  },
};

export const ACCESS_PEOPLE = [
  { name: "Sarah Johnson", initials: "SJ", role: "Owner", tone: "blue" },
  { name: "Alex Chen", initials: "AC", role: "Admin", tone: "teal" },
  { name: "David Ortiz", initials: "DO", role: "Manager", tone: "purple" },
  { name: "Maya Cole", initials: "MC", role: "Member", tone: "blue", invited: true },
  { name: "Jen Park", initials: "JP", role: "Viewer", tone: "teal" },
  { name: "Northwind", initials: "NW", role: "Guest", tone: "purple", guest: true },
] as const;

export const ACCESS_MATRIX = [
  { role: "Owner", access: "Full workspace" },
  { role: "Admin", access: "Manage people and settings" },
  { role: "Manager", access: "Projects and delivery" },
  { role: "Member", access: "Assigned work" },
  { role: "Viewer", access: "Read-only" },
  { role: "Guest", access: "Client-isolated" },
] as const;
