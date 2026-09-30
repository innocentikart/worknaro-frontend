/** Smooth-scroll to the landing footer after theme/nav changes. */
export function scrollToLandingFooter() {
  if (typeof document === "undefined") return;
  const footer = document.getElementById("site-footer");
  if (!footer) return;
  footer.scrollIntoView({ behavior: "smooth", block: "start" });
}
