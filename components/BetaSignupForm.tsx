"use client";

import { type ReactNode } from "react";
import { Shield, Sparkles, Users, Zap, type LucideIcon } from "lucide-react";
import { BetaSignupFields, type BetaFormConfig } from "@/components/BetaSignupFields";
import { Reveal } from "@/components/Reveal";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { Icon } from "@/components/ui/Icon";
import { SectionBadge } from "@/components/ui/SectionBadge";

const DEFAULT_HEADING = "Join the Worknaro Beta";
const DEFAULT_DESCRIPTION =
  "Be among the first to test Worknaro, report bugs, share feedback, and help shape the product.";
const LEGACY_HEADINGS = new Set([
  "Be among the first to experience Worknaro.",
  "Be among the first to experience Organitio.",
]);
const LEGACY_DESCRIPTIONS = new Set(["Join the beta and get early access to the platform."]);

const BETA_BENEFITS: { title: string; subtitle: string; icon: LucideIcon }[] = [
  { title: "Early access", subtitle: "Be the first to try", icon: Zap },
  { title: "No commitment", subtitle: "It's free", icon: Shield },
  { title: "Shape the future", subtitle: "Your feedback matters", icon: Sparkles },
];

function renderBetaHeading(heading: string): ReactNode {
  const match = heading.match(/^(.*?)((?:Worknaro|Organitio)\.?)(.*)$/i);
  if (!match) return heading;
  return (
    <>
      {match[1]}
      <HeadingAccent>{match[2]}</HeadingAccent>
      {match[3]}
    </>
  );
}

function resolveCopy(value: string | undefined, fallback: string, legacy: Set<string>) {
  const next = (value || "").trim();
  if (!next || legacy.has(next)) return fallback;
  return next;
}

export function BetaSignupForm({
  config,
}: {
  config?: BetaFormConfig | null;
}) {
  const enabled = config?.enabled !== false;
  if (!enabled) return null;

  const heading = resolveCopy(config?.heading, DEFAULT_HEADING, LEGACY_HEADINGS);
  const description = resolveCopy(config?.description, DEFAULT_DESCRIPTION, LEGACY_DESCRIPTIONS);

  return (
    <section className="beta-section relative overflow-hidden" aria-labelledby="beta-heading">
      <div className="why-wrap relative">
        <Reveal>
          <div className="beta-card">
            <div className="beta-card-grid">
              <div className="beta-intro">
                <SectionBadge icon={Users}>Early Access</SectionBadge>
                <h2 id="beta-heading" className="beta-heading font-display">
                  {renderBetaHeading(heading)}
                </h2>
                <p className="beta-lead">{description}</p>

                <ul className="beta-benefits" aria-label="Beta benefits">
                  {BETA_BENEFITS.map((item) => (
                    <li key={item.title} className="beta-benefit">
                      <span className="beta-benefit-icon" aria-hidden="true">
                        <Icon icon={item.icon} size={15} strokeWidth={2.25} />
                      </span>
                      <span className="beta-benefit-copy">
                        <span className="beta-benefit-title">{item.title}</span>
                        <span className="beta-benefit-sub">{item.subtitle}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="beta-form-col">
                <BetaSignupFields config={config} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
