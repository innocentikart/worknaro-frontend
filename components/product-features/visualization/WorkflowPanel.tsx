"use client";

import { motion } from "framer-motion";
import { STORY_WORKFLOW } from "@/components/product-features/featureStages";

export function WorkflowPanel() {
  return (
    <div className="pfs-panel">
      <div className="pfs-panel-header">
        <span className="pfs-panel-eyebrow">Project workflow</span>
      </div>
      <ol className="pfs-workflow">
        {STORY_WORKFLOW.map((node, index) => (
          <li key={node.id} className={`pfs-workflow-node is-${node.status}`}>
            <span className="pfs-workflow-dot" aria-hidden="true" />
            <div className="pfs-workflow-copy">
              <span className="pfs-workflow-label">{node.label}</span>
              {"featured" in node && node.featured ? (
                <motion.span layoutId="story-featured-task" className="pfs-featured-task pfs-workflow-task">
                  Homepage Design
                </motion.span>
              ) : null}
            </div>
            {index < STORY_WORKFLOW.length - 1 ? (
              <span className="pfs-workflow-line" aria-hidden="true" />
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
