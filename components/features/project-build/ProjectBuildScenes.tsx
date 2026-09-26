"use client";

import { motion } from "framer-motion";
import { VizChrome } from "@/components/features/story/VizChrome";
import {
  BOARD_COLUMNS,
  DEMO_MEMBERS,
  DEMO_PROJECT,
  DEMO_TASKS,
  PROJECT_BUILD_META,
  heroColumn,
  liveCompletedCount,
  taskCompletionPercent,
  typedText,
  workCompletedCount,
  type ProjectBuildTab,
} from "@/components/features/project-build/projectBuildData";

function appear(progress: number, start: number, reducedMotion?: boolean) {
  if (reducedMotion) return progress >= start ? 1 : 0;
  return Math.min(1, Math.max(0, (progress - start) / 0.16));
}

function Field({
  label,
  value,
  show,
}: {
  label: string;
  value: string;
  show: boolean;
}) {
  return (
    <label className={`pbs-field ${show ? "is-on" : ""}`}>
      <span>{label}</span>
      <strong>{show ? value : ""}</strong>
    </label>
  );
}

export function ShellScene({
  progress,
  reducedMotion,
}: {
  progress: number;
  reducedMotion?: boolean;
}) {
  const meta = PROJECT_BUILD_META.shell;
  const nameOn = progress >= 0.12;
  const descOn = progress >= 0.28;
  const metaOn = progress >= 0.44;
  const datesOn = progress >= 0.6;
  const created = progress >= 0.76;
  const name = typedText(DEMO_PROJECT.name, reducedMotion ? 1 : Math.min(1, (progress - 0.12) / 0.16));
  const description = typedText(
    DEMO_PROJECT.description,
    reducedMotion ? 1 : Math.min(1, (progress - 0.28) / 0.18),
  );

  return (
    <div className="pbs-scene pbs-scene-shell">
      <SceneCopy tab="shell" progress={progress} marks={[0.16, 0.44, 0.6, 0.76]} />
      <div className="pbs-ui">
        <div className="pfs-viz pbs-viz">
          <VizChrome title={`Organitio · ${meta.chrome}`} badge={created ? "Created" : "Draft"} />
          <div className="pbs-stage">
            <div className="pbs-form">
              <Field label="Project name" value={name} show={nameOn} />
              <Field label="Description" value={description} show={descOn} />
              <div className="pbs-field-row">
                <Field label="Priority" value={DEMO_PROJECT.priority} show={metaOn} />
                <Field label="Status" value={DEMO_PROJECT.status} show={metaOn} />
                <Field label="Budget tier" value={DEMO_PROJECT.budget} show={metaOn} />
              </div>
              <div className="pbs-field-row">
                <Field label="Start" value={DEMO_PROJECT.start} show={datesOn} />
                <Field label="Due" value={DEMO_PROJECT.due} show={datesOn} />
                <Field label="Milestone" value={DEMO_PROJECT.milestone} show={datesOn} />
              </div>
              <div className="pbs-form-foot">
                <span className="pbs-meta-pill">{DEMO_PROJECT.type}</span>
                <span className={`pbs-create ${created ? "is-done" : ""}`}>
                  {created ? "Project created" : "Create project"}
                </span>
              </div>
            </div>
            {created ? (
              <p className="pbs-confirm">
                {DEMO_PROJECT.code} · foundation ready · {DEMO_PROJECT.budget} · {DEMO_PROJECT.budgetHint}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TeamScene({
  progress,
  reducedMotion,
}: {
  progress: number;
  reducedMotion?: boolean;
}) {
  const meta = PROJECT_BUILD_META.team;
  const visible = DEMO_MEMBERS.filter((_, index) => progress >= 0.14 + index * 0.16 || reducedMotion);
  const count = visible.length;

  return (
    <div className="pbs-scene pbs-scene-team">
      <SceneCopy tab="team" progress={progress} marks={[0.16, 0.32, 0.48, 0.78]} />
      <div className="pbs-ui">
        <div className="pfs-viz pbs-viz">
          <VizChrome title={`Organitio · ${meta.chrome}`} badge={`${count} members`} />
          <div className="pbs-stage">
            <div className="pbs-team-head">
              <div>
                <p className="pbs-kicker">{DEMO_PROJECT.code}</p>
                <strong>{DEMO_PROJECT.name}</strong>
              </div>
              <span className={`pbs-create ${count >= 4 ? "is-done" : ""}`}>
                {count >= 4 ? "Team added" : "Add member"}
              </span>
            </div>
            <ul className="pbs-members">
              {visible.map((member, index) => {
                const roleOn = reducedMotion || progress >= 0.22 + index * 0.16;
                return (
                  <motion.li
                    key={member.email}
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.35 }}
                  >
                    <span className={`pfs-avatar pfs-avatar-${member.tone}`}>{member.initials}</span>
                    <span>
                      <strong>{member.name}</strong>
                      <em>{member.email}</em>
                    </span>
                    <b className={roleOn ? "is-on" : ""}>{roleOn ? member.role : "Assign role"}</b>
                  </motion.li>
                );
              })}
            </ul>
            {count ? (
              <p className="pbs-confirm">
                {count} of {DEMO_MEMBERS.length} people · project roles, not workspace roles
              </p>
            ) : (
              <p className="pbs-confirm">Invite people to this project</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const WORK_STATICS: Record<string, Array<{ name: string; who: string }>> = {
  not_started: [
    { name: "Design system", who: "Sarah" },
    { name: "Backend integration", who: "Alex" },
    { name: "Testing & QA", who: "David" },
  ],
  pending: [
    { name: "Content outline", who: "Emily" },
    { name: "API checklist", who: "Alex" },
  ],
  in_progress: [],
  on_hold: [],
  completed: [
    { name: "Project setup", who: "Sarah" },
    { name: "Homepage design", who: "Sarah" },
  ],
};

export function WorkScene({
  progress,
  reducedMotion,
}: {
  progress: number;
  reducedMotion?: boolean;
}) {
  const meta = PROJECT_BUILD_META.work;
  const col = heroColumn(progress);
  const completed = workCompletedCount(progress);
  const total = DEMO_TASKS.length;
  const percent = taskCompletionPercent(completed, total);
  const statusLabel =
    col === 4 ? "Completed" : col === 3 ? "Review" : col === 2 ? "In Progress" : "To Do";

  return (
    <div className="pbs-scene pbs-scene-work">
      <SceneCopy tab="work" progress={progress} marks={[0.18, 0.38, 0.58, 0.78]} />
      <div className="pbs-ui">
        <div className="pfs-viz pbs-viz">
          <VizChrome title={`Organitio · ${meta.chrome}`} badge={statusLabel} />
          <div className="pbs-stage">
            <div className="pbs-board" aria-hidden="false">
              {BOARD_COLUMNS.map((column, index) => (
                <div key={column.key}>
                  <p>
                    {column.label}
                    <i>
                      {(WORK_STATICS[column.key]?.length ?? 0) + (col === index ? 1 : 0)}
                    </i>
                  </p>
                  {(WORK_STATICS[column.key] ?? []).map((card) => (
                    <article key={card.name}>
                      <strong>{card.name}</strong>
                      <span>{card.who}</span>
                    </article>
                  ))}
                  {col === index ? <span className="pbs-slot" /> : null}
                </div>
              ))}
              <motion.article
                className="pbs-mover"
                initial={false}
                animate={{ left: `calc(${col * 20}% + 0.32rem)` }}
                transition={{ duration: reducedMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                <strong>Hero section</strong>
                <span>Alex · High · {statusLabel}</span>
              </motion.article>
            </div>

            <ul className="pbs-work-list">
              {DEMO_TASKS.slice(0, 5).map((task) => {
                const live =
                  task.id === "hero"
                    ? statusLabel
                    : task.status === "completed"
                      ? "Completed"
                      : task.status === "pending"
                        ? "To Do"
                        : "Backlog";
                return (
                  <li key={task.id} className={task.id === "hero" ? "is-focus" : ""}>
                    <span>{task.name}</span>
                    <strong>{live}</strong>
                  </li>
                );
              })}
            </ul>

            <div className="pbs-progress-line">
              <span>
                {completed} completed · {total} tasks
              </span>
              <b>
                <i style={{ width: `${percent}%` }} />
              </b>
              <em>{percent}%</em>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const LIVE_ACTIVITY = [
  { who: "SJ", name: "Sarah", action: "completed Homepage design", at: "2m ago" },
  { who: "AX", name: "Alex", action: "moved Hero section to Completed", at: "1m ago" },
  { who: "ED", name: "Emily", action: "completed Content outline", at: "Just now" },
  { who: "SJ", name: "Sarah", action: "completed Design system", at: "Just now" },
  { who: "AX", name: "Alex", action: "moved Backend integration to In Progress", at: "Just now" },
];

export function LiveScene({
  progress,
  reducedMotion,
}: {
  progress: number;
  reducedMotion?: boolean;
}) {
  const meta = PROJECT_BUILD_META.live;
  const completed = liveCompletedCount(progress);
  const total = DEMO_TASKS.length;
  const percent = taskCompletionPercent(completed, total);
  const activityCount = reducedMotion
    ? LIVE_ACTIVITY.length
    : 1 + Math.min(4, Math.floor(progress / 0.16));
  const items = LIVE_ACTIVITY.slice(0, activityCount);
  const inProgress = 1;
  const remaining = total - completed - inProgress;

  return (
    <div className="pbs-scene pbs-scene-live">
      <SceneCopy tab="live" progress={progress} marks={[0.16, 0.32, 0.48, 0.62]} />
      <div className="pbs-ui">
        <div className="pfs-viz pbs-viz">
          <VizChrome title={`Organitio · ${meta.chrome}`} badge={DEMO_PROJECT.liveStatus} />
          <div className="pbs-stage">
            <div className="pbs-live-top">
              <div
                className="pbs-ring"
                role="img"
                aria-label={`${percent} percent complete from task status`}
              >
                <svg viewBox="0 0 36 36" aria-hidden="true">
                  <circle className="pbs-ring-track" cx="18" cy="18" r="15.15" />
                  <motion.circle
                    className="pbs-ring-fill"
                    cx="18"
                    cy="18"
                    r="15.15"
                    pathLength={100}
                    initial={false}
                    animate={{ strokeDasharray: `${percent} 100` }}
                    transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                  />
                </svg>
                <div className="pbs-ring-label">
                  <strong>{percent}%</strong>
                  <span>from tasks</span>
                </div>
              </div>
              <ul className="pbs-kpis">
                <li>
                  <strong>{total}</strong>
                  <span>Tasks</span>
                </li>
                <li>
                  <strong>{completed}</strong>
                  <span>Completed</span>
                </li>
                <li>
                  <strong>{inProgress}</strong>
                  <span>In Progress</span>
                </li>
                <li>
                  <strong>{Math.max(0, remaining)}</strong>
                  <span>Open</span>
                </li>
              </ul>
            </div>

            <div className="pbs-live-grid">
              <div>
                <p className="pbs-kicker">Recent activity</p>
                <ul className="pbs-activity">
                  {items.map((item) => (
                    <li key={`${item.action}-${item.at}`}>
                      <span className="pfs-avatar pfs-avatar-blue">{item.who}</span>
                      <span>
                        <strong>{item.name}</strong> {item.action}
                        <em>{item.at}</em>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <aside>
                <p className="pbs-kicker">Key dates</p>
                <ul className="pbs-dates">
                  <li>
                    <span>Start</span>
                    <strong>{DEMO_PROJECT.start}</strong>
                  </li>
                  <li>
                    <span>Milestone</span>
                    <strong>
                      {DEMO_PROJECT.milestone} · {DEMO_PROJECT.milestoneDate}
                    </strong>
                  </li>
                  <li>
                    <span>Due</span>
                    <strong>{DEMO_PROJECT.due}</strong>
                  </li>
                  <li>
                    <span>Budget</span>
                    <strong>{DEMO_PROJECT.budget}</strong>
                  </li>
                </ul>
              </aside>
            </div>
            <p className="pbs-confirm">
              {percent}% · {completed}/{total} completed · progress follows task status
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SceneCopy({
  tab,
  progress,
  marks,
}: {
  tab: ProjectBuildTab;
  progress: number;
  marks: number[];
}) {
  const meta = PROJECT_BUILD_META[tab];
  return (
    <div className="pbs-copy">
      <p className="pbs-kicker">{meta.label}</p>
      <h3>{meta.title}</h3>
      <p>{meta.description}</p>
      <ul className="pbs-checks">
        {meta.checks.map((item, index) => (
          <li key={item} className={appear(progress, marks[index] ?? 1) > 0.6 ? "is-done" : ""}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
