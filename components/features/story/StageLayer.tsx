"use client";

import { motion } from "framer-motion";

export function StageLayer({
  active,
  reducedMotion,
  children,
}: {
  active: number;
  reducedMotion?: boolean;
  children: React.ReactNode;
}) {
  const opacity = reducedMotion ? (active > 0.4 ? 1 : 0) : active;
  if (opacity < 0.04) return null;
  return (
    <motion.div
      className="mst-layer"
      initial={false}
      animate={{
        opacity,
        y: reducedMotion ? 0 : (1 - active) * 8,
      }}
      transition={{ duration: reducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
