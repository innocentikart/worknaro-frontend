import type { Metadata } from "next";
import { PrivacyLanding } from "@/components/PrivacyLanding";
import { fetchPublishedPrivacyPolicy } from "@/lib/landing-api";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const policy = await fetchPublishedPrivacyPolicy();
  const title = policy?.title?.trim() || "Privacy Policy";
  const description =
    policy?.summary?.trim() ||
    `Privacy Policy for ${siteConfig.name}, explaining how we collect, use, and share information across the Worknaro website and application, including Google Sign-In.`;

  return {
    title: {
      absolute: `${title} | Worknaro`,
    },
    description,
    alternates: { canonical: "/privacy" },
    openGraph: {
      title: `${title} | Worknaro`,
      description,
      url: "/privacy",
    },
  };
}

export default async function PrivacyPage() {
  const policy = await fetchPublishedPrivacyPolicy();
  return <PrivacyLanding policy={policy} />;
}
