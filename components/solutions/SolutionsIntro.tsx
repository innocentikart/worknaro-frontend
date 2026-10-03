"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  Briefcase,
  Building2,
  Layers,
  Rocket,
  Store,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";
import { FadeInWhenVisible } from "@/components/ui/AnimatedSection";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { SectionDotsFrame } from "@/components/ui/SectionDotsFrame";

type NodeTone = "blue" | "teal" | "purple" | "orange";

type MapNode = {
  id: string;
  label: string;
  meta: string;
  icon: LucideIcon;
  tone: NodeTone;
  href: string;
};

type Point = { x: number; y: number };

type ConnectorPath = {
  id: string;
  d: string;
};

/**
 * Audience categories for the Solutions ecosystem.
 * Distinct from Features (capabilities) — these are who the workspace is for.
 */
const MAP_NODES: MapNode[] = [
  {
    id: "startups",
    label: "Startups",
    meta: "Build & ship",
    icon: Rocket,
    tone: "blue",
    href: "#startups",
  },
  {
    id: "agencies",
    label: "Agencies",
    meta: "Client delivery",
    icon: Briefcase,
    tone: "teal",
    href: "#agencies",
  },
  {
    id: "freelancers",
    label: "Freelancers",
    meta: "Solo workflows",
    icon: UserRound,
    tone: "purple",
    href: "#freelancers",
  },
  {
    id: "client-service",
    label: "Client service",
    meta: "Accounts & delivery",
    icon: Users,
    tone: "orange",
    href: "#client-service",
  },
  {
    id: "small-businesses",
    label: "Small businesses",
    meta: "Ops in one place",
    icon: Store,
    tone: "orange",
    href: "#small-businesses",
  },
  {
    id: "larger-organizations",
    label: "Larger orgs",
    meta: "Roles & scale",
    icon: Building2,
    tone: "blue",
    href: "#larger-organizations",
  },
];

function localPoint(root: DOMRect, x: number, y: number): Point {
  return { x: x - root.left, y: y - root.top };
}

/** Ray from rounded-rect center toward a point, clipped to the outer edge. */
function roundedRectEdge(
  rect: DOMRect,
  root: DOMRect,
  toward: Point,
  inset = 1,
): Point {
  const center = localPoint(root, rect.left + rect.width / 2, rect.top + rect.height / 2);
  const dx = toward.x - center.x;
  const dy = toward.y - center.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = dx / len;
  const ny = dy / len;
  const hw = Math.max(rect.width / 2 - inset, 0);
  const hh = Math.max(rect.height / 2 - inset, 0);
  const tx = Math.abs(nx) < 1e-6 ? Number.POSITIVE_INFINITY : hw / Math.abs(nx);
  const ty = Math.abs(ny) < 1e-6 ? Number.POSITIVE_INFINITY : hh / Math.abs(ny);
  const t = Math.min(tx, ty);
  return { x: center.x + nx * t, y: center.y + ny * t };
}

function softCurve(start: Point, end: Point): string {
  const mx = (start.x + end.x) / 2;
  const my = (start.y + end.y) / 2;
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const len = Math.hypot(dx, dy) || 1;
  const bow = Math.min(16, len * 0.09);
  const cx = mx - (dy / len) * bow;
  const cy = my + (dx / len) * bow;
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} Q ${cx.toFixed(2)} ${cy.toFixed(2)} ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}

