"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BarChart3, Layers3, ListTodo, PieChart } from "lucide-react";
import { StoryNote, StoryTabs } from "@/components/features/story/StoryTabs";
import { VizChrome } from "@/components/features/story/VizChrome";
import { useStoryCycle } from "@/components/features/story/useStoryCycle";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import {
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
          <p className="audience-eyebrow mx-auto">Reports</p>
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
        >
          <VizChrome title="Worknaro · Reports" badge="Pro+" />
          <div className="rpt-dash">
            <div className="rpt-head">
              <div>
                <p className="rpt-kicker">WR-204</p>
                <strong>Website Redesign</strong>
              </div>
              <span>Sep 2026 · Project & timesheet</span>
            </div>

            <div className="rpt-metrics">
              <div>
                <b>{complete}%</b>
                <span>Project complete</span>
              </div>
              <div>
                <b>{logged}h</b>
                <span>Hours logged</span>
              </div>
              <div>
                <b>{billable}h</b>
                <span>Billable time</span>
              </div>
            </div>

            <svg className="rpt-chart" viewBox="0 0 100 40" preserveAspectRatio="none" role="img" aria-label="Completion trend">
              <path d="M 0 36 H 100" className="rpt-axis" />
              <motion.path
                d={chart.area}
                className="rpt-fill"
                initial={false}
                animate={{ opacity: tab === "activity" ? 0.18 : 0.32 }}
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

            {showGroups ? (
              <table className="rpt-table">
                <thead>
                  <tr>
                    <th>Grouped by</th>
                    <th>Work</th>
                    <th>Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {REPORT_GROUPS.map((row) => (
                    <tr key={row.name}>
                      <th scope="row">{row.name}</th>
                      <td>{row.tasks}</td>
                      <td>{row.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <ul className="rpt-activity">
                <li>
                  <span>Hero section completed</span>
                  <strong>Today</strong>
                </li>
                <li>
                  <span>2h 30m logged · Alex</span>
                  <strong>18 Sep</strong>
                </li>
                <li>
                  <span>Client review waiting</span>
                  <strong>3 days</strong>
                </li>
              </ul>
            )}

            {showSummary ? (
              <p className="rpt-summary">
                Website Redesign is 64% complete with 16.0 billable hours of 18.5 logged.
                Export the timesheet report as CSV.
              </p>
            ) : null}
          </div>
        </div>
        <StoryNote>{REPORT_META[tab].note}</StoryNote>
      </div>
    </section>
  );
}
