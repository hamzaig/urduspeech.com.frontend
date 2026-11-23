import { PLANS, type PlanSpec } from "./plans";

export interface PlanCalculatorInput {
  /** Monthly short-form clips (Reels, TikTok, Shorts) */
  shortClipsPerMonth: number;
  /** Average length of each short-form clip in minutes (e.g. 1 or 1.5) */
  avgShortMinutes: number;
  /** Monthly long-form videos, podcasts, or interviews */
  longVideosPerMonth: number;
  /** Average length of each long-form recording in minutes */
  avgLongMinutes: number;
  /** Monthly voice notes / audio memos in total minutes */
  voiceNoteMinutesPerMonth: number;
  /** Whether the creator requires clean 1080p unwatermarked MP4 exports */
  needsClean1080p: boolean;
}

export interface PlanRecommendation {
  totalMonthlyMinutes: number;
  longestSingleRecordingMinutes: number;
  recommendedPlan: PlanSpec;
  costPerUsedMinutePkr: number | null;
  effectivePlanRatePkr: number | null;
  spareMinutes: number;
  exceedsStudioAllowance: boolean;
  reasons: string[];
}

function getPlan(id: PlanSpec["id"]): PlanSpec {
  const found = PLANS.find((plan) => plan.id === id);
  if (!found) throw new Error(`Missing plan ${id}`);
  return found;
}

export function calculateRecommendedPlan(
  input: PlanCalculatorInput,
): PlanRecommendation {
  const shortClips = Math.max(0, Math.round(input.shortClipsPerMonth));
  const avgShort = Math.max(0, input.avgShortMinutes);
  const longVideos = Math.max(0, Math.round(input.longVideosPerMonth));
  const avgLong = Math.max(0, input.avgLongMinutes);
  const voiceMinutes = Math.max(0, Math.round(input.voiceNoteMinutesPerMonth));

  const shortMinutes = shortClips * avgShort;
  const longMinutes = longVideos * avgLong;
  const totalMonthlyMinutes = Math.ceil(
    shortMinutes + longMinutes + voiceMinutes,
  );
  const longestSingleRecordingMinutes = Math.ceil(
    Math.max(
      longVideos > 0 ? avgLong : 0,
      shortClips > 0 ? avgShort : 0,
      voiceMinutes > 0 ? Math.min(voiceMinutes, 10) : 0,
    ),
  );

  const reasons: string[] = [];
  let chosen: PlanSpec;
  let exceedsStudioAllowance = false;

  if (
    totalMonthlyMinutes <= 10 &&
    longestSingleRecordingMinutes <= 10 &&
    !input.needsClean1080p
  ) {
    chosen = getPlan("free");
    reasons.push(
      "Your estimated workload fits inside the 10-minute one-time Free trial (no card required).",
    );
  } else if (totalMonthlyMinutes <= 60 && longestSingleRecordingMinutes <= 60) {
    chosen = getPlan("starter");
    if (input.needsClean1080p && totalMonthlyMinutes <= 10) {
      reasons.push(
        "Starter is the lowest tier that removes the video watermark and unlocks clean 1080p MP4 exports.",
      );
    } else {
      reasons.push(
        `Starter covers up to 60 monthly minutes and recordings up to 60 minutes long with 15-day retention.`,
      );
    }
  } else if (
    totalMonthlyMinutes <= 200 &&
    longestSingleRecordingMinutes <= 180
  ) {
    chosen = getPlan("creator");
    if (longestSingleRecordingMinutes > 60 && totalMonthlyMinutes <= 60) {
      reasons.push(
        `Your longest recording (${longestSingleRecordingMinutes} min) exceeds Starter's 60-minute single-file cap; Creator supports files up to 180 minutes.`,
      );
    } else {
      reasons.push(
        "Creator covers up to 200 monthly minutes, 3-hour single recordings, clean 1080p MP4 renders, and 30-day media retention.",
      );
    }
  } else {
    chosen = getPlan("studio");
    if (totalMonthlyMinutes > 500) {
      exceedsStudioAllowance = true;
      reasons.push(
        `Your estimate (${totalMonthlyMinutes} min/mo) exceeds the standard 500-minute Studio allowance. Start on Studio or contact support for high-volume workflows.`,
      );
    } else if (longestSingleRecordingMinutes > 180) {
      reasons.push(
        `Your longest file (${longestSingleRecordingMinutes} min) requires Studio's 360-minute (6-hour) single-recording limit.`,
      );
    } else {
      reasons.push(
        "Studio gives you 500 monthly minutes, 6-hour single recordings, and 90-day media retention at the lowest per-minute rate (PKR 12.0/min).",
      );
    }
  }

  const spareMinutes = Math.max(0, chosen.minutes - totalMonthlyMinutes);
  const effectivePlanRatePkr =
    chosen.pricePkr === 0
      ? null
      : Number((chosen.pricePkr / chosen.minutes).toFixed(1));
  const costPerUsedMinutePkr =
    chosen.pricePkr === 0 || totalMonthlyMinutes === 0
      ? null
      : Number((chosen.pricePkr / totalMonthlyMinutes).toFixed(1));

  return {
    totalMonthlyMinutes,
    longestSingleRecordingMinutes,
    recommendedPlan: chosen,
    costPerUsedMinutePkr,
    effectivePlanRatePkr,
    spareMinutes,
    exceedsStudioAllowance,
    reasons,
  };
}
