"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BarChart3, Download, Layers3, ListTodo, PieChart } from "lucide-react";
import { StoryNote, StoryTabs } from "@/components/features/story/StoryTabs";
import { useStoryCycle } from "@/components/features/story/useStoryCycle";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Icon } from "@/components/ui/Icon";
import {
  REPORT_ACTIVITY,
  REPORT_GROUPS,
  REPORT_META,
  REPORT_POINTS,
  REPORT_TABS,
} from "@/components/features/reports-story/reportsStoryData";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const ICONS = { activity: ListTodo, group: Layers3, metrics: BarChart3, report: PieChart } as const;

function chartGeometry(count: number) {
  const pts = REPORT_POINTS.slice(0, Math.max(2, count));
  const last = Math.max(pts.length - 1, 1);
  const coords = pts.map((value, index) => {
    const x = (index / last) * 100;
    const y = 34 - (value / 70) * 26;
    return { x, y };
  });
  const line = coords
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(" ");
  const lastPoint = coords[coords.length - 1];
  const area = `${line} L ${lastPoint.x.toFixed(1)} 36 L 0 36 Z`;
  return { line, area };
}

export function ReportsStory() {
  const reduce = useReducedMotion();
  const { ref, tab, progress, selectTab, pause, resume } = useStoryCycle({
    tabs: REPORT_TABS,
    reducedMotion: !!reduce,
  });
  const scene = reduce ? 1 : progress;
  const pointCount =
    tab === "activity" ? 3 : tab === "group" ? 5 : tab === "metrics" ? 6 : 7;
  const complete =
    tab === "activity" ? Math.round(34 + scene * 7) : tab === "group" ? 48 : tab === "metrics" ? 58 : 64;
  const logged = tab === "activity" ? (10 + scene * 4).toFixed(1) : tab === "group" ? "14.0" : "18.5";
  const billable = tab === "activity" ? (8 + scene * 3).toFixed(1) : tab === "group" ? "12.0" : "16.0";
  const showGroups = tab !== "activity";
  const showSummary = tab === "report";
  const leftChip =
    tab === "activity" ? "Raw work" : tab === "group" ? "Grouped" : tab === "metrics" ? "Pro+" : "CSV";
  const chart = chartGeometry(pointCount);

  return (
    <section
      ref={ref}
      id="reporting"
      className="rpt-section mig-section scroll-mt-24"
      aria-labelledby="reporting-heading"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="fst-ambient" aria-hidden="true" />
      <div className="why-wrap rpt-wrap">
        <div className="mig-intro rpt-intro">
          <SectionBadge icon={BarChart3} className="mx-auto">
            Reports
          </SectionBadge>
          <h2 id="reporting-heading" className="mig-heading font-display">
            Activity becomes{" "}
            <HeadingAccent>a report you can use.</HeadingAccent>
          </h2>
          <p className="mig-lead">
            Project and timesheet reports are available on Pro and above. They assemble
            from work that already exists — there is no custom report builder.
          </p>
        </div>

        <StoryTabs
          tabs={REPORT_TABS.map((id) => ({ id, label: REPORT_META[id].label }))}
          tab={tab}
          onSelect={selectTab}
          label="How reports assemble"
          prefix="rpt"
          icons={ICONS}
        />

        <div
          id="rpt-panel"
          role="tabpanel"
          aria-labelledby={`rpt-tab-${tab}`}
          aria-live="polite"
          className="pfs-viz rpt-viz"
          data-tab={tab}
        >
          <div className="rpt-hero">
            <span className="rpt-hero-icon" aria-hidden="true">
              <Icon icon={BarChart3} size={20} strokeWidth={1.8} />
            </span>
            <div>
              <p className="rpt-hero-heading font-display">Activity becomes a report you can use.</p>
              <p className="rpt-hero-lead">
                Project and timesheet reports assemble from work that already exists. There is no
                custom report builder. Timesheets can export to CSV.
              </p>
            </div>
            <span className="rpt-plan">Pro+</span>
          </div>

          <div className="rpt-stage">
            <article className={`rpt-pane ${!showSummary ? "is-focus" : ""}`}>
              <header className="rpt-pane-head">
                <span className="rpt-pane-label">
                  <Icon icon={Layers3} size={14} strokeWidth={2} />
                  {showGroups ? "Grouped by project, person, period" : "WR-204 · Project activity"}
                </span>
                <span className="rpt-chip">{leftChip}</span>
              </header>

              <AnimatePresence initial={false} mode="wait">
                {showGroups ? (
                  <motion.ul
                    key="groups"
                    className="rpt-groups"
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    {REPORT_GROUPS.map((row) => (
                      <li key={row.name}>
                        <span className={`rpt-kind is-${row.kind.toLowerCase()}`}>{row.kind}</span>
                        <span>
                          <strong>{row.name}</strong>
                          <small>{row.detail}</small>
                        </span>
                        <b>{row.hours}</b>
                      </li>
                    ))}
                  </motion.ul>
                ) : (
                  <motion.ul
                    key="activity"
                    className="rpt-log"
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    {REPORT_ACTIVITY.map((row) => (
                      <li key={row.label}>
                        <span>{row.label}</span>
                        <strong>{row.when}</strong>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </article>

            <aside className={`rpt-pane ${tab === "metrics" || showSummary ? "is-focus" : ""}`}>
              <header className="rpt-pane-head">
                <span className="rpt-pane-label">
                  <Icon icon={PieChart} size={14} strokeWidth={2} />
                  Website Redesign
                </span>
                <span className="rpt-chip">Sep 2026</span>
              </header>

              <ul className="rpt-stats">
                <li>
                  <b>{complete}%</b>
                  <span>Project complete</span>
                </li>
                <li>
                  <b>{logged}h</b>
                  <span>Hours logged</span>
                </li>
                <li>
                  <b>{billable}h</b>
                  <span>Billable time</span>
                </li>
              </ul>

              <svg
                className="rpt-chart"
                viewBox="0 0 100 40"
                preserveAspectRatio="none"
                role="img"
                aria-label="Completion trend from existing project work"
              >
                <path d="M 0 36 H 100" className="rpt-axis" />
                <motion.path
                  d={chart.area}
                  className="rpt-fill"
                  initial={false}
                  animate={{ opacity: tab === "activity" ? 0.16 : 0.3 }}
                  transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
                />
                <motion.path
                  d={chart.line}
                  className="rpt-line"
                  initial={false}
                  animate={{ opacity: 1 }}
                  transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
                />
              </svg>

              {showSummary ? (
                <div className="rpt-foot">
                  <p>
                    Website Redesign is 64% complete with 16.0 billable hours of 18.5 logged.
                    Export the timesheet report as CSV.
                  </p>
                  <button type="button" className="rpt-export" tabIndex={-1}>
                    <Icon icon={Download} size={14} strokeWidth={2.1} />
                    Export CSV
                  </button>
                </div>
              ) : (
                <p className="rpt-hint">
                  {tab === "metrics"
                    ? "Completion, hours, and billable time come from the project and timesheet."
                    : "Reports assemble from work that already exists. No custom builder."}
                </p>
              )}
            </aside>
          </div>
        </div>
        <StoryNote>{REPORT_META[tab].note}</StoryNote>
      </div>
    </section>
  );
}
