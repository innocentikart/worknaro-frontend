export const BOARD_STORY_STEPS = [
  { id: "board", index: "01", title: "The workspace board", progress: "Board" },
  { id: "move", index: "02", title: "Work is picked up", progress: "Move" },
  { id: "review", index: "03", title: "It waits in Review", progress: "Review" },
  { id: "done", index: "04", title: "Completed", progress: "Done" },
] as const;

export const BOARD_STORY_COLUMNS = [
  { key: "not_started", label: "Backlog", tone: "slate" },
  { key: "pending", label: "To Do", tone: "blue" },
  { key: "in_progress", label: "In Progress", tone: "violet" },
  { key: "on_hold", label: "Review", tone: "amber" },
  { key: "completed", label: "Completed", tone: "green" },
] as const;

export const BOARD_STORY_TARGET_COLUMN = [0, 2, 3, 4] as const;

export const BOARD_GHOSTS = [3, 2, 2, 2, 2] as const;

export const HERO_TASK = {
  name: "Hero section",
  meta: "Alex · High · WR-204",
};
