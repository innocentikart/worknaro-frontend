"use client";

import { motion } from "framer-motion";
import {
  STORY_PEOPLE,
  STORY_PROJECT,
} from "@/components/product-features/featureStages";

const lanes = [
  { person: STORY_PEOPLE[0], lane: "Design" },
  { person: STORY_PEOPLE[1], lane: "Development" },
  { person: STORY_PEOPLE[2], lane: "QA" },
] as const;

export function TeamPanel() {
  return (
    <div className="pfs-panel">
      <div className="pfs-panel-header">
        <motion.span layoutId="story-project-name" className="pfs-panel-eyebrow">
          {STORY_PROJECT.name}
        </motion.span>
      </div>
      <div className="pfs-team-grid">
        {lanes.map((item, index) => (
          <motion.div
            key={item.person.id}
            className="pfs-team-card"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.35 }}
          >
            {item.person.id === "sarah" ? (
              <motion.span
                layoutId="story-person-avatar"
                className={`pfs-avatar pfs-avatar-${item.person.accent}`}
                aria-hidden="true"
              >
                {item.person.initials}
              </motion.span>
            ) : (
              <span className={`pfs-avatar pfs-avatar-${item.person.accent}`} aria-hidden="true">
                {item.person.initials}
              </span>
            )}
            {item.person.id === "sarah" ? (
              <motion.p layoutId="story-person-name" className="pfs-team-name">
                {item.person.name.split(" ")[0]}
              </motion.p>
            ) : (
              <p className="pfs-team-name">{item.person.name.split(" ")[0]}</p>
            )}
            <p className="pfs-team-lane">{item.lane}</p>
          </motion.div>
        ))}
      </div>
      <div className="pfs-team-flow" aria-hidden="true">
        <span>Brief</span>
        <span>→</span>
        <span className="is-active">Design</span>
        <span>→</span>
        <span>Development</span>
        <span>→</span>
        <span>QA</span>
        <span>→</span>
        <span>Done</span>
      </div>
    </div>
  );
}
