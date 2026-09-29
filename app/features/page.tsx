import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { FeaturesLanding } from "@/components/FeaturesLanding";
import { HowItWorks } from "@/components/HowItWorks";
import { fetchLandingPage } from "@/lib/landing-api";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Worknaro features that exist in the application: workspaces, projects, tasks, workflow board, notes, calendar, Gantt, clients, leads, proposals, timesheets, finance, files, search, reports, AI Insights, and CSV/Excel/JSON import.",
  alternates: { canonical: "/features" },
};

export default async function FeaturesPage() {
  const landing = await fetchLandingPage();
  return (
    <>
      <FeaturesLanding />
      <div className="features-page-body">
        <HowItWorks cmsSteps={landing?.how_it_works ?? null} />
        <CTA cmsCta={landing?.cta ?? null} />
      </div>
    </>
  );
}
