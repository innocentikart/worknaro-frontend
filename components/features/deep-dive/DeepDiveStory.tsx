"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CalendarDays,
  FolderKanban,
  LayoutGrid,
  Shield,
  Users,
} from "lucide-react";
import { StoryNote, StoryTabs } from "@/components/features/story/StoryTabs";
import { useStoryCycle } from "@/components/features/story/useStoryCycle";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Icon } from "@/components/ui/Icon";
import { VisitorAvatar } from "@/components/ui/VisitorAvatar";
import {
  DIVE_BOARD,
  DIVE_CLIENT,
  DIVE_CLIENT_PROJECTS,
  DIVE_COLUMNS,
  DIVE_EVENTS,
  DIVE_HERO,
  DIVE_MATRIX,
  DIVE_MEMBERS,
  DIVE_META,
  DIVE_PEOPLE,
  DIVE_PROGRESS,
  DIVE_PROJECT,
  DIVE_TABS,
  DIVE_TASK_DONE,
  DIVE_TASK_TOTAL,
  DIVE_WEEK,
  columnLabel,
  heroBoardColumn,
} from "@/components/features/deep-dive/deepDiveData";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const ICONS = {
  project: FolderKanban,
  board: LayoutGrid,
  calendar: CalendarDays,
  clients: Users,
  access: Shield,
} as const;

export function DeepDiveStory() {
  const reduce = useReducedMotion();
  const { ref, tab, progress, selectTab, pause, resume } = useStoryCycle({
    tabs: DIVE_TABS,
    reducedMotion: !!reduce,
    sceneMs: 3800,
  });
  const heroCol = heroBoardColumn(tab, reduce ? 1 : progress);

  return (
    <section
      ref={ref}
      id="deep-dive"
      className="ddv-section mig-section features-chapter scroll-mt-24"
      aria-labelledby="deep-dive-heading"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="why-wrap ddv-wrap">
        <div className="mig-intro ddv-intro">
          <SectionBadge icon={LayoutGrid} className="mx-auto">
            Deep dive
          </SectionBadge>
          <h2 id="deep-dive-heading" className="mig-heading font-display">
            See how each module fits into the{" "}
            <HeadingAccent>application.</HeadingAccent>
          </h2>
          <p className="mig-lead">
            Watch how work moves through Worknaro — from a project you build, to the board,
            calendar, clients, and the people who can see it.
          </p>
        </div>

        <StoryTabs
          tabs={DIVE_TABS.map((id) => ({ id, label: DIVE_META[id].label }))}
          tab={tab}
          onSelect={selectTab}
          label="How modules connect around one project"
          prefix="ddv"
          icons={ICONS}
        />

        <div
          id="ddv-panel"
          role="tabpanel"
          aria-labelledby={`ddv-tab-${tab}`}
          aria-live="polite"
          className="pfs-viz ddv-viz"
          data-tab={tab}
        >
          <header className="ddv-bar">
            <span className="ddv-bar-brand">Worknaro</span>
            <span className="ddv-bar-project">
              {DIVE_PROJECT.code} · {DIVE_PROJECT.name}
            </span>
            <span className="ddv-bar-status">{DIVE_PROJECT.liveStatus}</span>
            <span className="ddv-bar-client">{DIVE_CLIENT.name}</span>
          </header>

          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={tab}
              className="ddv-scene"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.32, ease: EASE }}
            >
              {tab === "project" ? <ProjectScene /> : null}
              {tab === "board" ? <BoardScene heroCol={heroCol} /> : null}
              {tab === "calendar" ? <CalendarScene /> : null}
              {tab === "clients" ? <ClientsScene /> : null}
              {tab === "access" ? <AccessScene /> : null}
            </motion.div>
          </AnimatePresence>
        </div>
        <StoryNote>{DIVE_META[tab].note}</StoryNote>
      </div>
    </section>
  );
}

