"use client";

import { type KeyboardEvent, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { storyTabKeydown } from "@/components/features/story/useStoryCycle";

export function StoryTabs<T extends string>({
  tabs,
  tab,
  onSelect,
  label,
  prefix,
  icons,
  className,
}: {
  tabs: readonly { id: T; label: string }[];
  tab: T;
  onSelect: (id: T) => void;
  label: string;
  prefix: string;
  icons?: Partial<Record<T, LucideIcon>>;
  className?: string;
}) {
  const ids = tabs.map((item) => item.id);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    storyTabKeydown(event, ids, tab, onSelect);
  };

  return (
    <div
      className={["fst-tabs", className].filter(Boolean).join(" ")}
      role="tablist"
      aria-label={label}
      onKeyDown={onKeyDown}
    >
      {tabs.map((item) => {
        const selected = tab === item.id;
        const Icon = icons?.[item.id] as LucideIcon | undefined;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`${prefix}-tab-${item.id}`}
            aria-selected={selected}
            aria-controls={`${prefix}-panel`}
            tabIndex={selected ? 0 : -1}
            className={selected ? "is-active" : ""}
            onClick={() => onSelect(item.id)}
          >
            {Icon ? <Icon size={15} strokeWidth={2.1} aria-hidden="true" /> : null}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

export function StorySteps<T extends string>({
  steps,
  active,
  onSelect,
  label,
}: {
  steps: readonly { id: T; label: string }[];
  active: T;
  onSelect: (id: T) => void;
  label: string;
}) {
  const index = steps.findIndex((step) => step.id === active);

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    storyTabKeydown(
      event,
      steps.map((step) => step.id),
      active,
      onSelect,
    );
  };

  return (
    <ol className="fst-steps" aria-label={label}>
      {steps.map((step, stepIndex) => (
        <li key={step.id} className={stepIndex <= index ? "is-on" : ""}>
          <button
            type="button"
            aria-current={step.id === active ? "step" : undefined}
            onClick={() => onSelect(step.id)}
            onKeyDown={onKeyDown}
          >
            {step.label}
          </button>
        </li>
      ))}
    </ol>
  );
}

export function StoryNote({ children }: { children: ReactNode }) {
  return <p className="fst-note">{children}</p>;
}
