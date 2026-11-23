"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  Check,
  MapPin,
  Moon,
  Sun,
  SunMoon,
  Sunrise,
  Sunset,
} from "lucide-react";
import type { DaylightInfo, ThemeMode } from "@/lib/daylight";
import { nextRadioIndex } from "@/lib/public-a11y";
import { useTheme } from "@/components/theme-provider";

const MODES: {
  id: ThemeMode;
  label: string;
  hint: string;
  icon: typeof SunMoon;
}[] = [
  {
    id: "auto",
    label: "Auto (Sun)",
    hint: "Light by day, dark after sunset",
    icon: SunMoon,
  },
  {
    id: "light",
    label: "Light",
    hint: "Always bright",
    icon: Sun,
  },
  {
    id: "dark",
    label: "Dark",
    hint: "Always dark",
    icon: Moon,
  },
];

function formatClock(iso: string | null, timeZone: string): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  try {
    return new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "2-digit",
      timeZone,
    }).format(date);
  } catch {
    return new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  }
}

function formatPlace(daylight: DaylightInfo | null): string | null {
  if (!daylight) return null;
  const { city, country } = daylight.location;
  let countryLabel = country;
  if (country && typeof Intl !== "undefined" && "DisplayNames" in Intl) {
    try {
      const names = new Intl.DisplayNames(["en"], { type: "region" });
      countryLabel = names.of(country) ?? country;
    } catch {
      countryLabel = country;
    }
  }
  if (city && country) return `${city}, ${country}`;
  if (countryLabel) return countryLabel;
  if (daylight.location.timezone && daylight.location.timezone !== "UTC") {
    return (
      daylight.location.timezone.replace(/_/g, " ").split("/").pop() ?? null
    );
  }
  return null;
}

export function ThemeToggle() {
  const { mode, resolvedTheme, daylight, loading, setMode } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const checked =
      menuRef.current?.querySelector<HTMLButtonElement>(
        '[role="radio"][aria-checked="true"]',
      ) ?? menuRef.current?.querySelector<HTMLButtonElement>('[role="radio"]');
    checked?.focus();

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const place = formatPlace(daylight);
  const tz = daylight?.location.timezone ?? "UTC";
  const sunriseText = formatClock(daylight?.sunrise ?? null, tz);
  const sunsetText = formatClock(daylight?.sunset ?? null, tz);

  const statusHeadline = daylight
    ? daylight.polarState === "day"
      ? "Midnight sun"
      : daylight.polarState === "night"
        ? "Polar night"
        : daylight.isDay
          ? "Daytime"
          : "After sunset"
    : loading
      ? "Checking local sun…"
      : resolvedTheme === "dark"
        ? "Nighttime"
        : "Daytime";

  const triggerLabel =
    mode === "auto"
      ? `Theme: Auto (${resolvedTheme === "dark" ? "Dark, after sunset" : "Light, daytime"}). Change theme`
      : `Theme: ${mode === "dark" ? "Dark" : "Light"}. Change theme`;

  const activeIndex = Math.max(
    0,
    MODES.findIndex(({ id }) => id === mode),
  );

  function handleOptionKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    const nextIndex = nextRadioIndex(event.key, index, MODES.length);
    if (nextIndex === null) return;
    event.preventDefault();
    const nextMode = MODES[nextIndex];
    if (!nextMode) return;
    setMode(nextMode.id);
    const buttons =
      menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]');
    buttons?.[nextIndex]?.focus();
  }

  return (
    <div className="theme-switcher" ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        className="theme-trigger"
        aria-label={triggerLabel}
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="dialog"
        data-mode={mode}
        title={
          mode === "auto"
            ? `Auto sun theme${place ? ` · ${place}` : ""}`
            : `${mode === "dark" ? "Dark" : "Light"} theme`
        }
        onClick={() => setOpen((current) => !current)}
      >
        <Sun size={18} className="theme-icon-light" aria-hidden="true" />
        <Moon size={18} className="theme-icon-dark" aria-hidden="true" />
        {mode === "auto" && (
          <span className="theme-auto-dot" aria-hidden="true" />
        )}
      </button>

      {open && (
        <div
          id={menuId}
          ref={menuRef}
          className="theme-menu"
          role="dialog"
          aria-label="Appearance"
        >
          <div className="theme-sun-card" data-day={daylight?.isDay ?? true}>
            <div className="theme-sun-head">
              <span className="theme-sun-badge">
                {(daylight?.isDay ?? resolvedTheme === "light") ? (
                  <Sun size={14} aria-hidden="true" />
                ) : (
                  <Moon size={14} aria-hidden="true" />
                )}
                {statusHeadline}
              </span>
              {place && (
                <span className="theme-sun-place">
                  <MapPin size={12} aria-hidden="true" />
                  {place}
                </span>
              )}
            </div>
            {sunriseText && sunsetText ? (
              <div className="theme-sun-times">
                <span>
                  <Sunrise size={13} aria-hidden="true" />
                  <span className="sr-only">Sunrise </span>
                  {sunriseText}
                </span>
                <span>
                  <Sunset size={13} aria-hidden="true" />
                  <span className="sr-only">Sunset </span>
                  {sunsetText}
                </span>
              </div>
            ) : (
              <p className="theme-sun-note">
                Automatically switches with local daylight.
              </p>
            )}
          </div>

          <div
            className="theme-options"
            role="radiogroup"
            aria-label="Color theme"
          >
            {MODES.map(({ id, label, hint, icon: Icon }, index) => {
              const selected = mode === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  tabIndex={index === activeIndex ? 0 : -1}
                  className="theme-option"
                  onClick={() => {
                    setMode(id);
                    setOpen(false);
                    triggerRef.current?.focus();
                  }}
                  onKeyDown={(event) => handleOptionKeyDown(event, index)}
                >
                  <span className="theme-option-icon" aria-hidden="true">
                    <Icon size={16} />
                  </span>
                  <span className="theme-option-copy">
                    <strong>{label}</strong>
                    <small>{hint}</small>
                  </span>
                  {selected && (
                    <Check
                      size={16}
                      className="theme-option-check"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
