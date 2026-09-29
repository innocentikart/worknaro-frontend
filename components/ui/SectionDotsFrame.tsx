export type SectionDotsVariant =
  | "hero"
  | "features"
  | "solutions"
  | "resources"
  | "about"
  | "contact";

type DotSpec = { className: string };

const PATTERNS: Record<SectionDotsVariant, { frameClass: string; dots: DotSpec[] }> = {
  /** Home — tall frame: rails, gutters, corners, flares */
  hero: {
    frameClass: "section-dots-frame--hero",
    dots: [
      { className: "hero-dots hero-dots-rail-top" },
      { className: "hero-dots hero-dots-rail-mid" },
      { className: "hero-dots hero-dots-rail-bottom" },
      { className: "hero-dots hero-dots-side-left" },
      { className: "hero-dots hero-dots-side-right" },
      { className: "hero-dots hero-dots-corner-tl" },
      { className: "hero-dots hero-dots-corner-tr" },
      { className: "hero-dots hero-dots-corner-bl" },
      { className: "hero-dots hero-dots-corner-br" },
      { className: "hero-dots hero-dots-flare-left" },
      { className: "hero-dots hero-dots-flare-right" },
    ],
  },
  /** Features — orbital ring around the ecosystem visual */
  features: {
    frameClass: "section-dots-frame--features",
    dots: [
      { className: "feat-dots feat-dots-ring-n" },
      { className: "feat-dots feat-dots-ring-ne" },
      { className: "feat-dots feat-dots-ring-e" },
      { className: "feat-dots feat-dots-ring-se" },
      { className: "feat-dots feat-dots-ring-s" },
      { className: "feat-dots feat-dots-ring-sw" },
      { className: "feat-dots feat-dots-ring-w" },
      { className: "feat-dots feat-dots-ring-nw" },
      { className: "feat-dots feat-dots-core" },
    ],
  },
  /** Solutions — diagonal network nodes */
  solutions: {
    frameClass: "section-dots-frame--solutions",
    dots: [
      { className: "sol-dots sol-dots-node-a" },
      { className: "sol-dots sol-dots-node-b" },
      { className: "sol-dots sol-dots-node-c" },
      { className: "sol-dots sol-dots-node-d" },
      { className: "sol-dots sol-dots-node-e" },
      { className: "sol-dots sol-dots-node-f" },
      { className: "sol-dots sol-dots-bridge-tl" },
      { className: "sol-dots sol-dots-bridge-br" },
    ],
  },
  /** Resources — stacked library shelves */
  resources: {
    frameClass: "section-dots-frame--resources",
    dots: [
      { className: "res-dots res-dots-shelf-1" },
      { className: "res-dots res-dots-shelf-2" },
      { className: "res-dots res-dots-shelf-3" },
      { className: "res-dots res-dots-shelf-4" },
      { className: "res-dots res-dots-spine-l" },
      { className: "res-dots res-dots-spine-r" },
      { className: "res-dots res-dots-mark-tl" },
      { className: "res-dots res-dots-mark-br" },
    ],
  },
  /** About — vertical pillar stacks */
  about: {
    frameClass: "section-dots-frame--about",
    dots: [
      { className: "abt-dots abt-dots-pillar-1" },
      { className: "abt-dots abt-dots-pillar-2" },
      { className: "abt-dots abt-dots-pillar-3" },
      { className: "abt-dots abt-dots-pillar-4" },
      { className: "abt-dots abt-dots-base-l" },
      { className: "abt-dots abt-dots-base-r" },
      { className: "abt-dots abt-dots-cap-l" },
      { className: "abt-dots abt-dots-cap-r" },
    ],
  },
  /** Contact — asymmetric conversation path */
  contact: {
    frameClass: "section-dots-frame--contact",
    dots: [
      { className: "ctc-dots ctc-dots-path-1" },
      { className: "ctc-dots ctc-dots-path-2" },
      { className: "ctc-dots ctc-dots-path-3" },
      { className: "ctc-dots ctc-dots-path-4" },
      { className: "ctc-dots ctc-dots-anchor-tl" },
      { className: "ctc-dots ctc-dots-anchor-br" },
      { className: "ctc-dots ctc-dots-reply" },
    ],
  },
};

/** Decorative dots frames — unique pattern per landing hero / intro. */
export function SectionDotsFrame({
  variant = "hero",
}: {
  variant?: SectionDotsVariant;
}) {
  const pattern = PATTERNS[variant];

  return (
    <div className={`section-dots-frame ${pattern.frameClass}`} aria-hidden="true">
      {pattern.dots.map((dot) => (
        <span key={dot.className} className={dot.className} />
      ))}
    </div>
  );
}
