"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CALENDAR_TIME_TABS,
  type CalendarTimeTab,
} from "@/components/features/calendar-story/calendarStoryData";

const SCENE_MS = 3400;
const HOLD_MS = 650;

function easeOut(t: number) {
  return 1 - (1 - t) ** 3;
}

export function useCalendarTimeStory({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const ref = useRef<HTMLElement | null>(null);
  const [tab, setTab] = useState<CalendarTimeTab>(reducedMotion ? "schedule" : "tasks");
  const [progress, setProgress] = useState(reducedMotion ? 1 : 0);
  const [inView, setInView] = useState(false);
  const [manual, setManual] = useState(false);
  const [playKey, setPlayKey] = useState(0);
  const runId = useRef(0);
  const tabRef = useRef<CalendarTimeTab>("tasks");

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
      { threshold: [0.16, 0.28, 0.45] },
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
    let index = manual ? CALENDAR_TIME_TABS.indexOf(tabRef.current) : 0;

    if (!manual) {
      setTab("tasks");
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
      if (manual) return;
      if (elapsed < SCENE_MS + HOLD_MS) {
        frame = requestAnimationFrame(tick);
        return;
      }
      if (index >= CALENDAR_TIME_TABS.length - 1) return;
      index += 1;
      setTab(CALENDAR_TIME_TABS[index]);
      setProgress(0);
      start = performance.now();
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, manual, playKey, reducedMotion]);

  const selectTab = useCallback((next: CalendarTimeTab) => {
    setManual(true);
    setTab(next);
    setPlayKey((value) => value + 1);
  }, []);

  return { ref, tab, progress, selectTab };
}
