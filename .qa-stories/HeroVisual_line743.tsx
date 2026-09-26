import Image from "next/image";

function GlassCallout({
  title,
  subtitle,
  icon,
  className,
}: {
  title: string;
  subtitle: string;
  icon: "check" | "chart";
  className?: string;
}) {
  return (
    <div
      className={`hero-glass pointer-events-none absolute z-30 flex items-center gap-3 ${className ?? ""}`}
    >
      <span className="hero-glass-icon" aria-hidden="true">
        {icon === "check" ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 6L9 17l-5-5"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 19V11M10 19V7M15 19v-5M20 19V9"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </span>
      <div className="min-w-0">
        <p className="hero-glass-title">{title}</p>
        <p className="hero-glass-subtitle">{subtitle}</p>
      </div>
    </div>
  );
}

export function HeroVisual() {
  return (
    <div className="hero-showcase">
      <div className="showcase-background" aria-hidden="true">
        <span className="showcase-glow showcase-glow-blue" />
        <span className="showcase-glow showcase-glow-purple" />
        <span className="showcase-glow showcase-glow-cyan" />
        <span className="abstract-shape shape-one" />
        <span className="abstract-shape shape-two" />
        <span className="abstract-shape shape-three" />
        <svg
          className="decorative-ring"
          viewBox="0 0 420 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="heroRingGrad" x1="40" y1="360" x2="380" y2="40">
              <stop stopColor="#a855f7" stopOpacity="0" />
              <stop offset="0.28" stopColor="#c084fc" stopOpacity="0.9" />
              <stop offset="0.55" stopColor="#818cf8" stopOpacity="0.75" />
              <stop offset="0.82" stopColor="#60a5fa" stopOpacity="0.55" />
              <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle
            cx="210"
            cy="210"
            r="168"
            stroke="url(#heroRingGrad)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray="42 18 8 22"
            opacity="0.9"
          />
          <circle
            cx="210"
            cy="210"
            r="148"
            stroke="url(#heroRingGrad)"
            strokeWidth="1"
            opacity="0.35"
          />
        </svg>
      </div>

      <GlassCallout
        title="Organize your work"
        subtitle="Projects, tasks and more"
        icon="check"
        className="organize-card"
      />

      <GlassCallout
        title="Track progress"
        subtitle="In real-time"
        icon="chart"
        className="progress-card"
      />

      <figure className="main-dashboard">
        <Image
          src="/product/dashboard.png"
          alt="Organitio dashboard with workspace overview, projects, and tasks"
          width={1920}
          height={980}
          priority
          className="main-dashboard-img"
        />
      </figure>

      <figure className="projects-dashboard">
        <Image
          src="/product/board.png"
          alt=""
          width={960}
          height={720}
          className="projects-dashboard-img"
        />
      </figure>
    </div>
  );
}
