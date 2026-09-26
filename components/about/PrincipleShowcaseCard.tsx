"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Layers,
  MoreHorizontal,
  Plus,
  Search,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Icon } from "@/components/ui/Icon";

export type PrincipleAccent = "blue" | "purple";

export type PrincipleCardData = {
  title: string;
  label: string;
  description: ReactNode;
  points: readonly string[];
  icon: LucideIcon;
  accent: PrincipleAccent;
  href: string;
  ctaLabel: string;
  preview: "projects" | "team";
};

function ProjectsPreview() {
  const rows = [
    { name: "Website Redesign", tone: "blue", status: "In Progress", statusTone: "progress" },
    { name: "Mobile App", tone: "orange", status: "Not Started", statusTone: "idle" },
    { name: "Brand Strategy", tone: "purple", status: "On Hold", statusTone: "hold" },
  ] as const;

  return (
    <div className="principle-preview principle-preview-projects" aria-hidden="true">
      <div className="principle-preview-rail">
        <span />
        <span />
        <span />
      </div>
      <div className="principle-preview-panel">
        <div className="principle-preview-head">
          <p className="principle-preview-title">Projects</p>
          <span className="principle-preview-action">
            <Search className="h-3 w-3" strokeWidth={2.2} />
          </span>
        </div>
        <ul className="principle-preview-list">
          {rows.map((row) => (
            <li key={row.name}>
              <span className={`principle-preview-dot principle-preview-dot-${row.tone}`} />
              <span className="principle-preview-name">{row.name}</span>
              <span className={`principle-preview-pill principle-preview-pill-${row.statusTone}`}>
                {row.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TeamPreview() {
  const rows = [
    { name: "Admin", initial: "A", tone: "blue", role: "Owner" },
    { name: "Member", initial: "M", tone: "teal", role: "Member" },
    { name: "Viewer", initial: "V", tone: "purple", role: "Viewer" },
  ] as const;

  return (
    <div className="principle-preview principle-preview-team" aria-hidden="true">
      <div className="principle-preview-online">
        <span className="principle-preview-online-stack">
          <i className="principle-preview-avatar-sm principle-preview-avatar-blue" />
          <i className="principle-preview-avatar-sm principle-preview-avatar-teal" />
          <i className="principle-preview-avatar-sm principle-preview-avatar-purple" />
        </span>
        <span>3 online</span>
      </div>
      <div className="principle-preview-panel">
        <div className="principle-preview-head">
          <p className="principle-preview-title">Team</p>
          <span className="principle-preview-action">
            <Plus className="h-3.5 w-3.5" strokeWidth={2.4} />
          </span>
        </div>
        <ul className="principle-preview-list principle-preview-list-team">
          {rows.map((row) => (
            <li key={row.name}>
              <span className={`principle-preview-avatar principle-preview-avatar-${row.tone}`}>
                {row.initial}
              </span>
              <span className="principle-preview-name">{row.name}</span>
              <span className={`principle-preview-pill principle-preview-pill-${row.tone}`}>
                {row.role}
              </span>
              <MoreHorizontal className="principle-preview-more h-3.5 w-3.5" strokeWidth={2} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function PrincipleShowcaseCard({ item }: { item: PrincipleCardData }) {
  return (
    <article className={`principle-card principle-card-${item.accent}`}>
      <span className="principle-card-shape" aria-hidden="true" />

      <div className="principle-card-body">
        <p className="principle-card-label">
          <span className="principle-card-label-dot" aria-hidden="true" />
          {item.label}
        </p>

        <div className="principle-card-header">
          <span className="principle-card-icon" aria-hidden="true">
            <Icon icon={item.icon} size={24} strokeWidth={1.9} />
          </span>
          <div className="principle-card-heading">
            <h3 className="principle-card-title">{item.title}</h3>
            <p className="principle-card-desc">{item.description}</p>
          </div>
        </div>

        <ul className="principle-card-points">
          {item.points.map((point) => (
            <li key={point}>
              <span className="principle-card-check" aria-hidden="true">
                <Check className="h-3.5 w-3.5" strokeWidth={2.6} />
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <Link href={item.href} className="principle-card-cta">
          {item.ctaLabel}
          <span className="principle-card-cta-arrow" aria-hidden="true">
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} />
          </span>
        </Link>
      </div>

      <div className="principle-card-visual">
        {item.preview === "projects" ? <ProjectsPreview /> : <TeamPreview />}
      </div>
    </article>
  );
}

export const PRINCIPLE_CARDS: PrincipleCardData[] = [
  {
    title: "Application-first",
    label: "Application-first",
    description: (
      <>
        The application is the source of <strong>truth</strong>. It connects your teams,
        projects, and data in one place.
      </>
    ),
    points: [
      "Sign-in, workspaces, and billing live in the Django app",
      "This site does not create a second account system",
      "Product claims map to modules that already ship",
    ],
    icon: Layers,
    accent: "blue",
    href: "/features",
    ctaLabel: "Learn more",
    preview: "projects",
  },
  {
    title: "One workspace product",
    label: "One workspace product",
    description: "Audience labels are examples, not separate editions.",
    points: [
      "Audience labels are examples, not separate editions",
      "Plan limits change with Free, Starter, Pro, or Enterprise",
      "Stripe powers subscriptions when configured",
    ],
    icon: Users,
    accent: "purple",
    href: "/solutions",
    ctaLabel: "See solutions",
    preview: "team",
  },
];
