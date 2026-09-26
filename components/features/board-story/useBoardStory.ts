"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BOARD_STORY_TARGET_COLUMN } from "@/components/features/board-story/boardStoryData";

const MOVE_MS = 560;
const STEP_HOLD = [2800, 1500, 2400, 2400] as const;
const RESUME_MS = 5200;

function wait(ms: number, alive: () => boolean) {
  return new Promise<void>((resolve) => {
    const started = performance.now();
    const tick = () => {
      if (!alive() || performance.now() - started >= ms) {
        resolve();
        return;
      }
      window.setTimeout(tick, 40);
    };
    window.setTimeout(tick, Math.min(40, ms));
  });
}

export function useBoardStory({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const ref = useRef<HTMLElement | null>(null);
  const [step, setStep] = useState(0);
  const [column, setColumn] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [moving, setMoving] = useState(false);
  const runId = useRef(0);
  const gen = useRef(0);
  const stepRef = useRef(0);
  const columnRef = useRef(0);

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  useEffect(() => {
    columnRef.current = column;
  }, [column]);

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

  const moveTo = useCallback(async (next: number, alive: () => boolean) => {
    if (columnRef.current === next) return;
    const token = gen.current;
    setMoving(true);
    setColumn(next);
    await wait(reducedMotion ? 0 : MOVE_MS, alive);
    if (gen.current !== token) return;
    if (alive()) setMoving(false);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      setMoving(false);
      return;
    }
    if (!inView || paused) return;

    const id = ++runId.current;
    const alive = () => id === runId.current;

    const play = async () => {
      while (alive()) {
        for (let index = stepRef.current; index < 4; index += 1) {
          if (!alive()) return;
          setStep(index);

          if (index === 0) {
            await moveTo(0, alive);
            await wait(STEP_HOLD[0], alive);
            continue;
          }

          if (index === 1) {
            if (columnRef.current < 1) await moveTo(1, alive);
            if (!alive()) return;
            await wait(280, alive);
            await moveTo(2, alive);
            await wait(STEP_HOLD[1], alive);
            continue;
          }

          await moveTo(BOARD_STORY_TARGET_COLUMN[index], alive);
          await wait(STEP_HOLD[index], alive);
        }

        if (!alive()) return;
        setStep(0);
        await moveTo(0, alive);
      }
    };

    void play();
    return () => {
      runId.current += 1;
      setMoving(false);
    };
  }, [inView, moveTo, paused, reducedMotion]);

  useEffect(() => {
    if (!paused) return;
    const timer = window.setTimeout(() => setPaused(false), RESUME_MS);
    return () => window.clearTimeout(timer);
  }, [paused, step]);

  const selectStep = useCallback(
    (next: number) => {
      const index = Math.max(0, Math.min(3, next));
      gen.current += 1;
      setPaused(true);
      setStep(index);
      setColumn(BOARD_STORY_TARGET_COLUMN[index]);
      setMoving(false);
    },
    [],
  );

  return { ref, step, column, moving, inView, selectStep };
}
