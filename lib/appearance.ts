/**
 * Shared Appearance state with Django Organitio customizer.
 * Keys/classes must match static/assets/js/organitio-theme-skin.js + customizer.html.
 */

export const SKIN_DARK = "app-skin-dark";
export const SKIN_LIGHT = "app-skin-light";
export const NAV_DARK = "app-navigation-dark";
export const NAV_LIGHT = "app-navigation-light";
export const HEADER_DARK = "app-header-dark";
export const HEADER_LIGHT = "app-header-light";

export const STORAGE = {
  skin: "app-skin",
  skinDark: "app-skin-dark",
  navigation: "app-navigation",
  header: "app-header",
  fontFamily: "font-family",
  /** Legacy landing-only key; mirrored for one release of compatibility. */
  landingTheme: "organitio-landing-theme",
} as const;

export const ALL_THEME_CLASSES = [
  SKIN_DARK,
  SKIN_LIGHT,
  NAV_DARK,
  NAV_LIGHT,
  HEADER_DARK,
  HEADER_LIGHT,
] as const;

export type SkinMode = typeof SKIN_DARK | typeof SKIN_LIGHT;
export type NavigationMode = typeof NAV_DARK | typeof NAV_LIGHT;
export type HeaderMode = typeof HEADER_DARK | typeof HEADER_LIGHT;
export type ThemeMode = "light" | "dark";

export type FontOption = {
  id: string;
  label: string;
  /** Google Fonts family name, or null for system stack */
  googleFamily: string | null;
  cssStack: string;
};

/** Full typography list from Django Appearance customizer. */
export const FONT_OPTIONS: FontOption[] = [
  {
    id: "app-font-family-lato",
    label: "Lato",
    googleFamily: "Lato",
    cssStack: '"Lato", ui-sans-serif, system-ui, sans-serif',
  },
  {
    id: "app-font-family-rubik",
    label: "Rubik",
    googleFamily: "Rubik",
    cssStack: '"Rubik", ui-sans-serif, system-ui, sans-serif',
  },
  {
    id: "app-font-family-inter",
    label: "Inter",
    googleFamily: "Inter",
    cssStack: '"Inter", var(--font-inter), ui-sans-serif, system-ui, sans-serif',
  },
  {
    id: "app-font-family-cinzel",
    label: "Cinzel",
    googleFamily: "Cinzel",
    cssStack: '"Cinzel", ui-serif, Georgia, serif',
  },
  {
    id: "app-font-family-nunito",
    label: "Nunito",
    googleFamily: "Nunito",
    cssStack: '"Nunito", ui-sans-serif, system-ui, sans-serif',
  },
  {
    id: "app-font-family-roboto",
    label: "Roboto",
    googleFamily: "Roboto",
    cssStack: '"Roboto", ui-sans-serif, system-ui, sans-serif',
  },
  {
    id: "app-font-family-ubuntu",
    label: "Ubuntu",
    googleFamily: "Ubuntu",
    cssStack: '"Ubuntu", ui-sans-serif, system-ui, sans-serif',
  },
  {
    id: "app-font-family-poppins",
    label: "Poppins",
    googleFamily: "Poppins",
    cssStack: '"Poppins", ui-sans-serif, system-ui, sans-serif',
  },
  {
    id: "app-font-family-raleway",
    label: "Raleway",
    googleFamily: "Raleway",
    cssStack: '"Raleway", ui-sans-serif, system-ui, sans-serif',
  },
  {
    id: "app-font-family-system-ui",
    label: "System UI",
    googleFamily: null,
    cssStack: "system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif",
  },
  {
    id: "app-font-family-noto-sans",
    label: "Noto Sans",
    googleFamily: "Noto Sans",
    cssStack: '"Noto Sans", ui-sans-serif, system-ui, sans-serif',
  },
  {
    id: "app-font-family-fira-sans",
    label: "Fira Sans",
    googleFamily: "Fira Sans",
    cssStack: '"Fira Sans", ui-sans-serif, system-ui, sans-serif',
  },
  {
    id: "app-font-family-work-sans",
    label: "Work Sans",
    googleFamily: "Work Sans",
    cssStack: '"Work Sans", ui-sans-serif, system-ui, sans-serif',
  },
  {
    id: "app-font-family-open-sans",
    label: "Open Sans",
    googleFamily: "Open Sans",
    cssStack: '"Open Sans", ui-sans-serif, system-ui, sans-serif',
  },
  {
    id: "app-font-family-maven-pro",
    label: "Maven Pro",
    googleFamily: "Maven Pro",
    cssStack: '"Maven Pro", ui-sans-serif, system-ui, sans-serif',
  },
  {
    id: "app-font-family-quicksand",
    label: "Quicksand",
    googleFamily: "Quicksand",
    cssStack: '"Quicksand", ui-sans-serif, system-ui, sans-serif',
  },
  {
    id: "app-font-family-montserrat",
    label: "Montserrat",
    googleFamily: "Montserrat",
    cssStack: '"Montserrat", ui-sans-serif, system-ui, sans-serif',
  },
  {
    id: "app-font-family-josefin-sans",
    label: "Josefin Sans",
    googleFamily: "Josefin Sans",
    cssStack: '"Josefin Sans", ui-sans-serif, system-ui, sans-serif',
  },
  {
    id: "app-font-family-ibm-plex-sans",
    label: "IBM Plex Sans",
    googleFamily: "IBM Plex Sans",
    cssStack: '"IBM Plex Sans", ui-sans-serif, system-ui, sans-serif',
  },
  {
    id: "app-font-family-source-sans-pro",
    label: "Source Sans Pro",
    googleFamily: "Source Sans 3",
    cssStack: '"Source Sans 3", "Source Sans Pro", ui-sans-serif, system-ui, sans-serif',
  },
  {
    id: "app-font-family-montserrat-alt",
    label: "Montserrat Alt",
    googleFamily: "Montserrat Alternates",
    cssStack: '"Montserrat Alternates", ui-sans-serif, system-ui, sans-serif',
  },
  {
    id: "app-font-family-roboto-slab",
    label: "Roboto Slab",
    googleFamily: "Roboto Slab",
    cssStack: '"Roboto Slab", ui-serif, Georgia, serif',
  },
];

