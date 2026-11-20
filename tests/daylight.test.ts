import { test } from "node:test";
import assert from "node:assert/strict";
import {
  clearSolarCache,
  computeSolarTimes,
  evaluateDaylight,
  localDateInTimeZone,
  resolveDaylight,
  resolveLocation,
  validateTimeZone,
} from "../lib/daylight";

test("uses Vercel geo headers and public sunrise-sunset API to pick light during daytime and dark after sunset", async () => {
  clearSolarCache();
  let calledUrl = "";
  const mockFetch: typeof fetch = async (input) => {
    calledUrl = String(input);
    return Response.json({
      status: "OK",
      results: {
        sunrise: "2026-11-20T01:34:31+00:00",
        sunset: "2026-11-20T12:01:43+00:00",
      },
    });
  };

  const makeReq = () =>
    new Request("https://urduspeech.com/api/daylight?tz=Asia/Karachi", {
      headers: {
        "x-vercel-ip-latitude": "31.5204",
        "x-vercel-ip-longitude": "74.3587",
        "x-vercel-ip-country": "PK",
        "x-vercel-ip-city": "Lahore",
        "x-vercel-ip-timezone": "Asia/Karachi",
      },
    });

  // 11:00 AM PKT (06:00 UTC) -> daytime -> light
  const day = await resolveDaylight(makeReq(), {
    now: new Date("2026-11-20T06:00:00Z"),
    fetchImpl: mockFetch,
  });
  assert.equal(day.theme, "light");
  assert.equal(day.isDay, true);
  assert.equal(day.source, "sunrise-sunset-api");
  assert.equal(day.location.city, "Lahore");
  assert.equal(day.location.country, "PK");
  assert.equal(day.nextTransition, "2026-11-20T12:01:43.000Z");
  assert.match(calledUrl, /lat=31\.52&lng=74\.36&date=2026-11-20&formatted=0/);

  // 7:00 PM PKT (14:00 UTC) -> after sunset -> dark (hits cache, no extra fetch)
  let secondCalls = 0;
  const night = await resolveDaylight(makeReq(), {
    now: new Date("2026-11-20T14:00:00Z"),
    fetchImpl: async () => {
      secondCalls++;
      return Response.json({});
    },
  });
  assert.equal(secondCalls, 0);
  assert.equal(night.theme, "dark");
  assert.equal(night.isDay, false);
  assert.equal(night.source, "sunrise-sunset-api");
  assert.equal(night.nextTransition, "2026-11-21T01:34:31.000Z");
});

test("uses the location local date across UTC midnight (Honolulu daytime, Sydney next day)", async () => {
  clearSolarCache();
  // 2026-11-20T01:00:00Z is Nov 19 3:00 PM in Honolulu (daytime!)
  assert.equal(
    localDateInTimeZone(new Date("2026-11-20T01:00:00Z"), "Pacific/Honolulu"),
    "2026-11-19",
  );
  // 2026-11-20T14:00:00Z is Nov 21 1:00 AM in Sydney (nighttime!)
  assert.equal(
    localDateInTimeZone(new Date("2026-11-20T14:00:00Z"), "Australia/Sydney"),
    "2026-11-21",
  );

  let requestedDate = "";
  const honolulu = await resolveDaylight(
    new Request("https://urduspeech.com/api/daylight?tz=Pacific/Honolulu"),
    {
      now: new Date("2026-11-20T01:00:00Z"),
      bypassCache: true,
      fetchImpl: async (input) => {
        requestedDate = new URL(String(input)).searchParams.get("date") ?? "";
        return Response.json({
          status: "OK",
          results: {
            sunrise: "2026-11-19T16:44:57+00:00",
            sunset: "2026-11-20T03:48:51+00:00",
          },
        });
      },
    },
  );
  assert.equal(requestedDate, "2026-11-19");
  assert.equal(honolulu.isDay, true);
  assert.equal(honolulu.theme, "light");
});

test("falls back cleanly to NOAA solar math when the public API fails", async () => {
  clearSolarCache();
  const failingFetch: typeof fetch = async () => {
    throw new Error("Network down");
  };

  // Lahore on 2026-11-20: real sunrise ~01:34 UTC, real sunset ~12:01 UTC
  const solar = computeSolarTimes(31.5204, 74.3587, "2026-11-20");
  assert.ok(solar.sunrise && solar.sunset);
  const srDiffMin =
    Math.abs(Date.parse(solar.sunrise) - Date.parse("2026-11-20T01:34:31Z")) /
    60_000;
  const ssDiffMin =
    Math.abs(Date.parse(solar.sunset) - Date.parse("2026-11-20T12:01:43Z")) /
    60_000;
  assert.ok(srDiffMin < 3, `sunrise off by ${srDiffMin.toFixed(2)}m`);
  assert.ok(ssDiffMin < 3, `sunset off by ${ssDiffMin.toFixed(2)}m`);

  const result = await resolveDaylight(
    new Request("https://urduspeech.com/api/daylight?tz=Asia/Karachi"),
    {
      now: new Date("2026-11-20T14:00:00Z"),
      fetchImpl: failingFetch,
      bypassCache: true,
    },
  );
  assert.equal(result.source, "solar-math");
  assert.equal(result.theme, "dark");
  assert.equal(result.isDay, false);
  assert.equal(result.location.country, "PK");
});

test("handles polar night and midnight sun responses from api.sunrise-sunset.org and solar math", async () => {
  clearSolarCache();
  const polarNight = await resolveDaylight(
    new Request("https://urduspeech.com/api/daylight", {
      headers: {
        "x-vercel-ip-latitude": "78.22",
        "x-vercel-ip-longitude": "15.63",
        "x-vercel-ip-country": "NO",
        "x-vercel-ip-timezone": "Arctic/Longyearbyen",
      },
    }),
    {
      now: new Date("2026-11-20T11:00:00Z"),
      bypassCache: true,
      fetchImpl: async () =>
        Response.json({
          status: "OK",
          results: {
            sunrise: "1970-01-01T00:00:00+00:00",
            sunset: "1970-01-01T00:00:00+00:00",
          },
        }),
    },
  );
  assert.equal(polarNight.theme, "dark");
  assert.equal(polarNight.isDay, false);
  assert.equal(polarNight.polarState, "night");

  const midnightSun = evaluateDaylight(new Date("2026-06-21T01:00:00Z"), {
    sunrise: null,
    sunset: null,
    polarState: "day",
  });
  assert.equal(midnightSun.theme, "light");
  assert.equal(midnightSun.isDay, true);

  // NOAA solar math also detects polar extremes
  assert.equal(
    computeSolarTimes(78.22, 15.63, "2026-11-20").polarState,
    "night",
  );
  assert.equal(computeSolarTimes(78.22, 15.63, "2026-06-21").polarState, "day");
});

test("rejects malformed timezones and out-of-range coordinates safely", async () => {
  assert.equal(validateTimeZone("Not/A_Zone"), null);
  assert.equal(validateTimeZone("<script>alert(1)</script>"), null);
  assert.equal(validateTimeZone("Asia/Calcutta"), "Asia/Kolkata");

  const loc = resolveLocation(
    new Headers({
      "x-vercel-ip-latitude": "999",
      "x-vercel-ip-longitude": "NaN",
    }),
    "Not/A_Zone",
  );
  assert.equal(loc, null);

  const fallback = await resolveDaylight(
    new Request("https://urduspeech.com/api/daylight?tz=Not/A_Zone"),
    { now: new Date("2026-11-20T22:00:00Z") },
  );
  assert.equal(fallback.source, "clock");
  assert.equal(fallback.theme, "dark");
});
