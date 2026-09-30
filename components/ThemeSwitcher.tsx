"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { scrollToLandingFooter } from "@/lib/scroll-to-footer";

export function ThemeSwitcher({ className = "" }: { className?: string }) {
  const { fullyDark, toggleTheme } = useTheme();
  const Icon = fullyDark ? Moon : Sun;

  return (
    <button
      type="button"
      onClick={() => {
        toggleTheme();
        // Reveal footer so the selected theme is visible on that section.
        window.requestAnimationFrame(() => {
          scrollToLandingFooter();
        });
      }}
      className={`theme-switcher ${className}`.trim()}
      aria-label={fullyDark ? "Switch to light mode" : "Switch to dark mode"}
      title={fullyDark ? "Light mode" : "Dark mode"}
      data-theme={fullyDark ? "dark" : "light"}
    >
      <Icon className="theme-switcher-icon" aria-hidden="true" />
    </button>
  );
}
