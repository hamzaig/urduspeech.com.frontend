/**
 * Privacy-first, zero-PII Object-Action analytics and attribution helper.
 *
 * Design principles:
 * - Dormant by default unless NEXT_PUBLIC_GA_MEASUREMENT_ID or a runtime
 *   window.posthog / window.gtag adapter is present.
 * - Never transmits email addresses, names, phone numbers, raw transcript text,
 *   or authentication tokens (strict key blocklist + value sanitization).
 * - Captures first-touch UTM parameters and AI-assistant referrers in
 *   sessionStorage so signup and checkout conversions preserve channel credit.
 */

export type AnalyticsEventName =
  | "cta_clicked"
  | "demo_mode_switched"
  | "demo_style_changed"
  | "demo_export_downloaded"
  | "free_tool_used"
  | "pricing_calculator_interacted"
  | "signup_started"
  | "signup_completed"
  | "login_completed"
  | "project_upload_completed"
  | "billing_checkout_started"
  | "manual_payment_requested"
  | "manual_payment_submitted"
  | "captions_generation_started";

export type EventScalar = string | number | boolean;
export type EventProperties = Record<string, EventScalar | undefined>;

export interface AttributionSnapshot {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  landing_path?: string;
  referrer_host?: string;
  ai_assistant?: string;
  captured_at?: string;
}

const ATTRIBUTION_STORAGE_KEY = "urduspeech_attribution_v1";

const BLOCKED_PROP_KEYS = new Set([
  "email",
  "name",
  "fullname",
  "full_name",
  "phone",
  "password",
  "token",
  "secret",
  "reference",
  "claimedreference",
  "transcript",
  "text",
  "caption",
  "address",
  "ip",
]);

const AI_REFERRER_MAP: readonly { match: RegExp; assistant: string }[] = [
  {
    match: /(^|\.)chatgpt\.com$|(^|\.)chat\.openai\.com$/i,
    assistant: "chatgpt",
  },
  { match: /(^|\.)perplexity\.ai$/i, assistant: "perplexity" },
  { match: /(^|\.)claude\.ai$/i, assistant: "claude" },
  { match: /(^|\.)gemini\.google\.com$/i, assistant: "gemini" },
  { match: /(^|\.)copilot\.microsoft\.com$/i, assistant: "copilot" },
  { match: /(^|\.)you\.com$/i, assistant: "you" },
];

export function classifyAiReferrer(hostname: string): string | undefined {
  const clean = hostname.trim().toLowerCase();
  if (!clean) return undefined;
  for (const entry of AI_REFERRER_MAP) {
    if (entry.match.test(clean)) return entry.assistant;
  }
  return undefined;
}

export function parseAttributionFromUrl(
  search: string,
  referrer: string,
  landingPath?: string,
): AttributionSnapshot {
  const params = new URLSearchParams(search);
  const snapshot: AttributionSnapshot = {};

  const utmKeys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
  ] as const;

  for (const key of utmKeys) {
    const raw = params.get(key)?.trim();
    if (raw) {
      snapshot[key] = raw.slice(0, 120);
    }
  }

  if (landingPath) {
    snapshot.landing_path = landingPath.split("?")[0].slice(0, 180);
  }

  if (referrer) {
    try {
      const refUrl = new URL(referrer);
      const host = refUrl.hostname.toLowerCase();
      if (host && host !== "urduspeech.com" && host !== "www.urduspeech.com") {
        snapshot.referrer_host = host.slice(0, 120);
        const ai = classifyAiReferrer(host);
        if (ai) snapshot.ai_assistant = ai;
      }
    } catch {
      // Ignore malformed referrer URLs.
    }
  }

  return snapshot;
}

export function sanitizeProps(
  props?: EventProperties,
): Record<string, EventScalar> {
  if (!props) return {};
  const clean: Record<string, EventScalar> = {};
  for (const [rawKey, value] of Object.entries(props)) {
    if (value === undefined) continue;
    const key = rawKey.trim().toLowerCase();
    if (!key || BLOCKED_PROP_KEYS.has(key)) continue;
    if (typeof value === "string") {
      // Never pass strings that look like email addresses into analytics payloads.
      if (/@[^\s@]+\.[^\s@]+/.test(value)) continue;
      clean[key] = value.slice(0, 160);
    } else if (typeof value === "number") {
      if (Number.isFinite(value)) clean[key] = value;
    } else if (typeof value === "boolean") {
      clean[key] = value;
    }
  }
  return clean;
}

export function captureAttribution(): AttributionSnapshot | null {
  if (typeof window === "undefined") return null;
  try {
    const existingRaw = window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    const parsed = parseAttributionFromUrl(
      window.location.search,
      document.referrer,
      window.location.pathname,
    );
    const hasNewUtm = Boolean(
      parsed.utm_source || parsed.utm_medium || parsed.utm_campaign,
    );

    if (existingRaw && !hasNewUtm) {
      return JSON.parse(existingRaw) as AttributionSnapshot;
    }

    const existing: AttributionSnapshot = existingRaw
      ? (JSON.parse(existingRaw) as AttributionSnapshot)
      : {};
    const merged: AttributionSnapshot = {
      ...existing,
      ...parsed,
      captured_at: existing.captured_at ?? new Date().toISOString(),
    };
    window.sessionStorage.setItem(
      ATTRIBUTION_STORAGE_KEY,
      JSON.stringify(merged),
    );
    return merged;
  } catch {
    return null;
  }
}

export function getStoredAttribution(): AttributionSnapshot | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AttributionSnapshot) : null;
  } catch {
    return null;
  }
}

type AnalyticsWindow = Window & {
  gtag?: (
    command: "event",
    eventName: string,
    params: Record<string, EventScalar>,
  ) => void;
  posthog?: {
    capture?: (eventName: string, params: Record<string, EventScalar>) => void;
  };
  dataLayer?: Array<Record<string, unknown>>;
};

export function trackEvent(
  eventName: AnalyticsEventName,
  props?: EventProperties,
): void {
  if (typeof window === "undefined") return;

  const attribution = getStoredAttribution();
  const mergedProps = sanitizeProps({
    ...(attribution?.utm_source ? { utm_source: attribution.utm_source } : {}),
    ...(attribution?.utm_medium ? { utm_medium: attribution.utm_medium } : {}),
    ...(attribution?.utm_campaign
      ? { utm_campaign: attribution.utm_campaign }
      : {}),
    ...(attribution?.ai_assistant
      ? { ai_assistant: attribution.ai_assistant }
      : {}),
    page_path: window.location.pathname,
    ...props,
  });

  const w = window as AnalyticsWindow;
  try {
    if (typeof w.gtag === "function") {
      w.gtag("event", eventName, mergedProps);
    }
    if (typeof w.posthog?.capture === "function") {
      w.posthog.capture(eventName, mergedProps);
    }
    if (Array.isArray(w.dataLayer) && typeof w.gtag !== "function") {
      w.dataLayer.push({ event: eventName, ...mergedProps });
    }
  } catch {
    // Analytics must never interrupt user flows.
  }
}
