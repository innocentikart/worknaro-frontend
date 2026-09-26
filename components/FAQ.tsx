"use client";

import { useId, useState } from "react";
import {
  Building2,
  ChevronDown,
  CircleHelp,
  Gift,
  Shield,
  UserRound,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { AccentUnderline } from "@/components/ui/AccentUnderline";
import { Icon } from "@/components/ui/Icon";
import { faqs } from "@/lib/content";

const FAQ_PILLS: { label: string; icon: LucideIcon; accent: "blue" | "teal" | "purple" }[] = [
  { label: "Quick answers", icon: Zap, accent: "blue" },
  { label: "Trusted & secure", icon: Shield, accent: "teal" },
  { label: "Always here", icon: UserRound, accent: "purple" },
];

const FAQ_ITEM_ICONS: { icon: LucideIcon; accent: "blue" | "teal" | "purple" | "orange" }[] = [
  { icon: CircleHelp, accent: "blue" },
  { icon: Users, accent: "teal" },
  { icon: Gift, accent: "purple" },
  { icon: Building2, accent: "blue" },
  { icon: CircleHelp, accent: "orange" },
  { icon: Users, accent: "purple" },
];

export function FAQ({
  items = faqs,
  heading = "Questions, answered",
  description = "Straightforward answers about Organitio, accounts, and plans.",
}: {
  items?: readonly { q: string; a: string }[];
  heading?: string;
  description?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section className="faq-section relative overflow-hidden" aria-labelledby="faq-heading">
      <div className="faq-deco faq-deco-left" aria-hidden="true">
        <span className="faq-deco-blob" />
        <span className="faq-deco-dots" />
      </div>
      <div className="faq-deco faq-deco-right" aria-hidden="true">
        <span className="faq-deco-blob" />
        <span className="faq-deco-dots" />
      </div>

      <div className="why-wrap relative grid gap-10 py-16 md:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] md:items-start md:gap-10 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] lg:gap-14 lg:py-20">
        <Reveal>
          <div className="faq-intro">
            <p className="trust-eyebrow">
              <span className="trust-eyebrow-line" aria-hidden="true" />
              FAQ
              <span className="trust-eyebrow-line" aria-hidden="true" />
            </p>
            <h2 id="faq-heading" className="faq-heading font-display">
              {heading.includes("answered") ? (
                <>
                  Questions,{" "}
                  <span className="faq-heading-accent">
                    answered
                    <AccentUnderline className="faq-underline" />
                  </span>
                </>
              ) : (
                heading
              )}
            </h2>
            <p className="faq-lead">{description}</p>

            <ul className="faq-pills" aria-label="FAQ highlights">
              {FAQ_PILLS.map((pill) => (
                <li key={pill.label}>
                  <span className={`faq-pill faq-pill-${pill.accent}`}>
                    <Icon icon={pill.icon} size={14} strokeWidth={2.25} />
                    {pill.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="faq-list">
            {items.map((item, index) => {
              const expanded = open === index;
              const panelId = `${baseId}-panel-${index}`;
              const buttonId = `${baseId}-button-${index}`;
              const meta = FAQ_ITEM_ICONS[index % FAQ_ITEM_ICONS.length];
              const ItemIcon = meta.icon;

              return (
                <div
                  key={item.q}
                  className={`faq-card ${expanded ? "is-open" : ""}`}
                >
                  <h3 className="faq-card-heading">
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={expanded}
                      aria-controls={panelId}
                      className="faq-trigger"
                      onClick={() => setOpen(expanded ? null : index)}
                    >
                      <span className={`faq-item-icon faq-item-icon-${meta.accent}`} aria-hidden="true">
                        <Icon icon={ItemIcon} size={16} strokeWidth={2.25} />
                      </span>
                      <span className="faq-question">{item.q}</span>
                      <span className={`faq-chevron ${expanded ? "is-open" : ""}`} aria-hidden="true">
                        <Icon icon={ChevronDown} size={16} strokeWidth={2.5} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`faq-answer-wrap ${expanded ? "is-open" : ""}`}
                  >
                    <div className="faq-answer-inner">
                      <p className="faq-answer">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
