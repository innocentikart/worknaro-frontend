"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { StoryNote, StorySteps } from "@/components/features/story/StoryTabs";
import { VizChrome } from "@/components/features/story/VizChrome";
import { useStoryCycle } from "@/components/features/story/useStoryCycle";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import {
  PROPOSAL_DOC,
  PROPOSAL_ITEMS,
  PROPOSAL_META,
  PROPOSAL_STEPS,
  PROPOSAL_TABS,
  PROPOSAL_TOTAL,
} from "@/components/features/proposals-story/proposalsStoryData";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function ProposalsStory() {
  const reduce = useReducedMotion();
  const { ref, tab, progress, selectTab, pause, resume } = useStoryCycle({
    tabs: PROPOSAL_TABS,
    reducedMotion: !!reduce,
  });
  const itemsVisible = tab === "draft" ? Math.max(1, Math.round((reduce ? 1 : progress) * 3)) : 3;

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
          <p className="audience-eyebrow">Proposals</p>
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
        >
          <VizChrome title="Worknaro · Proposal" badge={PROPOSAL_META[tab].status} />
          <div className="prp-board">
            <article className="prp-doc">
              <p className="prp-kicker">
                {PROPOSAL_DOC.code} · {PROPOSAL_META[tab].status}
              </p>
              <strong>{PROPOSAL_DOC.title}</strong>
              <p>{PROPOSAL_DOC.client}</p>
              <ul>
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

            <aside className="prp-side">
              <p className="prp-kicker">Client</p>
              <strong>{PROPOSAL_DOC.client}</strong>
              <p>{PROPOSAL_DOC.contact}</p>
              <dl>
                <div>
                  <dt>Valid until</dt>
                  <dd>{PROPOSAL_DOC.valid}</dd>
                </div>
                <div>
                  <dt>Project</dt>
                  <dd>{tab === "convert" ? "Website Redesign" : "Optional"}</dd>
                </div>
              </dl>
              <AnimatePresence initial={false} mode="wait">
                <motion.p
                  key={tab}
                  className="prp-status"
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.28, ease: EASE }}
                >
                  {tab === "draft" && "Items and pricing sit on the draft."}
                  {tab === "send" && "Public link sent · the client can open it without a login."}
                  {tab === "viewed" && "The client opened the proposal. Status is now Viewed."}
                  {tab === "convert" && "Approved. Convert creates the project from this quote."}
                </motion.p>
              </AnimatePresence>
              {tab === "convert" ? <span className="ffs-action-btn">Convert to project</span> : null}
            </aside>
          </div>
        </div>
        <StoryNote>{PROPOSAL_META[tab].note}</StoryNote>
      </div>
    </section>
  );
}
