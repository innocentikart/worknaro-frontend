"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import {
  Building2,
  ChevronDown,
  CircleUserRound,
  LoaderCircle,
  Mail,
  Shield,
  Sparkles,
  User,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/ui/Icon";
import { submitBetaSignup } from "@/lib/landing-api";

type BetaConfig = {
  enabled?: boolean;
  heading?: string;
  description?: string;
  button_label?: string;
  success_message?: string;
  show_company_field?: boolean;
  show_role_field?: boolean;
};

const BETA_BENEFITS: { title: string; subtitle: string; icon: LucideIcon }[] = [
  { title: "Early access", subtitle: "Be the first to try", icon: Zap },
  { title: "No commitment", subtitle: "It's free", icon: Shield },
  { title: "Shape the future", subtitle: "Your feedback matters", icon: Sparkles },
];

const ROLE_OPTIONS = [
  "",
  "Founder / CEO",
  "Product Manager",
  "Engineering",
  "Design",
  "Marketing",
  "Operations",
  "Other",
] as const;

function renderBetaHeading(heading: string): ReactNode {
  const match = heading.match(/^(.*?)(Organitio\.?)(.*)$/i);
  if (!match) return heading;
  return (
    <>
      {match[1]}
      <span className="beta-brand-accent">{match[2]}</span>
      {match[3]}
    </>
  );
}

export function BetaSignupForm({
  config,
}: {
  config?: BetaConfig | null;
}) {
  const enabled = config?.enabled !== false;
  const formId = useId();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [hp, setHp] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!enabled) return null;

  const heading = config?.heading || "Be among the first to experience Organitio.";
  const description =
    config?.description || "Join the beta and get early access to the platform.";
  const buttonLabel = config?.button_label || "Join the Beta";
  const showCompany = config?.show_company_field !== false;
  const showRole = config?.show_role_field !== false;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError(null);
    setMessage(null);
    if (hp.trim()) {
      setMessage(config?.success_message || "Thanks for joining the beta.");
      setPending(false);
      return;
    }
    const result = await submitBetaSignup({
      first_name: firstName,
      email,
      company,
      role,
    });
    setPending(false);
    if (result.ok) {
      setMessage(result.message);
      setFirstName("");
      setEmail("");
      setCompany("");
      setRole("");
    } else {
      setError(result.message);
    }
  }

  return (
    <section className="beta-section relative overflow-hidden" aria-labelledby="beta-heading">
      <div className="beta-deco beta-deco-left" aria-hidden="true">
        <span className="beta-deco-blob" />
      </div>
      <div className="beta-deco beta-deco-right" aria-hidden="true">
        <span className="beta-deco-blob" />
      </div>

      <div className="why-wrap relative py-16 lg:py-20">
        <Reveal>
          <div className="beta-card">
            <div className="beta-card-grid">
              <div className="beta-intro">
                <span className="beta-badge">
                  <Icon icon={Users} size={13} strokeWidth={2.25} />
                  Early Access
                </span>
                <h2 id="beta-heading" className="beta-heading font-display">
                  {renderBetaHeading(heading)}
                </h2>
                <p className="beta-lead">{description}</p>

                <ul className="beta-benefits" aria-label="Beta benefits">
                  {BETA_BENEFITS.map((item) => (
                    <li key={item.title} className="beta-benefit">
                      <span className="beta-benefit-icon" aria-hidden="true">
                        <Icon icon={item.icon} size={15} strokeWidth={2.25} />
                      </span>
                      <span className="beta-benefit-copy">
                        <span className="beta-benefit-title">{item.title}</span>
                        <span className="beta-benefit-sub">{item.subtitle}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="beta-form-col">
                <form onSubmit={onSubmit} className="beta-form" noValidate={false}>
                  <label className="sr-only" htmlFor={`${formId}-hp`}>
                    Website
                  </label>
                  <input
                    id={`${formId}-hp`}
                    name="website"
                    value={hp}
                    onChange={(e) => setHp(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="beta-fields">
                    <div className="beta-field">
                      <label htmlFor={`${formId}-first-name`} className="beta-label">
                        First name <span className="beta-required">*</span>
                      </label>
                      <div className="beta-input-wrap">
                        <span className="beta-input-icon" aria-hidden="true">
                          <Icon icon={User} size={15} strokeWidth={2} />
                        </span>
                        <input
                          id={`${formId}-first-name`}
                          name="first_name"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="beta-input"
                          placeholder="Enter your first name"
                          autoComplete="given-name"
                          disabled={pending}
                        />
                      </div>
                    </div>

                    <div className="beta-field">
                      <label htmlFor={`${formId}-email`} className="beta-label">
                        Email <span className="beta-required">*</span>
                      </label>
                      <div className="beta-input-wrap">
                        <span className="beta-input-icon" aria-hidden="true">
                          <Icon icon={Mail} size={15} strokeWidth={2} />
                        </span>
                        <input
                          id={`${formId}-email`}
                          name="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="beta-input"
                          placeholder="you@company.com"
                          autoComplete="email"
                          disabled={pending}
                        />
                      </div>
                    </div>

                    {showCompany ? (
                      <div className="beta-field">
                        <label htmlFor={`${formId}-company`} className="beta-label">
                          Company <span className="beta-optional">(optional)</span>
                        </label>
                        <div className="beta-input-wrap">
                          <span className="beta-input-icon" aria-hidden="true">
                            <Icon icon={Building2} size={15} strokeWidth={2} />
                          </span>
                          <input
                            id={`${formId}-company`}
                            name="company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="beta-input"
                            placeholder="Your company name"
                            autoComplete="organization"
                            disabled={pending}
                          />
                        </div>
                      </div>
                    ) : null}

                    {showRole ? (
                      <div className="beta-field">
                        <label htmlFor={`${formId}-role`} className="beta-label">
                          Role <span className="beta-optional">(optional)</span>
                        </label>
                        <div className="beta-input-wrap beta-select-wrap">
                          <span className="beta-input-icon" aria-hidden="true">
                            <Icon icon={CircleUserRound} size={15} strokeWidth={2} />
                          </span>
                          <select
                            id={`${formId}-role`}
                            name="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className={`beta-input beta-select ${role ? "" : "is-placeholder"}`}
                            disabled={pending}
                          >
                            {ROLE_OPTIONS.map((option) => (
                              <option key={option || "empty"} value={option}>
                                {option || "Select your role"}
                              </option>
                            ))}
                          </select>
                          <span className="beta-select-chevron" aria-hidden="true">
                            <Icon icon={ChevronDown} size={15} strokeWidth={2.25} />
                          </span>
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    disabled={pending}
                    className="beta-submit"
                    aria-busy={pending}
                  >
                    {pending ? (
                      <>
                        <Icon icon={LoaderCircle} size={16} strokeWidth={2.25} className="beta-submit-spinner" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        <span>{buttonLabel}</span>
                        <span className="beta-submit-arrow" aria-hidden="true">
                          →
                        </span>
                      </>
                    )}
                  </button>

                  {message ? (
                    <p className="beta-feedback beta-feedback-success" role="status">
                      {message}
                    </p>
                  ) : null}
                  {error ? (
                    <p className="beta-feedback beta-feedback-error" role="alert">
                      {error}
                    </p>
                  ) : null}
                </form>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
