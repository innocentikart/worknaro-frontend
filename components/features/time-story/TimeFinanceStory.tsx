"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Clock3, Receipt, Timer, Wallet } from "lucide-react";
import { StoryNote, StoryTabs } from "@/components/features/story/StoryTabs";
import { VizChrome } from "@/components/features/story/VizChrome";
import { useStoryCycle } from "@/components/features/story/useStoryCycle";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import {
  TIME_FINANCE,
  TIME_LOG,
  TIME_META,
  TIME_TABS,
  TIME_TASK,
  TIME_WEEK,
} from "@/components/features/time-story/timeStoryData";

const ICONS = {
  work: Timer,
  time: Clock3,
  finance: Receipt,
  budget: Wallet,
} as const;

const EASE = [0.22, 1, 0.36, 1] as const;

function formatTimer(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function TimeFinanceStory() {
  const reduce = useReducedMotion();
  const { ref, tab, progress, selectTab, pause, resume } = useStoryCycle({
    tabs: TIME_TABS,
    reducedMotion: !!reduce,
  });
  const scene = reduce ? 1 : progress;
  const running = tab === "time";
  const seconds = reduce || tab === "finance" || tab === "budget"
    ? 9000
    : tab === "work"
      ? 0
      : Math.round(scene * 9000);
  const weekLogged = tab === "work" ? TIME_WEEK.logged : Math.round((TIME_WEEK.logged - TIME_LOG.hours + scene * TIME_LOG.hours) * 10) / 10;
  const billable = tab === "work" ? TIME_WEEK.billable : Math.round((TIME_WEEK.billable - TIME_LOG.hours + scene * TIME_LOG.hours) * 10) / 10;
  const spendShown = tab === "work" || tab === "time" ? 0 : Math.round(scene * TIME_FINANCE.spend);
  const spendPct = Math.round((spendShown / TIME_FINANCE.cap) * 100);

  return (
    <section
      ref={ref}
      id="time-budget"
      className="tmf-section mig-section scroll-mt-24"
      aria-labelledby="time-budget-heading"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="fst-ambient" aria-hidden="true" />
      <div className="why-wrap tmf-wrap">
        <div className="tmf-intro">
          <div>
            <p className="audience-eyebrow">Time and finance</p>
            <h2 id="time-budget-heading" className="mig-heading font-display">
              Time spent becomes{" "}
              <HeadingAccent>project information.</HeadingAccent>
            </h2>
          </div>
          <p className="mig-lead tmf-lead">
            Log hours on a project or task. Invoices and approved expenses live in Finance
            and feed the project budget tier. Timesheets do not create invoices.
          </p>
        </div>

        <StoryTabs
          tabs={TIME_TABS.map((id) => ({ id, label: TIME_META[id].label }))}
          tab={tab}
          onSelect={selectTab}
          label="How time becomes financial information"
          prefix="tmf"
          icons={ICONS}
        />

        <div
          id="tmf-panel"
          role="tabpanel"
          aria-labelledby={`tmf-tab-${tab}`}
          aria-live="polite"
          className="pfs-viz tmf-viz"
        >
          <VizChrome title="Worknaro · Time & finance" badge={TIME_META[tab].label} />
          <div className="tmf-split">
            <article className="tmf-pane tmf-time">
              <p className="tmf-kicker">{TIME_TASK.code}</p>
              <strong>{TIME_TASK.name}</strong>
              <p>
                {TIME_TASK.project} · {TIME_TASK.assignee}
              </p>
              <div className={`tmf-timer ${running ? "is-live" : ""}`}>
                <span className="tmf-live" aria-hidden="true" />
                <b>{formatTimer(seconds)}</b>
                <em>{running ? "Timer running" : tab === "work" ? "Ready to log" : "Timesheet saved"}</em>
              </div>
              <ul className="tmf-meta">
                <li>
                  <span>Work date</span>
                  <strong>{TIME_TASK.date}</strong>
                </li>
                <li>
                  <span>Entry</span>
                  <strong>{tab === "work" ? "—" : TIME_LOG.label}</strong>
                </li>
                <li>
                  <span>Billable</span>
                  <strong>{TIME_LOG.billable ? "Yes" : "No"}</strong>
                </li>
              </ul>
            </article>

            <article className="tmf-pane tmf-money">
              <p className="tmf-kicker">Website Redesign</p>
              <strong>Project performance</strong>
              <div className="tmf-hours">
                <div>
                  <b>{weekLogged.toFixed(1)}h</b>
                  <span>Logged this period</span>
                </div>
                <div>
                  <b>{billable.toFixed(1)}h</b>
                  <span>Billable</span>
                </div>
                <div>
                  <b>{TIME_WEEK.nonBillable.toFixed(1)}h</b>
                  <span>Non-billable</span>
                </div>
              </div>
              <AnimatePresence initial={false}>
                {tab === "finance" || tab === "budget" ? (
                  <motion.ul
                    className="tmf-finance"
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: 6 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <li>
                      <span>
                        Invoice {TIME_FINANCE.invoice}
                        <em>{TIME_FINANCE.invoiceStatus}</em>
                      </span>
                      <strong>${TIME_FINANCE.invoiceAmount.toLocaleString()}</strong>
                    </li>
                    <li>
                      <span>
                        Expense · {TIME_FINANCE.expense}
                        <em>{TIME_FINANCE.expenseStatus}</em>
                      </span>
                      <strong>${TIME_FINANCE.expenseAmount}</strong>
                    </li>
                  </motion.ul>
                ) : (
                  <p className="tmf-aside">Hours stay on the timesheet. Invoices are recorded in Finance.</p>
                )}
              </AnimatePresence>
              <div className={`tmf-budget ${tab === "budget" ? "is-on" : ""}`}>
                <div>
                  <span>Budget tier {TIME_FINANCE.tier}</span>
                  <strong>
                    ${spendShown.toLocaleString()} of ${TIME_FINANCE.cap.toLocaleString()}
                  </strong>
                </div>
                <span className="tmf-bar" aria-hidden="true">
                  <span style={{ width: `${spendPct}%` }} />
                </span>
                <em>Invoices + approved expenses · time is separate</em>
              </div>
            </article>
          </div>
        </div>
        <StoryNote>{TIME_META[tab].note}</StoryNote>
      </div>
    </section>
  );
}
