import Link from "next/link";
import { Shield } from "lucide-react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import type { PrivacyPolicyPayload } from "@/lib/landing-api";
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

type PrivacyLandingProps = {
  policy?: PrivacyPolicyPayload | null;
};

export function PrivacyLanding({ policy = null }: PrivacyLandingProps) {
  const title = policy?.title?.trim() || "Privacy Policy";
  const summary =
    policy?.summary?.trim() ||
    `This Privacy Policy explains how ${siteConfig.name} collects, uses, and shares information when you use our public website and the Worknaro application, including accounts, workspaces, billing when enabled, and Sign-In providers.`;
  const updatedLabel = formatUpdatedAt(policy?.updated_at || policy?.effective_at);
  const bodyHtml = policy?.body_html?.trim() || "";

  return (
    <section
      className="privacy-page relative overflow-hidden"
      aria-labelledby="privacy-heading"
    >
      <div className="why-wrap privacy-wrap relative">
        <header className="privacy-header">
          <SectionBadge icon={Shield} className="mx-auto">
            Legal
          </SectionBadge>
          <h1 id="privacy-heading" className="privacy-title font-display">
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
          <FallbackPrivacyBody />
        )}
      </div>
    </section>
  );
}

function FallbackPrivacyBody() {
  return (
    <article className="privacy-doc">
      <section className="privacy-section" aria-labelledby="privacy-intro">
        <h2 id="privacy-intro">1. Introduction</h2>
        <p>
          Worknaro is a multi-tenant project-management and business workspace
          platform. This public website introduces the product. Accounts,
          workspaces, billing, and most product data are handled in the
          Worknaro application, which is hosted separately from this marketing
          site.
        </p>
        <p>
          By using Worknaro, you agree to the collection and use of information
          in accordance with this Privacy Policy. Our{" "}
          <Link href="/terms" className="privacy-inline-link">
            Terms of Service
          </Link>{" "}
          also apply.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="privacy-collect">
        <h2 id="privacy-collect">2. Information We Collect</h2>
        <p>Depending on how you use Worknaro, we may collect:</p>
        <ul>
          <li>Account and profile information you provide</li>
          <li>Workspace content you and your teammates create</li>
          <li>
            Authentication information when you sign in (including Google or
            Apple Sign-In when enabled)
          </li>
          <li>Billing and subscription information when paid plans are used</li>
          <li>Usage, device, and security-related technical information</li>
          <li>Public form submissions such as beta interest or sales inquiries</li>
        </ul>
      </section>

      <section className="privacy-section" aria-labelledby="privacy-workspace">
        <h2 id="privacy-workspace">3. Workspaces and Roles</h2>
        <p>
          Access to workspace content is controlled by membership and roles
          such as Owner, Admin, Manager, Member, Viewer, or Guest. Workspace
          administrators determine who is invited and what they can see or
          change.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="privacy-auth">
        <h2 id="privacy-auth">4. Sign-In and Billing</h2>
        <p>
          Worknaro may use email/password authentication and supported Sign-In
          providers. Paid plans may involve payment providers such as Stripe.
          We do not sell your personal information.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="privacy-rights">
        <h2 id="privacy-rights">5. Your Rights and Deletion</h2>
        <p>
          Depending on where you live, you may have rights to access, correct,
          update, or delete certain personal information. You can often update
          profile details in the application. Account or personal-data deletion
          requests can be made through the contact options below; workspace
          content may also require owner or administrator action.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="privacy-contact">
        <h2 id="privacy-contact">6. Contact</h2>
        <p>
          If you have questions about this Privacy Policy or want to make a
          privacy-related request, contact us through the{" "}
          <Link href="/contact" className="privacy-inline-link">
            Contact
          </Link>{" "}
          page or{" "}
          <a href={djangoRoutes.contactSales()} className="privacy-inline-link">
            Contact Sales
          </a>{" "}
          in the Worknaro application. You can also{" "}
          <a href={djangoRoutes.login()} className="privacy-inline-link">
            sign in
          </a>{" "}
          when you already have an account.
        </p>
        <p>
          The complete Privacy Policy is published through Worknaro’s Super
          Admin legal document system and served on this page when available.
        </p>
      </section>
    </article>
  );
}
