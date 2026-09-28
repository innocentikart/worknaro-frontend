"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  CalendarDays,
  ChevronRight,
  ClipboardList,
  Clock3,
  FileText,
  Receipt,
  Timer,
  Wallet,
} from "lucide-react";
import { StoryNote, StoryTabs } from "@/components/features/story/StoryTabs";
import { useStoryCycle } from "@/components/features/story/useStoryCycle";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Icon } from "@/components/ui/Icon";
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

function formatHours(value: number) {
  return `${value.toFixed(1)}h`;
}

function money(value: number) {
  return `$${value.toLocaleString()}`;
}

export function TimeFinanceStory() {
  const reduce = useReducedMotion();
  const { ref, tab, progress, selectTab, pause, resume } = useStoryCycle({
    tabs: TIME_TABS,
    reducedMotion: !!reduce,
  });
  const scene = reduce ? 1 : progress;
  const running = tab === "time" && scene < 0.92;
  const loggedEntry = tab === "work" ? 0 : scene * TIME_LOG.hours;
  const seconds =
    reduce && tab !== "work"
      ? 9000
      : tab === "finance" || tab === "budget"
        ? 9000
        : tab === "work"
          ? 0
          : Math.round(scene * 9000);
  const weekLogged = Math.round((TIME_WEEK.logged - TIME_LOG.hours + loggedEntry) * 10) / 10;
  const billable = Math.round((TIME_WEEK.billable - TIME_LOG.hours + loggedEntry) * 10) / 10;
  const spendShown =
    tab === "work" ? 0 : Math.round((tab === "time" ? Math.max(scene, 0.72) : scene) * TIME_FINANCE.spend);
  const spendPct = Math.round((spendShown / TIME_FINANCE.cap) * 100);
  const financeOn = tab === "finance" || tab === "budget" || tab === "time";
  const budgetOn = tab === "budget" || tab === "time" || tab === "finance";

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
        <div className="mig-intro tmf-intro">
          <SectionBadge icon={Wallet} className="mx-auto">
            Time and finance
          </SectionBadge>
          <h2 id="time-budget-heading" className="mig-heading font-display">
            Time spent becomes{" "}
            <HeadingAccent>project information.</HeadingAccent>
          </h2>
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
          data-tab={tab}
        >
          <div className="tmf-hero">
            <span className="tmf-hero-icon" aria-hidden="true">
              <Icon icon={Clock3} size={20} strokeWidth={1.8} />
            </span>
            <div>
              <p className="tmf-hero-heading font-display">
                Time spent becomes project information.
              </p>
              <p className="tmf-hero-lead">
                Log hours on a project or task. Invoices and approved expenses live in Finance
                and feed the project budget tier. Timesheets do not create invoices.
              </p>
            </div>
          </div>

          <div className="tmf-board">
            <article className="tmf-card tmf-sheet">
              <header className="tmf-card-head">
                <span className="tmf-card-label">
                  <Icon icon={Clock3} size={14} strokeWidth={2} />
                  Timesheet
                </span>
                <button
                  type="button"
                  className="tmf-ghost-btn"
                  onClick={() => selectTab("time")}
                >
                  View Timesheets
                  <Icon icon={ChevronRight} size={14} strokeWidth={2.2} />
                </button>
              </header>

              <div className={`tmf-week ${running ? "is-live" : ""}`}>
                <p className="tmf-week-kicker">This week</p>
                <div className="tmf-week-time">
                  <span className="tmf-week-icon" aria-hidden="true">
                    <Icon icon={Clock3} size={18} strokeWidth={1.8} />
                  </span>
                  <b>{formatTimer(seconds)}</b>
                </div>
                <em>{running ? "Timer running" : tab === "work" ? "Ready to log" : "Timesheet saved"}</em>
              </div>

              <ul className="tmf-facts">
                <li>
                  <Icon icon={CalendarDays} size={15} strokeWidth={1.9} />
                  <span>Work date</span>
                  <strong>{TIME_TASK.date}</strong>
                </li>
                <li>
                  <Icon icon={Timer} size={15} strokeWidth={1.9} />
                  <span>Entry time</span>
                  <strong>{tab === "work" ? "—" : TIME_LOG.label}</strong>
                </li>
                <li>
                  <Icon icon={Receipt} size={15} strokeWidth={1.9} />
                  <span>Billable</span>
                  <strong>{TIME_LOG.billable ? "Yes" : "No"}</strong>
                </li>
              </ul>
            </article>

            <article className="tmf-card tmf-summary">
              <header className="tmf-card-head">
                <span className="tmf-card-label">
                  <Icon icon={ClipboardList} size={14} strokeWidth={2} />
                  Project summary
                </span>
              </header>

              <div className="tmf-performance">
                <p className="tmf-block-title">Project performance</p>
                <ul className="tmf-metrics">
                  <li>
                    <b>{formatHours(weekLogged)}</b>
                    <span>Logged this period</span>
                  </li>
                  <li>
                    <b>{formatHours(billable)}</b>
                    <span>Billable</span>
                  </li>
                  <li>
                    <b>{formatHours(TIME_WEEK.nonBillable)}</b>
                    <span>Non-billable</span>
                  </li>
                </ul>
              </div>

              <ul className={`tmf-records ${financeOn ? "is-on" : ""}`}>
                <li>
                  <span className="tmf-record-icon" aria-hidden="true">
                    <Icon icon={FileText} size={15} strokeWidth={1.9} />
                  </span>
                  <span className="tmf-record-copy">
                    <strong>Invoice {TIME_FINANCE.invoice}</strong>
                    <em>{TIME_FINANCE.invoiceStatus}</em>
                  </span>
                  <b>{money(TIME_FINANCE.invoiceAmount)}</b>
                  <Icon icon={ChevronRight} size={14} strokeWidth={2.1} />
                </li>
                <li>
                  <span className="tmf-record-icon is-expense" aria-hidden="true">
                    <Icon icon={Receipt} size={15} strokeWidth={1.9} />
                  </span>
                  <span className="tmf-record-copy">
                    <strong>Expense: {TIME_FINANCE.expense}</strong>
                    <em>{TIME_FINANCE.expenseStatus}</em>
                  </span>
                  <b>{money(TIME_FINANCE.expenseAmount)}</b>
                  <Icon icon={ChevronRight} size={14} strokeWidth={2.1} />
                </li>
              </ul>

              <div className={`tmf-budget ${budgetOn ? "is-on" : ""}`}>
                <div>
                  <span>
                    <Icon icon={Wallet} size={14} strokeWidth={2} />
                    Budget tier {TIME_FINANCE.tier}
                  </span>
                  <strong>
                    {money(spendShown)} of {money(TIME_FINANCE.cap)}
                  </strong>
                </div>
                <span className="tmf-bar" aria-hidden="true">
                  <motion.span
                    initial={false}
                    animate={{ scaleX: Math.max(0, spendPct) / 100 }}
                    transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
                  />
                </span>
                <em>Invoices + approved expenses · Time is separate</em>
              </div>
            </article>
          </div>
        </div>
        <StoryNote>{TIME_META[tab].note}</StoryNote>
      </div>
    </section>
  );
}
