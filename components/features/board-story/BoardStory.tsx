"use client";

import { type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, LayoutGrid, Search, UserRound } from "lucide-react";
import {
  BOARD_GHOSTS,
  BOARD_STORY_COLUMNS,
  BOARD_STORY_STEPS,
  HERO_TASK,
} from "@/components/features/board-story/boardStoryData";
import { useBoardStory } from "@/components/features/board-story/useBoardStory";
import { HeadingAccent } from "@/components/ui/HeadingAccent";

const EASE = [0.22, 1, 0.36, 1] as const;

export function BoardStory() {
  const reduce = useReducedMotion();
  const { ref, step, column, moving, selectStep } = useBoardStory({
    reducedMotion: !!reduce,
  });

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      selectStep((step + 1) % 4);
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      selectStep((step + 3) % 4);
    }
    if (event.key === "Home") {
      event.preventDefault();
      selectStep(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      selectStep(3);
    }
  };

  return (
    <section
      ref={ref}
      id="collaboration"
      className="wbs-section pfs-section scroll-mt-24"
      aria-labelledby="collaboration-heading"
    >
      <div className="wbs-ambient" aria-hidden="true" />
      <div className="why-wrap wbs-wrap">
        <div className="wbs-layout">
          <div className="wbs-copy">
            <p className="audience-eyebrow">Tasks and the workflow board</p>
            <h2 id="collaboration-heading" className="pfs-heading font-display">
              Work moves <HeadingAccent>across the board.</HeadingAccent>
            </h2>
            <p className="pfs-lead">
              The workspace board uses Backlog, To Do, In Progress, Review, and Completed.
              Review is the label for on_hold — there is no separate review status.
            </p>

            <div
              className="wbs-steps"
              role="listbox"
              aria-label="Workflow story steps"
              aria-activedescendant={`wbs-step-${step}`}
              tabIndex={0}
              onKeyDown={onKeyDown}
            >
              {BOARD_STORY_STEPS.map((item, index) => {
                const active = index === step;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="option"
                    id={`wbs-step-${index}`}
                    aria-selected={active}
                    tabIndex={-1}
                    className={`wbs-step ${active ? "is-active" : ""}`}
                    onMouseEnter={() => selectStep(index)}
                    onFocus={() => selectStep(index)}
                    onClick={() => selectStep(index)}
                  >
                    <span className="wbs-step-index" aria-hidden="true">
                      {item.index}
                    </span>
                    <span className="wbs-step-title">{item.title}</span>
                  </button>
                );
              })}
            </div>

            <div className="wbs-progress" aria-hidden="true">
              <div className="wbs-progress-track">
                <div
                  className="wbs-progress-fill"
                  style={{ width: `${((step + 1) / BOARD_STORY_STEPS.length) * 100}%` }}
                />
              </div>
              <div className="wbs-progress-labels">
                {BOARD_STORY_STEPS.map((item, index) => (
                  <span key={item.id} className={index === step ? "is-active" : ""}>
                    {item.progress}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="wbs-visual">
            <div className="pfs-viz wbs-board" aria-live="polite">
              <div className="wbs-chrome">
                <span className="wbs-brand">
                  <LayoutGrid size={14} strokeWidth={2.2} aria-hidden="true" />
                  Worknaro
                </span>
                <span className="wbs-chrome-actions">
                  <Search size={14} strokeWidth={2} aria-hidden="true" />
                  <UserRound size={14} strokeWidth={2} aria-hidden="true" />
                </span>
              </div>

              <div className="wbs-cols">
                {BOARD_STORY_COLUMNS.map((item, index) => {
                  const focused = column === index;
                  const doneCol = item.key === "completed";
                  return (
                    <div
                      key={item.key}
                      className={`wbs-col wbs-col-${item.tone} ${focused ? "is-focus" : ""} ${
                        doneCol ? "is-done-col" : ""
                      }`}
                    >
                      <p>
                        <i />
                        {item.label}
                        <b>{BOARD_GHOSTS[index] + (column === index ? 1 : 0)}</b>
                      </p>
                      {column === index ? (
                        <motion.article
                          layout
                          layoutId="wbs-hero"
                          className={`wbs-card ${column === 4 ? "is-complete" : ""} ${
                            moving ? "is-moving" : ""
                          }`}
                          transition={{ duration: reduce ? 0 : 0.55, ease: EASE }}
                        >
                          <strong>{HERO_TASK.name}</strong>
                          <span>{HERO_TASK.meta}</span>
                          <AnimatePresence>
                            {column === 4 ? (
                              <motion.em
                                className="wbs-check"
                                initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: reduce ? 0 : 0.28 }}
                                aria-hidden="true"
                              >
                                <Check size={11} strokeWidth={2.6} />
                              </motion.em>
                            ) : null}
                          </AnimatePresence>
                        </motion.article>
                      ) : (
                        <span className="wbs-slot" />
                      )}
                      {Array.from({ length: BOARD_GHOSTS[index] }, (_, ghost) => (
                        <span
                          key={`${item.key}-${ghost}`}
                          className={`wbs-ghost ${doneCol && ghost === 0 ? "is-done" : ""}`}
                        />
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
