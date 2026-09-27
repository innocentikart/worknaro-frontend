const DEFAULT_APP_URL = "http://127.0.0.1:8000";
const DEFAULT_SITE_URL = "http://localhost:3000";

export function getAppUrl(): string {
  return (process.env.NEXT_PUBLIC_APP_URL || DEFAULT_APP_URL).replace(/\/$/, "");
}

export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(
    /\/$/,
    "",
  );
}

/** Absolute URL into the Django application. */
export function appUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getAppUrl()}${normalized}`;
}

export const djangoRoutes = {
  login: () => appUrl("/accounts/login/"),
  register: () => appUrl("/accounts/register/"),
  contactSales: () => appUrl("/billing/contact-sales/"),
  imports: () => appUrl("/imports/"),
} as const;

export const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/solutions", label: "Solutions" },
  { href: "/pricing", label: "Pricing" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const siteConfig = {
  name: "Worknaro",
  tagline: "Plan. Manage. Deliver.",
  description:
    "Worknaro is a workspace for projects, tasks, clients, timesheets, invoices, files, calendar, and Gantt—with roles, invites, billing, AI Insights, and CSV import in the same application.",
  shortDescription:
    "A multi-tenant workspace for projects, clients, time, and finance.",
};
