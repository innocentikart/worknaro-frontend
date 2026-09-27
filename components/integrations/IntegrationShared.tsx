"use client";

import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { FadeInWhenVisible, StaggerChildren } from "@/components/ui/AnimatedSection";
import { integrations } from "@/lib/content";

export type HubAccent = "stripe" | "google" | "apple" | "resend";

export type HubCard = {
  name: string;
  tag: string;
  description: string;
  accent: HubAccent;
};

const HUB_CARD_META: HubCard[] = [
  {
    name: integrations[0].name,
    tag: "STRIPE",
    description: integrations[0].description,
    accent: "stripe",
  },
  {
    name: integrations[1].name,
    tag: "GOOGLE",
    description: integrations[1].description,
    accent: "google",
  },
  {
    name: integrations[2].name,
    tag: "APPLE",
    description: integrations[2].description,
    accent: "apple",
  },
  {
    name: integrations[3].name,
    tag: "RESEND",
    description: integrations[3].description,
    accent: "resend",
  },
];

type TickerPill = {
  key: string;
  label: string;
  variant:
    | "google"
    | "google-fill"
    | "apple-dark"
    | "apple-light"
    | "resend-warm"
    | "resend-dark"
    | "stripe";
};

const TICKER_PILLS: TickerPill[] = [
  { key: "google-1", label: "Google", variant: "google" },
  { key: "apple-1", label: "Apple", variant: "apple-dark" },
  { key: "apple-2", label: "Apple", variant: "apple-light" },
  { key: "resend-1", label: "Resend", variant: "resend-warm" },
  { key: "resend-2", label: "Resend", variant: "resend-dark" },
  { key: "stripe-1", label: "Stripe", variant: "stripe" },
  { key: "google-2", label: "Google", variant: "google-fill" },
];

function StripeIllustration({ idPrefix }: { idPrefix: string }) {
  const body = `${idPrefix}-stripe-body`;
  const coin = `${idPrefix}-stripe-coin`;
  return (
    <svg viewBox="0 0 88 88" className="h-[4.5rem] w-[4.5rem]" aria-hidden="true">
      <defs>
        <linearGradient id={body} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7C8CFF" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>
        <linearGradient id={coin} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <rect x="18" y="14" width="44" height="60" rx="8" fill={`url(#${body})`} />
      <rect x="24" y="22" width="32" height="20" rx="4" fill="#EEF2FF" opacity="0.95" />
      <rect x="26" y="48" width="18" height="4" rx="2" fill="#C7D2FE" />
      <rect x="26" y="56" width="28" height="4" rx="2" fill="#C7D2FE" />
      <circle cx="64" cy="28" r="14" fill={`url(#${coin})`} />
      <circle cx="64" cy="28" r="9" fill="none" stroke="#B45309" strokeWidth="1.5" opacity="0.45" />
      <text x="64" y="32" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400E">
        $
      </text>
    </svg>
  );
}

function GoogleIllustration({ idPrefix }: { idPrefix: string }) {
  const shield = `${idPrefix}-google-shield`;
  return (
    <svg viewBox="0 0 88 88" className="h-[4.5rem] w-[4.5rem]" aria-hidden="true">
      <defs>
        <linearGradient id={shield} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ECFDF5" />
          <stop offset="100%" stopColor="#A7F3D0" />
        </linearGradient>
      </defs>
      <path
        d="M44 12 68 22v18c0 16.5-10.8 28.8-24 34-13.2-5.2-24-17.5-24-34V22L44 12Z"
        fill={`url(#${shield})`}
        stroke="#34D399"
        strokeWidth="2"
      />
      <path
        d="M44 30c-6.6 0-12 5.4-12 12 0 5.2 3.3 9.6 8 11.3V60h8V53.3c4.7-1.7 8-6.1 8-11.3 0-6.6-5.4-12-12-12Z"
        fill="#fff"
      />
      <path d="M40 42h8v2.5h-3V50h-2v-5.5H40V42Z" fill="#4285F4" />
      <circle cx="44" cy="38" r="2.2" fill="#EA4335" />
    </svg>
  );
}

