import { test } from "node:test";
import assert from "node:assert/strict";
import { calculateRecommendedPlan } from "../lib/plan-calculator";

test("calculateRecommendedPlan recommends Free for <=10 min without clean 1080p requirement", () => {
  const res = calculateRecommendedPlan({
    shortClipsPerMonth: 4,
    avgShortMinutes: 1.5,
    longVideosPerMonth: 0,
    avgLongMinutes: 0,
    voiceNoteMinutesPerMonth: 2,
    needsClean1080p: false,
  });
  assert.equal(res.totalMonthlyMinutes, 8);
  assert.equal(res.recommendedPlan.id, "free");
  assert.equal(res.effectivePlanRatePkr, null);
});

test("calculateRecommendedPlan recommends Starter when <=10 min requires clean 1080p unwatermarked video", () => {
  const res = calculateRecommendedPlan({
    shortClipsPerMonth: 5,
    avgShortMinutes: 1,
    longVideosPerMonth: 0,
    avgLongMinutes: 0,
    voiceNoteMinutesPerMonth: 0,
    needsClean1080p: true,
  });
  assert.equal(res.recommendedPlan.id, "starter");
  assert.equal(res.recommendedPlan.pricePkr, 999);
});

test("calculateRecommendedPlan upgrades to Creator when single recording exceeds 60 minutes", () => {
  const res = calculateRecommendedPlan({
    shortClipsPerMonth: 0,
    avgShortMinutes: 0,
    longVideosPerMonth: 1,
    avgLongMinutes: 90,
    voiceNoteMinutesPerMonth: 0,
    needsClean1080p: true,
  });
  assert.equal(res.recommendedPlan.id, "creator");
  assert.equal(res.totalMonthlyMinutes, 90);
  assert.equal(res.spareMinutes, 110);
});

test("calculateRecommendedPlan upgrades to Studio for >200 min/mo or >180 min single files and flags >500 min overflow", () => {
  const studio = calculateRecommendedPlan({
    shortClipsPerMonth: 20,
    avgShortMinutes: 1.5,
    longVideosPerMonth: 6,
    avgLongMinutes: 40,
    voiceNoteMinutesPerMonth: 30,
    needsClean1080p: true,
  });
  assert.equal(studio.recommendedPlan.id, "studio");
  assert.equal(studio.exceedsStudioAllowance, false);

  const overflow = calculateRecommendedPlan({
    shortClipsPerMonth: 60,
    avgShortMinutes: 2,
    longVideosPerMonth: 15,
    avgLongMinutes: 40,
    voiceNoteMinutesPerMonth: 0,
    needsClean1080p: true,
  });
  assert.equal(overflow.recommendedPlan.id, "studio");
  assert.equal(overflow.exceedsStudioAllowance, true);
});
