import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { HowItWorks } from "@/components/HowItWorks";
import { SolutionsLanding } from "@/components/SolutionsLanding";
import { fetchLandingPage } from "@/lib/landing-api";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "The same Organitio workspace product used by startups, agencies, freelancers, and client-service teams—not separate industry editions.",
  alternates: { canonical: "/solutions" },
};

export default async function SolutionsPage() {
  const landing = await fetchLandingPage();
  return (
    <>
      <SolutionsLanding />
      <HowItWorks cmsSteps={landing?.how_it_works ?? null} />
      <CTA cmsCta={landing?.cta ?? null} />
    </>
  );
}
