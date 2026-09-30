"use client";

import {
  useCallback,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BookOpen,
  Building2,
  CalendarRange,
  ClipboardList,
  FileStack,
  FolderKanban,
  Handshake,
  Heart,
  KanbanSquare,
  Layers,
  Receipt,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Tag,
  Timer,
  Upload,
  UsersRound,
} from "lucide-react";
import { ProductPreview, type PreviewKind } from "@/components/ProductPreview";
import { FadeInWhenVisible } from "@/components/ui/AnimatedSection";
import { Icon } from "@/components/ui/Icon";
import { ThemeProductImage } from "@/components/ui/ThemeProductImage";
import { djangoRoutes } from "@/lib/site";

export type ShowcaseFeatureItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type ShowcaseAccent = "blue" | "teal" | "purple";

/** Shared shape for Home/Features modules and Solutions audiences. */
export type ShowcaseSource = {
  id: string;
  eyebrow?: string;
  title: string;
  description: string;
  points: readonly string[];
  visual: PreviewKind;
  /** Optional light/dark product screenshots (Solutions Deep dive). */
  image?: string;
  imageDark?: string;
};

type AccentTokens = {
  badge: string;
  icon: string;
  cardHover: string;
  glow: string;
  wireFrom: string;
  wireTo: string;
  dot: string;
  dotEnd: string;
  cardDot: string;
};

const ACCENTS: Record<ShowcaseAccent, AccentTokens> = {
  blue: {
    badge: "bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300",
    icon: "bg-[rgba(var(--primary-rgb),0.1)] text-[color:var(--primary)] dark:bg-[rgba(var(--primary-rgb),0.16)] dark:text-[#93b0ff]",
    cardHover:
      "hover:border-blue-200 dark:hover:border-blue-400/30 dark:hover:shadow-black/30",
    glow: "bg-blue-500/10 dark:bg-blue-400/10",
    wireFrom: "rgb(147 197 253)",
    wireTo: "rgb(191 219 254)",
    dot: "fill-blue-400 dark:fill-blue-400/70",
    dotEnd: "fill-blue-300 dark:fill-blue-400/55",
    cardDot:
      "border-blue-300 dark:border-blue-400/50 dark:bg-[#121a2d]",
  },
  teal: {
    badge: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
    icon: "bg-[rgba(var(--primary-rgb),0.1)] text-[color:var(--primary)] dark:bg-[rgba(var(--primary-rgb),0.16)] dark:text-[#93b0ff]",
    cardHover:
      "hover:border-emerald-200 dark:hover:border-emerald-400/30 dark:hover:shadow-black/30",
    glow: "bg-emerald-500/10 dark:bg-emerald-400/10",
    wireFrom: "rgb(110 231 183)",
    wireTo: "rgb(167 243 208)",
    dot: "fill-emerald-400 dark:fill-emerald-400/70",
    dotEnd: "fill-emerald-300 dark:fill-emerald-400/55",
    cardDot:
      "border-emerald-300 dark:border-emerald-400/50 dark:bg-[#121a2d]",
  },
  purple: {
    badge: "bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
    icon: "bg-[rgba(var(--primary-rgb),0.1)] text-[color:var(--primary)] dark:bg-[rgba(var(--primary-rgb),0.16)] dark:text-[#93b0ff]",
    cardHover:
      "hover:border-violet-200 dark:hover:border-violet-400/30 dark:hover:shadow-black/30",
    glow: "bg-violet-500/10 dark:bg-violet-400/10",
    wireFrom: "rgb(196 181 253)",
    wireTo: "rgb(221 214 254)",
    dot: "fill-violet-400 dark:fill-violet-400/70",
    dotEnd: "fill-violet-300 dark:fill-violet-400/55",
    cardDot:
      "border-violet-300 dark:border-violet-400/50 dark:bg-[#121a2d]",
  },
};

const FEATURE_CARD_META: Record<
  string,
  Array<{ icon: LucideIcon; title: string }>
