import Link from "next/link";
import { Shield } from "lucide-react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import type { PrivacyPolicyPayload } from "@/lib/landing-api";
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

type PrivacyLandingProps = {
  policy?: PrivacyPolicyPayload | null;
};

export function PrivacyLanding({ policy = null }: PrivacyLandingProps) {
  const title = policy?.title?.trim() || "Privacy Policy";
  const summary =
    policy?.summary?.trim() ||
    `This Privacy Policy explains how ${siteConfig.name} collects, uses, and shares information when you use our public website and the Worknaro application.`;
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
          Worknaro is a project-management and business workspace platform.
          This public website introduces the product. Accounts, workspaces,
          billing, and most product data are handled in the Worknaro
          application, which is hosted separately from this marketing site.
        </p>
        <p>
          By using Worknaro, you agree to the collection and use of
          information in accordance with this Privacy Policy. If you do not
          agree, please do not use the website or application.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="privacy-collect">
        <h2 id="privacy-collect">2. Information We Collect</h2>
        <p>Depending on how you use Worknaro, we may collect:</p>
        <ul>
          <li>Account and profile information you provide</li>
          <li>Workspace content you and your teammates create</li>
          <li>Authentication information when you sign in (including via Google)</li>
          <li>Usage, device, and technical information</li>
          <li>Information submitted through public forms, such as beta interest</li>
        </ul>
      </section>

      <section className="privacy-section" aria-labelledby="privacy-account">
        <h2 id="privacy-account">3. Account and Profile Information</h2>
        <p>
          When you create or manage a Worknaro account, we may process
          information such as your email address, username, name, password
          (stored in hashed form), profile details you choose to add, avatar
          images, email verification status, and communication preferences
          (for example, whether you receive certain product or community
          emails).
        </p>
        <p>
          Workspace invitations may include an invited email address so we
          can deliver the invite and connect it to the correct account.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="privacy-workspace">
        <h2 id="privacy-workspace">4. Workspace, Project, and Task Data</h2>
        <p>
          Worknaro is a multi-tenant workspace product. Within a workspace,
          users may create and manage content such as projects, tasks,
          notes, clients, leads, proposals, timesheets, finance records,
          files, calendar items, comments, attachments, tags, and related
          activity history.
        </p>
        <p>
          Access to that content is controlled by workspace membership and
          roles (such as Owner, Admin, Manager, Member, Viewer, or Guest).
          Workspace administrators determine who is invited and what they
          can see or change.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="privacy-google">
        <h2 id="privacy-google">5. Authentication and Google Sign-In</h2>
        <p>
          You may sign in to Worknaro with an email and password, or with
          Google Sign-In (and, when enabled, other supported social
          providers).
        </p>
        <p>
          If you choose Google Sign-In, Google authenticates you and may
          share information with Worknaro that is needed to create or sign
          in to your account—typically your Google account email address and
          basic profile details such as your name. Worknaro uses that
          information to create and maintain your account, verify your
          email where applicable, and connect your Google identity to your
          Worknaro user profile.
        </p>
        <p>
          Worknaro does not store Google OAuth access or refresh tokens for
          ongoing API access as part of the current Sign-In configuration.
          Google’s own collection and use of your information is governed by
          Google’s privacy policy and your Google account settings.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="privacy-usage">
        <h2 id="privacy-usage">6. Usage and Technical Information</h2>
        <p>
          Like most online services, Worknaro may automatically collect
          technical information when you use the website or application,
          such as browser type, device information, approximate location
          derived from network data, pages or screens viewed, referring
          URLs, timestamps, and diagnostic or error logs that help us
          operate and secure the service.
        </p>
        <p>
          The application may also record security-related events, such as
          successful or failed sign-in activity, to protect accounts and
          notify users when appropriate.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="privacy-cookies">
        <h2 id="privacy-cookies">7. Cookies and Similar Technologies</h2>
        <p>We use cookies and similar technologies for purposes such as:</p>
        <ul>
          <li>
            Keeping you signed in to the Worknaro application (session
            cookies)
          </li>
          <li>Security features such as CSRF protection</li>
          <li>Remembering language or interface preferences</li>
          <li>
            Remembering appearance preferences on this public website
            (typically via browser local storage)
          </li>
        </ul>
        <p>
          You can control cookies through your browser settings. Disabling
          certain cookies may limit features such as staying signed in.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="privacy-use">
        <h2 id="privacy-use">8. How We Use Information</h2>
        <p>We use information to:</p>
        <ul>
          <li>Provide, maintain, and improve Worknaro</li>
          <li>Create and authenticate accounts, including Google Sign-In</li>
          <li>Deliver workspace features you and your teammates use</li>
          <li>Send transactional messages (for example, verification or password reset emails)</li>
          <li>Respond to sales, support, or beta interest requests</li>
          <li>Monitor reliability, prevent abuse, and protect security</li>
          <li>Meet legal obligations where applicable</li>
        </ul>
      </section>

      <section className="privacy-section" aria-labelledby="privacy-share">
        <h2 id="privacy-share">9. How We Share Information</h2>
        <p>We may share information:</p>
        <ul>
          <li>
            With other members of your workspace, according to roles and
            permissions set in that workspace
          </li>
          <li>
            With service providers that help us operate Worknaro (for
            example, hosting or email delivery), who process information on
            our behalf
          </li>
          <li>
            When required by law, or to protect the rights, safety, or
            security of Worknaro, our users, or others
          </li>
          <li>
            In connection with a business transaction such as a merger or
            acquisition, where permitted by law
          </li>
        </ul>
        <p>We do not sell your personal information.</p>
      </section>

      <section className="privacy-section" aria-labelledby="privacy-third">
        <h2 id="privacy-third">10. Third-Party Services</h2>
        <p>
          Worknaro relies on third-party services to operate. Depending on
          configuration, these may include:
        </p>
        <ul>
          <li>
            <strong>Google</strong> — for Google Sign-In authentication
          </li>
          <li>
            <strong>Email delivery providers</strong> — to send
            transactional and product-related messages
          </li>
          <li>
            Hosting, infrastructure, and operational tools needed to run the
            application
          </li>
        </ul>
        <p>
          Those providers process information under their own terms and
          privacy policies. This public website may also call the Worknaro
          application API for features such as beta signup, when enabled.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="privacy-security">
        <h2 id="privacy-security">11. Data Storage and Security</h2>
        <p>
          We use administrative, technical, and organizational measures
          designed to protect information processed by Worknaro, including
          access controls within workspaces and standard application
          security practices such as hashed passwords and secure session
          handling.
        </p>
        <p>
          No method of transmission or storage is completely secure. We
          encourage you to use a strong unique password and protect access
          to your devices and email account.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="privacy-retention">
        <h2 id="privacy-retention">12. Data Retention</h2>
        <p>
          We retain information for as long as needed to provide Worknaro,
          maintain your account and workspaces, comply with legal
          obligations, resolve disputes, and enforce our agreements.
          Retention periods can vary by data type and workspace settings.
          When information is no longer needed, we take steps to delete or
          de-identify it where appropriate.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="privacy-rights">
        <h2 id="privacy-rights">13. User Rights and Choices</h2>
        <p>
          Depending on where you live, you may have rights to access,
          correct, update, or delete certain personal information, or to
          object to or restrict certain processing. You can often update
          profile details directly in the Worknaro application.
        </p>
        <p>
          You may also adjust email preferences where the product provides
          those controls, and you can disconnect Google Sign-In from your
          Google account settings.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="privacy-deletion">
        <h2 id="privacy-deletion">14. Account and Data Deletion</h2>
        <p>
          If you want to delete your Worknaro account or request deletion of
          associated personal information, contact us using the details in
          the Contact section below. Workspace-owned content may also need
          action from a workspace owner or administrator, because that data
          can belong to the organization or team that created it.
        </p>
        <p>
          We may retain limited information when required for legal,
          security, or operational reasons (for example, records needed to
          complete a deletion request or prevent abuse).
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="privacy-children">
        <h2 id="privacy-children">15. Children&apos;s Privacy</h2>
        <p>
          Worknaro is intended for business and professional use. It is not
          directed to children, and we do not knowingly collect personal
          information from children under 13 (or the minimum age required in
          your jurisdiction). If you believe a child has provided us with
          personal information, please contact us so we can take appropriate
          steps.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="privacy-transfers">
        <h2 id="privacy-transfers">16. International Data Transfers</h2>
        <p>
          Worknaro may be accessed and operated from more than one country.
          If you use Worknaro from outside the country where our systems or
          service providers are located, your information may be processed
          in those locations. Where required, we take appropriate steps to
          protect information transferred across borders.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="privacy-changes">
        <h2 id="privacy-changes">17. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. When we do,
          we will revise the “Last updated” date at the top of this page.
          If changes are material, we may provide additional notice through
          the website or application. Continued use of Worknaro after an
          update means you accept the revised policy.
        </p>
      </section>

      <section className="privacy-section" aria-labelledby="privacy-contact">
        <h2 id="privacy-contact">18. Contact Information</h2>
        <p>
          If you have questions about this Privacy Policy or want to make a
          privacy-related request, contact us through:
        </p>
        <ul>
          <li>
            The{" "}
            <Link href="/contact" className="privacy-inline-link">
              Contact
            </Link>{" "}
            page on this website
          </li>
          <li>
            <a href={djangoRoutes.contactSales()} className="privacy-inline-link">
              Contact Sales
            </a>{" "}
            in the Worknaro application
          </li>
        </ul>
        <p>
          For product access and account issues, you can also{" "}
          <a href={djangoRoutes.login()} className="privacy-inline-link">
            sign in
          </a>{" "}
          to the Worknaro application when you already have an account.
        </p>
      </section>
    </article>
  );
}
