"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { useTheme } from "@/components/ThemeProvider";
import { djangoRoutes, navLinks } from "@/lib/site";

const SCROLL_DISTANCE = 160;

export function Navbar() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const headerRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";
  const overlay = isHome && !scrolled && !open;
  const onDarkHero = overlay && theme === "dark";

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let frame = 0;
    let ticking = false;

    const applyProgress = () => {
      ticking = false;
      const reduce =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const raw = Math.min(Math.max(window.scrollY / SCROLL_DISTANCE, 0), 1);
      const progress = reduce ? (raw > 0.5 ? 1 : 0) : raw;
      header.style.setProperty("--nav-scroll-progress", progress.toFixed(4));
      setScrolled(window.scrollY > 8);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      frame = window.requestAnimationFrame(applyProgress);
    };

    applyProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={`landing-header transition duration-300 ${
        overlay
          ? "border-b border-transparent bg-transparent"
          : "border-b border-line bg-background/90 backdrop-blur-xl shadow-[0_8px_24px_-20px_rgba(40,60,80,0.45)]"
      }`}
      style={{ ["--nav-scroll-progress" as string]: "0" }}
    >
      <div className="hero-wrap landing-header-bar relative flex items-center justify-between gap-4 py-3.5">
        <div className="landing-header-brand">
          <Logo onClick={() => setOpen(false)} inverted={onDarkHero} />
        </div>

        <nav
          className="landing-header-nav absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 lg:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`landing-nav-link rounded-md px-3 py-2 text-[13px] font-medium ${
                  onDarkHero ? "text-white/70" : "text-slate"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <span className="landing-nav-mark" aria-hidden="true" />
                <span className="landing-nav-label">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="landing-header-actions hidden items-center gap-2.5 lg:flex">
          <ThemeSwitcher
            className={
              onDarkHero
                ? "theme-switcher--on-dark"
                : ""
            }
          />
          <a
            href={djangoRoutes.login()}
            className={`px-2 text-[13px] font-medium transition ${
              onDarkHero ? "text-white/75 hover:text-white" : "text-slate hover:text-primary"
            }`}
          >
            Sign In
          </a>
          <a
            href={djangoRoutes.register()}
            className="hero-cta-primary inline-flex items-center justify-center rounded-full px-4 py-2 text-[13px] font-semibold text-white transition duration-200"
          >
            Get Started
          </a>
        </div>

        <div className="landing-header-actions flex items-center gap-2 lg:hidden">
          <ThemeSwitcher
            className={
              onDarkHero
                ? "theme-switcher--on-dark"
                : ""
            }
          />
          <button
            type="button"
            className="landing-chrome-control"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`landing-menu-toggle${open ? " is-open" : ""}`} aria-hidden="true">
              <span className="landing-menu-toggle-line" />
              <span className="landing-menu-toggle-line landing-menu-toggle-line-short" />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="landing-nav-chrome landing-nav-panel flex flex-col gap-[var(--space-4)] border-t border-line bg-surface-elevated lg:hidden"
        >
          <nav className="flex flex-col" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="landing-nav-link rounded-md px-3 py-2.5 text-sm font-medium text-ink-soft"
                aria-current={pathname === link.href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                <span className="landing-nav-mark" aria-hidden="true" />
                <span className="landing-nav-label">{link.label}</span>
              </Link>
            ))}
          </nav>
          <div className="landing-nav-actions">
            <a href={djangoRoutes.login()} className="hero-btn hero-cta-secondary">
              Sign In
            </a>
            <a href={djangoRoutes.register()} className="hero-cta-primary hero-btn btn-shine">
              Get Started
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
