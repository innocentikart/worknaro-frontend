/** Worknaro brand files served from the existing static asset path. */
export const BRAND_ASSET_ROOT = "/static/assets/images/Worknaro-Logos";

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
  faviconIco: `${BRAND_ASSET_ROOT}/favicon/favicon.ico`,
  favicon32: `${BRAND_ASSET_ROOT}/favicon/worknaro-favicon-32.png`,
  favicon192: `${BRAND_ASSET_ROOT}/favicon/worknaro-favicon-192.png`,
  favicon512: `${BRAND_ASSET_ROOT}/favicon/worknaro-favicon-512.png`,
} as const;

export const BRAND_NAME = "Worknaro";
