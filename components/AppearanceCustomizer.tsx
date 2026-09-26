"use client";

import { useEffect, useId, useRef, useState } from "react";
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

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) openRef.current?.blur();
  }, [open]);

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
          onClick={() => setOpen(false)}
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
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4" aria-hidden="true" strokeWidth={2} />
          </button>
        </div>

        <div className="appearance-panel-body">
          <AxisGroup
            title="Navigation"
            name="app-navigation"
            value={appearance.navigation}
            options={[
              { value: NAV_LIGHT, label: "Light" },
              { value: NAV_DARK, label: "Dark" },
            ]}
            onChange={setNavigation}
          />
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