export const DEFAULT_FONT = "app-font-family-inter";
export const ALL_FONT_CLASSES = FONT_OPTIONS.map((f) => f.id);

export type AppearanceState = {
  skin: SkinMode;
  header: HeaderMode;
  navigation: NavigationMode;
  fontFamily: string;
};

export const DEFAULT_APPEARANCE: AppearanceState = {
  skin: SKIN_LIGHT,
  header: HEADER_LIGHT,
  navigation: NAV_LIGHT,
  fontFamily: DEFAULT_FONT,
};

function safeGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
}

function safeRemove(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

function readMode(
  keys: string[],
  darkValue: string,
  lightValue: string,
): string {
  for (const key of keys) {
    const value = safeGet(key);
    if (value === darkValue) return darkValue;
    if (value === lightValue) return lightValue;
  }
  return lightValue;
}

export function getFontOption(id: string): FontOption {
  return FONT_OPTIONS.find((f) => f.id === id) ?? FONT_OPTIONS.find((f) => f.id === DEFAULT_FONT)!;
}

export function readAppearance(): AppearanceState {
  if (typeof window === "undefined") return { ...DEFAULT_APPEARANCE };

  let skin = readMode(
    [STORAGE.skinDark, STORAGE.skin],
    SKIN_DARK,
    SKIN_LIGHT,
  ) as SkinMode;

  // Legacy landing key fallback when Django keys absent
  const hasDjangoSkin =
    safeGet(STORAGE.skin) === SKIN_DARK ||
    safeGet(STORAGE.skin) === SKIN_LIGHT ||
    safeGet(STORAGE.skinDark) === SKIN_DARK ||
    safeGet(STORAGE.skinDark) === SKIN_LIGHT;

  if (!hasDjangoSkin) {
    const legacy = safeGet(STORAGE.landingTheme);
    if (legacy === "dark") skin = SKIN_DARK;
    else if (legacy === "light") skin = SKIN_LIGHT;
    else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      skin = SKIN_DARK;
    }
  }

  const header = readMode(
    [STORAGE.header],
    HEADER_DARK,
    HEADER_LIGHT,
  ) as HeaderMode;

  const navigation = readMode(
    [STORAGE.navigation],
    NAV_DARK,
    NAV_LIGHT,
  ) as NavigationMode;

  const storedFont = safeGet(STORAGE.fontFamily);
  const fontFamily =
    storedFont && ALL_FONT_CLASSES.includes(storedFont)
      ? storedFont
      : DEFAULT_FONT;

  return { skin, header, navigation, fontFamily };
}

