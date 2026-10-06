import type { Metadata } from "next";
import { TermsLanding } from "@/components/TermsLanding";
import { fetchPublishedTermsOfService } from "@/lib/landing-api";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const terms = await fetchPublishedTermsOfService();
  const title = terms?.title?.trim() || "Terms of Service";
  const description =
    terms?.summary?.trim() ||
    `Terms of Service for ${siteConfig.name}, covering accounts, workspaces, roles, User Content, billing and trials when enabled, Sign-In providers, acceptable use, and related Service terms.`;

  return {
    title: {
      absolute: `${title} | Worknaro`,
    },
    description,
    alternates: { canonical: "/terms" },
    openGraph: {
      title: `${title} | Worknaro`,
      description,
      url: "/terms",
    },
  };
}

export default async function TermsPage() {
  const terms = await fetchPublishedTermsOfService();
  return <TermsLanding terms={terms} />;
}
