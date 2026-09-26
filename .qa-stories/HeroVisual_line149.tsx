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
    <div className={`hero-glass pointer-events-none absolute z-30 flex items-center gap-3 ${className ?? ""}`}>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#3b82f6]/20 text-[#60a5fa]">
        {icon === "check" ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M20 6L9 17l-5-5"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
        <p className="text-[13px] font-semibold leading-tight tracking-tight">{title}</p>
        <p className="mt-0.5 text-[11px] leading-snug opacity-65">{subtitle}</p>
      </div>
    </div>
  );
}

export function HeroVisual() {
  return (
    <div className="hero-visual relative mx-auto w-full">
      <div className="hero-visual-glow" aria-hidden="true" />
      <div className="hero-deco-rings" aria-hidden="true">
        <span className="hero-ring hero-ring-a" />
        <span className="hero-ring hero-ring-b" />
        <span className="hero-ring hero-ring-c" />
      </div>

      <GlassCallout
        title="Organize your work"
        subtitle="Projects, tasks and more"
        icon="check"
        className="hero-float-a left-[2%] top-[4%] sm:left-[-2%] sm:top-[6%] lg:left-[-4%] lg:top-[8%]"
      />

      <GlassCallout
        title="Track progress"
        subtitle="In real-time"
        icon="chart"
        className="hero-float-b right-[-1%] top-[38%] sm:right-[-4%] sm:top-[40%] lg:right-[-6%] lg:top-[42%]"
      />

      <div className="hero-float-secondary absolute bottom-[6%] left-[-2%] z-20 w-[48%] overflow-hidden rounded-[14px] border border-white/12 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.75)] sm:left-[-6%] sm:bottom-[8%] sm:w-[44%] lg:left-[-8%] lg:w-[42%]">
        <Image
          src="/product/board.png"
          alt=""
          width={960}
          height={540}
          className="h-auto w-full"
        />
      </div>

      <figure className="hero-dashboard relative z-10 ml-auto w-[92%] overflow-hidden rounded-[16px] border border-white/12 shadow-[0_40px_90px_-30px_rgba(15,23,42,0.95)] sm:w-[90%]">
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
