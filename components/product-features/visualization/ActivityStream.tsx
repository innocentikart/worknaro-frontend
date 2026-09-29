"use client";

import { motion } from "framer-motion";
import {
  STORY_ACTIVITIES,
  STORY_PEOPLE,
} from "@/components/product-features/featureStages";
import { VisitorAvatar } from "@/components/ui/VisitorAvatar";

function personById(id: string) {
  return STORY_PEOPLE.find((p) => p.id === id)!;
}

export function ActivityStream({
  emphasize,
}: {
  emphasize: boolean;
}) {
  return (
    <div className="pfs-panel">
      <div className="pfs-panel-header">
        <span className="pfs-panel-eyebrow">Recent activity</span>
        <span className="pfs-live-dot" aria-hidden="true" />
      </div>
      <ul className="pfs-activity-list">
        {STORY_ACTIVITIES.map((item, index) => {
          const person = personById(item.personId);
          const selected = emphasize && item.highlight;
          return (
            <motion.li
              key={item.id}
              layout
              className={`pfs-activity-row ${selected ? "is-selected" : ""} ${item.highlight ? "is-featured" : ""}`}
              initial={false}
              animate={{
                opacity: selected ? 1 : emphasize && item.highlight === false ? 0.35 : 1,
                y: 0,
                scale: selected ? 1.01 : 1,
              }}
              transition={{ duration: 0.35, delay: index * 0.02 }}
            >
              {item.highlight ? (
                <motion.span
                  layoutId="story-person-avatar"
                  className="pfs-avatar has-image"
                  aria-hidden="true"
                >
                  <VisitorAvatar src={person.avatar} />
                </motion.span>
              ) : (
                <span className="pfs-avatar has-image" aria-hidden="true">
                  <VisitorAvatar src={person.avatar} />
                </span>
              )}
              <div className="pfs-activity-copy">
                <p className="pfs-activity-action">
                  {item.highlight ? (
                    <motion.strong layoutId="story-person-name">
                      {person.name.split(" ")[0]}
                    </motion.strong>
                  ) : (
                    <strong>{person.name.split(" ")[0]}</strong>
                  )}{" "}
                  {item.highlight ? (
                    <>
                      completed{" "}
                      <motion.span layoutId="story-featured-task" className="pfs-featured-task">
                        Homepage Design
                      </motion.span>
                    </>
                  ) : (
                    item.action
                  )}
                </p>
                {item.highlight ? (
                  <motion.p layoutId="story-project-name" className="pfs-activity-meta">
                    {item.project}
                  </motion.p>
                ) : (
                  <p className="pfs-activity-meta">{item.project}</p>
                )}
              </div>
              <span className="pfs-activity-time">{item.time}</span>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