> = {
  projects: [
    { icon: FolderKanban, title: "Integrated Project Workflows" },
    { icon: UsersRound, title: "Team Collaboration Hub" },
    { icon: Handshake, title: "Client Engagement Portal" },
  ],
  collaboration: [
    { icon: ClipboardList, title: "Task Details & Ownership" },
    { icon: KanbanSquare, title: "Workspace Workflow Board" },
    { icon: UsersRound, title: "Teams & Project Assignment" },
  ],
  "time-budget": [
    { icon: CalendarRange, title: "Calendar & Gantt Planning" },
    { icon: Timer, title: "Timesheets Against Work" },
    { icon: Receipt, title: "Invoices & Payments" },
  ],
  clients: [
    { icon: UsersRound, title: "Client Directory" },
    { icon: Handshake, title: "Lead Pipeline" },
    { icon: ClipboardList, title: "Proposals & Approvals" },
  ],
  files: [
    { icon: FileStack, title: "Workspace File Library" },
    { icon: FolderKanban, title: "Project & Task Attachments" },
    { icon: Tag, title: "Tags & Trash Recovery" },
  ],
  reporting: [
    { icon: Search, title: "Workspace-Wide Search" },
    { icon: BarChart3, title: "Project & Timesheet Reports" },
    { icon: ShieldCheck, title: "Roles & Access Control" },
  ],
  insights: [
    { icon: Sparkles, title: "Project Health Score" },
    { icon: ClipboardList, title: "Risks, Delays & Workload" },
    { icon: Search, title: "Explained Recommendations" },
  ],
  import: [
    { icon: Upload, title: "CSV, Excel & JSON Import" },
    { icon: ShieldCheck, title: "Validate, Preview & Roll Back" },
    { icon: FolderKanban, title: "Projects, Tasks & People" },
  ],
  startups: [
    { icon: Rocket, title: "Founding Workspace" },
    { icon: KanbanSquare, title: "Projects & Workflow Board" },
    { icon: Handshake, title: "Early Client Records" },
  ],
  agencies: [
    { icon: FolderKanban, title: "Client Delivery Projects" },
    { icon: ClipboardList, title: "Leads & Proposals" },
    { icon: Receipt, title: "Time & Invoices" },
  ],
  freelancers: [
    { icon: UsersRound, title: "Solo Workspace" },
    { icon: FileStack, title: "Files, Notes & Time" },
    { icon: Receipt, title: "Invoices & Estimates" },
  ],
  "small-businesses": [
    { icon: UsersRound, title: "Roles That Scale" },
    { icon: CalendarRange, title: "Shared Schedules" },
    { icon: Receipt, title: "Finance With Delivery" },
  ],
  "larger-organizations": [
    { icon: Building2, title: "Multiple Workspaces" },
    { icon: ShieldCheck, title: "Role-Based Access" },
    { icon: BarChart3, title: "Enterprise Plan Limits" },
  ],
  nonprofits: [
    { icon: Heart, title: "Shared Programs Workspace" },
    { icon: ClipboardList, title: "Tasks, Files & Calendar" },
    { icon: Layers, title: "Same Product Catalog" },
  ],
  "education-teams": [
    { icon: BookOpen, title: "Initiatives & Cohorts" },
    { icon: UsersRound, title: "Collaborative Projects" },
    { icon: Layers, title: "One Product Catalog" },
  ],
  "client-service": [
    { icon: UsersRound, title: "Client Directory" },
    { icon: Handshake, title: "Leads & Proposals" },
    { icon: Receipt, title: "Delivery & Billing" },
  ],
};

export function buildShowcaseItems(feature: ShowcaseSource): ShowcaseFeatureItem[] {
  const meta = FEATURE_CARD_META[feature.id] ?? [];
  return feature.points.map((description, index) => ({
    icon: meta[index]?.icon ?? FolderKanban,
    title: meta[index]?.title ?? `Capability ${index + 1}`,
    description,
  }));
}

type Point = { x: number; y: number };

type ConnectorGeometry = {
  paths: string[];
  start: Point | null;
  ends: Point[];
};

function buildBezier(start: Point, end: Point): string {
  const dx = Math.max(48, Math.abs(end.x - start.x) * 0.5);
  const c1x = start.x + (end.x >= start.x ? dx : -dx);
  const c2x = end.x + (end.x >= start.x ? -dx : dx);
  return `M ${start.x} ${start.y} C ${c1x} ${start.y}, ${c2x} ${end.y}, ${end.x} ${end.y}`;
}

