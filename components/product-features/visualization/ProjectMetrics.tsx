"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import {
  STORY_METRICS,
  STORY_PROJECT,
} from "@/components/product-features/featureStages";

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const spring = useSpring(value * 0.88, { stiffness: 70, damping: 22 });
  useEffect(() => {
    spring.set(value);
  }, [spring, value]);
  const display = useTransform(spring, (latest) => {
    const rounded = Math.round(latest);
    return `${prefix}${rounded.toLocaleString()}${suffix}`;
  });
  return <motion.span>{display}</motion.span>;
}

export function ProjectMetrics({ active }: { active: boolean }) {
  return (
    <div className="pfs-panel">
      <div className="pfs-panel-header">
        <motion.span layoutId="story-project-name" className="pfs-panel-eyebrow">
          {STORY_PROJECT.name}
        </motion.span>
        <span className="pfs-chip">{STORY_METRICS.progress}%</span>
      </div>
      <div className="pfs-progress-bar" aria-hidden="true">
        <motion.span
          className="pfs-progress-bar-fill"
          initial={false}
          animate={{ width: `${STORY_METRICS.progress}%` }}
        />
      </div>
      <div className="pfs-metrics-grid">
        <div className="pfs-metric">
          <span className="pfs-metric-label">Tasks</span>
          <p className="pfs-metric-value">
            {active ? <AnimatedNumber value={STORY_METRICS.tasksDone} /> : STORY_METRICS.tasksDone}
            {" / "}
            {STORY_METRICS.tasksTotal}
          </p>
        </div>
        <div className="pfs-metric">
          <span className="pfs-metric-label">Time</span>
          <p className="pfs-metric-value">
            {active ? (
              <AnimatedNumber value={STORY_METRICS.hoursLogged} suffix="h" />
            ) : (
              `${STORY_METRICS.hoursLogged}h`
            )}
            {" / "}
            {STORY_METRICS.hoursBudget}h
          </p>
        </div>
        <div className="pfs-metric pfs-metric-wide">
          <span className="pfs-metric-label">Budget</span>
          <p className="pfs-metric-value">
            {active ? (
              <AnimatedNumber value={STORY_METRICS.budgetSpent} prefix="$" />
            ) : (
              `$${STORY_METRICS.budgetSpent.toLocaleString()}`
            )}
            {" / $"}
            {STORY_METRICS.budgetTotal.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
