"use client";

import {
  Bell,
  Check,
  FileText,
  HardDrive,
  MessageCircle,
  Paperclip,
  TrendingUp,
  Users,
} from "lucide-react";
import { VisitorAvatar } from "@/components/ui/VisitorAvatar";
import { visitorAvatarAt } from "@/lib/visitor-avatars";

export type ModuleVisualKind =
  | "product"
  | "ship"
  | "collab"
  | "trust"
  | "projects"
  | "team"
  | "tasks"
  | "clients"
  | "clients-handshake"
  | "invoice"
  | "programs"
  | "education"
  | "workspaces"
  | "roles"
  | "ops"
  | "plan-free"
  | "plan-grow"
  | "modules"
  | "enterprise"
  | "features-link"
  | "pricing-link"
  | "solutions-link"
  | "app-link"
  | "one-product"
  | "same-modules"
  | "plans-fit"
  | "setup"
  | "organize"
  | "collaborate-step"
  | "track-bill";

/** Layered product micro-UIs for premium module cards. */

function Shell({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`about-viz-shell ${className}`}>
      <p className="about-viz-title">{title}</p>
      {children}
    </div>
  );
}

function DotRow({
  items,
}: {
  items: Array<{ label: string; tone: "blue" | "teal" | "purple" | "orange" | "red" }>;
}) {
  return (
    <ul className="about-viz-list">
      {items.map((item) => (
        <li key={item.label}>
          <span className={`about-viz-dot about-viz-dot-${item.tone}`} />
          {item.label}
        </li>
      ))}
    </ul>
  );
}

function AvatarRow({
  items,
}: {
  items: Array<{ label: string; avatar: string }>;
}) {
  return (
    <ul className="about-viz-list about-viz-list-avatar">
      {items.map((item) => (
        <li key={item.label}>
          <span className="about-viz-avatar has-image">
            <VisitorAvatar src={item.avatar} />
          </span>
          {item.label}
        </li>
      ))}
    </ul>
  );
}

export function VisualProduct() {
  return (
    <div className="about-viz about-viz-product">
      <div className="about-viz-back" aria-hidden="true">
        <div className="about-viz-back-row" />
        <div className="about-viz-back-row" />
        <div className="about-viz-back-bar" />
        <div className="about-viz-back-avatars">
          <span />
          <span />
        </div>
      </div>
      <Shell title="Projects">
        <DotRow
          items={[
            { label: "Website Redesign", tone: "blue" },
            { label: "Mobile App", tone: "orange" },
            { label: "Brand Strategy", tone: "purple" },
          ]}
        />
      </Shell>
    </div>
  );
}

export function VisualTeam({
  online = false,
}: {
  online?: boolean;
}) {
  return (
    <div className={`about-viz about-viz-ship${online ? "" : " about-viz-plain"}`}>
      <Shell title="Team">
        <AvatarRow
          items={[
            { label: "Admin", avatar: visitorAvatarAt(0) },
            { label: "Member", avatar: visitorAvatarAt(1) },
            { label: "Viewer", avatar: visitorAvatarAt(2) },
          ]}
        />
      </Shell>
      {online ? (
        <div className="about-viz-float about-viz-float-online" aria-hidden="true">
          <span className="about-viz-online-stack">
            {[0, 1, 2].map((index) => (
              <i key={index} className="about-viz-avatar-sm has-image">
                <VisitorAvatar src={visitorAvatarAt(index)} />
              </i>
            ))}
          </span>
          <span className="about-viz-online-label">3 online</span>
        </div>
      ) : null}
    </div>
  );
}

export function VisualCollab() {
  return (
    <div className="about-viz about-viz-collab">
      <div className="about-viz-shell about-viz-shell-feed">
        <div className="about-viz-feed-item">
          <div className="about-viz-feed-head">
            <span className="about-viz-avatar has-image">
              <VisitorAvatar src={visitorAvatarAt(0)} />
            </span>
            <div>
              <p className="about-viz-feed-name">Sarah Johnson</p>
              <p className="about-viz-feed-time">2m ago</p>
            </div>
          </div>
          <p className="about-viz-feed-copy">Updated the design files</p>
          <span className="about-viz-file">
            <FileText className="h-3 w-3" strokeWidth={2.2} aria-hidden="true" />
            Design-v2.fig
          </span>
        </div>
        <div className="about-viz-feed-item">
          <div className="about-viz-feed-head">
            <span className="about-viz-avatar has-image">
              <VisitorAvatar src={visitorAvatarAt(1)} />
            </span>
            <div>
              <p className="about-viz-feed-name">Michael Chen</p>
              <p className="about-viz-feed-time">5m ago</p>
            </div>
          </div>
          <p className="about-viz-feed-copy">Looks great! 👍</p>
        </div>
      </div>
      <div className="about-viz-float about-viz-float-rail" aria-hidden="true">
        <span className="about-viz-rail-btn about-viz-rail-btn-active">
          <MessageCircle className="h-3.5 w-3.5" strokeWidth={2.2} />
        </span>
        <span className="about-viz-rail-btn">
          <Paperclip className="h-3.5 w-3.5" strokeWidth={2.2} />
        </span>
        <span className="about-viz-rail-btn about-viz-rail-btn-bell">
          <Bell className="h-3.5 w-3.5" strokeWidth={2.2} />
          <i>3</i>
        </span>
      </div>
    </div>
  );
}

