"use client";

import { Moon, Sun } from "lucide-react";
import { useAppearance } from "@/components/ThemeProvider";
import { nextGlobalTheme } from "@/lib/appearance";

/**
 * Topbar global theme control (Django sun/moon parity).
 * Applies Header + Skin + Footer together and syncs Appearance radios.
 * Icon is action-oriented: Moon → apply Dark everywhere; Sun → apply Light everywhere.
 */
export function ThemeSwitcher({ className = "" }: { className?: string }) {
  const { appearance, fullyDark, applyGlobalTheme } = useAppearance();
  const target = nextGlobalTheme(appearance);
  const Icon = target === "dark" ? Moon : Sun;
  const label =
    target === "dark"
      ? "Switch to default dark theme"
      : "Switch to default light theme";
  const title =
    target === "dark"
      ? "Default dark theme (Header, Skin & Footer)"
      : "Default light theme (Header, Skin & Footer)";

  return (
    <button
      type="button"
      onClick={() => {
        const scrollY = window.scrollY;
        applyGlobalTheme(target);
        // Keep scroll stable if theme reflow tries to move the viewport.
        if (window.scrollY !== scrollY) {
          window.scrollTo(0, scrollY);
        }
      }}
      className={`theme-switcher ${className}`.trim()}
      aria-label={label}
      title={title}
      data-theme={fullyDark ? "dark" : "light"}
      data-theme-action={target}
    >
      <Icon className="theme-switcher-icon" aria-hidden="true" />
    </button>
  );
}
