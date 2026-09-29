"use client";

import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import {
  ACCENT_STYLES,
  normalizeAccent,
  type FeatureAccentColor,
} from "@/components/feature-bento/accent";

export type { FeatureAccentColor, FeatureAccent } from "@/components/feature-bento/accent";

export type FeatureCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  accentColor: FeatureAccentColor | "teal";
  href?: string;
  previewGraphic?: ReactNode;
  /** @deprecated Use previewGraphic */
  preview?: ReactNode;
  featured?: boolean;
  /** Side-by-side text + preview (desktop). */
  split?: boolean;
  className?: string;
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function FeatureCard({
  title,
  description,
  icon,
  accentColor,
  href = "/features",
  previewGraphic,
  preview,
  featured = false,
  split = false,
  className = "",
}: FeatureCardProps) {
  const accent = normalizeAccent(accentColor);
  const styles = ACCENT_STYLES[accent];
  const graphic = previewGraphic ?? preview;
  const useSplit = split || featured;

  return (
    <article
      className={cx(
        "group relative flex h-full flex-col overflow-hidden rounded-[22px]",
        "border border-slate-200/75 bg-white",
        "shadow-[0_16px_40px_-24px_rgba(15,23,42,0.3)]",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:shadow-[0_24px_50px_-22px_rgba(15,23,42,0.38)]",
        "dark:border-slate-700/55 dark:bg-[#121a2d]/95 dark:shadow-black/25",
        "dark:hover:shadow-black/40",
        styles.ringHover,
        featured ? "p-6 sm:p-7 lg:p-8" : "p-5 sm:p-6 lg:p-7",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cx(
          "feature-card-glow pointer-events-none absolute inset-0 bg-gradient-to-br opacity-90",
          styles.glow,
        )}
      />

      <div
        className={cx(
          "relative z-[1] flex min-h-0 flex-1",
          useSplit ? "flex-col lg:flex-row lg:items-stretch lg:gap-6" : "flex-col",
        )}
      >
        <div className={cx("flex min-w-0 flex-col", useSplit && "lg:w-[45%] lg:shrink-0")}>
          <span
            aria-hidden="true"
            className={cx(
              "inline-flex h-14 w-14 items-center justify-center rounded-2xl",
              "transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-2",
              styles.icon,
            )}
          >
            <Icon icon={icon} size="lg" />
          </span>

          <div className="mt-5">
            <h3 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl dark:text-white">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {description}
            </p>
          </div>

          <Link
            href={href}
            aria-label={`Learn more about ${title}`}
            className={cx(
              "mt-6 inline-flex items-center gap-2.5 self-start text-sm font-semibold",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
              "focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#121a2d]",
              useSplit && "lg:mt-auto lg:pt-6",
              styles.learn,
            )}
          >
            Learn more
            <span
              aria-hidden="true"
              className={cx(
                "inline-flex h-7 w-7 items-center justify-center rounded-full border",
                "transition-all duration-200 group-hover:translate-x-1",
                styles.arrow,
              )}
            >
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} />
            </span>
          </Link>
        </div>

        {graphic ? (
          <div
            aria-hidden="true"
            className={cx(
              "relative mt-6 flex-1",
              useSplit && "lg:mt-0 lg:flex lg:w-[55%] lg:items-center",
              styles.previewTint,
              "rounded-xl",
            )}
          >
            <div className="w-full transition-transform duration-300 group-hover:-translate-y-0.5">
              {graphic}
            </div>
          </div>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </article>
  );
}
