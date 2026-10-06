"use client";

import { useId, useState, type FormEvent } from "react";
import {
  ChevronDown,
  CircleUserRound,
  LoaderCircle,
  Mail,
  MessageSquare,
  Phone,
  User,
  Users,
} from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { submitBetaSignup, type LandingPayload } from "@/lib/landing-api";

export type BetaFormConfig = NonNullable<LandingPayload["beta"]>;

type FieldKey = "fullName" | "email" | "phone" | "role" | "teamSize";
type FieldErrors = Partial<Record<FieldKey, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[\d][\d\s\-()]{5,38}$/;
const HELP_WITH_MAX = 500;

const ROLE_OPTIONS = [
  "Freelancer",
  "Small Business Owner",
  "Team Member",
  "Project Manager",
  "Agency",
  "Other",
] as const;

const TEAM_SIZE_OPTIONS = ["Just me", "2–5", "6–10", "11–25", "26+"] as const;

export function BetaSignupFields({
  config,
  submitLabel,
  onSuccess,
}: {
  config?: BetaFormConfig | null;
  submitLabel?: string;
  onSuccess?: () => void;
}) {
  const formId = useId();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [helpWith, setHelpWith] = useState("");
  const [hp, setHp] = useState("");
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const buttonLabel = submitLabel || config?.button_label || "Join the Beta";
  const roleOptions = config?.role_options?.length ? config.role_options : [...ROLE_OPTIONS];
  const teamSizeOptions = config?.team_size_options?.length
    ? config.team_size_options
    : [...TEAM_SIZE_OPTIONS];

  const fieldIds: Record<FieldKey, string> = {
    fullName: `${formId}-full-name`,
    email: `${formId}-email`,
    phone: `${formId}-phone`,
    role: `${formId}-role`,
    teamSize: `${formId}-team-size`,
  };
  const errorIds: Record<FieldKey, string> = {
    fullName: `${formId}-full-name-error`,
    email: `${formId}-email-error`,
    phone: `${formId}-phone-error`,
    role: `${formId}-role-error`,
    teamSize: `${formId}-team-size-error`,
  };

  function clearFieldError(key: FieldKey) {
    setFieldErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!fullName.trim()) next.fullName = "Enter your full name.";
    if (!email.trim()) next.email = "Enter your email address.";
    else if (!EMAIL_PATTERN.test(email.trim())) next.email = "Enter a valid email address.";
    const phoneValue = phone.trim();
    if (phoneValue) {
      const digits = phoneValue.replace(/\D/g, "");
      if (!PHONE_PATTERN.test(phoneValue) || digits.length < 7 || digits.length > 15) {
        next.phone = "Enter a valid phone / WhatsApp number, e.g. +234 801 234 5678.";
      }
    }
    if (!role) next.role = "Select what best describes you.";
    if (!teamSize) next.teamSize = "Select your team size.";
    return next;
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (pending) return;

    setError(null);
    setMessage(null);

    const nextErrors = validate();
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const firstInvalid = (["fullName", "email", "phone", "role", "teamSize"] as FieldKey[]).find(
        (key) => nextErrors[key],
      );
      if (firstInvalid) {
        document.getElementById(fieldIds[firstInvalid])?.focus();
      }
      return;
    }

    setPending(true);
    if (hp.trim()) {
      setMessage(config?.success_message || "Thanks for joining the beta.");
      setSubmitted(true);
      setPending(false);
      onSuccess?.();
      return;
    }

    const result = await submitBetaSignup({
      first_name: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      role,
      team_size: teamSize,
      notes: helpWith.trim(),
    });
    setPending(false);
    if (result.ok) {
      setMessage(result.message);
      setSubmitted(true);
      setFullName("");
      setEmail("");
      setPhone("");
      setRole("");
      setTeamSize("");
      setHelpWith("");
      setFieldErrors({});
      onSuccess?.();
    } else {
      setError(result.message);
    }
  }

  if (submitted && message) {
    return (
      <div className="beta-success" role="status" aria-live="polite">
        <p className="beta-feedback beta-feedback-success">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="beta-form" noValidate>
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
        <div className="beta-field beta-field-wide">
          <label htmlFor={fieldIds.fullName} className="beta-label">
            Full Name <span className="beta-required">*</span>
          </label>
          <div className="beta-input-wrap">
            <span className="beta-input-icon" aria-hidden="true">
              <Icon icon={User} size={15} strokeWidth={2} />
            </span>
            <input
              id={fieldIds.fullName}
              name="full_name"
              required
              aria-required="true"
              aria-invalid={fieldErrors.fullName ? true : undefined}
              aria-describedby={fieldErrors.fullName ? errorIds.fullName : undefined}
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                clearFieldError("fullName");
              }}
              className={`beta-input${fieldErrors.fullName ? " is-invalid" : ""}`}
              placeholder="Enter your full name"
              autoComplete="name"
              maxLength={120}
              disabled={pending}
            />
          </div>
          {fieldErrors.fullName ? (
            <p id={errorIds.fullName} className="beta-field-error" role="alert">
              {fieldErrors.fullName}
            </p>
          ) : null}
        </div>

        <div className="beta-field beta-field-wide">
          <label htmlFor={fieldIds.email} className="beta-label">
            Email Address <span className="beta-required">*</span>
          </label>
          <div className="beta-input-wrap">
            <span className="beta-input-icon" aria-hidden="true">
              <Icon icon={Mail} size={15} strokeWidth={2} />
            </span>
            <input
              id={fieldIds.email}
              name="email"
              type="email"
              required
              aria-required="true"
              aria-invalid={fieldErrors.email ? true : undefined}
              aria-describedby={fieldErrors.email ? errorIds.email : undefined}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearFieldError("email");
              }}
              className={`beta-input${fieldErrors.email ? " is-invalid" : ""}`}
              placeholder="you@company.com"
              autoComplete="email"
              disabled={pending}
            />
          </div>
          {fieldErrors.email ? (
            <p id={errorIds.email} className="beta-field-error" role="alert">
              {fieldErrors.email}
            </p>
          ) : null}
        </div>

        <div className="beta-field beta-field-wide">
          <label htmlFor={fieldIds.phone} className="beta-label">
            Phone / WhatsApp Number <span className="beta-optional">(optional)</span>
          </label>
          <div className="beta-input-wrap">
            <span className="beta-input-icon" aria-hidden="true">
              <Icon icon={Phone} size={15} strokeWidth={2} />
            </span>
            <input
              id={fieldIds.phone}
              name="phone"
              type="tel"
              inputMode="tel"
              aria-invalid={fieldErrors.phone ? true : undefined}
              aria-describedby={
                fieldErrors.phone ? errorIds.phone : `${formId}-phone-help`
              }
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                clearFieldError("phone");
              }}
              className={`beta-input${fieldErrors.phone ? " is-invalid" : ""}`}
              placeholder="e.g. +234 801 234 5678"
              autoComplete="tel"
              maxLength={40}
              disabled={pending}
            />
          </div>
          {fieldErrors.phone ? (
            <p id={errorIds.phone} className="beta-field-error" role="alert">
              {fieldErrors.phone}
            </p>
          ) : (
            <p id={`${formId}-phone-help`} className="beta-field-help">
              Optional — for beta updates, onboarding, or direct communication.
            </p>
          )}
        </div>

        <div className="beta-field">
          <label htmlFor={fieldIds.role} className="beta-label">
            I am a: <span className="beta-required">*</span>
          </label>
          <div className="beta-input-wrap beta-select-wrap">
            <span className="beta-input-icon" aria-hidden="true">
              <Icon icon={CircleUserRound} size={15} strokeWidth={2} />
            </span>
            <select
              id={fieldIds.role}
              name="role"
              required
              aria-required="true"
              aria-invalid={fieldErrors.role ? true : undefined}
              aria-describedby={fieldErrors.role ? errorIds.role : undefined}
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                clearFieldError("role");
              }}
              className={`beta-input beta-select${role ? "" : " is-placeholder"}${fieldErrors.role ? " is-invalid" : ""}`}
              disabled={pending}
            >
              <option value="">Select one</option>
              {roleOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="beta-select-chevron" aria-hidden="true">
              <Icon icon={ChevronDown} size={15} strokeWidth={2.25} />
            </span>
          </div>
          {fieldErrors.role ? (
            <p id={errorIds.role} className="beta-field-error" role="alert">
              {fieldErrors.role}
            </p>
          ) : null}
        </div>

        <div className="beta-field">
          <label htmlFor={fieldIds.teamSize} className="beta-label">
            Team Size: <span className="beta-required">*</span>
          </label>
          <div className="beta-input-wrap beta-select-wrap">
            <span className="beta-input-icon" aria-hidden="true">
              <Icon icon={Users} size={15} strokeWidth={2} />
            </span>
            <select
              id={fieldIds.teamSize}
              name="team_size"
              required
              aria-required="true"
              aria-invalid={fieldErrors.teamSize ? true : undefined}
              aria-describedby={fieldErrors.teamSize ? errorIds.teamSize : undefined}
              value={teamSize}
              onChange={(e) => {
                setTeamSize(e.target.value);
                clearFieldError("teamSize");
              }}
              className={`beta-input beta-select${teamSize ? "" : " is-placeholder"}${fieldErrors.teamSize ? " is-invalid" : ""}`}
              disabled={pending}
            >
              <option value="">Select team size</option>
              {teamSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="beta-select-chevron" aria-hidden="true">
              <Icon icon={ChevronDown} size={15} strokeWidth={2.25} />
            </span>
          </div>
          {fieldErrors.teamSize ? (
            <p id={errorIds.teamSize} className="beta-field-error" role="alert">
              {fieldErrors.teamSize}
            </p>
          ) : null}
        </div>

        <div className="beta-field beta-field-wide">
          <label htmlFor={`${formId}-help-with`} className="beta-label">
            What would you like Worknaro to help you with?{" "}
            <span className="beta-optional">(optional)</span>
          </label>
          <div className="beta-input-wrap beta-textarea-wrap">
            <span className="beta-input-icon" aria-hidden="true">
              <Icon icon={MessageSquare} size={15} strokeWidth={2} />
            </span>
            <textarea
              id={`${formId}-help-with`}
              name="help_with"
              value={helpWith}
              onChange={(e) => setHelpWith(e.target.value)}
              className="beta-input beta-textarea"
              placeholder="Projects, clients, billing — whatever you want to try first."
              maxLength={HELP_WITH_MAX}
              rows={3}
              disabled={pending}
            />
          </div>
        </div>
      </div>

      <button type="submit" disabled={pending} className="beta-submit" aria-busy={pending}>
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

      {error ? (
        <p className="beta-feedback beta-feedback-error" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
