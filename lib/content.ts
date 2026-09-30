export const productCapabilities = [
  {
    title: "Workspaces",
    description:
      "Create tenant workspaces, invite members, switch organizations, and apply workspace branding.",
  },
  {
    title: "Projects",
    description:
      "Create and manage projects with members, milestones, discussions, and client-linked project types.",
  },
  {
    title: "Tasks",
    description:
      "Assign work with status, priority, comments, @mentions, tags, and subtasks.",
  },
  {
    title: "Workflow board",
    description:
      "Move tasks across status columns on the workspace workflow board.",
  },
  {
    title: "Notes",
    description:
      "Keep sticky notes linked to projects and tasks, in list and board views.",
  },
  {
    title: "Calendar & Gantt",
    description:
      "See projects and tasks on a workspace calendar and Gantt timeline.",
  },
  {
    title: "Clients, leads & proposals",
    description:
      "Maintain a client directory, run a lead pipeline, and send proposals for approval.",
  },
  {
    title: "Time & finance",
    description:
      "Log timesheets and manage invoices, estimates, expenses, and payments.",
  },
  {
    title: "Files, tags & trash",
    description:
      "Store files, tag work, and recover items from workspace trash.",
  },
  {
    title: "Search, reports & help",
    description:
      "Search the workspace, run project and timesheet reports on eligible plans, and use in-app help.",
  },
] as const;

export const trustSignals = [
  "Workspaces",
  "Projects",
  "Tasks",
  "Workflow board",
  "Clients",
  "Timesheets",
  "Finance",
  "Files",
] as const;

export const problemPoints = [
  {
    title: "Fragmented tools",
    description: "Projects, files, invoices, and client records live in different places.",
  },
  {
    title: "Scattered ownership",
    description: "It is hard to see who is responsible for the next deliverable.",
  },
  {
    title: "Limited visibility",
    description: "Status, time, and billing are hard to review together.",
  },
  {
    title: "Manual follow-up",
    description: "Teams spend energy chasing updates instead of delivering work.",
  },
] as const;

export const solutionPoints = [
  {
    title: "One workspace",
    description: "Projects, tasks, clients, files, and finance share a tenant workspace.",
  },
  {
    title: "Clear collaboration",
    description: "Comments, mentions, teams, and workspace roles keep people aligned.",
  },
  {
    title: "Operational visibility",
    description: "Timesheets, calendar, Gantt, and reports sit next to the work.",
  },
  {
    title: "A path to delivery",
    description: "Move from workspace setup to invoices and reports without changing products.",
  },
] as const;

