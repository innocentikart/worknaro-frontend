"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { CalendarDays, ChartNoAxesGantt, Link2, ListChecks } from "lucide-react";
import {
  BAR_RANGE,
  BAR_TICKS,
  CALENDAR_TIME_META,
  CALENDAR_TIME_TABS,
  TIME_LINKS,
  WEEK_DAYS,
  dayPct,
  geometryForTab,
  workForTab,
  type CalendarTimeTab,
  type TimeWorkItem,
} from "@/components/features/calendar-story/calendarStoryData";
import { useCalendarTimeStory } from "@/components/features/calendar-story/useCalendarTimeStory";
import { StoryTabs } from "@/components/features/story/StoryTabs";
import { VizChrome } from "@/components/features/story/VizChrome";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { VisitorAvatar } from "@/components/ui/VisitorAvatar";
import { visitorAvatarForKey } from "@/lib/visitor-avatars";

const ICONS = {
  tasks: ListChecks,
  bars: ChartNoAxesGantt,
  links: Link2,
  schedule: CalendarDays,
} as const;

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function CalendarTimeStory() {
  const reduce = useReducedMotion();
  const { ref, tab, selectTab, pause, resume } = useCalendarTimeStory({
    reducedMotion: !!reduce,
  });
  const motionOn = !reduce;
  const transition = { duration: motionOn ? 0.52 : 0, ease: EASE };

  return (
    <section
      ref={ref}
      id="calendar"
      className="cts-section mig-section scroll-mt-24"
      aria-labelledby="calendar-heading"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="why-wrap cts-wrap">
        <div className="mig-intro cts-intro">
          <SectionBadge icon={CalendarDays} className="mx-auto">
            See work in time.
          </SectionBadge>
          <h2 id="calendar-heading" className="mig-heading font-display">
            <span className="cts-heading-lead">The calendar shows project dates,</span>{" "}
            <HeadingAccent>open tasks, and milestones.</HeadingAccent>
          </h2>
          <p className="mig-lead">
            It is a read-only schedule — you open the related record instead of creating
            meetings on the grid.
          </p>
        </div>

        <div className="cts-stage">
          <ConnectorStrings tab={tab} />

          {CALENDAR_TIME_TABS.map((id) => {
            const Icon = ICONS[id];
            return (
              <button
                key={id}
                type="button"
                className={`cts-float cts-float-${id} ${tab === id ? "is-active" : ""}`}
                onClick={() => selectTab(id)}
              >
                <span className="cts-float-icon" aria-hidden="true">
                  <Icon size={13} strokeWidth={2.2} />
                </span>
                <span className="cts-float-copy">
                  <strong>{CALENDAR_TIME_META[id].title}</strong>
                  <em>{CALENDAR_TIME_META[id].description}</em>
                </span>
              </button>
            );
          })}

          <StoryTabs
            tabs={CALENDAR_TIME_TABS.map((id) => ({ id, label: CALENDAR_TIME_META[id].label }))}
            tab={tab}
            onSelect={selectTab}
            label="How work appears in time"
            prefix="cts"
            icons={ICONS}
            className="cts-tabs"
          />

          <div
            id="cts-panel"
            role="tabpanel"
            aria-labelledby={`cts-tab-${tab}`}
            aria-live="polite"
            className={`pfs-viz cts-viz is-${tab}`}
          >
            <VizChrome
              title={`Worknaro · ${CALENDAR_TIME_META[tab].chrome}`}
              badge="Read-only"
            />
            <LayoutGroup id="cts-story">
              <TimeCanvas tab={tab} motionOn={motionOn} transition={transition} />
            </LayoutGroup>
          </div>

          <div className="cts-pocket" aria-hidden="false">
            <span className="cts-float-icon" aria-hidden="true">
              {(() => {
                const Icon = ICONS[tab];
                return <Icon size={13} strokeWidth={2.2} />;
              })()}
            </span>
            <strong>{CALENDAR_TIME_META[tab].title}</strong>
            <p>{CALENDAR_TIME_META[tab].description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function pointOn(
  stage: DOMRect,
  node: Element | null,
  edge: "left" | "right",
) {
  if (!node) return null;
  const box = node.getBoundingClientRect();
  return {
    x: ((edge === "right" ? box.right : box.left) - stage.left) / stage.width * 100,
    y: (box.top + box.height / 2 - stage.top) / stage.height * 100,
  };
}

function curve(
  from: { x: number; y: number } | null,
  to: { x: number; y: number } | null,
) {
  if (!from || !to) return "";
  const mid = (from.x + to.x) / 2;
  return `M ${from.x.toFixed(2)} ${from.y.toFixed(2)} C ${mid.toFixed(2)} ${from.y.toFixed(2)}, ${mid.toFixed(2)} ${to.y.toFixed(2)}, ${to.x.toFixed(2)} ${to.y.toFixed(2)}`;
}

function ConnectorStrings({ tab }: { tab: CalendarTimeTab }) {
  const ref = useRef<SVGSVGElement>(null);
  const [paths, setPaths] = useState<Record<CalendarTimeTab, string>>({
    tasks: "",
    bars: "",
    links: "",
    schedule: "",
  });

  useLayoutEffect(() => {
    const svg = ref.current;
    const stage = svg?.parentElement;
    if (!svg || !stage) return;

    const draw = () => {
      const box = stage.getBoundingClientRect();
      if (box.width < 10 || box.height < 10) return;
      setPaths({
        tasks: curve(
          pointOn(box, stage.querySelector(".cts-float-tasks"), "right"),
          pointOn(box, stage.querySelector(".cts-tabs"), "left"),
        ),
        links: curve(
          pointOn(box, stage.querySelector(".cts-float-links"), "left"),
          pointOn(box, stage.querySelector(".cts-tabs"), "right"),
        ),
        bars: curve(
          pointOn(box, stage.querySelector(".cts-float-bars"), "right"),
          pointOn(box, stage.querySelector(".cts-viz"), "left"),
        ),
        schedule: curve(
          pointOn(box, stage.querySelector(".cts-float-schedule"), "left"),
          pointOn(box, stage.querySelector(".cts-viz"), "right"),
        ),
      });
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(stage);
    const viz = stage.querySelector(".cts-viz");
    const tabs = stage.querySelector(".cts-tabs");
    if (viz) observer.observe(viz);
    if (tabs) observer.observe(tabs);
    window.addEventListener("resize", draw);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", draw);
    };
  }, [tab]);

  return (
    <svg ref={ref} className="cts-strings" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {CALENDAR_TIME_TABS.map((id) =>
        paths[id] ? (
          <path key={id} className={tab === id ? "is-active" : ""} d={paths[id]} />
        ) : null,
      )}
    </svg>
  );
}

function linkElbow(x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  if (Math.abs(dx) < 4) {
    return `M ${x1.toFixed(1)} ${y1.toFixed(1)} V ${y2.toFixed(1)}`;
  }
  const r = Math.min(7, Math.abs(dy) / 2.2, Math.abs(dx) / 2.2);
  const yBend = y2 - Math.sign(dy || 1) * r;
  const xBend = x1 + Math.sign(dx || 1) * r;
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} V ${yBend.toFixed(1)} Q ${x1.toFixed(1)} ${y2.toFixed(1)} ${xBend.toFixed(1)} ${y2.toFixed(1)} H ${x2.toFixed(1)}`;
}

function BarLinkOverlay({
  active,
  motionOn,
}: {
  active: boolean;
  motionOn: boolean;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [paths, setPaths] = useState<{ key: string; d: string; x2: number; y2: number }[]>([]);

  useLayoutEffect(() => {
    const svg = ref.current;
    const rows = svg?.parentElement;
    if (!svg || !rows) return;

    const draw = () => {
      const box = rows.getBoundingClientRect();
      if (box.width < 8 || box.height < 8) return;
      setSize({ w: box.width, h: box.height });
      setPaths(
        TIME_LINKS.map((link) => {
          const from = rows.querySelector<HTMLElement>(`[data-cts-id="${link.from}"]`);
          const to = rows.querySelector<HTMLElement>(`[data-cts-id="${link.to}"]`);
          if (!from || !to) return { key: `${link.from}-${link.to}`, d: "", x2: 0, y2: 0 };
          const a = from.getBoundingClientRect();
          const b = to.getBoundingClientRect();
          if (a.width < 1 || b.width < 1) return { key: `${link.from}-${link.to}`, d: "", x2: 0, y2: 0 };
          const x1 = a.right - box.left;
          const y1 = a.top + a.height / 2 - box.top;
          const x2 = b.left - box.left;
          const y2 = b.top + b.height / 2 - box.top;
          return {
            key: `${link.from}-${link.to}`,
            d: linkElbow(x1, y1, x2, y2),
            x2,
            y2,
          };
        }),
      );
    };

    const frame = requestAnimationFrame(() => requestAnimationFrame(draw));
    const later = window.setTimeout(draw, 560);
    const observer = new ResizeObserver(draw);
    observer.observe(rows);
    rows.querySelectorAll("[data-cts-id]").forEach((node) => observer.observe(node));
    window.addEventListener("resize", draw);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(later);
      observer.disconnect();
      window.removeEventListener("resize", draw);
    };
  }, [active]);

  return (
    <svg
      ref={ref}
      className="cts-links"
      viewBox={`0 0 ${Math.max(size.w, 1)} ${Math.max(size.h, 1)}`}
      aria-hidden="true"
    >
      {paths.map((path, index) =>
        path.d ? (
          <g key={path.key}>
            <motion.path
              d={path.d}
              initial={false}
              animate={{
                pathLength: active ? 1 : 0,
                opacity: active ? 1 : 0,
              }}
              transition={{
                duration: motionOn ? 0.5 : 0,
                ease: EASE,
                delay: active && motionOn ? 0.08 + index * 0.08 : 0,
              }}
            />
            <motion.circle
              cx={path.x2}
              cy={path.y2}
              r={2.4}
              initial={false}
              animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.6 }}
              transition={{
                duration: motionOn ? 0.28 : 0,
                delay: active && motionOn ? 0.28 + index * 0.08 : 0,
              }}
            />
          </g>
        ) : null,
      )}
    </svg>
  );
}

function TimeCanvas({
  tab,
  motionOn,
  transition,
}: {
  tab: CalendarTimeTab;
  motionOn: boolean;
  transition: { duration: number; ease: [number, number, number, number] };
}) {
  const showLinks = tab === "links";
  const showSchedule = tab === "schedule";

  return (
    <div className={`cts-canvas is-${tab}`}>
      <div className="cts-toolbar">
        <p className="cts-kicker">Website Redesign</p>
        <strong>September 2026</strong>
        <em>{showSchedule ? "Week" : tab === "tasks" ? "Open work" : "Project dates"}</em>
      </div>

      <div className="cts-head" aria-hidden={tab === "tasks"}>
        <div className="cts-ruler">
          {BAR_TICKS.map((tick) => (
            <span
              key={tick.label}
              className={tick.mile ? "is-mile" : ""}
              style={{ left: `${dayPct(tick.day, BAR_RANGE)}%` }}
            >
              {tick.label}
            </span>
          ))}
        </div>
        <div className="cts-weekhead">
          {WEEK_DAYS.map((day) => (
            <span key={day.num} className={day.today ? "is-today" : ""}>
              {day.label}
              <b>{day.num}</b>
            </span>
          ))}
        </div>
      </div>

      <div className="cts-plot">
        <div className="cts-grid" aria-hidden="true">
          {WEEK_DAYS.map((day) => (
            <span key={day.num} className={day.today ? "is-today" : ""} />
          ))}
        </div>

        <div className="cts-rows">
          {workForTab(tab).map((item, index) => (
            <WorkItem
              key={item.id}
              item={item}
              tab={tab}
              index={index}
              motionOn={motionOn}
              transition={transition}
            />
          ))}
          <BarLinkOverlay active={showLinks} motionOn={motionOn} />
        </div>
      </div>

      <p className="cts-note">{CALENDAR_TIME_META[tab].note}</p>
    </div>
  );
}

function WorkItem({
  item,
  tab,
  index,
  motionOn,
  transition,
}: {
  item: TimeWorkItem;
  tab: CalendarTimeTab;
  index: number;
  motionOn: boolean;
  transition: { duration: number; ease: [number, number, number, number] };
}) {
  const geo = geometryForTab(item, tab);
  const selected = tab === "schedule" && item.milestone;

  return (
    <motion.article
      layout={motionOn}
      initial={false}
      transition={transition}
      className={`cts-row ${item.milestone ? "is-mile" : ""} ${selected ? "is-open" : ""}`}
    >
      <motion.div layout={motionOn} className="cts-track" transition={transition}>
        <motion.span
          data-cts-id={item.id}
          layout={false}
          className={`cts-mark cts-tone-${item.tone} ${item.milestone ? "is-mile" : ""}`}
          initial={false}
          animate={{
            left: tab === "tasks" ? "0%" : `${geo.left}%`,
            width: tab === "tasks" ? "100%" : `${geo.width}%`,
            opacity: geo.visible || tab === "tasks" ? 1 : 0,
          }}
          transition={{
            ...transition,
            delay: motionOn && tab !== "tasks" ? index * 0.04 : 0,
          }}
        >
          {item.milestone ? <i className="cts-diamond" aria-hidden="true" /> : null}
          <span className="cts-onbar">{item.short}</span>
        </motion.span>
        {selected ? <span className="cts-open">Open record</span> : null}
      </motion.div>

      <motion.div layout={motionOn ? "position" : false} className="cts-label" transition={transition}>
        <span className="pfs-avatar has-image" aria-hidden="true">
          <VisitorAvatar src={visitorAvatarForKey(item.who)} />
        </span>
        <span className="cts-copy">
          <motion.strong layout={motionOn ? "position" : false} transition={transition}>
            {item.name}
          </motion.strong>
          <em>
            {item.milestone ? "Milestone · 24 Sep" : `${item.startDay}–${item.endDay} Sep · ${item.status}`}
          </em>
        </span>
        <b>{item.status}</b>
      </motion.div>
    </motion.article>
  );
}
