import Link from "next/link";
import { ScrollText } from "lucide-react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import type { LegalDocumentPayload } from "@/lib/landing-api";
import { djangoRoutes, siteConfig } from "@/lib/site";

const FALLBACK_LAST_UPDATED = "October 5, 2026";

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
    `These Terms of Service govern access to and use of the ${siteConfig.name} website and application, including workspaces, collaboration features, billing when enabled, and related services.`;
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
          Welcome to Worknaro. Worknaro is a multi-tenant project-management and
          business workspace platform that helps teams plan, manage, and deliver
          work across projects, tasks, clients, time tracking, finance, files,
          and related collaboration tools.
        </p>
        <p>
          These Terms of Service (“Terms”) govern your access to and use of the
          Worknaro public website and the Worknaro application (together, the
          “Service”). By accessing or using Worknaro, creating an account,
          joining a workspace, or otherwise using the Service, you agree to
          these Terms. If you do not agree, do not use the Service.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="terms-accounts">
        <h2 id="terms-accounts">2. Accounts, Workspaces, and Roles</h2>
        <p>
          You may create an account with email and password or with supported
          Sign-In providers when enabled. Worknaro is organized into workspaces
          with roles such as Owner, Admin, Manager, Member, Viewer, and Guest.
          Workspace owners and administrators manage invitations, membership,
          and permissions.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="terms-content">
        <h2 id="terms-content">3. User Content and Acceptable Use</h2>
        <p>
          You and your teammates may create User Content such as projects,
          tasks, clients, proposals, timesheets, finance records, files, and
          related activity. You retain rights in your content, subject to these
          Terms and your organization’s rights. You must use Worknaro lawfully
          and must not misuse the Service, bypass access controls, or harm other
          users or the platform.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="terms-billing">
        <h2 id="terms-billing">4. Plans, Trials, and Billing</h2>
        <p>
          Worknaro may offer free and paid plans, trials, and sales-assisted
          Enterprise arrangements. Paid plans may renew automatically until
          canceled through the billing tools provided. Fees are generally
          non-refundable once charged unless the purchase flow or applicable law
          requires otherwise.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="terms-privacy">
        <h2 id="terms-privacy">5. Privacy</h2>
        <p>
          How we collect, use, and share personal information is described in
          our{" "}
          <Link href="/privacy" className="privacy-inline-link">
            Privacy Policy
          </Link>
          . These Terms do not replace the Privacy Policy; both apply.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="terms-liability">
        <h2 id="terms-liability">6. Disclaimers and Liability</h2>
        <p>
          To the maximum extent permitted by law, the Service is provided “as
          is” and “as available.” Worknaro’s aggregate liability is limited as
          described in the full Terms published through Worknaro’s legal pages.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="terms-contact">
        <h2 id="terms-contact">7. Contact</h2>
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
        <p>
          The complete Terms of Service are published through Worknaro’s Super
          Admin legal document system and served on this page when available.
        </p>
      </section>
    </article>
  );
}
