import Link from "next/link";
import { ScrollText } from "lucide-react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import type { LegalDocumentPayload } from "@/lib/landing-api";
import { djangoRoutes, siteConfig } from "@/lib/site";

const FALLBACK_LAST_UPDATED = "October 3, 2026";

function formatUpdatedAt(value?: string | null): string {
  if (!value) {
    return FALLBACK_LAST_UPDATED;
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return FALLBACK_LAST_UPDATED;
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

type TermsLandingProps = {
  terms?: LegalDocumentPayload | null;
};

export function TermsLanding({ terms = null }: TermsLandingProps) {
  const title = terms?.title?.trim() || "Terms of Service";
  const summary =
    terms?.summary?.trim() ||
    `These Terms of Service govern access to and use of the ${siteConfig.name} website and application, including workspaces, collaboration features, and related services.`;
  const updatedLabel = formatUpdatedAt(terms?.updated_at || terms?.effective_at);
  const bodyHtml = terms?.body_html?.trim() || "";

  return (
    <section
      className="privacy-page relative overflow-hidden"
      aria-labelledby="terms-heading"
    >
      <div className="why-wrap privacy-wrap relative">
        <header className="privacy-header">
          <SectionBadge icon={ScrollText} className="mx-auto">
            Legal
          </SectionBadge>
          <h1 id="terms-heading" className="privacy-title font-display">
            {title}
          </h1>
          <p className="privacy-lead">{summary}</p>
          <p className="privacy-updated">Last updated: {updatedLabel}</p>
        </header>

        {bodyHtml ? (
          <article
            className="privacy-doc privacy-doc--cms"
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />
        ) : (
          <FallbackTermsBody />
        )}
      </div>
    </section>
  );
}

function FallbackTermsBody() {
  return (
    <article className="privacy-doc">
      <section className="privacy-section" aria-labelledby="terms-intro">
        <h2 id="terms-intro">1. Introduction</h2>
        <p>
          Welcome to Worknaro. Worknaro is a project-management and business
          workspace platform that helps teams plan, manage, and deliver work.
          These Terms of Service (“Terms”) govern your access to and use of the
          Worknaro public website and the Worknaro application (together, the
          “Service”).
        </p>
        <p>
          By accessing or using Worknaro, creating an account, joining a
          workspace, or otherwise using the Service, you agree to these Terms.
          If you do not agree, do not use the Service.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="terms-acceptance">
        <h2 id="terms-acceptance">2. Acceptance of Terms</h2>
        <p>
          You accept these Terms by creating a Worknaro account, completing
          signup (including Google Sign-In where offered), joining a workspace,
          or continuing to use the Service after notice of updated Terms.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="terms-privacy">
        <h2 id="terms-privacy">3. Data and Privacy</h2>
        <p>
          How we collect, use, and share personal information is described in
          our{" "}
          <Link href="/privacy" className="privacy-inline-link">
            Privacy Policy
          </Link>
          . These Terms do not replace the Privacy Policy; both apply.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="terms-contact">
        <h2 id="terms-contact">4. Contact Information</h2>
        <p>
          If you have questions about these Terms, contact us through the{" "}
          <Link href="/contact" className="privacy-inline-link">
            Contact
          </Link>{" "}
          page or{" "}
          <a href={djangoRoutes.contactSales()} className="privacy-inline-link">
            Contact Sales
          </a>{" "}
          in the Worknaro application.
        </p>
      </section>
    </article>
  );
}
