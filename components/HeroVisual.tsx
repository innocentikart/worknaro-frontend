"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Briefcase,
  CalendarClock,
  FolderKanban,
  HardDrive,
  ShieldCheck,
  TrendingUp,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

type FloatTone = "blue" | "teal" | "indigo" | "purple" | "orange";

type FloatCardProps = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  tone: FloatTone;
  className: string;
};

function FloatCard({ title, subtitle, icon: Icon, tone, className }: FloatCardProps) {
  return (
    <div className={`hero-float-card hero-float-card-${tone} ${className}`}>
      <span className="hero-float-icon" aria-hidden="true">
        <Icon className="h-4 w-4" strokeWidth={2.1} />
      </span>
      <div className="min-w-0">
        <p className="hero-float-title">{title}</p>
        <p className="hero-float-subtitle">{subtitle}</p>
      </div>
    </div>
  );
}

function GrowthCard({ className }: { className: string }) {
  return (
    <div className={`hero-float-card hero-float-card-purple hero-float-growth ${className}`}>
      <div className="hero-float-growth-top">
        <span className="hero-float-icon" aria-hidden="true">
          <TrendingUp className="h-4 w-4" strokeWidth={2.1} />
        </span>
        <span className="hero-float-growth-badge">↑ 24%</span>
      </div>
      <p className="hero-float-title">Delivery pace</p>
      <p className="hero-float-subtitle">Projects moving faster</p>
      <svg
        className="hero-float-spark"
        viewBox="0 0 120 36"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2 28C18 26 24 18 36 16C48 14 52 24 64 20C76 16 84 8 96 10C106 12 112 6 118 4"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

const leftCards: FloatCardProps[] = [
  {
    title: "Projects & Tasks",
    subtitle: "Plan, track, deliver",
    icon: FolderKanban,
    tone: "blue",
    className: "hero-float-left-1",
  },
  {
    title: "Clients",
    subtitle: "Stronger relationships",
    icon: Briefcase,
    tone: "teal",
    className: "hero-float-left-2",
  },
  {
    title: "Time Tracking",
    subtitle: "Stay productive",
    icon: CalendarClock,
    tone: "indigo",
    className: "hero-float-left-3",
  },
  {
    title: "Finance",
    subtitle: "Billing & payments",
    icon: Wallet,
    tone: "purple",
    className: "hero-float-left-4",
  },
  {
    title: "Files",
    subtitle: "Keep work organized",
    icon: HardDrive,
    tone: "orange",
    className: "hero-float-left-5",
  },
];

export function HeroVisual() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setPlaying(entry.isIntersecting && entry.intersectionRatio >= 0.2);
      },
      { threshold: [0.15, 0.3] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`hero-visual ${playing ? "is-playing" : ""}`}>
      <span className="hero-visual-glow" aria-hidden="true" />
      <span className="hero-visual-line hero-visual-line-a" aria-hidden="true" />
      <span className="hero-visual-line hero-visual-line-b" aria-hidden="true" />

      <div className="hero-float-rail" aria-hidden="true">
        {leftCards.map((card) => (
          <FloatCard key={card.title} {...card} />
        ))}
      </div>

      <FloatCard
        title="Multi-tenant"
        subtitle="Secure & flexible"
        icon={Users}
        tone="blue"
        className="hero-float-right-1"
      />
      <FloatCard
        title="Role-based Access"
        subtitle="Owner, Admin, Manager…"
        icon={ShieldCheck}
        tone="purple"
        className="hero-float-right-2"
      />
      <GrowthCard className="hero-float-growth-pos" />

      <div className="hero-stack">
        <figure className="projects-dashboard">
          <Image
            src="/product/board.png"
            alt=""
            width={1355}
            height={653}
            sizes="(max-width: 1024px) 55vw, 28vw"
            className="projects-dashboard-img"
          />
        </figure>

        <figure className="main-dashboard">
          <Image
            src="/product/dashboard.png"
            alt="Organitio dashboard with workspace overview, projects, and tasks"
            width={1356}
            height={650}
            priority
            sizes="(max-width: 1024px) 92vw, 58vw"
            className="main-dashboard-img"
          />
        </figure>
      </div>
    </div>
  );
}
