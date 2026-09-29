import type { Metadata } from "next";
import { AboutLanding } from "@/components/AboutLanding";
import { CTA } from "@/components/CTA";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${siteConfig.name}, a modern project-management and business workspace platform.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <AboutLanding />
      <div className="landing-page-body">
        <CTA />
      </div>
    </>
  );
}
