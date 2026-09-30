import { SectionDotsFrame } from "@/components/ui/SectionDotsFrame";

type LandingBackgroundVariant = "home" | "features" | "solutions" | "resources";

export function LandingBackground({
  variant,
}: {
  variant: LandingBackgroundVariant;
}) {
  return (
    <div className={`landing-bg landing-bg-${variant}`} aria-hidden="true">
      <SectionDotsFrame />
    </div>
  );
}