function useFeatureConnectors(
  containerRef: RefObject<HTMLElement | null>,
  sourceRef: RefObject<HTMLElement | null>,
  targetRefs: RefObject<Array<HTMLElement | null>>,
  reverse: boolean,
) {
  const [geometry, setGeometry] = useState<ConnectorGeometry>({
    paths: [],
    start: null,
    ends: [],
  });

  const measure = useCallback(() => {
    const container = containerRef.current;
    const source = sourceRef.current;
    const targets = targetRefs.current;
    if (!container || !source || !targets?.length) return;

    if (window.matchMedia("(max-width: 1023px)").matches) {
      setGeometry({ paths: [], start: null, ends: [] });
      return;
    }

    const cRect = container.getBoundingClientRect();
    const sRect = source.getBoundingClientRect();

    const start: Point = reverse
      ? {
          x: sRect.left - cRect.left,
          y: sRect.top + sRect.height * 0.5 - cRect.top,
        }
      : {
          x: sRect.right - cRect.left,
          y: sRect.top + sRect.height * 0.5 - cRect.top,
        };

    const ends: Point[] = [];
    const paths: string[] = [];

    targets.forEach((el) => {
      if (!el) return;
      const tRect = el.getBoundingClientRect();
      const end: Point = reverse
        ? {
            x: tRect.right - cRect.left,
            y: tRect.top + tRect.height * 0.5 - cRect.top,
          }
        : {
            x: tRect.left - cRect.left,
            y: tRect.top + tRect.height * 0.5 - cRect.top,
          };
      ends.push(end);
      paths.push(buildBezier(start, end));
    });

    setGeometry({ paths, start, ends });
  }, [containerRef, reverse, sourceRef, targetRefs]);

  useLayoutEffect(() => {
    measure();

    const container = containerRef.current;
    const source = sourceRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => measure());
    observer.observe(container);
    if (source) {
      observer.observe(source);
      source.querySelectorAll("img").forEach((img) => {
        if (!img.complete) img.addEventListener("load", measure);
      });
    }
    targetRefs.current?.forEach((el) => {
      if (el) observer.observe(el);
    });

    const raf = window.requestAnimationFrame(measure);
    const t = window.setTimeout(measure, 120);

    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(raf);
      window.clearTimeout(t);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
      if (source) {
        source.querySelectorAll("img").forEach((img) => {
          img.removeEventListener("load", measure);
        });
      }
    };
  }, [containerRef, measure, sourceRef, targetRefs]);

  return geometry;
}

