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
    role_options?: string[];
    team_size_options?: string[];
    updated_at?: string;
    campaign?: BetaCampaignConfig;
  };
  pricing?: unknown[];
};

export type BetaCampaignConfig = {
  show_notification_bar?: boolean;
  notification_message?: string;
  notification_cta?: string;
  show_popup?: boolean;
  popup_heading?: string;
  popup_description?: string;
  popup_button_label?: string;
  popup_trigger?: "disabled" | "delay" | "scroll" | string;
  popup_delay_seconds?: number;
  popup_scroll_percent?: number;
};

export type LegalDocumentPayload = {
  published: boolean;
  title: string;
  summary: string;
  body_html: string;
  updated_at?: string | null;
  effective_at?: string | null;
  version_label?: string;
  public_path?: string;
};

/** @deprecated Prefer LegalDocumentPayload */
export type PrivacyPolicyPayload = LegalDocumentPayload;

async function fetchPublishedLegalDocument(
  path: string,
): Promise<LegalDocumentPayload | null> {
  try {
    const res = await fetch(`${getAppUrl()}${path}`, {
      // Keep Super Admin publishes visible quickly for Google OAuth review.
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      return null;
    }
    const payload = (await res.json()) as LegalDocumentPayload;
    if (!payload?.published || !payload.body_html?.trim()) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export async function fetchPublishedPrivacyPolicy(): Promise<LegalDocumentPayload | null> {
  return fetchPublishedLegalDocument("/api/v1/public/privacy-policy/");
}

export async function fetchPublishedTermsOfService(): Promise<LegalDocumentPayload | null> {
  return fetchPublishedLegalDocument("/api/v1/public/terms-of-service/");
}

export async function fetchLandingPage(): Promise<LandingPayload | null> {
  try {
    const res = await fetch(`${getAppUrl()}/api/v1/public/landing-page/`, {
      next: { revalidate: 10 },
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

export async function fetchPublicBetaConfig(): Promise<NonNullable<LandingPayload["beta"]> | null> {
  try {
    const res = await fetch(`${getAppUrl()}/api/v1/public/landing-page/`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    const payload = (await res.json()) as LandingPayload;
    if (payload.maintenance) return null;
    return payload.beta ?? null;
  } catch {
    return null;
  }
}

export async function submitBetaSignup(input: {
  first_name: string;
  email: string;
  company?: string;
  role?: string;
  team_size?: string;
  notes?: string;
}): Promise<{ ok: boolean; message: string }> {
  try {
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
        team_size: input.team_size || "",
        notes: input.notes || "",
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
  } catch {
    return {
      ok: false,
      message: "Unable to submit right now. Please try again.",
    };
  }
}
