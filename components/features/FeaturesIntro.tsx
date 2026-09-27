"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  BarChart3,
  CheckSquare,
  CircleDollarSign,
  Clock,
  FileText,
  Layers,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";
import { FadeInWhenVisible } from "@/components/ui/AnimatedSection";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { LandingBackground } from "@/components/ui/LandingBackground";

type NodeTone = "blue" | "teal" | "purple" | "orange" | "indigo" | "green";

type EcosystemNode = {
  id: string;
  label: string;
  icon: LucideIcon;
  tone: NodeTone;
};

type CalloutItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  tone: NodeTone;
};

type Point = { x: number; y: number };

type ConnectorPath = {
  id: string;
  d: string;
};

/**
 * Orbiting capability pills — clock positions match the Features reference:
 * Tasks (12) · Time (2) · Files (3) · Finance (5) · Clients (6) · Projects (8) · Team (10)
 */
const WORKSPACE_FEATURES: EcosystemNode[] = [
  { id: "tasks", label: "Tasks", icon: CheckSquare, tone: "green" },
  { id: "time", label: "Time", icon: Clock, tone: "blue" },
  { id: "files", label: "Files", icon: FileText, tone: "purple" },
  { id: "finance", label: "Finance", icon: CircleDollarSign, tone: "orange" },
  { id: "clients", label: "Clients", icon: User, tone: "indigo" },
  { id: "projects", label: "Projects", icon: BarChart3, tone: "blue" },
  { id: "roles", label: "Team & Roles", icon: Users, tone: "purple" },
];

const LEFT_CALLOUTS: CalloutItem[] = [
  {
    title: "Team Collaboration",
    description:
      "Keep your team aligned with shared workspaces, roles, and real-time updates.",
    icon: Users,
    tone: "purple",
  },
  {
    title: "Task Management",
    description: "Organize, prioritize, and track work with simple, powerful tools.",
    icon: CheckSquare,
    tone: "green",
  },
  {
    title: "Project Planning",
    description: "Turn ideas into action with timelines, milestones, and clear progress.",
    icon: BarChart3,
    tone: "blue",
  },
];

const RIGHT_CALLOUTS: CalloutItem[] = [
  {
    title: "File Storage & Sharing",
    description: "Access and share your files securely from anywhere, on any device.",
    icon: FileText,
    tone: "purple",
  },
  {
    title: "Time & Finance",
    description: "Track time, manage budgets, and keep your business on budget.",
    icon: CircleDollarSign,
    tone: "orange",
  },
  {
    title: "Client Management",
    description:
      "Build stronger relationships with centralized client information and history.",
    icon: User,
    tone: "blue",
  },
];

function localPoint(root: DOMRect, x: number, y: number): Point {
  return { x: x - root.left, y: y - root.top };
}

function circleEdge(center: Point, radius: number, toward: Point, inset = 1): Point {
  const dx = toward.x - center.x;
  const dy = toward.y - center.y;
  const len = Math.hypot(dx, dy) || 1;
  const r = Math.max(radius - inset, 0);
  return { x: center.x + (dx / len) * r, y: center.y + (dy / len) * r };
}

/** Ray from rect center toward a point, clipped to the pill's outer edge. */
function roundedRectEdge(rect: DOMRect, root: DOMRect, toward: Point, inset = 1): Point {
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

function curvedPath(start: Point, end: Point): string {
  const mx = (start.x + end.x) / 2;
  const my = (start.y + end.y) / 2;
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const len = Math.hypot(dx, dy) || 1;
  const bow = Math.min(22, len * 0.1);
  const cx = mx - (dy / len) * bow;
  const cy = my + (dx / len) * bow;
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} Q ${cx.toFixed(2)} ${cy.toFixed(2)} ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}

function FeatureCallout({ item }: { item: CalloutItem }) {
  const Icon = item.icon;
  return (
    <article className={`features-callout features-callout-${item.tone}`}>
      <span className="features-callout-icon" aria-hidden="true">
        <Icon className="h-4 w-4" strokeWidth={1.9} />
      </span>
      <div className="features-callout-copy">
        <h3 className="features-callout-title">{item.title}</h3>
        <p className="features-callout-desc">{item.description}</p>
      </div>
    </article>
  );
}

