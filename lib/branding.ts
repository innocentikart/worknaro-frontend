/** Worknaro brand files served from the existing static asset path. */
export const BRAND_ASSET_ROOT = "/static/assets/images/Worknaro-Logos";

/** Canonical Worknaro favicon — do not substitute other sizes/formats. */
export const WORKNARO_FAVICON =
  `${BRAND_ASSET_ROOT}/favicon/worknaro-favicon-tab.png?v=worknaro-9` as const;

export const BRAND_ASSETS = {
  /**
   * Light mode uses the dark-ink wordmark. That file is `Worknaro-Light.png`.
   * `Worknaro-Dark.png` is light ink and reads as a ghost on light chrome.
   */
  logoOnLight: `${BRAND_ASSET_ROOT}/Worknaro-Light.png`,
  /**
   * Dark mode uses the light-ink wordmark. That file is `Worknaro-Dark.png`.
   * `Worknaro-Light.png` is dark ink and reads as a ghost on dark chrome.
   */
  logoOnDark: `${BRAND_ASSET_ROOT}/Worknaro-Dark.png`,
  icon: `${BRAND_ASSET_ROOT}/brand-icon.png`,
  favicon: WORKNARO_FAVICON,
  /** @deprecated Use `favicon` — kept for any leftover imports. */
  faviconIco: WORKNARO_FAVICON,
  favicon32: WORKNARO_FAVICON,
  favicon192: WORKNARO_FAVICON,
  favicon512: WORKNARO_FAVICON,
} as const;

export const BRAND_NAME = "Worknaro";