function AppleIllustration({ idPrefix }: { idPrefix: string }) {
  const metal = `${idPrefix}-apple-metal`;
  return (
    <svg viewBox="0 0 88 88" className="h-[4.5rem] w-[4.5rem]" aria-hidden="true">
      <defs>
        <linearGradient id={metal} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF7ED" />
          <stop offset="45%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>
      <circle cx="44" cy="44" r="30" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" opacity="0.55" />
      <path
        d="M49.8 28.2c-.4 2.6-1.7 4.8-3.5 6.3-1.9 1.6-4.1 2.5-6.4 2.3-.3-2.5 1-5.1 2.8-6.8 1.9-1.8 4.5-2.9 7.1-2.8ZM56.8 48.5c-.6 1.4-1.3 2.7-2.1 3.9-1.4 2-2.9 3.8-5.1 3.8-2.1 0-2.8-1.3-5.4-1.3s-3.4 1.3-5.5 1.3c-2.2 0-3.9-2.1-5.3-4.1-3-4.3-5.3-12.2-2.2-17.5 1.5-2.7 4.1-4.4 7-4.5 2.1 0 4.1 1.4 5.4 1.4s3.6-1.7 6.1-1.5c1 .1 4 0.4 5.9 3.1-0.2.1-3.5 2-3.5 6.1 0 4.8 4.2 6.4 4.7 6.6-.1.3-.7 2.5-1.9 4.7Z"
        fill={`url(#${metal})`}
      />
    </svg>
  );
}

function ResendIllustration({ idPrefix }: { idPrefix: string }) {
  const env = `${idPrefix}-resend-env`;
  return (
    <svg viewBox="0 0 88 88" className="h-[4.5rem] w-[4.5rem]" aria-hidden="true">
      <defs>
        <linearGradient id={env} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FED7AA" />
          <stop offset="100%" stopColor="#FB7185" />
        </linearGradient>
      </defs>
      <path d="M12 34h10l6-10" stroke="#FB7185" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
      <path d="M16 44h12" stroke="#FB7185" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
      <path d="M14 54h14" stroke="#FB7185" strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
      <rect x="28" y="26" width="44" height="34" rx="6" fill={`url(#${env})`} />
      <path d="M28 32 50 48 72 32" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M28 56 42 44" stroke="#fff" strokeWidth="2" opacity="0.7" />
      <path d="M72 56 58 44" stroke="#fff" strokeWidth="2" opacity="0.7" />
    </svg>
  );
}

function illustrationFor(accent: HubAccent, idPrefix: string): ReactNode {
  switch (accent) {
    case "stripe":
      return <StripeIllustration idPrefix={idPrefix} />;
    case "google":
      return <GoogleIllustration idPrefix={idPrefix} />;
    case "apple":
      return <AppleIllustration idPrefix={idPrefix} />;
    case "resend":
      return <ResendIllustration idPrefix={idPrefix} />;
  }
}

function BrandMark({ variant }: { variant: TickerPill["variant"] }) {
  if (variant === "google" || variant === "google-fill") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#EA4335" d="M12 10.2v3.6h5.1c-.2 1.3-1.6 3.7-5.1 3.7-3.1 0-5.6-2.5-5.6-5.6S8.9 6.4 12 6.4c1.8 0 2.9.7 3.6 1.3l2.4-2.3C16.6 4.1 14.5 3 12 3 7.6 3 4 6.6 4 11s3.6 8 8 8c4.6 0 7.7-3.2 7.7-7.8 0-.5-.1-1-.2-1.4H12Z" />
        <path fill="#34A853" d="M4.9 14.5 7.8 12A4.7 4.7 0 0 1 7.4 11c0-.7.2-1.4.5-2L4.9 7.5A7.9 7.9 0 0 0 4 11c0 1.3.3 2.5.9 3.5Z" />
        <path fill="#FBBC05" d="M12 4.6c1.7 0 2.9.7 3.6 1.3l2.5-2.4C16.6 2.3 14.5 1.4 12 1.4 9.1 1.4 6.5 3 5 5.4l2.9 2.2C8.7 6 10.2 4.6 12 4.6Z" />
        <path fill="#4285F4" d="M12 20.6c2.5 0 4.6-.8 6.1-2.3l-2.8-2.2c-.8.6-1.9 1-3.3 1-2.5 0-4.6-1.7-5.3-3.9l-2.9 2.2c1.5 3 4.5 5.2 8.2 5.2Z" />
      </svg>
    );
  }
  if (variant.startsWith("apple")) {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16.7 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 0.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2-1.1 2.8-2.2c.9-1.3 1.3-2.5 1.3-2.6-.1 0-2.5-1-2.5-3.6ZM14.8 5.7c.6-.8 1.1-1.8.9-2.9-0.9.1-2 .6-2.7 1.4-.6.7-1.1 1.8-.9 2.8 1 .1 2-.5 2.7-1.3Z" />
      </svg>
    );
  }
  if (variant.startsWith("resend")) {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 8l8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  }
  if (variant === "stripe") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.5 9.2c0-.8.6-1.1 1.7-1.1 1.5 0 3.4.5 4.9 1.3V5.2A12 12 0 0 0 15.1 4C11.4 4 8.9 5.9 8.9 9.4c0 5.4 7.4 4.5 7.4 6.9 0 .9-.8 1.2-2 1.2-1.7 0-3.9-.7-5.6-1.7v4.3A13 13 0 0 0 14.5 21c3.9 0 6.6-1.9 6.6-5.5-.1-5.9-7.6-4.9-7.6-6.3Z" />
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.9 9.6.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.4-3.4-1.4-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.2-4.6-5.1 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.7.7 1.1 1.6 1.1 2.7 0 4-2.3 4.8-4.6 5.1.4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10.2 10.2 0 0 0 22 12.2C22 6.6 17.5 2 12 2Z" />
    </svg>
  );
}

