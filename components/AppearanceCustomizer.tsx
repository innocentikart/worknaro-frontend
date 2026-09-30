"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";
import {
  FONT_OPTIONS,
  HEADER_DARK,
  HEADER_LIGHT,
  NAV_DARK,
  NAV_LIGHT,
  SKIN_DARK,
  SKIN_LIGHT,
} from "@/lib/appearance";
import { useAppearance } from "@/components/ThemeProvider";

type AxisOption<T extends string> = { value: T; label: string };

function AxisGroup<T extends string>({
  title,
  name,
  value,
  options,
  onChange,
}: {
  title: string;
  name: string;
  value: T;
  options: AxisOption<T>[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="appearance-axis">
      <p className="appearance-axis-label">{title}</p>
      <div className="appearance-axis-grid" role="radiogroup" aria-label={title}>
        {options.map((option) => {
          const id = `${name}-${option.value}`;
          const checked = value === option.value;
          return (
            <label
              key={option.value}
              htmlFor={id}
              className={`appearance-option ${checked ? "is-active" : ""}`}
            >
              <input
                id={id}
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </div>
  );
}

export function AppearanceCustomizer() {
  const {
    appearance,
    setSkin,
    setHeader,
    setNavigation,
    setFontFamily,
    reset,
  } = useAppearance();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);
  const scrollLockY = useRef(0);

  const closePanel = useCallback(
    (event?: { preventDefault?: () => void; stopPropagation?: () => void }) => {
      event?.preventDefault?.();
      event?.stopPropagation?.();
      const scrollY = window.scrollY;
      setOpen(false);
      // Return focus to the handle without scrolling to the off-screen close control.
      requestAnimationFrame(() => {
        openRef.current?.focus({ preventScroll: true });
        if (window.scrollY !== scrollY) {
          window.scrollTo(0, scrollY);
        }
      });
    },
    [],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePanel();
    };
    document.addEventListener("keydown", onKey);
    /*
     * Lock scroll with overflow only. Do NOT use position:fixed + top:-scrollY —
     * that zeros window.scrollY, so the landing header snaps back to the
     * transparent hero overlay and Header Light/Dark appears to do nothing.
     */
    scrollLockY.current = window.scrollY;
    const { documentElement, body } = document;
    const prevHtmlOverflow = documentElement.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPaddingRight = body.style.paddingRight;
    const scrollbarGap = Math.max(0, window.innerWidth - documentElement.clientWidth);
    documentElement.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbarGap > 0) {
      body.style.paddingRight = `${scrollbarGap}px`;
    }
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      documentElement.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.paddingRight = prevBodyPaddingRight;
      if (window.scrollY !== scrollLockY.current) {
        window.scrollTo(0, scrollLockY.current);
      }
    };
  }, [open, closePanel]);

  return (
    <div className="appearance-customizer">
      <button
        ref={openRef}
        type="button"
        className="appearance-handle"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="Open appearance settings"
        onClick={() => setOpen(true)}
      >
        <i className="feather feather-settings appearance-handle-icon" aria-hidden="true" />
      </button>

      {open ? (
        <div
          className="appearance-backdrop"
          aria-hidden="true"
          onClick={(event) => closePanel(event)}
        />
      ) : null}

      <aside
        id={panelId}
        className={`appearance-panel ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Appearance"
        aria-hidden={!open}
      >
        <div className="appearance-panel-header">
          <h2 className="appearance-panel-title">Appearance</h2>
          <button
            ref={closeRef}
            type="button"
            className="appearance-panel-close"
            aria-label="Close appearance settings"
            onClick={(event) => closePanel(event)}
          >
            <X className="h-4 w-4" aria-hidden="true" strokeWidth={2} />
          </button>
        </div>

        <div className="appearance-panel-body">
          <AxisGroup
            title="Header"
            name="app-header"
            value={appearance.header}
            options={[
              { value: HEADER_LIGHT, label: "Light" },
              { value: HEADER_DARK, label: "Dark" },
            ]}
            onChange={setHeader}
          />
          <AxisGroup
            title="Skins"
            name="app-skin"
            value={appearance.skin}
            options={[
              { value: SKIN_LIGHT, label: "Light" },
              { value: SKIN_DARK, label: "Dark" },
            ]}
            onChange={setSkin}
          />
          <AxisGroup
            title="Footer"
            name="app-navigation"
            value={appearance.navigation}
            options={[
              { value: NAV_LIGHT, label: "Light" },
              { value: NAV_DARK, label: "Dark" },
            ]}
            onChange={setNavigation}
          />

          <div className="appearance-axis">
            <p className="appearance-axis-label">Typography</p>
            <div
              className="appearance-font-grid"
              role="radiogroup"
              aria-label="Typography"
            >
              {FONT_OPTIONS.map((font) => {
                const checked = appearance.fontFamily === font.id;
                return (
                  <label
                    key={font.id}
                    htmlFor={font.id}
                    className={`appearance-option appearance-font-option ${checked ? "is-active" : ""}`}
                    style={{ fontFamily: font.cssStack }}
                  >
                    <input
                      id={font.id}
                      type="radio"
                      name="font-family"
                      value={font.id}
                      checked={checked}
                      onChange={() => setFontFamily(font.id)}
                      className="sr-only"
                    />
                    {font.label}
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        <div className="appearance-panel-footer">
          <button type="button" className="appearance-reset" onClick={reset}>
            Reset
          </button>
        </div>
      </aside>
    </div>
  );
}
