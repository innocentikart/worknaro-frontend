"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronRight, Info, Shield, ShieldCheck, UserPlus, Users } from "lucide-react";
import { StoryNote, StoryTabs } from "@/components/features/story/StoryTabs";
import { VizChrome } from "@/components/features/story/VizChrome";
import { useStoryCycle } from "@/components/features/story/useStoryCycle";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import {
  ACCESS_MATRIX,
  ACCESS_META,
  ACCESS_PEOPLE,
  ACCESS_TABS,
} from "@/components/features/access-story/accessStoryData";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const ICONS = { workspace: Users, invite: UserPlus, roles: Shield, guest: ShieldCheck } as const;

function personState(tab: (typeof ACCESS_TABS)[number], person: (typeof ACCESS_PEOPLE)[number]) {
  if (tab === "invite" && "invited" in person && person.invited) return "invite";
  if (tab === "roles" && person.role === "Viewer") return "focus";
  if (tab === "guest" && "guest" in person && person.guest) return "guest";
  return null;
}

function focusRole(tab: (typeof ACCESS_TABS)[number]) {
  if (tab === "roles") return "Viewer";
  if (tab === "guest") return "Guest";
  return null;
}

export function AccessStory() {
  const reduce = useReducedMotion();
  const { ref, tab, selectTab, pause, resume } = useStoryCycle({
    tabs: ACCESS_TABS,
    reducedMotion: !!reduce,
  });
  const highlightedRole = focusRole(tab);
  const rolesActive = tab === "roles" || tab === "guest";
  const focusGuest = tab === "guest";

  return (
    <section
      ref={ref}
      id="access"
      className="acc-section mig-section scroll-mt-24"
      aria-labelledby="access-heading"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="fst-ambient" aria-hidden="true" />
      <div className="why-wrap acc-wrap">
        <div className="mig-intro acc-intro">
          <p className="audience-eyebrow mx-auto">Workspace access</p>
          <h2 id="access-heading" className="mig-heading font-display">
            People, roles, and{" "}
            <HeadingAccent>what they can see.</HeadingAccent>
          </h2>
          <p className="mig-lead">
            Roles are Owner, Admin, Manager, Member, Viewer, and Guest. You cannot invite
            someone as Owner. Guests stay isolated from the internal catalog.
          </p>
        </div>

        <StoryTabs
          tabs={ACCESS_TABS.map((id) => ({ id, label: ACCESS_META[id].label }))}
          tab={tab}
          onSelect={selectTab}
          label="How workspace access is assigned"
          prefix="acc"
          icons={ICONS}
        />

        <div
          id="acc-panel"
          role="tabpanel"
          aria-labelledby={`acc-tab-${tab}`}
          aria-live="polite"
          className="pfs-viz acc-viz"
        >
          <VizChrome title="Worknaro · Northwind workspace" badge={ACCESS_META[tab].label} />
          <div className="acc-board">
            <div className="acc-members">
              <div className="acc-head">
                <div>
                  <p className="acc-kicker">Workspace</p>
                  <strong>Northwind workspace</strong>
                </div>
                <span>{ACCESS_PEOPLE.length} people</span>
              </div>

              <ul className="acc-people">
                {ACCESS_PEOPLE.map((person, index) => {
                  const state = personState(tab, person);
                  return (
                    <motion.li
                      key={person.name}
                      className={state ? `is-${state}` : ""}
                      initial={false}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: reduce ? 0 : 0.28, delay: reduce ? 0 : index * 0.03, ease: EASE }}
                    >
                      <span className={`pfs-avatar pfs-avatar-${person.tone}`} aria-hidden="true">
                        {person.initials}
                      </span>
                      <div>
                        <strong>{person.name}</strong>
                        <span>{person.role}</span>
                      </div>
                      {state === "invite" ? <em>Invited</em> : null}
                      {state === "guest" ? <em>Isolated</em> : null}
                      {state !== "invite" && state !== "guest" ? (
                        <ChevronRight size={16} strokeWidth={1.8} aria-hidden="true" />
                      ) : null}
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            <aside className={`acc-matrix ${rolesActive ? "is-active" : ""}`}>
              <p className="acc-kicker">Roles</p>
              <table>
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Access</th>
                  </tr>
                </thead>
                <tbody>
                  {ACCESS_MATRIX.map((row) => (
                    <tr
                      key={row.role}
                      className={highlightedRole === row.role ? "is-focus" : ""}
                    >
                      <th scope="row">{row.role}</th>
                      <td>{row.access}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <AnimatePresence initial={false}>
                {focusGuest ? (
                  <motion.p
                    className="acc-guest-note"
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.28, ease: EASE }}
                  >
                    <Info size={14} strokeWidth={2} aria-hidden="true" />
                    Guest stays on the client record. They do not see the internal catalog.
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </aside>
          </div>
        </div>
        <StoryNote>{ACCESS_META[tab].note}</StoryNote>
      </div>
    </section>
  );
}