export function isFullyDark(state: AppearanceState): boolean {
  return (
    state.skin === SKIN_DARK &&
    state.header === HEADER_DARK &&
    state.navigation === NAV_DARK
  );
}

export function skinToTheme(skin: SkinMode): ThemeMode {
  return skin === SKIN_DARK ? "dark" : "light";
}

const FONT_LINK_ID = "organitio-appearance-font";

export function ensureFontStylesheet(fontId: string) {
  if (typeof document === "undefined") return;
  const option = getFontOption(fontId);
  const existing = document.getElementById(FONT_LINK_ID) as HTMLLinkElement | null;

  if (!option.googleFamily) {
    existing?.remove();
    return;
  }

  const href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(option.googleFamily).replace(/%20/g, "+")}:wght@400;500;600;700;800&display=swap`;

  if (existing) {
    if (existing.href !== href) existing.href = href;
    return;
  }

  const link = document.createElement("link");
  link.id = FONT_LINK_ID;
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

export function applyDomAppearance(state: AppearanceState) {
  if (typeof document === "undefined") return;
  const html = document.documentElement;

  html.classList.remove(...ALL_THEME_CLASSES, ...ALL_FONT_CLASSES);
  html.classList.add(state.skin, state.header, state.navigation, state.fontFamily);

  const theme = skinToTheme(state.skin);
  html.classList.toggle("dark", theme === "dark");
  html.style.colorScheme = theme;

  const option = getFontOption(state.fontFamily);
  html.style.setProperty("--font-sans", option.cssStack);
  html.style.setProperty("--appearance-font", option.cssStack);

  ensureFontStylesheet(state.fontFamily);
}

export function persistAppearance(state: AppearanceState) {
  safeSet(STORAGE.skin, state.skin);
  safeSet(STORAGE.skinDark, state.skin);
  safeSet(STORAGE.header, state.header);
  safeSet(STORAGE.navigation, state.navigation);
  safeSet(STORAGE.fontFamily, state.fontFamily);
  safeSet(STORAGE.landingTheme, skinToTheme(state.skin));
}

export function applyAppearance(
  partial: Partial<AppearanceState>,
  current?: AppearanceState,
): AppearanceState {
  const base = current ?? readAppearance();
  const next: AppearanceState = {
    skin: partial.skin ?? base.skin,
    header: partial.header ?? base.header,
    navigation: partial.navigation ?? base.navigation,
    fontFamily: partial.fontFamily ?? base.fontFamily,
  };
  applyDomAppearance(next);
  persistAppearance(next);
  return next;
}

/** Django topbar sun/moon: set Skin + Header + Navigation together. */
export function applyGlobalTheme(
  mode: ThemeMode,
  current?: AppearanceState,
): AppearanceState {
  const base = current ?? readAppearance();
  const dark = mode === "dark";
  return applyAppearance(
    {
      skin: dark ? SKIN_DARK : SKIN_LIGHT,
      header: dark ? HEADER_DARK : HEADER_LIGHT,
      navigation: dark ? NAV_DARK : NAV_LIGHT,
    },
    base,
  );
}

export function resetAppearance(): AppearanceState {
  safeRemove(STORAGE.skin);
  safeRemove(STORAGE.skinDark);
  safeRemove(STORAGE.header);
  safeRemove(STORAGE.navigation);
  safeRemove(STORAGE.fontFamily);
  safeRemove(STORAGE.landingTheme);
  const next = { ...DEFAULT_APPEARANCE };
  applyDomAppearance(next);
  persistAppearance(next);
  return next;
}

export const APPEARANCE_STORAGE_KEYS = [
  STORAGE.skin,
  STORAGE.skinDark,
  STORAGE.header,
  STORAGE.navigation,
  STORAGE.fontFamily,
  STORAGE.landingTheme,
] as const;
