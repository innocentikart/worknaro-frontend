"use client";

import type { ReactNode } from "react";
import {
  Check,
  Clock3,
  Flower2,
  GraduationCap,
  Handshake,
  ShieldCheck,
} from "lucide-react";

type MiniTone = "blue" | "teal" | "purple" | "orange";

const DOT: Record<MiniTone | "red" | "amber", string> = {
  blue: "bg-blue-500",
  teal: "bg-emerald-500",
  purple: "bg-violet-500",
  orange: "bg-orange-500",
  red: "bg-rose-500",
  amber: "bg-amber-500",
};

function MiniShell({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`aud-mini-shell ${className}`}>
      <p className="aud-mini-title">{title}</p>
      {children}
    </div>
  );
}

function MiniRow({
  label,
  tone,
}: {
  label: string;
  tone: keyof typeof DOT;
}) {
  return (
    <div className="aud-mini-row">
      <span className={`aud-mini-dot ${DOT[tone]}`} aria-hidden="true" />
      <span className="aud-mini-label">{label}</span>
    </div>
  );
}

function FloatBadge({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  return (
    <span className={`aud-mini-float ${className}`} aria-hidden="true">
      {children}
    </span>
  );
}

export function MiniProjectsUI() {
  return (
    <div className="aud-mini">
      <MiniShell title="Projects">
        <MiniRow label="Website Redesign" tone="purple" />
        <MiniRow label="Mobile App" tone="orange" />
        <MiniRow label="Brand Strategy" tone="blue" />
      </MiniShell>
    </div>
  );
}

export function MiniClientsUI({
  float = "chart",
}: {
  float?: "chart" | "handshake";
}) {
  return (
    <div className="aud-mini">
      <MiniShell title="Clients">
        {[
          { label: "Client A", tone: "blue" as const, initial: "A" },
          { label: "Client B", tone: "teal" as const, initial: "B" },
          { label: "Client C", tone: "orange" as const, initial: "C" },
        ].map((row) => (
          <div key={row.label} className="aud-mini-row aud-mini-row-avatar">
            <span className={`aud-mini-avatar ${DOT[row.tone]}`}>{row.initial}</span>
            <span className="aud-mini-label">{row.label}</span>
          </div>
        ))}
      </MiniShell>
      {float === "chart" ? (
        <FloatBadge className="aud-mini-float-chart aud-mini-float-teal">
          <span className="aud-mini-bars" aria-hidden="true">
            <i style={{ height: "40%" }} />
            <i style={{ height: "70%" }} />
            <i style={{ height: "55%" }} />
            <i style={{ height: "90%" }} />
          </span>
          <Check className="h-3 w-3" strokeWidth={2.6} />
        </FloatBadge>
      ) : (
        <FloatBadge className="aud-mini-float-icon aud-mini-float-orange">
          <Handshake className="h-3.5 w-3.5" strokeWidth={2.2} />
        </FloatBadge>
      )}
    </div>
  );
}

export function MiniTasksUI() {
  return (
    <div className="aud-mini">
      <MiniShell title="My Tasks">
        <MiniRow label="Design homepage" tone="blue" />
        <MiniRow label="Client revision" tone="orange" />
        <MiniRow label="Submit proposal" tone="purple" />
      </MiniShell>
      <FloatBadge className="aud-mini-float-icon aud-mini-float-purple">
        <Clock3 className="h-3.5 w-3.5" strokeWidth={2.2} />
      </FloatBadge>
    </div>
  );
}

export function MiniInvoiceUI() {
  return (
    <div className="aud-mini">
      <MiniShell title="Invoice" className="aud-mini-invoice">
        <p className="aud-mini-amount">$2,480</p>
        <span className="aud-mini-paid">Paid</span>
      </MiniShell>
      <FloatBadge className="aud-mini-float-chart aud-mini-float-orange">
        <span className="aud-mini-bars" aria-hidden="true">
          <i style={{ height: "35%" }} />
          <i style={{ height: "65%" }} />
          <i style={{ height: "50%" }} />
          <i style={{ height: "85%" }} />
        </span>
        <Check className="h-3 w-3" strokeWidth={2.6} />
      </FloatBadge>
    </div>
  );
}

export function MiniTeamUI() {
  return (
    <div className="aud-mini">
      <MiniShell title="Team">
        {[
          { label: "Admin", tone: "blue" as const },
          { label: "Member", tone: "teal" as const },
          { label: "Viewer", tone: "purple" as const },
        ].map((row) => (
          <div key={row.label} className="aud-mini-row aud-mini-row-avatar">
            <span className={`aud-mini-avatar ${DOT[row.tone]}`}>
              {row.label[0]}
            </span>
            <span className="aud-mini-label">{row.label}</span>
          </div>
        ))}
      </MiniShell>
      <FloatBadge className="aud-mini-float-icon aud-mini-float-blue">
        <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.2} />
      </FloatBadge>
    </div>
  );
}

export function MiniProgramsUI() {
  return (
    <div className="aud-mini">
      <MiniShell title="Programs">
        <MiniRow label="Community outreach" tone="red" />
        <MiniRow label="Education program" tone="teal" />
        <MiniRow label="Fundraising" tone="blue" />
      </MiniShell>
      <FloatBadge className="aud-mini-float-icon aud-mini-float-teal">
        <Flower2 className="h-3.5 w-3.5" strokeWidth={2.2} />
      </FloatBadge>
    </div>
  );
}

export function MiniEducationUI() {
  return (
    <div className="aud-mini">
      <MiniShell title="Course">
        <MiniRow label="Module 01" tone="purple" />
        <MiniRow label="Module 02" tone="blue" />
        <MiniRow label="Module 03" tone="orange" />
      </MiniShell>
      <FloatBadge className="aud-mini-float-icon aud-mini-float-purple">
        <GraduationCap className="h-3.5 w-3.5" strokeWidth={2.2} />
      </FloatBadge>
    </div>
  );
}

export function AudienceMiniVisual({ id }: { id: string }) {
  switch (id) {
    case "startups":
      return <MiniProjectsUI />;
    case "agencies":
      return <MiniClientsUI float="chart" />;
    case "freelancers":
      return <MiniTasksUI />;
    case "small-businesses":
      return <MiniInvoiceUI />;
    case "larger-organizations":
      return <MiniTeamUI />;
    case "nonprofits":
      return <MiniProgramsUI />;
    case "education-teams":
      return <MiniEducationUI />;
    case "client-service":
      return <MiniClientsUI float="handshake" />;
    default:
      return <MiniProjectsUI />;
  }
}

/** Mini visuals for /features overview pillars (matches home Product Features cards). */
export function FeatureOverviewMiniVisual({
  kind,
}: {
  kind: "workspaces" | "projects" | "clients" | "ops" | "tasks";
}) {
  switch (kind) {
    case "workspaces":
      return <MiniTeamUI />;
    case "projects":
      return <MiniProjectsUI />;
    case "clients":
      return <MiniClientsUI float="chart" />;
    case "tasks":
      return <MiniTasksUI />;
    case "ops":
      return <MiniInvoiceUI />;
    default:
      return <MiniProjectsUI />;
  }
}
