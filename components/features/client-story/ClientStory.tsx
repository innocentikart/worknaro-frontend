"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CalendarDays,
  CheckCircle2,
  FileText,
  FolderKanban,
  ListTodo,
  MoreHorizontal,
  Paperclip,
  Pencil,
  Settings,
  Share2,
  User,
  Users,
} from "lucide-react";
import {
  CLIENT_ACTIVITY,
  CLIENT_META,
  CLIENT_NAV,
  CLIENT_PAGE_TABS,
  CLIENT_PROFILE,
  CLIENT_PROJECTS,
  CLIENT_PROPOSALS,
  CLIENT_STATS,
  CLIENT_TABS,
  CLIENT_TASKS,
  pageTabFor,
  type ClientTab,
} from "@/components/features/client-story/clientStoryData";
import { useClientStory } from "@/components/features/client-story/useClientStory";
import { StoryTabs } from "@/components/features/story/StoryTabs";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { SectionBadge } from "@/components/ui/SectionBadge";

const ICONS = {
  client: User,
  projects: FolderKanban,
  work: ListTodo,
  connected: Share2,
} as const;

const NAV_ICONS = {
  clients: Users,
  projects: FolderKanban,
  tasks: ListTodo,
  proposals: FileText,
  files: Paperclip,
  settings: Settings,
} as const;

const STAT_ICONS = {
  projects: FolderKanban,
  tasks: CheckCircle2,
  proposals: FileText,
  contact: CalendarDays,
} as const;

const EASE = [0.22, 1, 0.36, 1] as const;