export function FeatureEcosystem() {
  const rootRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [connectors, setConnectors] = useState<ConnectorPath[]>([]);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [orbit, setOrbit] = useState({ cx: 0, cy: 0, r: 0 });

  const measureConnectors = useCallback(() => {
    const root = rootRef.current;
    const hub = hubRef.current;
    if (!root || !hub) return;

    const rootRect = root.getBoundingClientRect();
    if (rootRect.width < 8 || rootRect.height < 8) return;

    // Prefer layout size (ignores pulse scale) so endpoints stay stable.
    const hubRadius = Math.min(hub.offsetWidth, hub.offsetHeight) / 2;
    const hubRect = hub.getBoundingClientRect();
    const hubCenter = localPoint(
      rootRect,
      hubRect.left + hubRect.width / 2,
      hubRect.top + hubRect.height / 2,
    );

    const next: ConnectorPath[] = [];
    const radii: number[] = [];

    for (const feature of WORKSPACE_FEATURES) {
      const node = nodeRefs.current[feature.id];
      if (!node) continue;

      const nodeRect = node.getBoundingClientRect();
      if (nodeRect.width < 4 || nodeRect.height < 4) continue;

      const nodeCenter = localPoint(
        rootRect,
        nodeRect.left + nodeRect.width / 2,
        nodeRect.top + nodeRect.height / 2,
      );

      radii.push(Math.hypot(nodeCenter.x - hubCenter.x, nodeCenter.y - hubCenter.y));

      const start = circleEdge(hubCenter, hubRadius, nodeCenter, 0.5);
      const end = roundedRectEdge(nodeRect, rootRect, hubCenter, 0.5);

      // Push endpoints slightly under the hub/pill faces so dashed strokes
      // never appear to stop short of the card edges.
      const underlap = 4;
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

      next.push({ id: feature.id, d: curvedPath(coveredStart, coveredEnd) });
    }

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
    const orbitEl = root.querySelector(".features-ecosystem-orbit");
    if (orbitEl) resizeObserver.observe(orbitEl);

    window.addEventListener("resize", schedule);
    document.fonts?.ready?.then(schedule).catch(() => undefined);
    // Remeasure after pill enter animations / font metrics settle.
    const settleTimer = window.setTimeout(schedule, 650);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settleTimer);
      resizeObserver.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, [measureConnectors]);

  return (
    <div ref={rootRef} className="features-ecosystem" aria-hidden="true">
      <span className="features-ecosystem-glow" />

      <svg
        className="features-ecosystem-lines"
        width={viewport.width || "100%"}
        height={viewport.height || "100%"}
        viewBox={
          viewport.width > 0
            ? `0 0 ${viewport.width} ${viewport.height}`
            : "0 0 1 1"
        }
        fill="none"
        preserveAspectRatio="none"
      >
        {orbit.r > 0 ? (
          <circle
            className="features-ecosystem-orbit-ring"
            cx={orbit.cx}
            cy={orbit.cy}
            r={orbit.r}
          />
        ) : null}

        {connectors.map((connector, index) => {
          const isFlowSpoke =
            connector.id === "tasks" || connector.id === "roles";
          return (
            <path
              key={connector.id}
              className={
                isFlowSpoke
                  ? "features-ecosystem-path features-ecosystem-path--flow"
                  : "features-ecosystem-path"
              }
              d={connector.d}
              pathLength={1}
              style={{ ["--spoke-delay" as string]: `${120 + index * 45}ms` }}
            />
          );
        })}
      </svg>

      <div className="features-ecosystem-orbit">
        <div ref={hubRef} className="features-eco-hub">
          <span className="features-eco-hub-icon">
            <Layers className="h-6 w-6" strokeWidth={1.75} />
          </span>
          <span className="features-eco-hub-label">Workspace</span>
          <span className="features-eco-hub-pulse" />
        </div>

        {WORKSPACE_FEATURES.map((node, index) => {
          const Icon = node.icon;
          return (
            <div
              key={node.id}
              ref={(el) => {
                nodeRefs.current[node.id] = el;
              }}
              className={`features-eco-node features-eco-node-${node.tone} features-eco-slot-${index + 1}`}
              style={{ ["--eco-delay" as string]: `${220 + index * 50}ms` }}
            >
              <span className="features-eco-node-icon">
                <Icon className="h-3.5 w-3.5" strokeWidth={1.95} />
              </span>
              <span className="features-eco-node-label">{node.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function FeaturesIntro() {
  return (
    <section
      className="features-intro relative"
      aria-labelledby="features-hero-heading"
    >
      <LandingBackground variant="features" />

      <div className="features-intro-wrap relative">
        <FadeInWhenVisible>
          <div className="features-intro-copy">
            <p className="features-intro-eyebrow">Built for the way you work</p>
            <h1
              id="features-hero-heading"
              className="features-intro-heading why-heading why-heading-stack font-display"
            >
              <span className="why-heading-line">Everything your workspace needs.</span>
              <span className="why-heading-line">
                <HeadingAccent>Connected in one place.</HeadingAccent>
              </span>
            </h1>
            <p className="features-intro-lead">
              Projects, tasks, clients, time, finance, and files come together in one
              multi-tenant workspace—with the roles, permissions, and context your team
              needs to work confidently.
            </p>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={120} className="features-intro-visual">
          <div className="features-intro-stage">
            <div className="features-callout-col features-callout-col-left">
              {LEFT_CALLOUTS.map((item) => (
                <FeatureCallout key={item.title} item={item} />
              ))}
            </div>

            <FeatureEcosystem />

            <div className="features-callout-col features-callout-col-right">
              {RIGHT_CALLOUTS.map((item) => (
                <FeatureCallout key={item.title} item={item} />
              ))}
            </div>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={200}>
          <div className="features-intro-bridge">
            <span className="features-intro-bridge-line" aria-hidden="true" />
            <p className="features-intro-bridge-label">Explore the workspace</p>
            <span className="features-intro-bridge-line" aria-hidden="true" />
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
