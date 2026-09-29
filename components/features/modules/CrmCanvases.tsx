"use client";

import { StageLayer } from "@/components/features/story/StageLayer";
import { VizChrome } from "@/components/features/story/VizChrome";
import {
  CLIENT_STAGES,
  LEAD_STAGES,
  PROPOSAL_STAGES,
  TIME_STAGES,
} from "@/components/features/modules/catalog";
import {
  scenePresence,
  stageIndexForProgress,
} from "@/components/features/story/storyUtils";
import { VisitorAvatar } from "@/components/ui/VisitorAvatar";
import { VISITOR_AVATARS } from "@/lib/visitor-avatars";

export function TimeFinanceCanvas({
  progress,
}: {
  progress: number;
  reducedMotion?: boolean;
}) {
  const index = stageIndexForProgress(TIME_STAGES, progress);
  const work = scenePresence(progress, 0, 0.28);
  const time = scenePresence(progress, 0.22, 0.53);
  const finance = scenePresence(progress, 0.47, 0.78);
  const budget = scenePresence(progress, 0.72, 1.05);

  return (
    <div className="pfs-viz mst-viz" aria-live="polite">
      <VizChrome title="Worknaro · Time & finance" badge={TIME_STAGES[index].label} />
      <div className="mst-stage mst-measure">
        <StageLayer active={work}>
          <div className="mst-measure-card">
            <p className="mst-kicker">Task</p>
            <strong>Hero section completed</strong>
            <p>Website Redesign · Alex</p>
          </div>
        </StageLayer>
        <StageLayer active={time}>
          <div className="mst-measure-card">
            <p className="mst-kicker">Timesheet</p>
            <strong>2h 30m logged</strong>
            <p>18 Sep · Billable · not invoiced automatically</p>
          </div>
        </StageLayer>
        <StageLayer active={finance}>
          <div className="mst-measure-card">
            <p className="mst-kicker">Finance</p>
            <strong>Invoice INV-1042 · Draft</strong>
            <p>Expense · Stock photos · Approved</p>
          </div>
        </StageLayer>
        <StageLayer active={budget}>
          <div className="mst-measure-card is-result">
            <p className="mst-kicker">Budget tier 2</p>
            <strong>$1,240 of $4,999 used</strong>
            <p>Invoices + approved expenses · time is separate</p>
            <span className="mst-bar" aria-hidden="true">
              <span style={{ width: "25%" }} />
            </span>
          </div>
        </StageLayer>
      </div>
    </div>
  );
}

export function ClientsCanvas({
  progress,
}: {
  progress: number;
  reducedMotion?: boolean;
}) {
  const index = stageIndexForProgress(CLIENT_STAGES, progress);
  const showProjects = progress >= 0.22;
  const showWork = progress >= 0.48;
  const showAll = progress >= 0.72;

  return (
    <div className="pfs-viz mst-viz" aria-live="polite">
      <VizChrome title="Worknaro · Client" badge={CLIENT_STAGES[index].label} />
      <div className="mst-stage mst-client">
        <article className="mst-client-card">
          <span className="pfs-avatar pfs-avatar-lg has-image" aria-hidden="true">
            <VisitorAvatar src={VISITOR_AVATARS.green} />
          </span>
          <div>
            <p className="mst-kicker">Active</p>
            <strong>Northwind Studio</strong>
            <p>Assigned · Sarah</p>
          </div>
        </article>
        <div className={`mst-links ${showAll ? "is-full" : ""}`}>
          {showProjects ? (
            <div>
              <p>Projects</p>
              <span>Website Redesign</span>
            </div>
          ) : null}
          {showWork ? (
            <>
              <div>
                <p>Tasks</p>
                <span>4 open</span>
              </div>
              <div>
                <p>Proposals</p>
                <span>PR-18 viewed</span>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const LEAD_COLUMNS = ["New", "Contacted", "Qualified", "Proposal", "Won"] as const;

function leadIndex(progress: number) {
  if (progress >= 0.75) return 4;
  if (progress >= 0.5) return 3;
  if (progress >= 0.25) return 1;
  return 0;
}

export function LeadsCanvas({
  progress,
}: {
  progress: number;
  reducedMotion?: boolean;
}) {
  const index = stageIndexForProgress(LEAD_STAGES, progress);
  const col = leadIndex(progress);
  const converted = progress >= 0.78;

  return (
    <div className="pfs-viz mst-viz" aria-live="polite">
      <VizChrome title="Worknaro · Leads" badge={LEAD_STAGES[index].label} />
      <div className="mst-stage mst-pipe">
        <div className="mst-pipe-cols">
          {LEAD_COLUMNS.map((label, i) => (
            <div key={label} className={i === col && !converted ? "is-active" : ""}>
              <p>{label}</p>
              {i === col && !converted ? (
                <article>
                  <strong>Brightline Co</strong>
                  <span>Alex · $12,400</span>
                </article>
              ) : (
                <span className="mst-slot" />
              )}
            </div>
          ))}
        </div>
        {converted ? (
          <p className="mst-note">Converted · Northwind Studio client created</p>
        ) : (
          <p className="mst-note">
            {col === 4 ? "Won · convert when you are ready" : "Active lead · pipeline stage"}
          </p>
        )}
      </div>
    </div>
  );
}

export function ProposalsCanvas({
  progress,
}: {
  progress: number;
  reducedMotion?: boolean;
}) {
  const index = stageIndexForProgress(PROPOSAL_STAGES, progress);
  const status =
    progress >= 0.75 ? "Approved → Convert" : progress >= 0.5 ? "Viewed" : progress >= 0.25 ? "Draft" : "Opportunity";

  return (
    <div className="pfs-viz mst-viz" aria-live="polite">
      <VizChrome title="Worknaro · Proposal" badge={PROPOSAL_STAGES[index].label} />
      <div className="mst-stage mst-doc">
        <div className="mst-doc-page">
          <p className="mst-kicker">PR-18 · {status}</p>
          <strong>Website Redesign proposal</strong>
          <p>Northwind Studio</p>
          {progress >= 0.22 ? (
            <ul>
              <li>
                <span>Discovery</span>
                <b>$1,800</b>
              </li>
              <li>
                <span>Design</span>
                <b>$4,200</b>
              </li>
              <li>
                <span>Build</span>
                <b>$6,400</b>
              </li>
            </ul>
          ) : null}
          {progress >= 0.48 ? <p className="mst-note">Public link sent · client can approve or reject</p> : null}
          {progress >= 0.72 ? <span className="ffs-action-btn">Convert to project</span> : null}
        </div>
      </div>
    </div>
  );
}
