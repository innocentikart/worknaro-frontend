"use client";

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { BetaSignupFields, type BetaFormConfig } from "@/components/BetaSignupFields";
import { HeadingAccent } from "@/components/ui/HeadingAccent";
import { fetchPublicBetaConfig, type BetaCampaignConfig } from "@/lib/landing-api";

const BAR_DISMISS_KEY = "worknaro.betaBar.dismissed";
const POPUP_DISMISS_KEY = "worknaro.betaPopup.dismissed";
const POPUP_SUBMIT_KEY = "worknaro.betaPopup.submitted";

function readFlag(key: string) {
  try {
    return sessionStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

function writeFlag(key: string) {
  try {
    sessionStorage.setItem(key, "1");
  } catch {
    /* ignore quota / private mode */
  }
}

function renderHeading(heading: string): ReactNode {
  const match = heading.match(/^(.*?)((?:Worknaro|Organitio)\.?)(.*)$/i);
  if (!match) return heading;
  return (
    <>
      {match[1]}
      <HeadingAccent>{match[2]}</HeadingAccent>
      {match[3]}
    </>
  );
}

function scrollToBetaForm() {
  const target = document.getElementById("beta-heading");
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function BetaCampaign({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<BetaFormConfig | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [barDismissed, setBarDismissed] = useState(true);
  const [popupBlocked, setPopupBlocked] = useState(true);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const dialogId = useId();

  useEffect(() => {
    setBarDismissed(readFlag(BAR_DISMISS_KEY));
    setPopupBlocked(readFlag(POPUP_DISMISS_KEY) || readFlag(POPUP_SUBMIT_KEY));
    let cancelled = false;
    fetchPublicBetaConfig().then((next) => {
      if (!cancelled) setConfig(next);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const campaign: BetaCampaignConfig | undefined = config?.campaign;
  const showBar = campaign?.show_notification_bar === true && !barDismissed;
  const showPopup = campaign?.show_popup === true;

  const openPopup = useCallback(() => {
    if (campaign?.show_popup !== true) return;
    lastFocusRef.current = document.activeElement as HTMLElement | null;
    setPopupOpen(true);
  }, [campaign?.show_popup]);

  const closePopup = useCallback((persistDismiss = false) => {
    setPopupOpen(false);
    if (persistDismiss) {
      writeFlag(POPUP_DISMISS_KEY);
      setPopupBlocked(true);
    }
    lastFocusRef.current?.focus?.();
  }, []);

  const onCtaClick = useCallback(() => {
    if (campaign?.show_popup === true) {
      openPopup();
      return;
    }
    scrollToBetaForm();
  }, [campaign?.show_popup, openPopup]);

  useEffect(() => {
    if (!showPopup || popupBlocked || popupOpen) return;
    const trigger = campaign?.popup_trigger;
    if (trigger !== "delay" && trigger !== "scroll") return;

    if (trigger === "delay") {
      const seconds = Math.max(campaign?.popup_delay_seconds ?? 25, 5);
      const timer = window.setTimeout(() => openPopup(), seconds * 1000);
      return () => window.clearTimeout(timer);
    }

    const threshold = Math.min(Math.max(campaign?.popup_scroll_percent ?? 55, 10), 90) / 100;
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 1;
      if (progress >= threshold) {
        openPopup();
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [
    campaign?.popup_delay_seconds,
    campaign?.popup_scroll_percent,
    campaign?.popup_trigger,
    openPopup,
    popupBlocked,
    popupOpen,
    showPopup,
  ]);

  useEffect(() => {
    if (!popupOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closePopup(true);
        return;
      }
      if (event.key !== "Tab") return;
      const root = document.getElementById(dialogId);
      if (!root) return;
      const focusable = [
        ...root.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ].filter((node) => !node.hasAttribute("disabled"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [closePopup, dialogId, popupOpen]);

  return (
    <>
      <div className="landing-sticky-chrome">
        {showBar ? (
          <div className="beta-notice" role="region" aria-label="Worknaro beta announcement">
            <p className="beta-notice-copy">{campaign?.notification_message}</p>
            <div className="beta-notice-actions">
              <button type="button" className="beta-notice-cta" onClick={onCtaClick}>
                {campaign?.notification_cta || "Join the Beta →"}
              </button>
              <button
                type="button"
                className="beta-notice-close"
                aria-label="Dismiss beta announcement"
                onClick={() => {
                  writeFlag(BAR_DISMISS_KEY);
                  setBarDismissed(true);
                }}
              >
                <X size={14} strokeWidth={2.25} aria-hidden="true" />
              </button>
            </div>
          </div>
        ) : null}
        {children}
      </div>

      {showPopup && popupOpen ? (
        <div className="beta-popup-layer">
          <button
            type="button"
            className="beta-popup-backdrop"
            aria-label="Close beta signup"
            onClick={() => closePopup(true)}
          />
          <div
            id={dialogId}
            className="beta-popup"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${dialogId}-title`}
          >
            <button
              ref={closeRef}
              type="button"
              className="beta-popup-close"
              aria-label="Close beta signup"
              onClick={() => closePopup(true)}
            >
              <X size={16} strokeWidth={2.25} aria-hidden="true" />
            </button>
            <h2 id={`${dialogId}-title`} className="beta-popup-heading font-display">
              {renderHeading(campaign?.popup_heading || "Join the Worknaro Beta")}
            </h2>
            {campaign?.popup_description ? (
              <p className="beta-popup-lead">{campaign.popup_description}</p>
            ) : null}
            <BetaSignupFields
              config={config}
              submitLabel={campaign?.popup_button_label}
              onSuccess={() => {
                writeFlag(POPUP_SUBMIT_KEY);
                setPopupBlocked(true);
              }}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
