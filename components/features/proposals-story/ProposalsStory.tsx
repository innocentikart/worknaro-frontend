"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CalendarDays,
  ChevronRight,
  FileText,
  FolderKanban,
  UserRound,
} from "lucide-react";
import { StoryNote, StorySteps } from "@/components/features/story/StoryTabs";
import { useStoryCycle } from "@/components/features/story/useStoryCycle";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Icon } from "@/components/ui/Icon";
import {
  PROPOSAL_DOC,
  PROPOSAL_ITEMS,
  PROPOSAL_META,
  PROPOSAL_STEPS,
  PROPOSAL_TABS,
  PROPOSAL_TOTAL,
  type ProposalTab,
} from "@/components/features/proposals-story/proposalsStoryData";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STATUS_COPY: Record<ProposalTab, string> = {
  draft: "Items and pricing sit on the draft.",
  send: "Public link sent. The client can open it without a login.",
  viewed: "The client opened the proposal. Status is now Viewed.",
  convert: "Approved. Convert creates the project from this quote.",
};

export function ProposalsStory() {
  const reduce = useReducedMotion();
  const { ref, tab, progress, selectTab, pause, resume } = useStoryCycle({
    tabs: PROPOSAL_TABS,
    reducedMotion: !!reduce,
  });
  const itemsVisible = tab === "draft" ? Math.max(1, Math.round((reduce ? 1 : progress) * 3)) : 3;
  const approved = tab === "convert";
  const status = PROPOSAL_META[tab].status;

  return (
    <section
      ref={ref}
      id="proposals"
      className="prp-section mig-section scroll-mt-24"
      aria-labelledby="proposals-heading"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="fst-ambient" aria-hidden="true" />
      <div className="why-wrap prp-wrap">
        <div className="prp-intro">
          <SectionBadge icon={FileText}>Proposals</SectionBadge>
          <h2 id="proposals-heading" className="mig-heading font-display">
            A quote the client can{" "}
            <HeadingAccent>approve.</HeadingAccent>
          </h2>
          <p className="mig-lead">
            Draft a proposal for a client, send a public link, and let the client approve
            or reject. An approved proposal can convert into a project.
          </p>
        </div>

        <StorySteps
          steps={PROPOSAL_TABS.map((id, index) => ({ id, label: PROPOSAL_STEPS[index] }))}
          active={tab}
          onSelect={selectTab}
          label="Proposal workflow"
        />

        <div
          id="prp-panel"
          role="tabpanel"
          aria-live="polite"
          className="pfs-viz prp-viz"
          data-tab={tab}
        >
          <div className="prp-hero">
            <span className="prp-hero-icon" aria-hidden="true">
              <Icon icon={FileText} size={20} strokeWidth={1.8} />
            </span>
            <div>
              <p className="prp-hero-heading font-display">A quote the client can approve.</p>
              <p className="prp-hero-lead">
                Draft a proposal for a client, send a public link, and let the client approve or
                reject. An approved proposal can convert into a project.
              </p>
            </div>
          </div>

          <div className="prp-stage">
            <article className="prp-card prp-quote">
              <header className="prp-quote-head">
                <span className="prp-quote-icon" aria-hidden="true">
                  <Icon icon={FileText} size={16} strokeWidth={1.9} />
                </span>
                <div className="prp-quote-copy">
                  <p className="prp-quote-ref">
                    {PROPOSAL_DOC.code} · {status}
                  </p>
                  <h3>{PROPOSAL_DOC.title}</h3>
                  <p>{PROPOSAL_DOC.client}</p>
                </div>
                <span className={`prp-badge is-${tab}`}>{status}</span>
              </header>

              <ul className="prp-lines">
                {PROPOSAL_ITEMS.slice(0, itemsVisible).map((item) => (
                  <motion.li
                    key={item.name}
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <span>{item.name}</span>
                    <b>{item.price}</b>
                  </motion.li>
                ))}
              </ul>

              {itemsVisible >= 3 ? (
                <div className="prp-total">
                  <span>Total</span>
                  <strong>{PROPOSAL_TOTAL}</strong>
                </div>
              ) : null}
            </article>

            <aside className="prp-card prp-client">
              <header className="prp-client-head">
                <span className="prp-client-avatar" aria-hidden="true">
                  <Icon icon={UserRound} size={16} strokeWidth={1.9} />
                </span>
                <div>
                  <p className="prp-client-kicker">Client</p>
                  <strong>{PROPOSAL_DOC.client}</strong>
                  <p>{PROPOSAL_DOC.contact}</p>
                </div>
              </header>

              <ul className="prp-meta">
                <li>
                  <Icon icon={CalendarDays} size={15} strokeWidth={1.9} />
                  <span>
                    <em>Valid until</em>
                    <b>{PROPOSAL_DOC.valid}</b>
                  </span>
                </li>
                <li>
                  <Icon icon={FolderKanban} size={15} strokeWidth={1.9} />
                  <span>
                    <em>Project</em>
                    <b>{approved ? "Website Redesign" : "Optional"}</b>
                  </span>
                </li>
              </ul>

              <AnimatePresence initial={false} mode="wait">
                <motion.p
                  key={tab}
                  className="prp-status"
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.28, ease: EASE }}
                >
                  {STATUS_COPY[tab]}
                </motion.p>
              </AnimatePresence>

              {approved ? (
                <button type="button" className="prp-convert" tabIndex={-1}>
                  Convert to project
                  <Icon icon={ChevronRight} size={14} strokeWidth={2.2} />
                </button>
              ) : null}
            </aside>
          </div>
        </div>
        <StoryNote>{PROPOSAL_META[tab].note}</StoryNote>
      </div>
    </section>
  );
}
