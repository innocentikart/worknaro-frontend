"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Activity, Check, Zap } from "lucide-react";
import { VISITOR_AVATAR_LIST } from "@/lib/visitor-avatars";

const TEAM = VISITOR_AVATAR_LIST;

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
      <div className="hero-product">
        <figure className="hero-dash">
          <Image
            src="/product/Dash 1 Light.png"
            alt="Worknaro dashboard with workspace overview, projects, and tasks"
            fill
            priority
            sizes="(max-width: 1023px) 92vw, 80vw"
            className="hero-dash-img theme-product-image-light"
          />
          <Image
            src="/product/Dash 1 Dark.png"
            alt=""
            fill
            sizes="(max-width: 1023px) 92vw, 80vw"
            className="hero-dash-img theme-product-image-dark"
            aria-hidden="true"
          />
        </figure>

        <div className="hero-float-card hero-card-collab">
          <span className="hero-collab-avatars" aria-hidden="true">
            {TEAM.map((person) => (
              <span key={person.id} className="hero-collab-avatar">
                <Image
                  src={person.src}
                  alt=""
                  width={64}
                  height={64}
                  className="hero-collab-avatar-img"
                />
              </span>
            ))}
          </span>
          <div className="hero-float-copy">
            <p className="hero-float-title">Team Collaboration</p>
            <p className="hero-float-subtitle">Work together, achieve more</p>
          </div>
        </div>

        <svg className="hero-collab-arrow" viewBox="0 0 132 86" fill="none" aria-hidden="true">
          <path
            d="M12 16C36 22 58 44 86 64C96 71 108 74 122 70"
            stroke="currentColor"
            strokeWidth="1.65"
            strokeLinecap="round"
          />
          <path
            d="M106 60l18 12-20 1"
            stroke="currentColor"
            strokeWidth="1.65"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="hero-float-card hero-card-productivity">
          <span className="hero-float-icon" aria-hidden="true">
            <Zap className="h-4 w-4" strokeWidth={2.1} />
          </span>
          <div className="min-w-0">
            <p className="hero-float-title">Increase Productivity</p>
            <p className="hero-float-subtitle">Automate, collaborate, get more done.</p>
          </div>
        </div>

        <div className="hero-float-card hero-card-progress">
          <span className="hero-float-icon" aria-hidden="true">
            <Activity className="h-4 w-4" strokeWidth={2.1} />
          </span>
          <div className="min-w-0">
            <p className="hero-float-title">Project Progress</p>
            <div className="hero-progress-meta">
              <strong>78%</strong>
              <span>7/10</span>
            </div>
          </div>
        </div>

        <div className="hero-float-card hero-card-done">
          <span className="hero-float-icon is-success" aria-hidden="true">
            <Check className="h-4 w-4" strokeWidth={2.6} />
          </span>
          <div className="min-w-0">
            <p className="hero-float-title">Task Completed</p>
            <p className="hero-float-subtitle">Landing page design is ready</p>
          </div>
          <span className="hero-done-arrow" aria-hidden="true">
            →
          </span>
        </div>
      </div>
    </div>
  );
}
