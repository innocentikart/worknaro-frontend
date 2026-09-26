"use client";

import { StageLayer } from "@/components/features/story/StageLayer";
import { VizChrome } from "@/components/features/story/VizChrome";
import {
  ACCESS_STAGES,
  FILE_STAGES,
  REPORT_STAGES,
  SEARCH_STAGES,
  TAG_STAGES,
  TRASH_STAGES,
} from "@/components/features/modules/catalog";
import {
  scenePresence,
  stageIndexForProgress,
} from "@/components/features/story/storyUtils";

const FILES = [
  { name: "Proposal.pdf", meta: "Project file" },
  { name: "Contract.pdf", meta: "Shared · team" },
  { name: "Homepage.fig", meta: "Task attachment" },
];

export function FilesCanvas({
  progress,
}: {
  progress: number;
  reducedMotion?: boolean;
}) {
  const index = stageIndexForProgress(FILE_STAGES, progress);
  const count = progress >= 0.72 ? 3 : progress >= 0.48 ? 3 : progress >= 0.22 ? 3 : 0;
  const open = progress >= 0.48;

  return (
    <div className="pfs-viz mst-viz" aria-live="polite">
      <VizChrome title="Organitio · Files" badge={FILE_STAGES[index].label} />
      <div className="mst-stage mst-files">
        <p className="mst-kicker">Website Redesign</p>
        <ul>
          {FILES.slice(0, Math.max(count, progress < 0.22 ? 0 : 3)).map((file, i) => (
            <li key={file.name} className={open && i === 0 ? "is-open" : ""}>
              <strong>{file.name}</strong>
              <span>{file.meta}</span>
            </li>
          ))}
        </ul>
        {progress < 0.22 ? <p className="mst-empty">Open the project to see its files</p> : null}
        {open ? <p className="mst-note">Download · version · share · favorite</p> : null}
      </div>
    </div>
  );
}

const TAG_ITEMS = [
  { name: "Hero section", tag: true },
  { name: "API checklist", tag: true },
  { name: "Client review", tag: false },
];

export function TagsCanvas({
  progress,
}: {
  progress: number;
  reducedMotion?: boolean;
}) {
  const index = stageIndexForProgress(TAG_STAGES, progress);
  const tagged = progress >= 0.22;
  const grouped = progress >= 0.48;

  return (
    <div className="pfs-viz mst-viz" aria-live="polite">
      <VizChrome title="Organitio · Tags" badge={TAG_STAGES[index].label} />
      <div className="mst-stage mst-tags">
        <ul className={grouped ? "is-grouped" : ""}>
          {TAG_ITEMS.map((item) => (
            <li
              key={item.name}
              className={tagged && item.tag ? "is-tagged" : ""}
            >
              <strong>{item.name}</strong>
              {tagged && item.tag ? <span>Urgent</span> : null}
            </li>
          ))}
        </ul>
        <p className="mst-note">
          {progress >= 0.72
            ? "Filter tasks by tag · catalog is not applied to files"
            : tagged
              ? "Urgent applied to two tasks"
              : "Tasks before a catalog tag"}
        </p>
      </div>
    </div>
  );
}

export function TrashCanvas({
  progress,
}: {
  progress: number;
  reducedMotion?: boolean;
}) {
  const index = stageIndexForProgress(TRASH_STAGES, progress);
  const inTrash = progress >= 0.22 && progress < 0.72;
  const restored = progress >= 0.72;

  return (
    <div className="pfs-viz mst-viz" aria-live="polite">
      <VizChrome title="Organitio · Trash" badge={TRASH_STAGES[index].label} />
      <div className="mst-stage mst-trash">
        <div className={`mst-trash-col ${!inTrash ? "is-active" : ""}`}>
          <p>Project files</p>
          {!inTrash ? (
            <article>
              <strong>Contract.pdf</strong>
              <span>{restored ? "Restored" : "Website Redesign"}</span>
            </article>
          ) : (
            <p className="mst-empty">File removed</p>
          )}
        </div>
        <div className={`mst-trash-col ${inTrash ? "is-active" : ""}`}>
          <p>Trash · 30 days</p>
          {inTrash ? (
            <article>
              <strong>Contract.pdf</strong>
              <span>Restore or delete permanently</span>
            </article>
          ) : (
            <p className="mst-empty">Empty</p>
          )}
        </div>
      </div>
    </div>
  );
}

const SEARCH_HITS = [
  { kind: "Project", title: "Website Redesign", match: 1 },
  { kind: "Task", title: "Alpha design pass", match: 3 },
  { kind: "File", title: "alpha-brief.pdf", match: 2 },
  { kind: "Client", title: "Northwind Studio", match: 1 },
  { kind: "Lead", title: "Brightline Co", match: 1 },
];