function ProjectScene() {
  return (
    <div className="ddv-split">
      <article className="ddv-pane is-focus">
        <header className="ddv-pane-head">
          <span className="ddv-pane-label">
            <Icon icon={FolderKanban} size={14} strokeWidth={2} />
            Project overview
          </span>
          <span className="ddv-chip">{DIVE_PROJECT.type}</span>
        </header>
        <p className="ddv-kicker">{DIVE_PROJECT.code}</p>
        <h3 className="ddv-title">{DIVE_PROJECT.name}</h3>
        <p className="ddv-copy">{DIVE_PROJECT.description}</p>
        <ul className="ddv-stats">
          <li>
            <b>{DIVE_PROGRESS}%</b>
            <span>From completed tasks</span>
          </li>
          <li>
            <b>
              {DIVE_PROJECT.start} – {DIVE_PROJECT.due}
            </b>
            <span>Date range</span>
          </li>
          <li>
            <b>{DIVE_PROJECT.budget}</b>
            <span>{DIVE_PROJECT.budgetHint}</span>
          </li>
        </ul>
        <div className="ddv-progress">
          <span>
            {DIVE_TASK_DONE} of {DIVE_TASK_TOTAL} tasks complete
          </span>
          <i aria-hidden="true">
            <b style={{ width: `${DIVE_PROGRESS}%` }} />
          </i>
        </div>
      </article>
      <aside className="ddv-pane">
        <header className="ddv-pane-head">
          <span className="ddv-pane-label">
            <Icon icon={Users} size={14} strokeWidth={2} />
            Project team
          </span>
          <span className="ddv-chip">{DIVE_MEMBERS.length} people</span>
        </header>
        <ul className="ddv-people">
          {DIVE_MEMBERS.map((person) => (
            <li key={person.email}>
              <span className="ddv-avatar has-image" aria-hidden="true">
                <VisitorAvatar src={person.avatar} />
              </span>
              <span>
                <strong>{person.name}</strong>
                <small>{person.role}</small>
              </span>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

function BoardScene({ heroCol }: { heroCol: ReturnType<typeof heroBoardColumn> }) {
  return (
    <div className="ddv-board" aria-label="Website Redesign workflow board">
      {DIVE_COLUMNS.map((column) => {
        const cards = DIVE_BOARD[column.key];
        const holdingHero = heroCol === column.key;
        return (
          <div key={column.key} className={holdingHero ? "is-focus" : ""}>
            <p>
              {column.label}
              <i>{cards.length + (holdingHero ? 1 : 0)}</i>
            </p>
            {holdingHero ? (
              <article className="ddv-card is-hero">
                <strong>{DIVE_HERO.name}</strong>
                <span>
                  {DIVE_HERO.who} · {columnLabel(heroCol)}
                </span>
              </article>
            ) : null}
            {cards.map((card) => (
              <article key={card.id} className="ddv-card">
                <strong>{card.name}</strong>
                <span>
                  {card.who} · {card.due}
                </span>
              </article>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function CalendarScene() {
  return (
    <div className="ddv-cal">
      <header className="ddv-pane-head">
        <span className="ddv-pane-label">
          <Icon icon={CalendarDays} size={14} strokeWidth={2} />
          {DIVE_PROJECT.name} · September
        </span>
        <span className="ddv-chip">From task dates</span>
      </header>
      <div className="ddv-week">
        {DIVE_WEEK.map((day) => {
          const events = DIVE_EVENTS.filter(
            (item) => day.num >= item.startDay && day.num <= item.endDay,
          );
          return (
            <div key={day.num} className={day.today ? "is-today" : ""}>
              <p>
                <span>{day.label}</span>
                <b>{day.num}</b>
              </p>
              <ul>
                {events.map((item) => (
                  <li key={item.id} className={`is-${item.tone} ${item.milestone ? "is-mile" : ""}`}>
                    {item.short}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ClientsScene() {
  return (
    <div className="ddv-split">
      <article className="ddv-pane">
        <header className="ddv-pane-head">
          <span className="ddv-pane-label">
            <Icon icon={Users} size={14} strokeWidth={2} />
            Client
          </span>
          <span className="ddv-chip">{DIVE_CLIENT.status}</span>
        </header>
        <div className="ddv-client">
          <span className="ddv-avatar is-lg has-image" aria-hidden="true">
            <VisitorAvatar src={DIVE_CLIENT.avatar} />
          </span>
          <div>
            <h3 className="ddv-title">{DIVE_CLIENT.name}</h3>
            <p className="ddv-copy">
              {DIVE_CLIENT.email} · Manager {DIVE_CLIENT.manager}
            </p>
          </div>
        </div>
        <p className="ddv-hint">Guest access for this client stays isolated from the internal catalog.</p>
      </article>
      <aside className="ddv-pane is-focus">
        <header className="ddv-pane-head">
          <span className="ddv-pane-label">
            <Icon icon={FolderKanban} size={14} strokeWidth={2} />
            Client projects
          </span>
        </header>
        <ul className="ddv-projects">
          {DIVE_CLIENT_PROJECTS.map((project) => (
            <li key={project.id} className={project.focus ? "is-open" : ""}>
              <span>
                <strong>{project.name}</strong>
                <small>
                  {project.code} · {project.dates}
                </small>
              </span>
              <em>{project.status}</em>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

function AccessScene() {
  return (
    <div className="ddv-split">
      <article className="ddv-pane is-focus">
        <header className="ddv-pane-head">
          <span className="ddv-pane-label">
            <Icon icon={Users} size={14} strokeWidth={2} />
            Workspace people
          </span>
          <span className="ddv-chip">{DIVE_PEOPLE.length}</span>
        </header>
        <ul className="ddv-people">
          {DIVE_PEOPLE.map((person) => (
            <li key={person.name} className={"guest" in person && person.guest ? "is-guest" : ""}>
              <span className="ddv-avatar has-image" aria-hidden="true">
                <VisitorAvatar src={person.avatar} />
              </span>
              <span>
                <strong>{person.name}</strong>
                <small>{person.role}</small>
              </span>
            </li>
          ))}
        </ul>
      </article>
      <aside className="ddv-pane">
        <header className="ddv-pane-head">
          <span className="ddv-pane-label">
            <Icon icon={Shield} size={14} strokeWidth={2} />
            What they can see
          </span>
        </header>
        <ul className="ddv-matrix">
          {DIVE_MATRIX.map((row) => (
            <li key={row.role}>
              <strong>{row.role}</strong>
              <span>{row.access}</span>
            </li>
          ))}
        </ul>
        <p className="ddv-hint">Owner is the workspace creator. Guests see only client-isolated work.</p>
      </aside>
    </div>
  );
}
