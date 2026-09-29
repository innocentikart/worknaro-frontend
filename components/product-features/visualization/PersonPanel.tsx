"use client";

import { motion } from "framer-motion";
import { STORY_PEOPLE, STORY_PROJECT } from "@/components/product-features/featureStages";
import { VisitorAvatar } from "@/components/ui/VisitorAvatar";

const sarah = STORY_PEOPLE[0];

export function PersonPanel() {
  return (
    <div className="pfs-panel pfs-person-panel">
      <div className="pfs-panel-header">
        <span className="pfs-panel-eyebrow">People</span>
      </div>
      <div className="pfs-person-card">
        <motion.span
          layoutId="story-person-avatar"
          className="pfs-avatar pfs-avatar-lg has-image"
          aria-hidden="true"
        >
          <VisitorAvatar src={sarah.avatar} />
        </motion.span>
        <div>
          <motion.p layoutId="story-person-name" className="pfs-person-name">
            {sarah.name}
          </motion.p>
          <p className="pfs-person-role">{sarah.role}</p>
        </div>
      </div>
      <div className="pfs-person-project">
        <motion.span layoutId="story-project-name" className="pfs-chip">
          {STORY_PROJECT.name}
        </motion.span>
      </div>
      <div className="pfs-person-task">
        <span className="pfs-status-done">Completed</span>
        <motion.p layoutId="story-featured-task" className="pfs-featured-task">
          Homepage Design
        </motion.p>
      </div>
    </div>
  );
}
