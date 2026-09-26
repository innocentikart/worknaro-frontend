type LandingBackgroundVariant = "home" | "features" | "solutions" | "resources";

function ResourcesDecoration() {
  return (
    <>
      <span className="resources-intro-glow resources-intro-glow-copy" />
      <span className="resources-intro-glow resources-intro-glow-panel" />
      <span className="resources-intro-orb resources-intro-orb-bl" />
      <span className="resources-intro-orb resources-intro-orb-tr" />
      <span className="resources-intro-orb resources-intro-orb-tr-b" />
      <span className="resources-intro-arc resources-intro-arc-a" />
      <span className="resources-intro-arc resources-intro-arc-b" />
      <span className="resources-intro-dots" />
      <span className="resources-intro-dots resources-intro-dots-secondary" />
    </>
  );
}

function FeaturesDecoration() {
  return (
    <>
      <span className="resources-intro-glow resources-intro-glow-copy" />
      <span className="resources-intro-glow resources-intro-glow-panel" />
      <span className="resources-intro-orb resources-intro-orb-bl" />
      <span className="resources-intro-orb resources-intro-orb-tr" />
      <span className="resources-intro-orb resources-intro-orb-tr-b" />
      <span className="resources-intro-arc resources-intro-arc-a" />
      <span className="resources-intro-arc resources-intro-arc-b" />
      <span className="resources-intro-dots" />
    </>
  );
}

function SolutionsDecoration() {
  return (
    <>
      <span className="resources-intro-glow resources-intro-glow-copy" />
      <span className="resources-intro-glow resources-intro-glow-panel" />
      <span className="resources-intro-orb resources-intro-orb-bl" />
      <span className="resources-intro-orb resources-intro-orb-tr" />
      <span className="resources-intro-orb resources-intro-orb-tr-b" />
      <span className="resources-intro-arc resources-intro-arc-a" />
      <span className="resources-intro-arc resources-intro-arc-b" />
      <span className="resources-intro-dots" />
    </>
  );
}

function HomeDecoration() {
  return (
    <>
      <span className="resources-intro-glow resources-intro-glow-copy" />
      <span className="resources-intro-glow resources-intro-glow-panel" />
      <span className="resources-intro-orb resources-intro-orb-bl" />
      <span className="resources-intro-orb resources-intro-orb-tr" />
      <span className="resources-intro-orb resources-intro-orb-tr-b" />
      <span className="resources-intro-arc resources-intro-arc-a" />
      <span className="resources-intro-arc resources-intro-arc-b" />
      <span className="resources-intro-dots" />
      <span className="resources-intro-dots home-intro-dots-left" />
    </>
  );
}

export function LandingBackground({
  variant,
}: {
  variant: LandingBackgroundVariant;
}) {
  return (
    <div className={`landing-bg landing-bg-${variant}`} aria-hidden="true">
      {variant === "resources" ? <ResourcesDecoration /> : null}
      {variant === "features" ? <FeaturesDecoration /> : null}
      {variant === "solutions" ? <SolutionsDecoration /> : null}
      {variant === "home" ? <HomeDecoration /> : null}
    </div>
  );
}