function searchQuery(progress: number) {
  if (progress >= 0.72) return "alpha design";
  if (progress >= 0.48) return "alpha design";
  if (progress >= 0.22) return "alpha";
  return "";
}

export function SearchCanvas({
  progress,
}: {
  progress: number;
  reducedMotion?: boolean;
}) {
  const index = stageIndexForProgress(SEARCH_STAGES, progress);
  const q = searchQuery(progress);
  const level = q === "alpha design" ? 3 : q === "alpha" ? 2 : 1;
  const rows = SEARCH_HITS.filter((hit) => hit.match >= level);

  return (
    <div className="pfs-viz mst-viz" aria-live="polite">
      <VizChrome title="Organitio · Search" badge={SEARCH_STAGES[index].label} />
      <div className="mst-stage mst-search">
        <div className="mst-search-box">
          <span>{q || "Search the workspace"}</span>
        </div>
        <ul>
          {rows.map((hit) => (
            <li key={hit.title} className={level === 3 && hit.title.startsWith("Alpha") ? "is-open" : ""}>
              <em>{hit.kind}</em>
              <strong>{hit.title}</strong>
            </li>
          ))}
        </ul>
        {level === 3 ? <p className="mst-note">Open · file contents are not searched</p> : null}
      </div>
    </div>
  );
}

export function ReportsCanvas({
  progress,
}: {
  progress: number;
  reducedMotion?: boolean;
}) {
  const index = stageIndexForProgress(REPORT_STAGES, progress);
  const activity = scenePresence(progress, 0, 0.28);
  const group = scenePresence(progress, 0.22, 0.53);
  const metrics = scenePresence(progress, 0.47, 0.78);
  const report = scenePresence(progress, 0.72, 1.05);

  return (
    <div className="pfs-viz mst-viz" aria-live="polite">
      <VizChrome title="Organitio · Reports" badge={REPORT_STAGES[index].label} />
      <div className="mst-stage mst-report">
        <StageLayer active={activity}>
          <ul className="mst-mini-list">
            <li>
              <span>Hero section completed</span>
              <strong>Today</strong>
            </li>
            <li>
              <span>2h 30m logged</span>
              <strong>Alex</strong>
            </li>
          </ul>
        </StageLayer>
        <StageLayer active={group}>
          <div className="mst-report-groups">
            <div>
              <p>Website Redesign</p>
              <span>12 tasks</span>
            </div>
            <div>
              <p>Alex</p>
              <span>18.5h</span>
            </div>
          </div>
        </StageLayer>
        <StageLayer active={Math.max(metrics, report)}>
          <div className="mst-report-metrics">
            <div>
              <strong>64%</strong>
              <span>Project complete</span>
            </div>
            <div>
              <strong>18.5h</strong>
              <span>Billable time</span>
            </div>
            <div>
              <strong>Pro+</strong>
              <span>Project & timesheet reports</span>
            </div>
          </div>
        </StageLayer>
      </div>
    </div>
  );
}

const ROLES = [
  { name: "Sarah", role: "Owner" },
  { name: "Alex", role: "Admin" },
  { name: "David", role: "Manager" },
  { name: "Maya", role: "Member" },
  { name: "Jen", role: "Viewer" },
  { name: "Client", role: "Guest" },
];

export function AccessCanvas({
  progress,
}: {
  progress: number;
  reducedMotion?: boolean;
}) {
  const index = stageIndexForProgress(ACCESS_STAGES, progress);
  const count = progress >= 0.72 ? 6 : progress >= 0.48 ? 6 : progress >= 0.22 ? 4 : 1;
  const guestFocus = progress >= 0.72;

  return (
    <div className="pfs-viz mst-viz" aria-live="polite">
      <VizChrome title="Organitio · Workspace" badge={ACCESS_STAGES[index].label} />
      <div className="mst-stage mst-access">
        <p className="mst-kicker">Northwind workspace</p>
        <ul>
          {ROLES.slice(0, count).map((person) => (
            <li
              key={person.name}
              className={guestFocus && person.role === "Guest" ? "is-focus" : ""}
            >
              <strong>{person.name}</strong>
              <span>{person.role}</span>
            </li>
          ))}
        </ul>
        <p className="mst-note">
          {guestFocus
            ? "Guest is isolated from the internal catalog"
            : count === 1
              ? "Owner is the workspace creator"
              : "Invite Admin, Manager, Member, Viewer, or Guest"}
        </p>
      </div>
    </div>
  );
}
