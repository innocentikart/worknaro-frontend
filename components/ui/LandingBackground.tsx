import { SectionDotsFrame, type SectionDotsVariant } from "@/components/ui/SectionDotsFrame";

type LandingBackgroundVariant = "home" | "features" | "solutions" | "resources";

const DOTS_BY_BG: Record<LandingBackgroundVariant, SectionDotsVariant> = {
  home: "hero",
  features: "features",
  solutions: "solutions",
  resources: "resources",
};

export function LandingBackground({
  variant,
}: {
  variant: LandingBackgroundVariant;
}) {
  return (
    <div className={`landing-bg landing-bg-${variant}`} aria-hidden="true">
      <SectionDotsFrame variant={DOTS_BY_BG[variant]} />
    </div>
  );
}