export const featureSections = [
  {
    id: "projects",
    eyebrow: "Projects",
    title: "Project management",
    description:
      "Create projects in a workspace with members, milestones, discussions, files, and client-linked project types.",
    points: [
      "Project list, create, archive, and templates where enabled",
      "Milestones, members, and discussions",
      "Client project type for delivery work",
    ],
    visual: "projects" as const,
  },
  {
    id: "collaboration",
    eyebrow: "Work",
    title: "Tasks and the workflow board",
    description:
      "Assign tasks with status, priority, comments, and mentions. Move them across columns on the workspace workflow board.",
    points: [
      "Task status, priority, assignees, comments, and tags",
      "Workspace workflow board by status column",
      "Teams with members, roles, and project assignment",
    ],
    visual: "board" as const,
  },
  {
    id: "time-budget",
    eyebrow: "Schedule & operations",
    title: "Calendar, Gantt, time, and finance",
    description:
      "Plan on the calendar and Gantt chart, log timesheets, and run invoices, estimates, expenses, and payments in the same workspace.",
    points: [
      "Workspace calendar and Gantt timeline",
      "Timesheets against projects and tasks",
      "Invoices, estimates, expenses, and payments",
    ],
    visual: "finance" as const,
  },
  {
    id: "clients",
    eyebrow: "Clients",
    title: "Clients, leads, and proposals",
    description:
      "Keep a client directory, manage a lead pipeline, and send proposals with client-facing approval links.",
    points: [
      "Client records linked to projects",
      "Lead stages, notes, and conversion to clients",
      "Proposals with send, PDF, and approval links",
    ],
    visual: "clients" as const,
  },
  {
    id: "files",
    eyebrow: "Resources",
    title: "Files, tags, and trash",
    description:
      "Use the workspace file library, attach files to projects and tasks, tag work, and recover items from trash.",
    points: [
      "Central files hub with folders and favorites",
      "Project and task attachments",
      "Tags and workspace trash recovery",
    ],
    visual: "files" as const,
  },
  {
    id: "reporting",
    eyebrow: "Visibility",
    title: "Search, reports, and workspace access",
    description:
      "Search across workspace content. Project and timesheet reports are available on Pro and above. Roles control who can see what.",
    points: [
      "Workspace search across projects, tasks, files, and more",
      "Project and timesheet reports on Pro+",
      "Workspace roles: Owner, Admin, Manager, Member, Viewer, Guest",
    ],
    visual: "reports" as const,
  },
  {
    id: "insights",
    eyebrow: "AI Insights",
    title: "AI Insights",
    description:
      "When AI Insights is enabled in the workspace, Worknaro reviews project and task activity to surface risks, delays, and workload patterns—with an explanation of why each insight appeared.",
    points: [
      "Project health from schedule, overdue work, dependencies, velocity, and milestones",
      "Alerts for deadline risk, blocked tasks, velocity drops, and uneven workload",
      "Recommendations and a drawer on the dashboard, project overview, and task detail",
    ],
    visual: "insights" as const,
  },
  {
    id: "import",
    eyebrow: "Migration",
    title: "Import your work",
    description:
      "Import CSV, Excel, or JSON through the workspace import center. Map columns, validate, preview, and roll back if needed. Native connectors for other platforms are not available yet—export from those tools and import today.",
    points: [
      "CSV, Excel, and JSON import with column mapping and validation",
      "Preview before run, progress, error reporting, and rollback",
      "Projects, tasks, members, teams, tags, comments, and more",
    ],
    visual: "import" as const,
  },
] as const;

export const howItWorksSteps = [
  {
    title: "Create a workspace",
    description: "Set up a tenant workspace and invite people with a workspace role.",
  },
  {
    title: "Create a project",
    description: "Add a project, members, and structure, including client projects when needed.",
  },
  {
    title: "Assign the team",
    description: "Use workspace and project roles so ownership is explicit.",
  },
  {
    title: "Manage tasks",
    description: "Track status and priority, comment, and move work on the workflow board.",
  },
  {
    title: "Track progress",
    description: "Use calendar, Gantt, timesheets, notifications, and files as the work proceeds.",
  },
  {
    title: "Invoice and review",
    description: "Issue finance documents and, on eligible plans, review project and timesheet reports.",
  },
] as const;

/** Light/dark Deep dive screenshots for `/solutions` audiences. */
export const solutionDeepDiveImages = {
  startups: {
    light: "/product/solutions/startups-light.png",
    dark: "/product/solutions/startups-dark.png",
  },
  agencies: {
    light: "/product/solutions/agencies-light.png",
    dark: "/product/solutions/agencies-dark.png",
  },
  freelancers: {
    light: "/product/solutions/freelancers-light.png",
    dark: "/product/solutions/freelancers-dark.png",
  },
  "small-businesses": {
    light: "/product/solutions/small-businesses-light.png",
    dark: "/product/solutions/small-businesses-dark.png",
  },
  "larger-organizations": {
    light: "/product/solutions/larger-organizations-light.png",
    dark: "/product/solutions/larger-organizations-dark.png",
  },
  nonprofits: {
    light: "/product/solutions/nonprofits-light.png",
    dark: "/product/solutions/nonprofits-dark.png",
  },
  "education-teams": {
    light: "/product/solutions/education-teams-light.png",
    dark: "/product/solutions/education-teams-dark.png",
  },
  "client-service": {
    light: "/product/solutions/client-service-light.png",
    dark: "/product/solutions/client-service-dark.png",
  },
} as const;