const PILL_STYLES: Record<TickerPill["variant"], string> = {
  google: "bg-white text-slate-800 border border-slate-200/80",
  "google-fill":
    "bg-gradient-to-br from-blue-500 via-emerald-400 to-amber-300 text-white border border-transparent",
  "apple-dark": "bg-[#0f172a] text-white border border-slate-800",
  "apple-light": "bg-slate-200/90 text-slate-800 border border-slate-300/80",
  "resend-warm": "bg-[#FFE4D6] text-[#9A3412] border border-[#FDBA74]/60",
  "resend-dark": "bg-slate-950 text-white border border-slate-800",
  stripe: "bg-[#E0E7FF] text-[#3730A3] border border-[#A5B4FC]/50",
};

function TickerRow({ suffix }: { suffix: string }) {
  return (
    <div className="flex shrink-0 items-center gap-3 pr-3" aria-hidden={suffix !== "a"}>
      {TICKER_PILLS.map((pill) => (
        <span
          key={`${pill.key}-${suffix}`}
          className={[
            "inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold shadow-sm",
            PILL_STYLES[pill.variant],
          ].join(" ")}
        >
          <BrandMark variant={pill.variant} />
          {pill.label}
        </span>
      ))}
    </div>
  );
}

export function IntegrationBrandTicker({ label }: { label?: string }) {
  return (
    <div className="hub-ticker" aria-label={label ?? "Connected service brands"}>
      <div className="hub-ticker-track">
        <TickerRow suffix="a" />
        <TickerRow suffix="b" />
      </div>
    </div>
  );
}

export function IntegrationCard({
  card,
  idPrefix,
}: {
  card: HubCard;
  idPrefix: string;
}) {
  return (
    <article
      className={[
        "hub-card group relative flex h-full flex-col overflow-hidden rounded-2xl border p-5",
        "shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)]",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        `hub-card-${card.accent}`,
      ].join(" ")}
    >
      <div className="relative z-[1] flex items-start justify-between gap-3">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600/80 dark:text-slate-300/80">
          {card.tag}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-semibold text-slate-700 backdrop-blur-sm dark:bg-slate-950/40 dark:text-slate-200">
          <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" strokeWidth={2.6} aria-hidden="true" />
          Connected
        </span>
      </div>

      <div className="relative z-[1] mt-5 flex flex-1 items-start gap-4">
        <div className="hub-card-art shrink-0 transition duration-300 group-hover:scale-105 group-hover:-rotate-2">
          {illustrationFor(card.accent, idPrefix)}
        </div>
        <div className="min-w-0 pt-1">
          <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            {card.name}
          </h3>
          <p className="mt-2 text-[13px] leading-relaxed text-slate-700/90 dark:text-slate-300">
            {card.description}
          </p>
        </div>
      </div>
    </article>
  );
}

export function IntegrationCardsGrid({
  idPrefix,
  className = "landing-to-content grid gap-5 sm:grid-cols-2 xl:grid-cols-4",
}: {
  idPrefix: string;
  className?: string;
}) {
  return (
    <StaggerChildren className={className}>
      {HUB_CARD_META.map((card) => (
        <FadeInWhenVisible key={card.name} className="h-full">
          <IntegrationCard card={card} idPrefix={`${idPrefix}-${card.accent}`} />
        </FadeInWhenVisible>
      ))}
    </StaggerChildren>
  );
}
