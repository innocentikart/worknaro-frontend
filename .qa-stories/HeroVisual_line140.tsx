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
      className={`hero-glass pointer-events-none absolute z-20 flex items-start gap-3 rounded-xl px-3.5 py-3 ${className ?? ""}`}
    >
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary">
        {icon === "check" ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M20 6L9 17l-5-5"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 19V10M10 19V5M16 19v-7M22 19H2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <div>
        <p className="text-[13px] font-semibold leading-tight text-ink">{title}</p>
        <p className="mt-0.5 text-[11px] leading-snug text-slate">{subtitle}</p>
      </div>
    </div>
  );
}

export function HeroVisual() {
  return (
    <div className="hero-visual relative mx-auto w-full max-w-[560px] lg:max-w-none">
      <div className="hero-visual-glow" aria-hidden="true" />

      <GlassCallout
        title="Organize your work"
        subtitle="Projects, tasks and more"
        icon="check"
        className="hero-float-a -left-1 top-6 hidden sm:flex lg:-left-4 lg:top-10"
      />

      <GlassCallout
        title="Track progress"
        subtitle="In real-time"
        icon="chart"
        className="hero-float-b -right-1 top-[42%] hidden sm:flex lg:-right-3"
      />

      <div className="hero-float-secondary absolute -left-2 bottom-[8%] z-10 hidden w-[46%] overflow-hidden rounded-xl border border-white/10 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.85)] sm:block lg:-left-6 lg:bottom-[10%]">
        <Image
          src="/product/board.png"
          alt=""
          width={960}
          height={540}
          className="h-auto w-full"
        />
      </div>

      <figure className="hero-dashboard relative z-[5] overflow-hidden rounded-2xl border border-white/10 bg-chrome shadow-[0_30px_80px_-28px_rgba(15,23,42,0.9)]">
        <div className="flex items-center gap-2 border-b border-white/10 bg-[#0a1220] px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="ml-2 text-[11px] font-medium text-white/60">Organitio</span>
        </div>
        <Image
          src="/product/dashboard.png"
          alt="Organitio dashboard with workspace overview, projects, and tasks"
          width={1920}
          height={980}
          priority
          className="h-auto w-full"
        />
      </figure>
    </div>
  );
}
