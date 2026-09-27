"use client";

import type { ReactNode } from "react";

/** Miniature CSS product previews for the workspace features section. */

function PreviewShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm",
        "transition-all duration-300",
        "group-hover:border-slate-300/90 group-hover:shadow-md",
        "dark:border-slate-700/50 dark:bg-slate-900/80 dark:group-hover:border-slate-600/60",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export function ProjectsTasksPreview() {
  const tasks = [
    { title: "Initial planning", done: true },
    { title: "Design & development", done: true },
    { title: "Testing & review", done: true },
    { title: "Launch", done: false },
  ];

  return (
    <PreviewShell>
      <div className="border-b border-slate-100 px-3.5 py-2.5 dark:border-slate-700/50">
        <p className="text-[12px] font-semibold tracking-tight text-slate-800 dark:text-slate-100">
          Website Redesign
        </p>
      </div>

      <div className="space-y-3 p-3.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Milestone progress
          </span>
          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-300">
            68%
          </span>
        </div>

        <div
          role="presentation"
          className="h-1.5 overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-700/70"
        >
          <span className="why-mini-progress-fill-animate block h-full w-[68%] rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
        </div>

        <div className="grid gap-1.5">
          {tasks.map((task) => (
            <div
              key={task.title}
              className="flex items-center gap-2.5 rounded-lg border border-slate-100 bg-slate-50/90 px-2.5 py-2 dark:border-slate-700/50 dark:bg-slate-800/50"
            >
              <span
                className={[
                  "inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                  task.done
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : "border-slate-300 bg-white dark:border-slate-500 dark:bg-slate-900",
                ].join(" ")}
              >
                {task.done ? (
                  <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" aria-hidden="true">
                    <path
                      d="M2.5 6.2 4.8 8.5 9.5 3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : null}
              </span>
              <span className="min-w-0 flex-1 truncate text-[11px] font-medium text-slate-700 dark:text-slate-200">
                {task.title}
              </span>
              <span className="text-slate-300 dark:text-slate-600" aria-hidden="true">
                ···
              </span>
            </div>
          ))}
        </div>
      </div>
    </PreviewShell>
  );
}

export function WorkspaceRolesPreview() {
  return (
    <PreviewShell className="space-y-3.5 p-3.5">
      <div className="flex items-center gap-2.5">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-sm font-bold text-violet-700 dark:bg-violet-500/20 dark:text-violet-300">
          O
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
            Worknaro HQ
          </p>
          <span className="mt-1 inline-flex rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-semibold text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
            12 members
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <span className="rounded-md bg-violet-100 px-2 py-0.5 text-[10px] font-bold text-violet-700 dark:bg-violet-500/20 dark:text-violet-300">
          Owner
        </span>
        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-slate-700/60 dark:text-slate-300">
          Admin
        </span>
        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-slate-700/60 dark:text-slate-300">
          Member
        </span>
      </div>

      <div className="flex items-center">
        {[
          { label: "A", bg: "bg-violet-500", hover: "" },
          { label: "J", bg: "bg-indigo-500", hover: "group-hover:translate-x-0.5" },
          { label: "M", bg: "bg-emerald-500", hover: "group-hover:translate-x-1" },
          { label: "K", bg: "bg-orange-500", hover: "group-hover:translate-x-1.5" },
          { label: "+8", bg: "bg-slate-500", hover: "group-hover:translate-x-2" },
        ].map((avatar, index) => (
          <span
            key={avatar.label}
            className={[
              "inline-flex h-6 w-6 items-center justify-center rounded-full border-[1.5px] border-white text-[9px] font-bold text-white dark:border-slate-800",
              "transition-transform duration-200",
              avatar.bg,
              avatar.hover,
              index > 0 ? "-ml-1.5" : "",
            ].join(" ")}
          >
            {avatar.label}
          </span>
        ))}
      </div>
    </PreviewShell>
  );
}

export function ClientsProposalsPreview() {
  return (
    <PreviewShell className="space-y-3.5 p-3.5">
      <div className="flex items-center gap-2.5">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white">
          N
        </span>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
            Northwind Co.
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Proposal · 12 Mar 2025
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[9px] font-bold text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
          Sent
        </span>
        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-bold text-blue-600 dark:bg-blue-500/15 dark:text-blue-300">
          Viewed
        </span>
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
          Approved
        </span>
      </div>

      <div
        role="presentation"
        className="h-1.5 overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-700/70"
      >
        <span className="block h-full w-[78%] rounded-full bg-gradient-to-r from-indigo-500 to-violet-400" />
      </div>

      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] font-medium text-slate-500 dark:text-slate-400">
        <span>3 Documents</span>
        <span>2 Comments</span>
        <span>1 Revision</span>
      </div>
    </PreviewShell>
  );
}

export function TimeFinanceFilesPreview() {
  return (
    <PreviewShell>
      <div className="flex gap-1 border-b border-slate-100 px-2 pt-2 dark:border-slate-700/50">
        {["Time", "Invoices", "Files"].map((tab, index) => (
          <span
            key={tab}
            className={[
              "rounded-t-md px-2.5 py-1.5 text-[10px] font-semibold",
              index === 0
                ? "bg-orange-50 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300"
                : "text-slate-400 dark:text-slate-500",
            ].join(" ")}
          >
            {tab}
          </span>
        ))}
      </div>

      <div className="space-y-3 p-3.5">
        <div>
          <p className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            48.20h
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Logged today</p>
        </div>

        <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-100 bg-slate-50/90 px-2.5 py-2 dark:border-slate-700/50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
              INV-0042
            </span>
            <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
              Paid
            </span>
          </div>
          <span className="text-xs font-bold text-slate-900 dark:text-slate-100">$2,480</span>
        </div>

        <div className="flex flex-wrap gap-1.5" aria-hidden="true">
          {["Q2 Project", "Design", "Client A"].map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-orange-100 bg-orange-50/80 px-1.5 py-0.5 text-[10px] font-semibold text-orange-700/80 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </PreviewShell>
  );
}