export function VisualTrust() {
  return (
    <div className="about-viz about-viz-trust">
      <div className="about-viz-wave" aria-hidden="true" />
      <div className="about-viz-shell about-viz-shell-plan">
        <p className="about-viz-title">Current plan</p>
        <div className="about-viz-plan-row">
          <span className="about-viz-plan-name">Pro</span>
          <span className="about-viz-plan-badge">Active</span>
        </div>
        <ul className="about-viz-plan-meta">
          <li>
            <Users className="h-3 w-3" strokeWidth={2.2} aria-hidden="true" />
            5 team members
          </li>
          <li>
            <HardDrive className="h-3 w-3" strokeWidth={2.2} aria-hidden="true" />
            1.2 TB storage
          </li>
        </ul>
      </div>
      <div className="about-viz-float about-viz-float-chart" aria-hidden="true">
        <TrendingUp className="h-4 w-4" strokeWidth={2.2} />
      </div>
    </div>
  );
}

export function VisualTasks() {
  return (
    <div className="about-viz about-viz-plain">
      <Shell title="My Tasks">
        <DotRow
          items={[
            { label: "Design homepage", tone: "blue" },
            { label: "Client revision", tone: "orange" },
            { label: "Submit proposal", tone: "purple" },
          ]}
        />
      </Shell>
    </div>
  );
}

export function VisualClients({ handshake = false }: { handshake?: boolean }) {
  return (
    <div className="about-viz about-viz-plain">
      <Shell title="Clients">
        <AvatarRow
          items={[
            { label: "Client A", avatar: visitorAvatarAt(0) },
            { label: "Client B", avatar: visitorAvatarAt(1) },
            { label: "Client C", avatar: visitorAvatarAt(2) },
          ]}
        />
      </Shell>
      <div
        className={`about-viz-float about-viz-float-chart${handshake ? " about-viz-float-handshake" : ""}`}
        aria-hidden="true"
      >
        {handshake ? (
          <Users className="h-4 w-4" strokeWidth={2.2} />
        ) : (
          <span className="about-viz-mini-bars" aria-hidden="true">
            <i style={{ height: "40%" }} />
            <i style={{ height: "70%" }} />
            <i style={{ height: "55%" }} />
            <i style={{ height: "90%" }} />
          </span>
        )}
      </div>
    </div>
  );
}

export function VisualInvoice() {
  return (
    <div className="about-viz about-viz-plain">
      <Shell title="Invoice" className="about-viz-shell-plan">
        <p className="about-viz-plan-name about-viz-amount">$2,480</p>
        <span className="about-viz-plan-badge">Paid</span>
      </Shell>
      <div className="about-viz-float about-viz-float-chart" aria-hidden="true">
        <Check className="h-4 w-4" strokeWidth={2.4} />
      </div>
    </div>
  );
}

export function VisualPrograms() {
  return (
    <div className="about-viz about-viz-plain">
      <Shell title="Programs">
        <DotRow
          items={[
            { label: "Community outreach", tone: "red" },
            { label: "Education program", tone: "teal" },
            { label: "Fundraising", tone: "blue" },
          ]}
        />
      </Shell>
    </div>
  );
}

export function VisualEducation() {
  return (
    <div className="about-viz about-viz-plain">
      <Shell title="Course">
        <DotRow
          items={[
            { label: "Module 01", tone: "purple" },
            { label: "Module 02", tone: "blue" },
            { label: "Module 03", tone: "orange" },
          ]}
        />
      </Shell>
    </div>
  );
}

export function VisualModules() {
  return (
    <div className="about-viz about-viz-product">
      <div className="about-viz-back" aria-hidden="true">
        <div className="about-viz-back-row" />
        <div className="about-viz-back-row" />
        <div className="about-viz-back-bar" />
      </div>
      <Shell title="Modules">
        <DotRow
          items={[
            { label: "Kanban boards", tone: "blue" },
            { label: "Attachments", tone: "teal" },
            { label: "Notifications", tone: "purple" },
          ]}
        />
      </Shell>
    </div>
  );
}

