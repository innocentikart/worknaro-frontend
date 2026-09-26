import { Suspense } from "react";
import { BetaSignupForm } from "@/components/BetaSignupForm";
import { BetaStatusBanner } from "@/components/BetaStatusBanner";
import { CTA } from "@/components/CTA";
import { ContactSplit } from "@/components/ContactSplit";
import { FAQ } from "@/components/FAQ";
import { FeatureIntro } from "@/components/FeatureIntro";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { IntegrationHub } from "@/components/IntegrationHub";
import { Pricing } from "@/components/Pricing";
import { InsightsStory } from "@/components/features/insights/InsightsStory";
import { ImportStory } from "@/components/features/import/ImportStory";
import { ProductFeaturesStory } from "@/components/product-features/ProductFeaturesStory";
import { ResourcesPreview } from "@/components/ResourcesPreview";
import { Solutions } from "@/components/Solutions";
import { Testimonials } from "@/components/Testimonials";
import { BuiltOnServicesSection } from "@/components/TrustBar";
import { fetchLandingPage } from "@/lib/landing-api";

export default async function HomePage() {
  const landing = await fetchLandingPage();
  const toggles = landing?.site?.toggles;
  const faqItems = landing?.faqs?.length
    ? landing.faqs.map((item) => ({ q: item.title, a: item.body }))
    : undefined;
  const testimonials = landing?.testimonials?.length
    ? landing.testimonials.map((item) => ({
        quote: item.body,
        name: item.title,
        role: item.meta?.role || "Role",
        company: item.meta?.company,
        avatar: item.meta?.avatar,
        initials: item.meta?.initials,
        verified: Boolean(item.meta?.verified),
        rating: item.meta?.rating ?? 5,
      }))
    : undefined;

  return (
    <>
      <Suspense fallback={null}>
        <BetaStatusBanner />
      </Suspense>
      <Hero cmsHero={landing?.hero ?? null} />
      <BuiltOnServicesSection />
      <FeatureIntro cmsHighlights={landing?.highlights ?? null} />
      <ProductFeaturesStory />
      <InsightsStory id="home-insights" compact />
      <ImportStory id="home-import" compact />
      <IntegrationHub />
      <HowItWorks cmsSteps={landing?.how_it_works ?? null} />
      <Solutions />
      {toggles?.show_pricing === false ? null : <Pricing />}
      {toggles?.show_testimonials === false ? null : (
        <Testimonials cmsItems={testimonials ?? null} />
      )}
      <ResourcesPreview />
      <ContactSplit />
      {toggles?.show_faq === false ? null : <FAQ items={faqItems} />}
      {toggles?.show_beta === false ? null : (
        <BetaSignupForm config={landing?.beta ?? null} />
      )}
      <CTA cmsCta={landing?.cta ?? null} />
    </>
  );
}
