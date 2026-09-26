export type FeatureAccentColor = "blue" | "emerald" | "purple" | "indigo" | "orange";

/** @deprecated Prefer FeatureAccentColor — kept for existing imports. */
export type FeatureAccent = FeatureAccentColor;

export type AccentStyles = {
  icon: string;
  glow: string;
  learn: string;
  arrow: string;
  ringHover: string;
  previewTint: string;
};

export const ACCENT_STYLES: Record<FeatureAccentColor, AccentStyles> = {
  blue: {
    icon: "bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-blue-500/25",
    glow: "from-blue-50/90 via-transparent to-transparent dark:from-blue-500/10",
    learn: "text-blue-600 dark:text-blue-300",
    arrow: "border-blue-200 text-blue-600 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 dark:border-blue-400/40 dark:text-blue-300",
    ringHover: "group-hover:border-blue-200/90 dark:group-hover:border-blue-400/30",
    previewTint: "bg-blue-50/50 dark:bg-blue-500/5",
  },
  emerald: {
    icon: "bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-emerald-500/25",
    glow: "from-emerald-50/90 via-transparent to-transparent dark:from-emerald-500/10",
    learn: "text-emerald-600 dark:text-emerald-300",
    arrow: "border-emerald-200 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 dark:border-emerald-400/40 dark:text-emerald-300",
    ringHover: "group-hover:border-emerald-200/90 dark:group-hover:border-emerald-400/30",
    previewTint: "bg-emerald-50/40 dark:bg-emerald-500/5",
  },
  purple: {
    icon: "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-violet-500/25",
    glow: "from-violet-50/90 via-transparent to-transparent dark:from-violet-500/10",
    learn: "text-violet-600 dark:text-violet-300",
    arrow: "border-violet-200 text-violet-600 group-hover:bg-violet-500 group-hover:text-white group-hover:border-violet-500 dark:border-violet-400/40 dark:text-violet-300",
    ringHover: "group-hover:border-violet-200/90 dark:group-hover:border-violet-400/30",
    previewTint: "bg-violet-50/40 dark:bg-violet-500/5",
  },
  indigo: {
    icon: "bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-indigo-500/25",
    glow: "from-indigo-50/90 via-transparent to-transparent dark:from-indigo-500/10",
    learn: "text-indigo-600 dark:text-indigo-300",
    arrow: "border-indigo-200 text-indigo-600 group-hover:bg-indigo-500 group-hover:text-white group-hover:border-indigo-500 dark:border-indigo-400/40 dark:text-indigo-300",
    ringHover: "group-hover:border-indigo-200/90 dark:group-hover:border-indigo-400/30",
    previewTint: "bg-indigo-50/40 dark:bg-indigo-500/5",
  },
  orange: {
    icon: "bg-gradient-to-br from-orange-400 to-amber-500 text-white shadow-orange-500/25",
    glow: "from-orange-50/90 via-transparent to-transparent dark:from-orange-500/10",
    learn: "text-orange-600 dark:text-orange-300",
    arrow: "border-orange-200 text-orange-600 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 dark:border-orange-400/40 dark:text-orange-300",
    ringHover: "group-hover:border-orange-200/90 dark:group-hover:border-orange-400/30",
    previewTint: "bg-orange-50/40 dark:bg-orange-500/5",
  },
};

/** Map legacy "teal" accent used in earlier cards to emerald. */
export function normalizeAccent(
  accent: FeatureAccentColor | "teal",
): FeatureAccentColor {
  return accent === "teal" ? "emerald" : accent;
}
