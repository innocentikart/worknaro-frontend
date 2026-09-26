/**
 * Public landing CMS client — falls back to local defaults when unpublished/unreachable.
 */

import { getAppUrl } from "@/lib/site";

export type LandingPayload = {
  maintenance?: boolean;
  site?: {
    name?: string;
    tagline?: string;
    short_description?: string;
    description?: string;
    footer_blurb?: string;
    toggles?: {
      show_pricing?: boolean;
      show_testimonials?: boolean;
      show_faq?: boolean;
      show_beta?: boolean;
    };
  };
  hero?: {
    eyebrow?: string;
    headline_line1?: string;
    headline_line2?: string;
    description?: string;
    primary_cta_label?: string;
    primary_cta_url?: string;
    secondary_cta_label?: string;
    secondary_cta_url?: string;
  };
  highlights?: Array<{ title: string; body: string; slug?: string }>;
  features?: Array<{
    title: string;
    eyebrow?: string;
    body: string;
    points?: string[];
    meta?: Record<string, unknown>;
    slug?: string;
  }>;
  solutions?: Array<{ title: string; body: string; slug?: string; points?: string[] }>;
  how_it_works?: Array<{ title: string; body: string; slug?: string }>;
  faqs?: Array<{ title: string; body: string; slug?: string }>;
  testimonials?: Array<{
    title: string;
    body: string;
    meta?: {
      role?: string;
      company?: string;
      initials?: string;
      avatar?: string;
      verified?: boolean;
      rating?: number;
      accent?: string;
    };
  }>;
  nav?: Array<{ title: string; meta?: { href?: string } }>;
  cta?: {
    title?: string;
    body?: string;
    meta?: { primary_label?: string; secondary_label?: string };
  };
  seo?: {
    title?: string;
    description?: string;
    og_title?: string;
    og_description?: string;
  };
  beta?: {
    enabled?: boolean;
    heading?: string;
    description?: string;
    button_label?: string;
    success_message?: string;
    show_company_field?: boolean;
    show_role_field?: boolean;
  };
  pricing?: unknown[];
};

export async function fetchLandingPage(): Promise<LandingPayload | null> {
  try {
    const res = await fetch(`${getAppUrl()}/api/v1/public/landing-page/`, {
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      return null;
    }
    const payload = (await res.json()) as LandingPayload;
    // Maintenance payload has no section content — treat as fallback-to-local.
    if (payload.maintenance) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export async function submitBetaSignup(input: {
  first_name: string;
  email: string;
  company?: string;
  role?: string;
}): Promise<{ ok: boolean; message: string }> {
  const res = await fetch(`${getAppUrl()}/api/v1/public/beta-signups/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: input.first_name,
      email: input.email,
      company: input.company || "",
      role: input.role || "",
      website: "", // honeypot
    }),
  });
  const data = (await res.json().catch(() => ({}))) as {
    ok?: boolean;
    message?: string;
    detail?: string;
  };
  if (!res.ok) {
    return {
      ok: false,
      message: data.detail || "Unable to submit right now. Please try again.",
    };
  }
  return {
    ok: true,
    message: data.message || "Thanks for joining the beta.",
  };
}