export function VisualPlanFree() {
  return (
    <div className="about-viz about-viz-trust">
      <div className="about-viz-shell about-viz-shell-plan">
        <p className="about-viz-title">Current plan</p>
        <div className="about-viz-plan-row">
          <span className="about-viz-plan-name">Free</span>
          <span className="about-viz-plan-badge">Explore</span>
        </div>
        <ul className="about-viz-plan-meta">
          <li>5 projects</li>
          <li>10 members</li>
        </ul>
      </div>
    </div>
  );
}

export function VisualPlanGrow() {
  return (
    <div className="about-viz about-viz-trust">
      <div className="about-viz-wave" aria-hidden="true" />
      <div className="about-viz-shell about-viz-shell-plan">
        <p className="about-viz-title">Upgrade</p>
        <div className="about-viz-plan-row">
          <span className="about-viz-plan-name">Starter</span>
          <span className="about-viz-plan-badge">Trial</span>
        </div>
        <ul className="about-viz-plan-meta">
          <li>Stripe checkout</li>
          <li>14-day free trial</li>
        </ul>
      </div>
      <div className="about-viz-float about-viz-float-chart about-viz-float-teal" aria-hidden="true">
        <TrendingUp className="h-4 w-4" strokeWidth={2.2} />
      </div>
    </div>
  );
}

export function VisualEnterprise() {
  return (
    <div className="about-viz about-viz-trust">
      <div className="about-viz-shell about-viz-shell-plan">
        <p className="about-viz-title">Enterprise</p>
        <div className="about-viz-plan-row">
          <span className="about-viz-plan-name">Custom</span>
          <span className="about-viz-plan-badge">Sales</span>
        </div>
        <ul className="about-viz-plan-meta">
          <li>Unlimited quotas</li>
          <li>Commercial terms</li>
        </ul>
      </div>
    </div>
  );
}

export function VisualSetup() {
  return (
    <div className="about-viz about-viz-ship">
      <Shell title="Workspace">
        <DotRow
          items={[
            { label: "Create tenant", tone: "blue" },
            { label: "Invite members", tone: "teal" },
            { label: "Set roles", tone: "purple" },
          ]}
        />
      </Shell>
      <div className="about-viz-float about-viz-float-online" aria-hidden="true">
        <span className="about-viz-online-label">Quick start</span>
      </div>
    </div>
  );
}

export function VisualOrganize() {
  return (
    <div className="about-viz about-viz-product">
      <div className="about-viz-back" aria-hidden="true">
        <div className="about-viz-back-row" />
        <div className="about-viz-back-bar" />
      </div>
      <Shell title="Board">
        <DotRow
          items={[
            { label: "Projects", tone: "blue" },
            { label: "Tasks", tone: "orange" },
            { label: "Notes", tone: "purple" },
          ]}
        />
      </Shell>
    </div>
  );
}

export function VisualTrackBill() {
  return (
    <div className="about-viz about-viz-plain">
      <Shell title="Timesheet" className="about-viz-shell-plan">
        <p className="about-viz-plan-name about-viz-amount">32.5h</p>
        <span className="about-viz-plan-badge">Logged</span>
        <ul className="about-viz-plan-meta" style={{ marginTop: "0.45rem" }}>
          <li>Ready to invoice</li>
        </ul>
      </Shell>
    </div>
  );
}

export function ModuleCardVisual({ kind }: { kind: ModuleVisualKind }) {
  switch (kind) {
    case "product":
    case "projects":
    case "one-product":
      return <VisualProduct />;
    case "ship":
    case "team":
    case "workspaces":
    case "roles":
      return <VisualTeam online={kind === "ship" || kind === "team"} />;
    case "collab":
    case "collaborate-step":
      return <VisualCollab />;
    case "trust":
    case "plans-fit":
    case "pricing-link":
      return <VisualTrust />;
    case "tasks":
      return <VisualTasks />;
    case "clients":
      return <VisualClients />;
    case "clients-handshake":
    case "solutions-link":
      return <VisualClients handshake />;
    case "invoice":
    case "ops":
      return <VisualInvoice />;
    case "programs":
      return <VisualPrograms />;
    case "education":
      return <VisualEducation />;
    case "modules":
    case "same-modules":
    case "features-link":
      return <VisualModules />;
    case "plan-free":
      return <VisualPlanFree />;
    case "plan-grow":
      return <VisualPlanGrow />;
    case "enterprise":
      return <VisualEnterprise />;
    case "app-link":
      return <VisualTeam online />;
    case "setup":
      return <VisualSetup />;
    case "organize":
      return <VisualOrganize />;
    case "track-bill":
      return <VisualTrackBill />;
    default:
      return <VisualProduct />;
  }
}

/** @deprecated Prefer ModuleCardVisual */
export function AboutPillarVisual({
  kind,
}: {
  kind: "product" | "ship" | "collab" | "trust";
}) {
  return <ModuleCardVisual kind={kind} />;
}
