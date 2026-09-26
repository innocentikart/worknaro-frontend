"use client";

import { motion } from "framer-motion";
import {
  STORY_PEOPLE,
  STORY_PROJECT,
  STORY_TASKS,
} from "@/components/product-features/featureStages";

const sarah = STORY_PEOPLE[0];

export function ProjectPanel({ progressPct = 68 }: { progressPct?: number }) {
  return (
    <div className="pfs-panel">
      <div className="pfs-panel-header">
        <span className="pfs-panel-eyebrow">{STORY_PROJECT.code}</span>
        <span className="pfs-chip">{progressPct}%</span>
      </div>
      <motion.h3 layoutId="story-project-name" className="pfs-project-title">
        {STORY_PROJECT.name}
      </motion.h3>
      <p className="pfs-project-owner">
        <motion.span layoutId="story-person-name">{sarah.name}</motion.span>
        {" · "}
        {sarah.role}
      </p>
      <div className="pfs-progress-bar" aria-hidden="true">
        <motion.span
          className="pfs-progress-bar-fill"
          initial={false}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <ul className="pfs-task-list">
        {STORY_TASKS.map((task) => (
          <li
            key={task.id}
            className={`pfs-task-row ${task.done ? "is-done" : ""} ${"featured" in task && task.featured ? "is-featured" : ""}`}
          >
            <span className="pfs-task-check" aria-hidden="true">
              {task.done ? "✓" : "○"}
            </span>
            {"featured" in task && task.featured ? (
              <motion.span layoutId="story-featured-task" className="pfs-featured-task">
                {task.name}
              </motion.span>
            ) : (
              <span>{task.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
