export type StoryStage = {
  id: string;
  label: string;
  title: string;
  description: string;
  start: number;
  end: number;
};

export function stageIndexForProgress(
  stages: readonly StoryStage[],
  progress: number,
): number {
  const p = Math.min(1, Math.max(0, progress));
  const idx = stages.findIndex((stage) => p >= stage.start && p < stage.end);
  return idx === -1 ? stages.length - 1 : idx;
}

export function stageWeight(
  progress: number,
  start: number,
  end: number,
): number {
  const mid = (start + end) / 2;
  const half = (end - start) / 2 + 0.05;
  return Math.max(0, 1 - Math.abs(progress - mid) / half);
}

/** Full opacity inside a stage, short crossfade at the edges. */
export function scenePresence(
  progress: number,
  start: number,
  end: number,
  fade = 0.07,
): number {
  const p = Math.min(1.05, Math.max(0, progress));
  if (p >= start && p < end) return 1;
  if (p >= start - fade && p < start) return (p - (start - fade)) / fade;
  if (p >= end && p < end + fade) return 1 - (p - end) / fade;
  return 0;
}
