"use client";

import { motion } from "framer-motion";
import {
  STORY_OUTCOME,
  STORY_PROJECT,
} from "@/components/product-features/featureStages";

export function OutcomePanel() {
  return (
    <div className="pfs-panel pfs-outcome-panel">
      <div className="pfs-panel-header">
        <span className="pfs-panel-eyebrow">Project complete</span>
        <span className="pfs-chip is-success">100%</span>
      </div>
      <motion.h3 layoutId="story-project-name" className="pfs-project-title">
        {STORY_PROJECT.name}
      </motion.h3>
      <p className="pfs-outcome-progress">
        <span>78%</span>
        <span aria-hidden="true">→</span>
        <strong>100%</strong>
      </p>
      <div className="pfs-outcome-grid">
        <div>
          <span className="pfs-metric-label">Tasks</span>
          <p className="pfs-metric-value">
            {STORY_OUTCOME.tasksDone} / {STORY_OUTCOME.tasksTotal}
          </p>
        </div>
        <div>
          <span className="pfs-metric-label">Time</span>
          <p className="pfs-metric-value">{STORY_OUTCOME.hours}h</p>
        </div>
        <div>
          <span className="pfs-metric-label">Budget</span>
          <p className="pfs-metric-value">${STORY_OUTCOME.budget.toLocaleString()}</p>
        </div>
        <div>
          <span className="pfs-metric-label">Team</span>
          <p className="pfs-metric-value">{STORY_OUTCOME.team}</p>
        </div>
        <div>
          <span className="pfs-metric-label">Milestones</span>
          <p className="pfs-metric-value">{STORY_OUTCOME.milestones}</p>
        </div>
      </div>
      <motion.div
        className="pfs-outcome-map"
        initial={false}
        animate={{ opacity: 1 }}
        aria-hidden="true"
      >
        <span>People</span>
        <span>Tasks</span>
        <span>Workflow</span>
        <span className="pfs-outcome-map-center">Time &amp; Budget</span>
        <span className="pfs-outcome-map-end">Outcome</span>
      </motion.div>
    </div>
  );
}
