"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { Handshake, Kanban, Trophy, UserPlus } from "lucide-react";
import { StoryNote, StoryTabs } from "@/components/features/story/StoryTabs";
import { VizChrome } from "@/components/features/story/VizChrome";
import { useStoryCycle } from "@/components/features/story/useStoryCycle";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { SectionBadge } from "@/components/ui/SectionBadge";
import {
  LEAD_CARD,
  LEAD_COLUMNS,
  LEAD_META,
  LEAD_TABS,
  leadColumnFor,
  leadStatusFor,
} from "@/components/features/leads-story/leadsStoryData";
import { VisitorAvatar } from "@/components/ui/VisitorAvatar";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const ICONS = {
  new: UserPlus,
  pipeline: Kanban,
  won: Trophy,
  convert: Handshake,
} as const;

export function LeadsStory() {
  const reduce = useReducedMotion();
  const { ref, tab, progress, selectTab, pause, resume } = useStoryCycle({
    tabs: LEAD_TABS,
    reducedMotion: !!reduce,
    sceneMs: 3000,
  });
  const column = leadColumnFor(tab, reduce ? 1 : progress);
  const converted = tab === "convert";
  const assigned = tab !== "new";
  const followUpDue = tab === "pipeline" || tab === "won" || converted;

  return (
    <section
      ref={ref}
      id="leads"
      className="lds-section mig-section scroll-mt-24"
      aria-labelledby="leads-heading"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="why-wrap lds-wrap">
        <div className="mig-intro lds-intro">
          <SectionBadge icon={Kanban} className="mx-auto">
            Leads
          </SectionBadge>
          <h2 id="leads-heading" className="mig-heading font-display">
            From first contact{" "}
            <HeadingAccent>to a client record.</HeadingAccent>
          </h2>
          <p className="mig-lead">
            Leads travel New → Contacted → Qualified → Proposal → Negotiation → Won or Lost.
            Convert can create a client and, optionally, a client project.
          </p>
        </div>

        <StoryTabs
          tabs={LEAD_TABS.map((id) => ({ id, label: LEAD_META[id].label }))}
          tab={tab}
          onSelect={selectTab}
          label="Lead pipeline stages"
          prefix="lds"
          icons={ICONS}
        />

        <div
          id="lds-panel"
          role="tabpanel"
          aria-labelledby={`lds-tab-${tab}`}
          aria-live="polite"
          className="pfs-viz lds-viz"
        >
          <VizChrome title="Worknaro · Leads" badge={leadStatusFor(column)} />
          <LayoutGroup id="lds-card">
            <div className="lds-pipe">
              {LEAD_COLUMNS.map((label, index) => {
                const active = index === column;
                return (
                  <div key={label} className={`lds-col ${active ? "is-active" : ""}`}>
                    <p>
                      {label}
                      <span>{active ? "1" : "0"}</span>
                    </p>
                    <div className="lds-slot">
                      {active ? <LeadCard assigned={assigned} followUpDue={followUpDue} /> : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </LayoutGroup>
          <AnimatePresence initial={false}>
            {converted ? (
              <motion.div
                className="lds-convert"
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <strong>Converted · Northwind Studio</strong>
                <span>Client created · Website Redesign ready as a client project</span>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        <StoryNote>
          Stages are New, Contacted, Qualified, Proposal, Negotiation, Won, and Lost.
        </StoryNote>
      </div>
    </section>
  );
}

function LeadCard({ assigned, followUpDue }: { assigned: boolean; followUpDue: boolean }) {
  return (
    <motion.article
      layoutId="lds-lead"
      className="lds-card"
      transition={{ duration: 0.45, ease: EASE }}
    >
      <header>
        <span className="pfs-avatar has-image" aria-hidden="true">
          <VisitorAvatar src={LEAD_CARD.avatar} />
        </span>
        <div>
          <strong>{LEAD_CARD.company}</strong>
          <em>{LEAD_CARD.name}</em>
        </div>
      </header>
      <dl>
        <div>
          <dt>Source</dt>
          <dd>{LEAD_CARD.source}</dd>
        </div>
        <div>
          <dt>Value</dt>
          <dd>{LEAD_CARD.value}</dd>
        </div>
        <div>
          <dt>Owner</dt>
          <dd>{assigned ? LEAD_CARD.owner : "Unassigned"}</dd>
        </div>
        <div>
          <dt>Follow-up</dt>
          <dd className={followUpDue ? "is-due" : ""}>
            {followUpDue ? `${LEAD_CARD.followUp} · due` : "Not set"}
          </dd>
        </div>
      </dl>
    </motion.article>
  );
}
