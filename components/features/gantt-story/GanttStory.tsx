"use client";

import { type KeyboardEvent, useLayoutEffect, useRef, useState } from "react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import {
  CalendarDays,
  ChartNoAxesGantt,
  Check,
  ChevronDown,
  Link2,
  ListChecks,
  MousePointer2,
} from "lucide-react";
import {
  GANTT_DAYS,
  GANTT_LINKS,
  GANTT_META,
  GANTT_STATUS,
  GANTT_TABS,
  GANTT_WORK,
  barSpan,
  dayPct,
  type GanttTab,
  type GanttWorkItem,
} from "@/components/features/gantt-story/ganttStoryData";
import { useGanttStory } from "@/components/features/gantt-story/useGanttStory";
import { HeadingAccent } from "@/components/ui/HeadingAccent";

const ICONS = {
  tasks: ListChecks,
  bars: ChartNoAxesGantt,
  links: Link2,
  schedule: CalendarDays,
} as const;

const EASE = [0.22, 1, 0.36, 1] as const;
const COL_PCT = 100 / GANTT_DAYS.length;

export function GanttStory() {
  const reduce = useReducedMotion();
  const { ref, tab, progress, selectTab, pause, resume } = useGanttStory({
    reducedMotion: !!reduce,
  });
  const scene = reduce ? 1 : progress;

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = GANTT_TABS.indexOf(tab);
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      selectTab(GANTT_TABS[(index + 1) % GANTT_TABS.length]);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      selectTab(GANTT_TABS[(index - 1 + GANTT_TABS.length) % GANTT_TABS.length]);
    }
    if (event.key === "Home") {
      event.preventDefault();
      selectTab("tasks");
    }
    if (event.key === "End") {
      event.preventDefault();
      selectTab("schedule");
    }
  };

  const leftMeta = tab === "bars" ? GANTT_META.bars : GANTT_META.tasks;
  const leftActive = tab === "tasks" || tab === "bars" || tab === "schedule";
  const rightActive = tab === "links" || tab === "schedule";

  return (
    <section
      ref={ref}
      id="gantt"
      className="gnt-section mig-section scroll-mt-24"
      aria-labelledby="gantt-heading"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="gnt-ambient" aria-hidden="true" />
      <div className="why-wrap gnt-wrap">
        <div className="mig-intro gnt-intro">
          <p className="audience-eyebrow mx-auto">GANTT</p>
          <h2 id="gantt-heading" className="mig-heading font-display">
            Tasks become <HeadingAccent>a schedule.</HeadingAccent>
          </h2>
          <p className="mig-lead">
            Bars come from task start and due dates. Dependency lines display when they exist. You
            can reschedule a bar; you do not create dependencies on the chart.
          </p>
        </div>

        <LayoutGroup id="gnt-tabs">
          <div
            className="gnt-tabs"
            role="tablist"
            aria-label="How a Gantt is built"
            onKeyDown={onKeyDown}
          >
            {GANTT_TABS.map((id) => {
              const Icon = ICONS[id];
              const selected = tab === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  id={`gnt-tab-${id}`}
                  aria-selected={selected}
                  aria-controls="gnt-panel"
                  tabIndex={selected ? 0 : -1}
                  className={selected ? "is-active" : ""}
                  onClick={() => selectTab(id)}
                >
                  {selected ? (
                    <motion.span
                      layoutId="gnt-tab-pill"
                      className="gnt-tab-pill"
                      transition={{ duration: reduce ? 0 : 0.32, ease: EASE }}
                    />
                  ) : null}
                  <Icon size={14} strokeWidth={2.1} aria-hidden="true" />
                  {GANTT_META[id].label}
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        <div className="gnt-stage">
          <aside className={`gnt-float gnt-float-left ${leftActive ? "is-active" : ""}`}>
            <span className="gnt-float-icon" aria-hidden="true">
              {tab === "bars" ? (
                <ChartNoAxesGantt size={13} strokeWidth={2.2} />
              ) : (
                <ListChecks size={13} strokeWidth={2.2} />
              )}
            </span>
            <strong>{leftMeta.title}</strong>
            <p>{leftMeta.description}</p>
          </aside>
          <aside className={`gnt-float gnt-float-right ${rightActive ? "is-active" : ""}`}>
            <span className="gnt-float-icon" aria-hidden="true">
              <Link2 size={13} strokeWidth={2.2} />
            </span>
            <strong>{GANTT_META.links.title}</strong>
            <p>{GANTT_META.links.description}</p>
          </aside>
          <CalloutStrings tab={tab} />

          <div
            id="gnt-panel"
            role="tabpanel"
            aria-labelledby={`gnt-tab-${tab}`}
            aria-live="polite"
            className={`pfs-viz gnt-viz is-${tab}`}
          >
            <GanttChrome />
            <GanttBoard tab={tab} progress={scene} reducedMotion={!!reduce} />
          </div>

          <div className="gnt-pocket">
            <strong>{GANTT_META[tab].title}</strong>
            <p>{GANTT_META[tab].description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function GanttChrome() {
  return (
    <div className="pfs-viz-chrome gnt-chrome">
      <span className="pfs-viz-dots" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="pfs-viz-title">Worknaro · Gantt</span>
      <span className="gnt-range">
        <CalendarDays size={13} strokeWidth={2.1} aria-hidden="true" />
        Sep 8 — Sep 29
      </span>
    </div>
  );
}

function GanttBoard({
  tab,
  progress,
  reducedMotion,
}: {
  tab: GanttTab;
  progress: number;
  reducedMotion: boolean;
}) {
  const showBars = tab !== "tasks";
  const showLinks = tab === "links" || tab === "schedule";
  const showToday = tab === "schedule";
  const showWeekends = tab !== "tasks";
  const moving = tab === "bars" && progress > 0.45;
  const motionMs = reducedMotion ? 0 : 0.48;

  return (
    <div className={`gnt-board is-${tab}`}>
      <div className="gnt-head">
        <p className="gnt-project">
          <span className="gnt-project-dot" aria-hidden="true" />
          Project Launch
          <ChevronDown size={13} strokeWidth={2.2} aria-hidden="true" />
        </p>
        <div className="gnt-ruler" aria-hidden="true">
          {GANTT_DAYS.map((day) => (
            <span
              key={day.day}
              className={`${day.today && showToday ? "is-today" : ""} ${day.weekend ? "is-weekend" : ""}`}
            >
              <em>{day.label[0]}</em>
              {day.day}
            </span>
          ))}
        </div>
      </div>

      <div className="gnt-grid">
        {showWeekends
          ? GANTT_DAYS.filter((day) => day.weekend).map((day) => (
              <span
                key={`we-${day.day}`}
                className="gnt-weekend"
                style={{
                  left: `calc(var(--gnt-side) + (100% - var(--gnt-side)) * ${(day.day - 8) / GANTT_DAYS.length})`,
                  width: `calc((100% - var(--gnt-side)) * ${COL_PCT / 100})`,
                }}
              />
            ))
          : null}
        {showToday ? (
          <span
            className="gnt-today"
            style={{
              left: `calc(var(--gnt-side) + (100% - var(--gnt-side)) * ${dayPct(24) / 100})`,
            }}
          />
        ) : null}

        {GANTT_WORK.map((item, index) => (
          <GanttRow
            key={item.id}
            item={item}
            index={index}
            tab={tab}
            showBars={showBars}
            moving={moving && item.id === "develop"}
            motionMs={motionMs}
            progress={progress}
          />
        ))}

        <GanttLinks active={showLinks} tab={tab} progress={progress} reducedMotion={reducedMotion} />
      </div>
    </div>
  );
}

function GanttRow({
  item,
  index,
  tab,
  showBars,
  moving,
  motionMs,
  progress,
}: {
  item: GanttWorkItem;
  index: number;
  tab: GanttTab;
  showBars: boolean;
  moving: boolean;
  motionMs: number;
  progress: number;
}) {
  const span = barSpan(item);
  const reveal =
    tab === "tasks"
      ? 0.72 + 0.28 * Math.min(1, Math.max(0, (progress - index * 0.1) / 0.35))
      : tab === "bars"
        ? Math.min(1, Math.max(0.18, (progress - index * 0.08) / 0.42))
        : 1;
  const shift = moving ? 3.2 : 0;
  const donePct = item.done ? 100 : tab === "bars" ? 36 : 0;

  return (
    <div className={`gnt-row ${item.milestone ? "is-mile" : ""} ${item.done ? "is-done" : ""}`}>
      <div className="gnt-task">
        <span className="gnt-check" aria-hidden="true">
          {item.done ? <Check size={11} strokeWidth={2.6} /> : null}
        </span>
        <span className="gnt-task-copy">
          <strong>{item.name}</strong>
          <em>
            Sep {item.startDay} – Sep {item.endDay}
            {tab === "tasks" ? <b>{GANTT_STATUS[item.status]}</b> : null}
          </em>
        </span>
      </div>

      <div className="gnt-track">
        {showBars ? (
          <motion.span
            data-gnt-id={item.id}
            className={`gnt-bar gnt-tone-${item.tone} ${moving ? "is-moving" : ""}`}
            style={{ ["--gnt-done" as string]: `${donePct}%` }}
            initial={false}
            animate={{
              left: `${span.left + shift}%`,
              width: `${Math.max(span.width * reveal, 5)}%`,
              opacity: reveal,
            }}
            transition={{ duration: motionMs, ease: EASE }}
          >
            {item.name}
            {moving ? <b className="gnt-handle" aria-hidden="true" /> : null}
          </motion.span>
        ) : (
          <motion.span
            className="gnt-ghost"
            initial={false}
            animate={{ opacity: reveal }}
            transition={{ duration: motionMs, ease: EASE }}
            style={{ left: `${span.left}%`, width: `${span.width}%` }}
          >
            {item.name}
          </motion.span>
        )}

        {moving ? (
          <em
            className="gnt-reschedule"
            style={{ left: `${span.left + span.width * 0.72 + shift}%` }}
          >
            <MousePointer2 size={11} strokeWidth={2.2} />
            Reschedule
          </em>
        ) : null}

        {item.milestone && tab === "schedule" ? (
          <span className="gnt-mile" style={{ left: `${dayPct(item.endDay + 1)}%` }} aria-hidden="true" />
        ) : null}
      </div>
    </div>
  );
}

function linkElbow(x1: number, y1: number, x2: number, y2: number) {
  const stub = 7;
  if (Math.abs(x2 - x1) <= 4) {
    const xOut = x1 + stub;
    return `M ${x1.toFixed(1)} ${y1.toFixed(1)} H ${xOut.toFixed(1)} V ${y2.toFixed(1)} H ${x2.toFixed(1)}`;
  }
  if (x2 >= x1) {
    const xBend = x1 + stub;
    return `M ${x1.toFixed(1)} ${y1.toFixed(1)} H ${xBend.toFixed(1)} V ${y2.toFixed(1)} H ${x2.toFixed(1)}`;
  }
  const midY = (y1 + y2) / 2;
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} V ${midY.toFixed(1)} H ${x2.toFixed(1)} V ${y2.toFixed(1)}`;
}

function curveTo(x1: number, y1: number, x2: number, y2: number) {
  const dx = (x2 - x1) * 0.55;
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} C ${(x1 + dx).toFixed(1)} ${y1.toFixed(1)}, ${(x2 - dx).toFixed(1)} ${y2.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

function CalloutStrings({ tab }: { tab: GanttTab }) {
  const ref = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ w: 1, h: 1 });
  const [paths, setPaths] = useState({ left: "", right: "" });

  useLayoutEffect(() => {
    const svg = ref.current;
    const stage = svg?.parentElement;
    if (!svg || !stage) return;

    const draw = () => {
      const box = stage.getBoundingClientRect();
      if (box.width < 8 || box.height < 8) return;
      const viz = stage.querySelector<HTMLElement>(".gnt-viz");
      const left = stage.querySelector<HTMLElement>(".gnt-float-left");
      const right = stage.querySelector<HTMLElement>(".gnt-float-right");
      if (!viz || !left || !right) return;
      setSize({ w: box.width, h: box.height });
      const v = viz.getBoundingClientRect();
      const l = left.getBoundingClientRect();
      const r = right.getBoundingClientRect();
      const yLeft = l.top + 22 - box.top;
      const yRight = r.top + 22 - box.top;
      setPaths({
        left: curveTo(l.right - box.left, yLeft, v.left - box.left, yLeft + 10),
        right: curveTo(r.left - box.left, yRight, v.right - box.left, yRight + 10),
      });
    };

    const frame = requestAnimationFrame(draw);
    const observer = new ResizeObserver(draw);
    observer.observe(stage);
    const viz = stage.querySelector(".gnt-viz");
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
      className="gnt-strings"
      viewBox={`0 0 ${size.w} ${size.h}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {paths.left ? <path d={paths.left} /> : null}
      {paths.right ? <path d={paths.right} /> : null}
    </svg>
  );
}

function GanttLinks({
  active,
  tab,
  progress,
  reducedMotion,
}: {
  active: boolean;
  tab: GanttTab;
  progress: number;
  reducedMotion: boolean;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [paths, setPaths] = useState<{ key: string; d: string; x1: number; y1: number; x2: number; y2: number }[]>(
    [],
  );

  useLayoutEffect(() => {
    const svg = ref.current;
    const grid = svg?.parentElement;
    if (!svg || !grid) return;

    const draw = () => {
      const box = grid.getBoundingClientRect();
      if (box.width < 8 || box.height < 8) return;
      setSize({ w: box.width, h: box.height });
      setPaths(
        GANTT_LINKS.map((link) => {
          const from = grid.querySelector<HTMLElement>(`[data-gnt-id="${link.from}"]`);
          const to = grid.querySelector<HTMLElement>(`[data-gnt-id="${link.to}"]`);
          if (!from || !to) return { key: `${link.from}-${link.to}`, d: "", x1: 0, y1: 0, x2: 0, y2: 0 };
          const a = from.getBoundingClientRect();
          const b = to.getBoundingClientRect();
          const x1 = a.right - box.left;
          const y1 = a.top + a.height / 2 - box.top;
          const x2 = b.left - box.left;
          const y2 = b.top + b.height / 2 - box.top;
          return { key: `${link.from}-${link.to}`, d: linkElbow(x1, y1, x2, y2), x1, y1, x2, y2 };
        }),
      );
    };

    let raf = 0;
    const started = performance.now();
    const tick = (now: number) => {
      draw();
      if (now - started < 720) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const observer = new ResizeObserver(draw);
    observer.observe(grid);
    grid.querySelectorAll("[data-gnt-id]").forEach((bar) => observer.observe(bar));
    window.addEventListener("resize", draw);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", draw);
    };
  }, [active, tab]);

  const drawn = active ? (tab === "links" ? Math.max(progress, 0.12) : 1) : 0;

  return (
    <svg
      ref={ref}
      className="gnt-links"
      viewBox={`0 0 ${Math.max(size.w, 1)} ${Math.max(size.h, 1)}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <marker id="gnt-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0 0 L7 3.5 L0 7 Z" fill="currentColor" />
        </marker>
      </defs>
      {paths.map((path, index) =>
        path.d ? (
          <g key={path.key}>
            <motion.path
              d={path.d}
              pathLength={1}
              markerEnd="url(#gnt-arrow)"
              initial={false}
              animate={{ pathLength: drawn, opacity: active ? 1 : 0 }}
              transition={{
                duration: reducedMotion ? 0 : 0.52,
                ease: EASE,
                delay: active && !reducedMotion ? 0.06 + index * 0.08 : 0,
              }}
            />
            <motion.circle
              cx={path.x1}
              cy={path.y1}
              r={2.4}
              initial={false}
              animate={{ opacity: active ? 1 : 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.22, delay: active ? 0.12 : 0 }}
            />
            <motion.circle
              cx={path.x2}
              cy={path.y2}
              r={2.4}
              initial={false}
              animate={{ opacity: active ? 1 : 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.22, delay: active ? 0.28 : 0 }}
            />
          </g>
        ) : null,
      )}
    </svg>
  );
}