export function ClientStory() {
  const reduce = useReducedMotion();
  const { ref, tab, progress, selectTab, pause, resume } = useClientStory({
    reducedMotion: !!reduce,
  });
  const scene = reduce ? 1 : progress;

  return (
    <section
      ref={ref}
      id="clients"
      className="cls-section mig-section scroll-mt-24"
      aria-labelledby="clients-heading"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="cls-ambient" aria-hidden="true" />
      <div className="why-wrap cls-wrap">
        <div className="mig-intro cls-intro">
          <SectionBadge icon={User} className="mx-auto">
            CLIENT
          </SectionBadge>
          <h2 id="clients-heading" className="mig-heading font-display">
            A client stays connected to <HeadingAccent>the work.</HeadingAccent>
          </h2>
          <p className="mig-lead">
            Client records link to projects, tasks, and proposals. The detail page is the place
            those relationships come together.
          </p>
        </div>

        <StoryTabs
          tabs={CLIENT_TABS.map((id) => ({ id, label: CLIENT_META[id].label }))}
          tab={tab}
          onSelect={selectTab}
          label="How a client stays connected"
          prefix="cls"
          icons={ICONS}
          className="cls-tabs"
        />

        <div className="cls-stage">
          <ConnectorStrings tab={tab} />

          {CLIENT_TABS.map((id) => {
            const Icon = ICONS[id];
            return (
              <button
                key={id}
                type="button"
                className={`cls-float cls-float-${id} ${tab === id ? "is-active" : ""}`}
                onClick={() => selectTab(id)}
              >
                <span className="cls-float-icon" aria-hidden="true">
                  <Icon size={13} strokeWidth={2.2} />
                </span>
                <strong>{CLIENT_META[id].title}</strong>
                <p>{CLIENT_META[id].description}</p>
              </button>
            );
          })}

          <div
            id="cls-panel"
            role="tabpanel"
            aria-labelledby={`cls-tab-${tab}`}
            aria-live="polite"
            className={`pfs-viz cls-viz is-${tab}`}
          >
            <ClientChrome />
            <ClientBoard tab={tab} progress={scene} reducedMotion={!!reduce} />
          </div>

          <div className="cls-pocket">
            <strong>{CLIENT_META[tab].title}</strong>
            <p>{CLIENT_META[tab].description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClientChrome() {
  return (
    <div className="pfs-viz-chrome cls-chrome">
      <span className="pfs-viz-dots" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="pfs-viz-title">Worknaro</span>
    </div>
  );
}

function ClientBoard({
  tab,
  progress,
  reducedMotion,
}: {
  tab: ClientTab;
  progress: number;
  reducedMotion: boolean;
}) {
  const motionOn = !reducedMotion;
  const pageTab = pageTabFor(tab);
  const showStats = tab === "client" || tab === "connected";
  const showProjects = tab === "projects" || tab === "connected";
  const showWork = tab === "work" || tab === "connected";
  const showContact = tab === "client";

  return (
    <div className="cls-board">
      <aside className="cls-side" aria-label="Workspace">
        {CLIENT_NAV.map((item) => {
          const Icon = NAV_ICONS[item.id];
          return (
            <span key={item.id} className={item.active ? "is-active" : ""}>
              <Icon size={14} strokeWidth={2.1} aria-hidden="true" />
              {item.label}
            </span>
          );
        })}
      </aside>

      <div className="cls-main">
        <header className="cls-profile">
          <span className="cls-avatar" aria-hidden="true">
            {CLIENT_PROFILE.initials}
          </span>
          <div className="cls-profile-copy">
            <strong>
              {CLIENT_PROFILE.name}
              <em>{CLIENT_PROFILE.status}</em>
            </strong>
            <p>
              {CLIENT_PROFILE.email}
              <span aria-hidden="true"> · </span>
              {CLIENT_PROFILE.phone}
            </p>
          </div>
          <div className="cls-actions">
            <span>
              <Pencil size={12} strokeWidth={2.2} aria-hidden="true" />
              Edit
            </span>
            <span>Manage</span>
            <b aria-hidden="true">
              <MoreHorizontal size={14} strokeWidth={2.2} />
            </b>
          </div>
        </header>

        <div className="cls-page-tabs" aria-hidden="true">
          {CLIENT_PAGE_TABS.map((label) => (
            <span key={label} className={label === pageTab ? "is-active" : ""}>
              {label}
            </span>
          ))}
        </div>

        <AnimatePresence mode="popLayout" initial={false}>
          {showStats ? (
            <motion.div
              key="stats"
              className="cls-stats"
              initial={motionOn ? { opacity: 0, y: 8 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={motionOn ? { opacity: 0, y: -6 } : undefined}
              transition={{ duration: motionOn ? 0.36 : 0, ease: EASE }}
            >
              {CLIENT_STATS.map((stat, index) => {
                const Icon = STAT_ICONS[stat.id];
                return (
                  <motion.article
                    key={stat.id}
                    initial={false}
                    animate={{ opacity: Math.min(1, Math.max(0.35, progress + 0.25 - index * 0.08)) }}
                  >
                    <Icon size={15} strokeWidth={2.1} aria-hidden="true" />
                    <strong>{stat.value}</strong>
                    <p>{stat.label}</p>
                  </motion.article>
                );
              })}
            </motion.div>
          ) : null}

          {showContact ? (
            <motion.div
              key="contact"
              className="cls-contact"
              initial={motionOn ? { opacity: 0, y: 10 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={motionOn ? { opacity: 0 } : undefined}
              transition={{ duration: motionOn ? 0.38 : 0, ease: EASE }}
            >
              <article>
                <p>Account</p>
                <strong>{CLIENT_PROFILE.status} client</strong>
                <em>Assigned manager · Sarah</em>
              </article>
              <article>
                <p>Contact</p>
                <strong>{CLIENT_PROFILE.email}</strong>
                <em>{CLIENT_PROFILE.phone}</em>
              </article>
              <article>
                <p>Last contact</p>
                <strong>{CLIENT_PROFILE.lastContact}</strong>
                <em>From the client record</em>
              </article>
            </motion.div>
          ) : null}

          <div className={`cls-body is-${tab}`}>
            {showProjects ? (
              <motion.section
                key="projects"
                className="cls-panel cls-projects"
                initial={motionOn ? { opacity: 0, y: 10 } : false}
                animate={{ opacity: 1, y: 0 }}
                exit={motionOn ? { opacity: 0 } : undefined}
                transition={{ duration: motionOn ? 0.4 : 0, ease: EASE }}
              >
                <header>
                  <h3>Active Projects</h3>
                  <span>View all</span>
                </header>
                <ul>
                  {CLIENT_PROJECTS.map((project, index) => (
                    <motion.li
                      key={project.id}
                      initial={false}
                      animate={{
                        opacity: tab === "projects" ? Math.min(1, Math.max(0.2, (progress - index * 0.12) / 0.4)) : 1,
                        x: 0,
                      }}
                    >
                      <i className={`cls-dot cls-tone-${project.tone}`} aria-hidden="true" />
                      <span>
                        <strong>{project.name}</strong>
                        <em>{project.dates}</em>
                      </span>
                      <b className={`cls-badge cls-tone-${project.tone}`}>{project.status}</b>
                      <div className="cls-progress" aria-hidden="true">
                        <span style={{ width: `${project.progress}%` }} className={`cls-tone-${project.tone}`} />
                      </div>
                      <small>{project.progress}%</small>
                    </motion.li>
                  ))}
                </ul>
              </motion.section>
            ) : null}

            {showWork ? (
              <div className="cls-work">
                {tab === "work" ? (
                  <motion.section
                    className="cls-panel"
                    initial={motionOn ? { opacity: 0, y: 10 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: motionOn ? 0.36 : 0, ease: EASE }}
                  >
                    <header>
                      <h3>Related work</h3>
                    </header>
                    <ul className="cls-work-list">
                      {CLIENT_TASKS.map((task, index) => (
                        <motion.li
                          key={task.id}
                          initial={false}
                          animate={{ opacity: Math.min(1, Math.max(0.2, (progress - index * 0.1) / 0.35)) }}
                        >
                          <i className={`cls-dot cls-tone-${task.tone}`} aria-hidden="true" />
                          <span>
                            <strong>{task.name}</strong>
                            <em>{task.project}</em>
                          </span>
                          <b className={`cls-badge cls-tone-${task.tone}`}>{task.status}</b>
                        </motion.li>
                      ))}
                      {CLIENT_PROPOSALS.map((proposal) => (
                        <li key={proposal.id}>
                          <i className="cls-dot cls-tone-indigo" aria-hidden="true" />
                          <span>
                            <strong>{proposal.name}</strong>
                            <em>Proposal · {proposal.date}</em>
                          </span>
                          <b className="cls-badge cls-tone-indigo">{proposal.status}</b>
                        </li>
                      ))}
                    </ul>
                  </motion.section>
                ) : null}

                <motion.section
                  className="cls-panel cls-activity"
                  initial={motionOn ? { opacity: 0, y: 10 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: motionOn ? 0.4 : 0, ease: EASE, delay: motionOn && tab === "work" ? 0.08 : 0 }}
                >
                  <header>
                    <h3>Recent Activity</h3>
                  </header>
                  <ul>
                    {CLIENT_ACTIVITY.map((item, index) => (
                      <motion.li
                        key={item.id}
                        initial={false}
                        animate={{
                          opacity: tab === "work" ? Math.min(1, Math.max(0.25, (progress - 0.2 - index * 0.12) / 0.4)) : 1,
                        }}
                      >
                        <span>
                          <strong>{item.title}</strong>
                          <em>{item.detail}</em>
                        </span>
                        <small>{item.time}</small>
                      </motion.li>
                    ))}
                  </ul>
                </motion.section>
              </div>
            ) : null}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function curveTo(x1: number, y1: number, x2: number, y2: number) {
  const dx = (x2 - x1) * 0.55;
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} C ${(x1 + dx).toFixed(1)} ${y1.toFixed(1)}, ${(x2 - dx).toFixed(1)} ${y2.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

function ConnectorStrings({ tab }: { tab: ClientTab }) {
  const ref = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ w: 1, h: 1 });
  const [paths, setPaths] = useState<Record<ClientTab, string>>({
    client: "",
    projects: "",
    work: "",
    connected: "",
  });

  useLayoutEffect(() => {
    const svg = ref.current;
    const stage = svg?.parentElement;
    if (!svg || !stage) return;

    const draw = () => {
      const box = stage.getBoundingClientRect();
      if (box.width < 10 || box.height < 10) return;
      const viz = stage.querySelector<HTMLElement>(".cls-viz");
      if (!viz) return;
      setSize({ w: box.width, h: box.height });
      const v = viz.getBoundingClientRect();
      const point = (id: ClientTab, side: "left" | "right") => {
        const node = stage.querySelector<HTMLElement>(`.cls-float-${id}`);
        if (!node) return "";
        const n = node.getBoundingClientRect();
        const y = n.top + 22 - box.top;
        if (side === "left") {
          return curveTo(n.right - box.left, y, v.left - box.left, y + 8);
        }
        return curveTo(n.left - box.left, y, v.right - box.left, y + 8);
      };
      setPaths({
        client: point("client", "left"),
        projects: point("projects", "left"),
        work: point("work", "right"),
        connected: point("connected", "right"),
      });
    };

    const frame = requestAnimationFrame(draw);
    const observer = new ResizeObserver(draw);
    observer.observe(stage);
    const viz = stage.querySelector(".cls-viz");
    if (viz) observer.observe(viz);
    window.addEventListener("resize", draw);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", draw);
    };
  }, [tab]);

  return (
    <svg
      ref={ref}
      className="cls-strings"
      viewBox={`0 0 ${size.w} ${size.h}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {CLIENT_TABS.map((id) =>
        paths[id] ? <path key={id} className={tab === id ? "is-active" : ""} d={paths[id]} /> : null,
      )}
    </svg>
  );
}