function FeatureRowCard({
  item,
  accent,
  reverse,
  cardRef,
}: {
  item: ShowcaseFeatureItem;
  accent: ShowcaseAccent;
  reverse: boolean;
  cardRef: (node: HTMLElement | null) => void;
}) {
  const tokens = ACCENTS[accent];

  return (
    <div
      ref={cardRef}
      className={[
        "group/card relative flex gap-4 rounded-xl border border-slate-200/80 bg-white p-4",
        "transition-all duration-200 hover:shadow-md",
        "dark:border-slate-700/60 dark:bg-[#121a2d]/90",
        tokens.cardHover,
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className={[
          "absolute top-1/2 hidden h-3 w-3 -translate-y-1/2 rounded-full border-2 bg-white lg:block",
          reverse ? "-right-1.5" : "-left-1.5",
          tokens.cardDot,
        ].join(" ")}
      />

      <span
        aria-hidden="true"
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tokens.icon}`}
      >
        <Icon icon={item.icon} size="md" />
      </span>

      <div className="min-w-0">
        <h4 className="mb-1 text-base font-semibold text-slate-900 dark:text-white">
          {item.title}
        </h4>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {item.description}
        </p>
      </div>
    </div>
  );
}

function ConnectorOverlay({
  geometry,
  accent,
  gradientId,
}: {
  geometry: ConnectorGeometry;
  accent: ShowcaseAccent;
  gradientId: string;
}) {
  if (!geometry.start || geometry.paths.length === 0) return null;
  const tokens = ACCENTS[accent];

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] hidden h-full w-full overflow-visible lg:block"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={tokens.wireFrom} stopOpacity="0.95" />
          <stop offset="100%" stopColor={tokens.wireTo} stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {geometry.paths.map((d, index) => (
        <path
          key={`wire-${index}`}
          d={d}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      ))}

      <circle
        cx={geometry.start.x}
        cy={geometry.start.y}
        r="4"
        className={tokens.dot}
      />

      {geometry.ends.map((end, index) => (
        <circle
          key={`end-${index}`}
          cx={end.x}
          cy={end.y}
          r="3.5"
          className={tokens.dotEnd}
        />
      ))}
    </svg>
  );
}

export type FeatureShowcaseSectionProps = {
  feature: ShowcaseSource;
  accent?: ShowcaseAccent;
  reverse?: boolean;
  cta?: boolean;
  /** Secondary CTA next to Get Started when `cta` is true. */
  secondaryCta?: { href: string; label: string };
  /** Show feature description under the title (Features/Solutions landing). */
  showDescription?: boolean;
  /** Hide the blurred glow behind the product preview. */
  hideGlow?: boolean;
  features?: ShowcaseFeatureItem[];
  previewKind?: PreviewKind;
  footer?: ReactNode;
};

/**
 * Split product showcase: preview + feature rows with measured SVG wires.
 */
export function FeatureShowcaseSection({
  feature,
  accent = "blue",
  reverse = false,
  cta = false,
  secondaryCta = { href: "/features", label: "Explore features" },
  showDescription = false,
  hideGlow = false,
  features: featureItems,
  previewKind,
  footer,
}: FeatureShowcaseSectionProps) {
  const items = featureItems ?? buildShowcaseItems(feature);
  const visual = previewKind ?? feature.visual;
  const headingId = `${feature.id}-heading`;
  const tokens = ACCENTS[accent];
  const gradientId = `showcase-wire-${useId().replace(/:/g, "")}`;
  const eyebrow = feature.eyebrow ?? feature.title;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const sourceRef = useRef<HTMLDivElement | null>(null);
  const targetRefs = useRef<Array<HTMLElement | null>>([]);
  targetRefs.current = targetRefs.current.slice(0, items.length);

  const geometry = useFeatureConnectors(
    containerRef,
    sourceRef,
    targetRefs,
    reverse,
  );

  const themeShot =
    feature.image && feature.imageDark
      ? { light: feature.image, dark: feature.imageDark }
      : null;

  const previewCol = (
    <div className="relative z-[2] lg:col-span-7">
      {!hideGlow ? (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] blur-3xl ${tokens.glow}`}
        />
      ) : null}
      <div
        ref={sourceRef}
        className={[
          "overflow-hidden rounded-2xl border border-slate-800/10 bg-white shadow-2xl",
          "dark:border-slate-700/50 dark:bg-[#0f172a]",
        ].join(" ")}
      >
        {themeShot ? (
          <ThemeProductImage
            lightSrc={themeShot.light}
            darkSrc={themeShot.dark}
            alt={`${feature.title} — Worknaro workspace screenshot`}
            width={1920}
            height={980}
            className="showcase-theme-image"
            sizes="(max-width: 1023px) 92vw, 58vw"
          />
        ) : (
          <ProductPreview kind={visual} />
        )}
      </div>
    </div>
  );

  const cardsCol = (
    <div className="relative z-[2] lg:col-span-5">
      <ul className="space-y-3" role="list">
        {items.map((item, index) => (
          <li key={item.title}>
            <FeatureRowCard
              item={item}
              accent={accent}
              reverse={reverse}
              cardRef={(node) => {
                targetRefs.current[index] = node;
              }}
            />
          </li>
        ))}
      </ul>

      {cta ? (
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={djangoRoutes.register()} className="hero-cta-primary hero-btn btn-shine">
            Get Started
            <span aria-hidden="true">→</span>
          </a>
          <Link href={secondaryCta.href} className="showcase-secondary-link">
            {secondaryCta.label}
          </Link>
        </div>
      ) : null}

      {footer}
    </div>
  );

  return (
    <FadeInWhenVisible>
      <section
        id={feature.id}
        className="relative scroll-mt-24"
        aria-labelledby={headingId}
      >
        <div className="mb-8 max-w-xl lg:mb-10">
          <p
            className={[
              "mb-4 w-max rounded-full px-3 py-1",
              "text-xs font-semibold uppercase tracking-wider",
              tokens.badge,
            ].join(" ")}
          >
            {eyebrow}
          </p>
          <h3
            id={headingId}
            className="font-display text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl dark:text-white"
          >
            {feature.title}
          </h3>
          {showDescription && feature.description ? (
            <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400">
              {feature.description}
            </p>
          ) : null}
        </div>

        <div
          ref={containerRef}
          className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-0"
        >
          <ConnectorOverlay
            geometry={geometry}
            accent={accent}
            gradientId={gradientId}
          />

          {reverse ? (
            <>
              {cardsCol}
              {previewCol}
            </>
          ) : (
            <>
              {previewCol}
              {cardsCol}
            </>
          )}
        </div>
      </section>
    </FadeInWhenVisible>
  );
}

/** @deprecated Prefer FeatureShowcaseSection — kept for existing imports. */
export { FeatureShowcaseSection as ProjectManagementSection };