export const solutions = [
  {
    id: "startups",
    title: "Startups",
    description:
      "Share one workspace for projects, tasks, and early client records.",
    points: [
      "One tenant workspace for founders and early hires",
      "Projects, tasks, and the workflow board in the same place",
      "Client records when you start billing delivery work",
    ],
    visual: "projects" as const,
    image: solutionDeepDiveImages.startups.light,
    imageDark: solutionDeepDiveImages.startups.dark,
  },
  {
    id: "agencies",
    title: "Agencies",
    description:
      "Run client projects, proposals, and delivery in the same workspace.",
    points: [
      "Client projects with members, milestones, and files",
      "Leads and proposals with client-facing approval links",
      "Timesheets and invoices against the same delivery work",
    ],
    visual: "clients" as const,
    image: solutionDeepDiveImages.agencies.light,
    imageDark: solutionDeepDiveImages.agencies.dark,
  },
  {
    id: "freelancers",
    title: "Freelancers",
    description:
      "Keep solo projects, clients, files, and timesheets organized.",
    points: [
      "Personal workspace for projects and client contacts",
      "Files, notes, and timesheets without extra tools",
      "Invoices and estimates when you are ready to bill",
    ],
    visual: "finance" as const,
    image: solutionDeepDiveImages.freelancers.light,
    imageDark: solutionDeepDiveImages.freelancers.dark,
  },
  {
    id: "small-businesses",
    title: "Small businesses",
    description:
      "Coordinate projects, members, and invoices without spreading work across extra tools.",
    points: [
      "Invite members with Owner, Admin, Manager, Member, Viewer, or Guest roles",
      "Projects, calendar, and Gantt for shared schedules",
      "Finance documents in the same workspace as delivery",
    ],
    visual: "board" as const,
    image: solutionDeepDiveImages["small-businesses"].light,
    imageDark: solutionDeepDiveImages["small-businesses"].dark,
  },
  {
    id: "larger-organizations",
    title: "Larger organizations",
    description:
      "Use multiple workspaces, roles, and plan limits as the team grows. Custom Enterprise terms are handled through sales.",
    points: [
      "Multiple workspaces as teams and clients scale",
      "Role-based access across projects and finance",
      "Enterprise plan limits and sales-managed terms when needed",
    ],
    visual: "reports" as const,
    image: solutionDeepDiveImages["larger-organizations"].light,
    imageDark: solutionDeepDiveImages["larger-organizations"].dark,
  },
  {
    id: "nonprofits",
    title: "Nonprofits",
    description:
      "Coordinate programs and deliverables in a shared workspace—the same product, not a separate nonprofit edition.",
    points: [
      "Shared workspace for programs and deliverables",
      "Tasks, files, and calendar for volunteer or staff coordination",
      "Same Worknaro product—no separate nonprofit edition",
    ],
    visual: "files" as const,
    image: solutionDeepDiveImages.nonprofits.light,
    imageDark: solutionDeepDiveImages.nonprofits.dark,
  },
  {
    id: "education-teams",
    title: "Education teams",
    description:
      "Organize initiatives and collaborative projects in a workspace. There is no separate education product.",
    points: [
      "Workspace projects for initiatives and cohorts",
      "Collaboration with comments, files, and notifications",
      "Same product catalog—not a separate education edition",
    ],
    visual: "board" as const,
    image: solutionDeepDiveImages["education-teams"].light,
    imageDark: solutionDeepDiveImages["education-teams"].dark,
  },
  {
    id: "client-service",
    title: "Client-service businesses",
    description:
      "Connect clients, leads, proposals, projects, and finance in one tenant workspace.",
    points: [
      "Client directory linked to projects",
      "Lead pipeline and proposals in one flow",
      "Delivery, timesheets, and invoices without switching apps",
    ],
    visual: "clients" as const,
    image: solutionDeepDiveImages["client-service"].light,
    imageDark: solutionDeepDiveImages["client-service"].dark,
  },
] as const;

export const highlightFeatures = [
  {
    title: "Workspaces and roles",
    description: "Create workspaces, invite members, and assign Owner, Admin, Manager, Member, Viewer, or Guest.",
  },
  {
    title: "Projects and tasks",
    description: "Run projects with milestones and a workspace workflow board for status.",
  },
  {
    title: "Clients and proposals",
    description: "Keep clients and leads, send proposals, and open a client portal on Starter and above.",
  },
  {
    title: "Time, finance, and files",
    description: "Log time, issue invoices, store files, and search the workspace.",
  },
] as const;

