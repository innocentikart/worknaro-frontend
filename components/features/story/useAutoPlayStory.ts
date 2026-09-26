"use client";

import { useEffect, useRef, useState } from "react";

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - (2 * t - 2) ** 2 / 2;
}

/**
 * Viewport-triggered story playback.
 * Scroll reveals the section; progress then runs on its own clock.
 */
export function useAutoPlayStory({
  durationMs = 9000,
  holdAt = 0.92,
  reducedMotion = false,
}: {
  durationMs?: number;
  holdAt?: number;
  reducedMotion?: boolean;
} = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(reducedMotion ? holdAt : 0);
  const [inView, setInView] = useState(false);
  const runId = useRef(0);

  useEffect(() => {
    if (reducedMotion) {
      setProgress(holdAt);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.28);
      },
      { threshold: [0.15, 0.28, 0.45, 0.6] },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [holdAt, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      setProgress(holdAt);
      return;
    }
    if (!inView) return;

    const id = ++runId.current;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      if (id !== runId.current) return;
      const t = Math.min(1, (now - start) / durationMs);
      setProgress(easeInOut(t) * holdAt);
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setProgress(holdAt);
      }
    };

    setProgress(0);
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [durationMs, holdAt, inView, reducedMotion]);

  return { ref, progress, inView };
}
