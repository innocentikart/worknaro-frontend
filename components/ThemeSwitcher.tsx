"use client";

import { useTheme } from "@/components/ThemeProvider";

export function ThemeSwitcher({ className = "" }: { className?: string }) {
  const { fullyDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-switcher ${className}`.trim()}
      aria-label={fullyDark ? "Switch to light mode" : "Switch to dark mode"}
      title={fullyDark ? "Light mode" : "Dark mode"}
      data-theme={fullyDark ? "dark" : "light"}
    >
      {/* Reflects the current active theme (dashboard Feather icons). */}
      <i
        className={`feather ${fullyDark ? "feather-moon" : "feather-sun"}`}
        aria-hidden="true"
      />
    </button>
  );
}