function SolutionAudienceMap() {
  const rootRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [connectors, setConnectors] = useState<ConnectorPath[]>([]);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [orbit, setOrbit] = useState({ cx: 0, cy: 0, r: 0 });
  const [activeId, setActiveId] = useState<string | null>(null);

  const measureConnectors = useCallback(() => {
    const root = rootRef.current;
    const hub = hubRef.current;
    if (!root || !hub) return;

    const rootRect = root.getBoundingClientRect();
    if (rootRect.width < 8 || rootRect.height < 8) return;

    const hubRect = hub.getBoundingClientRect();
    const hubRadius = Math.min(hub.offsetWidth, hub.offsetHeight) / 2;
    const hubCenter = localPoint(
      rootRect,
      hubRect.left + hubRect.width / 2,
      hubRect.top + hubRect.height / 2,
    );

    const next: ConnectorPath[] = [];
    const radii: number[] = [];

    for (const node of MAP_NODES) {
      const el = nodeRefs.current[node.id];
      if (!el) continue;

      const nodeRect = el.getBoundingClientRect();
      if (nodeRect.width < 4 || nodeRect.height < 4) continue;

      const nodeCenter = localPoint(
        rootRect,
        nodeRect.left + nodeRect.width / 2,
        nodeRect.top + nodeRect.height / 2,
      );

      radii.push(Math.hypot(nodeCenter.x - hubCenter.x, nodeCenter.y - hubCenter.y));

      const start = roundedRectEdge(hubRect, rootRect, nodeCenter, 0.5);
      const end = roundedRectEdge(nodeRect, rootRect, hubCenter, 0.5);

      // Tuck endpoints under card faces so dashes never stop short.
      const underlap = 3.5;
      const coveredStart = (() => {
        const dx = hubCenter.x - start.x;
        const dy = hubCenter.y - start.y;
        const len = Math.hypot(dx, dy) || 1;
        return {
          x: start.x + (dx / len) * underlap,
          y: start.y + (dy / len) * underlap,
        };
      })();
      const coveredEnd = (() => {
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const len = Math.hypot(dx, dy) || 1;
        return {
          x: end.x + (dx / len) * underlap,
          y: end.y + (dy / len) * underlap,
        };
      })();

      if (Math.hypot(coveredEnd.x - coveredStart.x, coveredEnd.y - coveredStart.y) < 8) {
        continue;
      }

      next.push({ id: node.id, d: softCurve(coveredStart, coveredEnd) });
    }

    // Match /features: ring rides the node orbit so it clears the dotted disc.
    const avgRadius =
      radii.length > 0
        ? radii.reduce((sum, value) => sum + value, 0) / radii.length
        : Math.min(rootRect.width, rootRect.height) * 0.38;

    setOrbit({
      cx: hubCenter.x,
      cy: hubCenter.y,
      r: Math.max(avgRadius - 6, hubRadius + 28),
    });
    setViewport({ width: rootRect.width, height: rootRect.height });
    setConnectors(next);
  }, []);

  useLayoutEffect(() => {
    measureConnectors();
  }, [measureConnectors]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measureConnectors);
    };

    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(root);
    if (hubRef.current) resizeObserver.observe(hubRef.current);
    const orbitEl = root.querySelector(".solutions-map-orbit");
    if (orbitEl) resizeObserver.observe(orbitEl);

    window.addEventListener("resize", schedule);
    document.fonts?.ready?.then(schedule).catch(() => undefined);
    const settleTimer = window.setTimeout(schedule, 650);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settleTimer);
      resizeObserver.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, [measureConnectors]);

  return (
    <div ref={rootRef} className="solutions-map">
      <span className="solutions-map-glow" aria-hidden="true" />

      <svg
        className="solutions-map-lines"
        width={viewport.width || "100%"}
        height={viewport.height || "100%"}
        viewBox={
          viewport.width > 0
            ? `0 0 ${viewport.width} ${viewport.height}`
            : "0 0 1 1"
        }
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {orbit.r > 0 ? (
          <circle
            className="solutions-map-orbit-ring"
            cx={orbit.cx}
            cy={orbit.cy}
            r={orbit.r}
          />
        ) : null}

        {connectors.map((connector, index) => (
          <path
            key={connector.id}
            className={
              activeId === connector.id
                ? "solutions-map-path solutions-map-path--active"
                : "solutions-map-path"
            }
            d={connector.d}
            pathLength={1}
            style={{ ["--map-spoke-delay" as string]: `${140 + index * 55}ms` }}
          />
        ))}
      </svg>

      <div className="solutions-map-orbit">
        <div ref={hubRef} className="solutions-map-hub">
          <span className="solutions-map-hub-icon" aria-hidden="true">
            <Layers className="h-5 w-5" strokeWidth={1.85} />
          </span>
          <div className="solutions-map-hub-copy">
            <span className="solutions-map-hub-kicker">Worknaro</span>
            <span className="solutions-map-hub-label">One workspace</span>
          </div>
          <span className="solutions-map-hub-pulse" aria-hidden="true" />
        </div>

        {MAP_NODES.map((node, index) => {
          const Icon = node.icon;
          return (
            <a
              key={node.id}
              href={node.href}
              ref={(el) => {
                nodeRefs.current[node.id] = el;
              }}
              className={`solutions-map-node solutions-map-node-${node.tone} solutions-map-slot-${index + 1}`}
              style={{ ["--map-delay" as string]: `${220 + index * 55}ms` }}
              onMouseEnter={() => setActiveId(node.id)}
              onMouseLeave={() => setActiveId(null)}
              onFocus={() => setActiveId(node.id)}
              onBlur={() => setActiveId(null)}
            >
              <span className="solutions-map-node-icon" aria-hidden="true">
                <Icon className="h-3.5 w-3.5" strokeWidth={1.95} />
              </span>
              <span className="solutions-map-node-text">
                <span className="solutions-map-node-label">{node.label}</span>
                <span className="solutions-map-node-meta">{node.meta}</span>
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export function SolutionsIntro() {
  return (
    <section
      className="solutions-intro relative overflow-hidden"
      aria-labelledby="solutions-hero-heading"
    >
      <SectionDotsFrame />

      <div className="solutions-intro-wrap relative">
        <div className="solutions-intro-grid">
          <FadeInWhenVisible className="solutions-intro-copy">
            <SectionBadge icon={Users}>Solutions for modern teams</SectionBadge>
            <h1 id="solutions-hero-heading" className="solutions-intro-heading why-heading font-display">
              One workspace. Built around the way{" "}
              <HeadingAccent>you work</HeadingAccent>.
            </h1>
            <p className="solutions-intro-lead">
              From growing teams to client-driven businesses, Worknaro brings projects,
              people, processes, and visibility together in one workspace designed around
              how you operate—not separate industry editions.
            </p>
            <a href="#audiences" className="solutions-intro-cue">
              Browse audiences
              <span aria-hidden="true">↓</span>
            </a>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={100} className="solutions-intro-visual">
            <SolutionAudienceMap />
          </FadeInWhenVisible>
        </div>

        <FadeInWhenVisible delay={160}>
          <div className="solutions-intro-bridge">
            <span className="solutions-intro-bridge-line" aria-hidden="true" />
            <p className="solutions-intro-bridge-label">Explore solutions</p>
            <span className="solutions-intro-bridge-line" aria-hidden="true" />
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
