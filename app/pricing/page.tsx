import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";
import { PricingLandingHero } from "@/components/PricingLanding";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Worknaro pricing: Free, Starter $29/mo, Pro $79/mo, and Enterprise custom plans. Start Starter or Pro with a 14-day free trial.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PricingLandingHero />
      <div className="landing-page-body">
        <FAQ
          heading="Pricing questions"
          description="How Worknaro plans work, including Free, upgrades, and Enterprise."
        />
        <CTA />
      </div>
    </>
  );
}
