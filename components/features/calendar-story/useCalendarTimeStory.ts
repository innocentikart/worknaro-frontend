"use client";

import { CALENDAR_TIME_TABS } from "@/components/features/calendar-story/calendarStoryData";
import { useStoryCycle } from "@/components/features/story/useStoryCycle";

export function useCalendarTimeStory({ reducedMotion = false }: { reducedMotion?: boolean }) {
  return useStoryCycle({
    tabs: CALENDAR_TIME_TABS,
    reducedMotion,
    sceneMs: 3400,
    holdMs: 650,
  });
}
