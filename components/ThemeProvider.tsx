"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  APPEARANCE_STORAGE_KEYS,
  applyAppearance,
  applyDomAppearance,
  applyGlobalTheme as applyGlobalThemeLib,
  DEFAULT_APPEARANCE,
  HEADER_DARK,
  HEADER_LIGHT,
  isFullyDark,
  isFullyLight,
  NAV_DARK,
  NAV_LIGHT,
  nextGlobalTheme,
  readAppearance,
  resetAppearance as resetAppearanceLib,
  SKIN_DARK,
  SKIN_LIGHT,
  skinToTheme,
  type AppearanceState,
  type HeaderMode,
  type NavigationMode,
  type SkinMode,
  type ThemeMode,
} from "@/lib/appearance";

type AppearanceContextValue = {
  appearance: AppearanceState;
  theme: ThemeMode;
  fullyDark: boolean;
  fullyLight: boolean;
  setSkin: (skin: SkinMode) => void;
  setHeader: (header: HeaderMode) => void;
  setNavigation: (navigation: NavigationMode) => void;
  setFontFamily: (fontFamily: string) => void;
  applyGlobalTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  reset: () => void;
};

const AppearanceContext = createContext<AppearanceContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [appearance, setAppearance] = useState<AppearanceState>(DEFAULT_APPEARANCE);

  useEffect(() => {
    const initial = readAppearance();
    setAppearance(initial);
    applyDomAppearance(initial);
  }, []);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (!event.key) return;
      if (!(APPEARANCE_STORAGE_KEYS as readonly string[]).includes(event.key)) {
        return;
      }
      const next = readAppearance();
      setAppearance(next);
      applyDomAppearance(next);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setSkin = useCallback((skin: SkinMode) => {
    setAppearance((prev) => applyAppearance({ skin }, prev));
  }, []);

  const setHeader = useCallback((header: HeaderMode) => {
    setAppearance((prev) => applyAppearance({ header }, prev));
  }, []);

  const setNavigation = useCallback((navigation: NavigationMode) => {
    setAppearance((prev) => applyAppearance({ navigation }, prev));
  }, []);

  const setFontFamily = useCallback((fontFamily: string) => {
    setAppearance((prev) => applyAppearance({ fontFamily }, prev));
  }, []);

  const applyGlobalTheme = useCallback((mode: ThemeMode) => {
    setAppearance((prev) => applyGlobalThemeLib(mode, prev));
  }, []);

  const setTheme = useCallback(
    (theme: ThemeMode) => {
      applyGlobalTheme(theme);
    },
    [applyGlobalTheme],
  );

  const toggleTheme = useCallback(() => {
    setAppearance((prev) => applyGlobalThemeLib(nextGlobalTheme(prev), prev));
  }, []);

  const reset = useCallback(() => {
    setAppearance(resetAppearanceLib());
  }, []);

  const theme = skinToTheme(appearance.skin);
  const fullyDark = isFullyDark(appearance);
  const fullyLight = isFullyLight(appearance);

  const value = useMemo(
    () => ({
      appearance,
      theme,
      fullyDark,
      fullyLight,
      setSkin,
      setHeader,
      setNavigation,
      setFontFamily,
      applyGlobalTheme,
      toggleTheme,
      setTheme,
      reset,
    }),
    [
      appearance,
      theme,
      fullyDark,
      fullyLight,
      setSkin,
      setHeader,
      setNavigation,
      setFontFamily,
      applyGlobalTheme,
      toggleTheme,
      setTheme,
      reset,
    ],
  );

  return (
    <AppearanceContext.Provider value={value}>{children}</AppearanceContext.Provider>
  );
}

export function useAppearance() {
  const ctx = useContext(AppearanceContext);
  if (!ctx) {
    throw new Error("useAppearance must be used within ThemeProvider");
  }
  return ctx;
}

/** @deprecated Prefer useAppearance; kept for Navbar ThemeSwitcher compatibility. */
export function useTheme() {
  const ctx = useAppearance();
  return {
    theme: ctx.theme,
    setTheme: ctx.setTheme,
    toggleTheme: ctx.toggleTheme,
    fullyDark: ctx.fullyDark,
    fullyLight: ctx.fullyLight,
    applyGlobalTheme: ctx.applyGlobalTheme,
  };
}

// Re-export mode constants for UI components
export { SKIN_DARK, SKIN_LIGHT, HEADER_DARK, HEADER_LIGHT, NAV_DARK, NAV_LIGHT };
