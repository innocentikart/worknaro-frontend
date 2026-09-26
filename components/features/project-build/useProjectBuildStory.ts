"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  PROJECT_BUILD_TABS,
  type ProjectBuildTab,
} from "@/components/features/project-build/projectBuildData";

const SCENE_MS = 3200;
const HOLD_MS = 700;

function easeOut(t: number) {
  return 1 - (1 - t) ** 3;
}

export function useProjectBuildStory({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const ref = useRef<HTMLElement | null>(null);
  const [tab, setTab] = useState<ProjectBuildTab>("shell");
  const [progress, setProgress] = useState(reducedMotion ? 1 : 0);
  const [inView, setInView] = useState(false);
  const [manual, setManual] = useState(false);
  const [playKey, setPlayKey] = useState(0);
  const runId = useRef(0);
  const tabRef = useRef<ProjectBuildTab>("shell");

  useEffect(() => {
    tabRef.current = tab;
  }, [tab]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.28);
      },
      { threshold: [0.15, 0.28, 0.45] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setProgress(1);
      return;
    }
    if (!inView) return;

    const id = ++runId.current;
    let frame = 0;
    let start = performance.now();
    let index = manual ? PROJECT_BUILD_TABS.indexOf(tabRef.current) : 0;

    if (!manual) {
      setTab("shell");
      index = 0;
    }
    setProgress(0);

    const tick = (now: number) => {
      if (id !== runId.current) return;
      const elapsed = now - start;
      setProgress(easeOut(Math.min(1, elapsed / SCENE_MS)));

      if (elapsed < SCENE_MS) {
        frame = requestAnimationFrame(tick);
        return;
      }

      setProgress(1);
      if (manual || elapsed < SCENE_MS + HOLD_MS) {
        if (!manual && elapsed < SCENE_MS + HOLD_MS) {
          frame = requestAnimationFrame(tick);
        }
        return;
      }

      if (index >= PROJECT_BUILD_TABS.length - 1) return;
      index += 1;
      setTab(PROJECT_BUILD_TABS[index]);
      setProgress(0);
      start = performance.now();
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, manual, playKey, reducedMotion]);

  const selectTab = useCallback((next: ProjectBuildTab) => {
    setManual(true);
    setTab(next);
    setPlayKey((value) => value + 1);
  }, []);

  return { ref, tab, progress, inView, selectTab, manual };
}
