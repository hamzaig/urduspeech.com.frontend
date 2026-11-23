export interface PlanSpec {
  id: "free" | "starter" | "creator" | "studio";
  name: string;
  pricePkr: number;
  priceDisplay: string;
  billingPeriod: "one-time" | "monthly";
  minutes: number;
  maxDurationMinutes: number;
  maxUploadLabel: string;
  retentionDays: number;
  videoQuality: string;
  watermark: boolean;
  recommended: boolean;
  summary: string;
}

export const PLANS: readonly PlanSpec[] = [
  {
    id: "free",
    name: "Free",
    pricePkr: 0,
    priceDisplay: "0",
    billingPeriod: "one-time",
    minutes: 10,
    maxDurationMinutes: 10,
    maxUploadLabel: "250 MiB",
    retentionDays: 3,
    videoQuality: "720p with watermark",
    watermark: true,
    recommended: false,
    summary:
      "One-time 10-minute allowance (no card required) to test Urdu transcription, subtitle exports, and 720p watermarked MP4 rendering.",
  },
  {
    id: "starter",
    name: "Starter",
    pricePkr: 999,
    priceDisplay: "999",
    billingPeriod: "monthly",
    minutes: 60,
    maxDurationMinutes: 60,
    maxUploadLabel: "1 GiB",
    retentionDays: 15,
    videoQuality: "1080p without watermark",
    watermark: false,
    recommended: false,
    summary:
      "60 monthly minutes for weekly reels, voice notes, and short interviews with clean 1080p unwatermarked exports and 15-day retention.",
  },
  {
    id: "creator",
    name: "Creator",
    pricePkr: 2499,
    priceDisplay: "2,499",
    billingPeriod: "monthly",
    minutes: 200,
    maxDurationMinutes: 180,
    maxUploadLabel: "Less than 2 GiB",
    retentionDays: 30,
    videoQuality: "1080p without watermark",
    watermark: false,
    recommended: true,
    summary:
      "200 monthly minutes for active YouTube channels, podcasts, and bilingual creators with 3-hour max recordings and 30-day retention.",
  },
  {
    id: "studio",
    name: "Studio",
    pricePkr: 5999,
    priceDisplay: "5,999",
    billingPeriod: "monthly",
    minutes: 500,
    maxDurationMinutes: 360,
    maxUploadLabel: "Less than 2 GiB",
    retentionDays: 90,
    videoQuality: "1080p without watermark",
    watermark: false,
    recommended: false,
    summary:
      "500 monthly minutes for production teams, journalists, and high-volume channels with 6-hour max recordings and 90-day retention.",
  },
] as const;

export const MANUAL_PAYMENT_METHODS = [
  "Bank transfer",
  "JazzCash",
  "Easypaisa",
  "SadaPay",
  "NayaPay",
] as const;
