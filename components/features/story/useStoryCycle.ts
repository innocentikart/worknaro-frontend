"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_SCENE_MS = 3400;
const DEFAULT_HOLD_MS = 650;

function easeOut(t: number) {
  return 1 - (1 - t) ** 3;
}

export function useStoryCycle<T extends string>({
  tabs,
  reducedMotion = false,
  sceneMs = DEFAULT_SCENE_MS,
  holdMs = DEFAULT_HOLD_MS,
}: {
  tabs: readonly T[];
  reducedMotion?: boolean;
  sceneMs?: number;
  holdMs?: number;
}) {
  const last = tabs[tabs.length - 1];
  const first = tabs[0];
  const ref = useRef<HTMLElement | null>(null);
  const [tab, setTab] = useState<T>(reducedMotion ? last : first);
  const [progress, setProgress] = useState(reducedMotion ? 1 : 0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const runId = useRef(0);
  const tabRef = useRef<T>(reducedMotion ? last : first);
  const pausedRef = useRef(false);
  const hoverRef = useRef(false);

  useEffect(() => {
    tabRef.current = tab;
  }, [tab]);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView((was) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) return true;
          if (!entry.isIntersecting || entry.intersectionRatio < 0.08) return false;
          return was;
        });
      },
      { threshold: [0.08, 0.16, 0.2, 0.28, 0.45] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    if (!inView) {
      runId.current += 1;
      return;
    }

    const id = ++runId.current;
    let frame = 0;
    let start = performance.now();
    let lastTick = start;
    let index = tabs.indexOf(tabRef.current);

    const tick = (now: number) => {
      if (id !== runId.current) return;
      const dt = now - lastTick;
      lastTick = now;

      const liveIndex = tabs.indexOf(tabRef.current);
      if (liveIndex !== index) {
        index = liveIndex;
        start = now - sceneMs;
        setProgress(1);
      }

      if (pausedRef.current) {
        start += dt;
        frame = requestAnimationFrame(tick);
        return;
      }

      const elapsed = now - start;
      setProgress(easeOut(Math.min(1, elapsed / sceneMs)));

      if (elapsed < sceneMs) {
        frame = requestAnimationFrame(tick);
        return;
      }

      setProgress(1);
      if (elapsed < sceneMs + holdMs) {
        frame = requestAnimationFrame(tick);
        return;
      }
      if (index >= tabs.length - 1) return;
      index += 1;
      setTab(tabs[index]);
      setProgress(0);
      start = performance.now();
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [holdMs, inView, reducedMotion, sceneMs, tabs]);

  const selectTab = useCallback((next: T) => {
    setTab(next);
    setProgress(1);
    if (hoverRef.current) setPaused(true);
  }, []);

  const pause = useCallback(() => {
    hoverRef.current = true;
    setPaused(true);
  }, []);

  const resume = useCallback(() => {
    hoverRef.current = false;
    setPaused(false);
  }, []);

  return { ref, tab, progress, selectTab, pause, resume };
}

export function storyTabKeydown<T extends string>(
  event: { key: string; preventDefault: () => void },
  tabs: readonly T[],
  current: T,
  selectTab: (next: T) => void,
) {
  const index = tabs.indexOf(current);
  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    event.preventDefault();
    selectTab(tabs[(index + 1) % tabs.length]);
  }
  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    event.preventDefault();
    selectTab(tabs[(index - 1 + tabs.length) % tabs.length]);
  }
  if (event.key === "Home") {
    event.preventDefault();
    selectTab(tabs[0]);
  }
  if (event.key === "End") {
    event.preventDefault();
    selectTab(tabs[tabs.length - 1]);
  }
}
