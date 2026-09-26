"use client";

import { useReducedMotion } from "framer-motion";
import { memo, type ReactNode } from "react";

type LogoItem = {
  name: string;
  icon?: ReactNode;
};

function LogoMarqueeComponent({
  items,
  className = "",
}: {
  items: readonly LogoItem[];
  className?: string;
}) {
  const reduce = useReducedMotion();
  const loop = [...items, ...items];

  return (
    <div
      className={`logo-marquee ${reduce ? "is-static" : ""} ${className}`}
      aria-label="Trusted integrations"
    >
      <div className="logo-marquee-track">
        {loop.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="logo-marquee-item"
            aria-hidden={index >= items.length}
          >
            {item.icon ? (
              <span className="logo-marquee-icon">{item.icon}</span>
            ) : null}
            <span className="logo-marquee-name">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export const LogoMarquee = memo(LogoMarqueeComponent);