export const integrations = [
  {
    name: "Stripe",
    description: "In-app billing, checkout, and the customer portal for workspace subscriptions.",
  },
  {
    name: "Google",
    description: "Optional Google sign-in through Worknaro accounts when the operator has configured it.",
  },
  {
    name: "Apple",
    description: "Optional Apple sign-in through Worknaro accounts when the operator has configured it.",
  },
  {
    name: "Resend",
    description: "Transactional email for account, invitation, and workspace notices.",
  },
] as const;

export const howItWorksCompact = [
  {
    title: "Create your workspace",
    description: "Set up a tenant workspace and invite the people who need access.",
  },
  {
    title: "Organize the work",
    description:
      "Import CSV, Excel, or JSON from another tool, or create projects, tasks, notes, and client records.",
  },
  {
    title: "Collaborate in context",
    description: "Assign roles, comment, attach files, and follow notifications.",
  },
  {
    title: "Track and bill",
    description: "Use calendar, Gantt, and timesheets, then invoices and reports on eligible plans.",
  },
] as const;

export const resourceCards = [
  {
    title: "Platform capabilities",
    category: "Product",
    excerpt:
      "See the modules that exist in the Worknaro application today—including AI Insights and import.",
    href: "/features",
    image: "/product/platform-capabilities-light.png",
    imageDark: "/product/platform-capabilities-dark.png",
    cta: "Explore platform",
    preview: "product" as const,
    accent: "blue" as const,
  },
  {
    title: "Plans and billing",
    category: "Pricing",
    excerpt: "Compare Free, Starter, Pro, and Enterprise using the live plan catalog.",
    href: "/pricing",
    image: "/product/plans-and-billing-light.png",
    imageDark: "/product/plans-and-billing-dark.png",
    cta: "Explore plans",
    preview: "pricing" as const,
    accent: "emerald" as const,
  },
  {
    title: "Guides and links",
    category: "Resources",
    excerpt: "Open product pages or continue into the authenticated application.",
    href: "/resources",
    image: "/product/guides-and-links-light.png",
    imageDark: "/product/guides-and-links-dark.png",
    cta: "View resources",
    preview: "guides" as const,
    accent: "purple" as const,
  },
] as const;

export const faqs = [
  {
    q: "What is Worknaro?",
    a: "Worknaro is a multi-tenant workspace for projects, tasks, notes, clients, leads, proposals, timesheets, finance, files, calendar, and Gantt. You sign in to the Django application; this public site does not host your workspace data.",
  },
  {
    q: "Where do I sign in or create an account?",
    a: "Registration, login, password reset, and optional email verification happen in the Worknaro application. Google and Apple sign-in are available when the operator has configured them. This website does not create a second user system.",
  },
  {
    q: "Can I start for free?",
    a: "Yes. The Free plan includes core workspace limits: 5 projects, 10 members, and 512 MB storage, plus the workflow board, tasks, attachments, and notifications.",
  },
  {
    q: "What is included as I upgrade?",
    a: "Starter adds the finance client portal (among other Starter entitlements). Pro adds project and timesheet reports and workspace API access. Upgrades run through Stripe checkout and the billing portal inside the application.",
  },
  {
    q: "How does Enterprise pricing work?",
    a: "Enterprise is sold through contact sales. The catalog allows unlimited projects, members, and storage. Custom commercial terms are handled by sales—not a self-serve SSO product in the app today.",
  },
  {
    q: "Can my team use more than one workspace?",
    a: "Yes. Worknaro is built around tenant workspaces. People can belong to more than one workspace and switch between those they can access.",
  },
  {
    q: "What does AI Insights do?",
    a: "When enabled in a workspace, AI Insights reviews project and task activity—not invoices, files, or comments. It can surface project risk, schedule risk, overdue or blocked work, milestone pressure, velocity changes, and uneven workload, and it explains the metrics behind each insight. Budget burn analysis is not included in the first release.",
  },
  {
    q: "Can I import work from another project-management tool?",
    a: "Yes. Workspace admins can import CSV, Excel, or JSON through the import center: map columns, validate, preview, run, and roll back. Native Asana, Trello, Jira, or similar connectors are not available yet—export from those tools and upload the file.",
  },
] as const;
