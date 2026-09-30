/** @deprecated Kept for call-site compatibility; all variants share the home pattern. */
export type SectionDotsVariant =
  | "hero"
  | "features"
  | "solutions"
  | "resources"
  | "about"
  | "contact";

const SHARED_PATCHES = [
  "hero-dots hero-dots-patch-tl",
  "hero-dots hero-dots-patch-tr",
  "hero-dots hero-dots-patch-bl",
  "hero-dots hero-dots-patch-br",
] as const;

/**
 * Shared landing-hero dots — same four corner grid patches as the home hero.
 * Center stays clear for copy / visuals.
 */
export function SectionDotsFrame({
  variant: _variant = "hero",
}: {
  variant?: SectionDotsVariant;
}) {
  void _variant;

  return (
    <div className="section-dots-frame section-dots-frame--hero" aria-hidden="true">
      {SHARED_PATCHES.map((className) => (
        <span key={className} className={className} />
      ))}
    </div>
  );
}
