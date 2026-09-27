"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CLIENT_TABS, type ClientTab } from "@/components/features/client-story/clientStoryData";

const SCENE_MS = 3600;
const HOLD_MS = 700;

function easeOut(t: number) {
  return 1 - (1 - t) ** 3;
}

export function useClientStory({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const ref = useRef<HTMLElement | null>(null);
  const [tab, setTab] = useState<ClientTab>(reducedMotion ? "connected" : "client");
  const [progress, setProgress] = useState(reducedMotion ? 1 : 0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const runId = useRef(0);
  const tabRef = useRef<ClientTab>(reducedMotion ? "connected" : "client");
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
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.28);
      },
      { threshold: [0.16, 0.28, 0.45] },
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
    let last = start;
    let index = CLIENT_TABS.indexOf(tabRef.current);

    const tick = (now: number) => {
      if (id !== runId.current) return;
      const dt = now - last;
      last = now;

      const liveIndex = CLIENT_TABS.indexOf(tabRef.current);
      if (liveIndex !== index) {
        index = liveIndex;
        start = now - SCENE_MS;
        setProgress(1);
      }

      if (pausedRef.current) {
        start += dt;
        frame = requestAnimationFrame(tick);
        return;
      }

      const elapsed = now - start;
      setProgress(easeOut(Math.min(1, elapsed / SCENE_MS)));

      if (elapsed < SCENE_MS) {
        frame = requestAnimationFrame(tick);
        return;
      }

      setProgress(1);
      if (elapsed < SCENE_MS + HOLD_MS) {
        frame = requestAnimationFrame(tick);
        return;
      }
      if (index >= CLIENT_TABS.length - 1) return;
      index += 1;
      setTab(CLIENT_TABS[index]);
      setProgress(0);
      start = performance.now();
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reducedMotion]);

  const selectTab = useCallback((next: ClientTab) => {
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
