export type ThemeName = "light" | "dark";
export type ThemeMode = "auto" | "light" | "dark";

export type DaylightLocation = {
  lat: number;
  lng: number;
  city?: string;
  country?: string;
  timezone: string;
  locationSource: "vercel-geo" | "country" | "timezone" | "offset";
};

export type DaylightSource = "sunrise-sunset-api" | "solar-math" | "clock";

export type DaylightInfo = {
  theme: ThemeName;
  isDay: boolean;
  sunrise: string | null;
  sunset: string | null;
  nextTransition: string | null;
  polarState?: "day" | "night";
  location: {
    city?: string;
    country?: string;
    timezone: string;
  };
  source: DaylightSource;
};

type Coords = {
  lat: number;
  lng: number;
  city: string;
  country: string;
};

const TIMEZONE_ALIASES: Record<string, string> = {
  "Asia/Calcutta": "Asia/Kolkata",
  "Asia/Islamabad": "Asia/Karachi",
  "Asia/Lahore": "Asia/Karachi",
  "US/Eastern": "America/New_York",
  "US/Central": "America/Chicago",
  "US/Mountain": "America/Denver",
  "US/Pacific": "America/Los_Angeles",
  "Europe/Kiev": "Europe/Kyiv",
};

const TIMEZONE_LOCATIONS: Record<string, Coords> = {
  // Pakistan & South Asia
  "Asia/Karachi": { lat: 31.52, lng: 74.36, city: "Lahore", country: "PK" },
  "Asia/Kolkata": { lat: 28.61, lng: 77.21, city: "New Delhi", country: "IN" },
  "Asia/Dhaka": { lat: 23.81, lng: 90.41, city: "Dhaka", country: "BD" },
  "Asia/Colombo": { lat: 6.93, lng: 79.86, city: "Colombo", country: "LK" },
  "Asia/Kathmandu": {
    lat: 27.72,
    lng: 85.32,
    city: "Kathmandu",
    country: "NP",
  },
  "Asia/Kabul": { lat: 34.56, lng: 69.21, city: "Kabul", country: "AF" },
  // Middle East & Gulf
  "Asia/Dubai": { lat: 25.2, lng: 55.27, city: "Dubai", country: "AE" },
  "Asia/Riyadh": { lat: 24.71, lng: 46.68, city: "Riyadh", country: "SA" },
  "Asia/Qatar": { lat: 25.29, lng: 51.53, city: "Doha", country: "QA" },
  "Asia/Kuwait": { lat: 29.38, lng: 47.98, city: "Kuwait City", country: "KW" },
  "Asia/Bahrain": { lat: 26.23, lng: 50.59, city: "Manama", country: "BH" },
  "Asia/Muscat": { lat: 23.59, lng: 58.38, city: "Muscat", country: "OM" },
  "Asia/Tehran": { lat: 35.69, lng: 51.39, city: "Tehran", country: "IR" },
  "Asia/Baghdad": { lat: 33.31, lng: 44.37, city: "Baghdad", country: "IQ" },
  "Asia/Amman": { lat: 31.95, lng: 35.93, city: "Amman", country: "JO" },
  "Asia/Beirut": { lat: 33.89, lng: 35.5, city: "Beirut", country: "LB" },
  "Asia/Jerusalem": {
    lat: 31.77,
    lng: 35.21,
    city: "Jerusalem",
    country: "IL",
  },
  "Europe/Istanbul": {
    lat: 41.01,
    lng: 28.98,
    city: "Istanbul",
    country: "TR",
  },
  // Europe
  "Europe/London": { lat: 51.51, lng: -0.13, city: "London", country: "GB" },
  "Europe/Dublin": { lat: 53.35, lng: -6.26, city: "Dublin", country: "IE" },
  "Europe/Paris": { lat: 48.86, lng: 2.35, city: "Paris", country: "FR" },
  "Europe/Berlin": { lat: 52.52, lng: 13.41, city: "Berlin", country: "DE" },
  "Europe/Amsterdam": {
    lat: 52.37,
    lng: 4.9,
    city: "Amsterdam",
    country: "NL",
  },
  "Europe/Brussels": { lat: 50.85, lng: 4.35, city: "Brussels", country: "BE" },
  "Europe/Zurich": { lat: 47.37, lng: 8.54, city: "Zurich", country: "CH" },
  "Europe/Madrid": { lat: 40.42, lng: -3.7, city: "Madrid", country: "ES" },
  "Europe/Rome": { lat: 41.9, lng: 12.5, city: "Rome", country: "IT" },
  "Europe/Vienna": { lat: 48.21, lng: 16.37, city: "Vienna", country: "AT" },
  "Europe/Stockholm": {
    lat: 59.33,
    lng: 18.07,
    city: "Stockholm",
    country: "SE",
  },
  "Europe/Oslo": { lat: 59.91, lng: 10.75, city: "Oslo", country: "NO" },
  "Europe/Copenhagen": {
    lat: 55.68,
    lng: 12.57,
    city: "Copenhagen",
    country: "DK",
  },
  "Europe/Helsinki": {
    lat: 60.17,
    lng: 24.94,
    city: "Helsinki",
    country: "FI",
  },
  "Europe/Warsaw": { lat: 52.23, lng: 21.01, city: "Warsaw", country: "PL" },
  "Europe/Prague": { lat: 50.08, lng: 14.44, city: "Prague", country: "CZ" },
  "Europe/Athens": { lat: 37.98, lng: 23.73, city: "Athens", country: "GR" },
  "Europe/Lisbon": { lat: 38.72, lng: -9.14, city: "Lisbon", country: "PT" },
  "Europe/Bucharest": {
    lat: 44.43,
    lng: 26.1,
    city: "Bucharest",
    country: "RO",
  },
  "Europe/Kyiv": { lat: 50.45, lng: 30.52, city: "Kyiv", country: "UA" },
  "Europe/Moscow": { lat: 55.76, lng: 37.62, city: "Moscow", country: "RU" },
  // North America
  "America/New_York": {
    lat: 40.71,
    lng: -74.01,
    city: "New York",
    country: "US",
  },
  "America/Chicago": {
    lat: 41.88,
    lng: -87.63,
    city: "Chicago",
    country: "US",
  },
  "America/Denver": { lat: 39.74, lng: -104.99, city: "Denver", country: "US" },
  "America/Phoenix": {
    lat: 33.45,
    lng: -112.07,
    city: "Phoenix",
    country: "US",
  },
  "America/Los_Angeles": {
    lat: 34.05,
    lng: -118.24,
    city: "Los Angeles",
    country: "US",
  },
  "America/Anchorage": {
    lat: 61.22,
    lng: -149.9,
    city: "Anchorage",
    country: "US",
  },
  "Pacific/Honolulu": {
    lat: 21.31,
    lng: -157.86,
    city: "Honolulu",
    country: "US",
  },
  "America/Toronto": {
    lat: 43.65,
    lng: -79.38,
    city: "Toronto",
    country: "CA",
  },
  "America/Vancouver": {
    lat: 49.28,
    lng: -123.12,
    city: "Vancouver",
    country: "CA",
  },
  "America/Edmonton": {
    lat: 53.55,
    lng: -113.49,
    city: "Edmonton",
    country: "CA",
  },
  "America/Halifax": {
    lat: 44.65,
    lng: -63.57,
    city: "Halifax",
    country: "CA",
  },
  "America/Mexico_City": {
    lat: 19.43,
    lng: -99.13,
    city: "Mexico City",
    country: "MX",
  },
  // South America
  "America/Sao_Paulo": {
    lat: -23.55,
    lng: -46.63,
    city: "Sao Paulo",
    country: "BR",
  },
  "America/Argentina/Buenos_Aires": {
    lat: -34.6,
    lng: -58.38,
    city: "Buenos Aires",
    country: "AR",
  },
  "America/Bogota": { lat: 4.71, lng: -74.07, city: "Bogota", country: "CO" },
  "America/Lima": { lat: -12.05, lng: -77.04, city: "Lima", country: "PE" },
  "America/Santiago": {
    lat: -33.45,
    lng: -70.67,
    city: "Santiago",
    country: "CL",
  },
  // Asia-Pacific & Oceania
  "Asia/Kuala_Lumpur": {
    lat: 3.14,
    lng: 101.69,
    city: "Kuala Lumpur",
    country: "MY",
  },
  "Asia/Singapore": {
    lat: 1.35,
    lng: 103.82,
    city: "Singapore",
    country: "SG",
  },
  "Asia/Jakarta": { lat: -6.21, lng: 106.85, city: "Jakarta", country: "ID" },
  "Asia/Bangkok": { lat: 13.76, lng: 100.5, city: "Bangkok", country: "TH" },
  "Asia/Ho_Chi_Minh": {
    lat: 10.82,
    lng: 106.63,
    city: "Ho Chi Minh City",
    country: "VN",
  },
  "Asia/Manila": { lat: 14.6, lng: 120.98, city: "Manila", country: "PH" },
  "Asia/Hong_Kong": {
    lat: 22.32,
    lng: 114.17,
    city: "Hong Kong",
    country: "HK",
  },
  "Asia/Shanghai": { lat: 31.23, lng: 121.47, city: "Shanghai", country: "CN" },
  "Asia/Taipei": { lat: 25.03, lng: 121.57, city: "Taipei", country: "TW" },
  "Asia/Seoul": { lat: 37.57, lng: 126.98, city: "Seoul", country: "KR" },
  "Asia/Tokyo": { lat: 35.68, lng: 139.65, city: "Tokyo", country: "JP" },
  "Asia/Almaty": { lat: 43.24, lng: 76.89, city: "Almaty", country: "KZ" },
  "Asia/Tashkent": { lat: 41.3, lng: 69.24, city: "Tashkent", country: "UZ" },
  "Australia/Sydney": {
    lat: -33.87,
    lng: 151.21,
    city: "Sydney",
    country: "AU",
  },
  "Australia/Melbourne": {
    lat: -37.81,
    lng: 144.96,
    city: "Melbourne",
    country: "AU",
  },
  "Australia/Brisbane": {
    lat: -27.47,
    lng: 153.03,
    city: "Brisbane",
    country: "AU",
  },
  "Australia/Perth": { lat: -31.95, lng: 115.86, city: "Perth", country: "AU" },
  "Pacific/Auckland": {
    lat: -36.85,
    lng: 174.76,
    city: "Auckland",
    country: "NZ",
  },
  // Africa
  "Africa/Cairo": { lat: 30.04, lng: 31.24, city: "Cairo", country: "EG" },
  "Africa/Johannesburg": {
    lat: -26.2,
    lng: 28.05,
    city: "Johannesburg",
    country: "ZA",
  },
  "Africa/Lagos": { lat: 6.52, lng: 3.38, city: "Lagos", country: "NG" },
  "Africa/Nairobi": { lat: -1.29, lng: 36.82, city: "Nairobi", country: "KE" },
  "Africa/Casablanca": {
    lat: 33.57,
    lng: -7.59,
    city: "Casablanca",
    country: "MA",
  },
};

const COUNTRY_FALLBACK_TZ: Record<string, string> = {
  PK: "Asia/Karachi",
  IN: "Asia/Kolkata",
  BD: "Asia/Dhaka",
  AE: "Asia/Dubai",
  SA: "Asia/Riyadh",
  QA: "Asia/Qatar",
  KW: "Asia/Kuwait",
  BH: "Asia/Bahrain",
  OM: "Asia/Muscat",
  GB: "Europe/London",
  IE: "Europe/Dublin",
  US: "America/New_York",
  CA: "America/Toronto",
  AU: "Australia/Sydney",
  NZ: "Pacific/Auckland",
  DE: "Europe/Berlin",
  FR: "Europe/Paris",
  NL: "Europe/Amsterdam",
  ES: "Europe/Madrid",
  IT: "Europe/Rome",
  SE: "Europe/Stockholm",
  NO: "Europe/Oslo",
  DK: "Europe/Copenhagen",
  TR: "Europe/Istanbul",
  MY: "Asia/Kuala_Lumpur",
  SG: "Asia/Singapore",
  ID: "Asia/Jakarta",
  JP: "Asia/Tokyo",
  KR: "Asia/Seoul",
  CN: "Asia/Shanghai",
  EG: "Africa/Cairo",
  ZA: "Africa/Johannesburg",
  BR: "America/Sao_Paulo",
};

type SolarTimes = {
  sunrise: string | null;
  sunset: string | null;
  polarState?: "day" | "night";
};

type CacheEntry = {
  data: SolarTimes;
  expiresAt: number;
};

const CACHE_TTL_MS = 12 * 60 * 60 * 1000;
const CACHE_MAX_ENTRIES = 500;
const solarApiCache = new Map<string, CacheEntry>();

export function clearSolarCache() {
  solarApiCache.clear();
}

export function validateTimeZone(raw?: string | null): string | null {
  if (!raw || raw.length > 64 || !/^[A-Za-z0-9_/+.-]+$/.test(raw)) return null;
  const canonical = TIMEZONE_ALIASES[raw] ?? raw;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: canonical }).format(
      new Date(0),
    );
    return canonical;
  } catch {
    return null;
  }
}

function parseCoordinate(
  raw: string | null,
  min: number,
  max: number,
): number | null {
  if (!raw) return null;
  const value = Number(raw);
  if (!Number.isFinite(value) || value < min || value > max) return null;
  return value;
}

function decodeHeaderText(raw: string | null): string | undefined {
  if (!raw) return undefined;
  try {
    const clean = decodeURIComponent(raw).trim();
    return clean && clean.length <= 80 ? clean : undefined;
  } catch {
    const clean = raw.trim();
    return clean && clean.length <= 80 ? clean : undefined;
  }
}

function parseCountryCode(raw: string | null): string | undefined {
  if (!raw) return undefined;
  const code = raw.trim().toUpperCase();
  return /^[A-Z]{2}$/.test(code) ? code : undefined;
}

export function utcOffsetHours(now: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const pick = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value ?? 0);
  const asUtc = Date.UTC(
    pick("year"),
    pick("month") - 1,
    pick("day"),
    pick("hour"),
    pick("minute"),
    pick("second"),
  );
  return (asUtc - now.getTime()) / 3_600_000;
}

export function localDateInTimeZone(now: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const pick = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "01";
  return `${pick("year")}-${pick("month")}-${pick("day")}`;
}

export function localHourInTimeZone(now: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  return Number(parts.find((p) => p.type === "hour")?.value ?? 12);
}

export function resolveLocation(
  headers: Headers,
  clientTzRaw?: string | null,
  now = new Date(),
): DaylightLocation | null {
  const lat = parseCoordinate(headers.get("x-vercel-ip-latitude"), -90, 90);
  const lng = parseCoordinate(headers.get("x-vercel-ip-longitude"), -180, 180);
  const country = parseCountryCode(headers.get("x-vercel-ip-country"));
  const city = decodeHeaderText(headers.get("x-vercel-ip-city"));
  const vercelTz = validateTimeZone(headers.get("x-vercel-ip-timezone"));
  const clientTz = validateTimeZone(clientTzRaw);
  const timezone =
    vercelTz ??
    clientTz ??
    (country ? COUNTRY_FALLBACK_TZ[country] : undefined) ??
    "UTC";

  if (lat !== null && lng !== null) {
    return {
      lat,
      lng,
      city,
      country,
      timezone,
      locationSource: "vercel-geo",
    };
  }

  if (country && COUNTRY_FALLBACK_TZ[country]) {
    const fallbackTz = COUNTRY_FALLBACK_TZ[country];
    const coords = TIMEZONE_LOCATIONS[fallbackTz];
    if (coords) {
      return {
        lat: coords.lat,
        lng: coords.lng,
        city: city ?? coords.city,
        country,
        timezone: clientTz ?? vercelTz ?? fallbackTz,
        locationSource: "country",
      };
    }
  }

  const knownTz = clientTz ?? vercelTz;
  if (knownTz && TIMEZONE_LOCATIONS[knownTz]) {
    const coords = TIMEZONE_LOCATIONS[knownTz];
    return {
      lat: coords.lat,
      lng: coords.lng,
      city: city ?? coords.city,
      country: country ?? coords.country,
      timezone: knownTz,
      locationSource: "timezone",
    };
  }

  if (knownTz && knownTz !== "UTC" && knownTz !== "Etc/UTC") {
    const offset = utcOffsetHours(now, knownTz);
    const approxLng = Math.max(-180, Math.min(180, offset * 15));
    return {
      lat: 0,
      lng: approxLng,
      city,
      country,
      timezone: knownTz,
      locationSource: "offset",
    };
  }

  return null;
}

const DEG = Math.PI / 180;
const RAD = 180 / Math.PI;

/**
 * Pure NOAA solar sunrise/sunset fallback calculation.
 * Accurate to within ~1–2 minutes globally and handles polar day/night.
 */
export function computeSolarTimes(
  lat: number,
  lng: number,
  dateStr: string,
): SolarTimes {
  const [year, month, day] = dateStr.split("-").map(Number);
  const localNoonUtcMs =
    Date.UTC(year, month - 1, day, 12, 0, 0) -
    Math.round((lng / 15) * 3_600_000);
  const jd = localNoonUtcMs / 86_400_000 + 2440587.5;
  const T = (jd - 2451545.0) / 36525.0;

  const L0 =
    (((280.46646 + T * (36000.76983 + 0.0003032 * T)) % 360) + 360) % 360;
  const M = 357.52911 + T * (35999.05029 - 0.0001537 * T);
  const e = 0.016708634 - T * (0.000042037 + 0.0000001267 * T);

  const mRad = M * DEG;
  const c =
    Math.sin(mRad) * (1.914602 - T * (0.004817 + 0.000014 * T)) +
    Math.sin(2 * mRad) * (0.019993 - 0.000101 * T) +
    Math.sin(3 * mRad) * 0.000289;
  const sunLon = L0 + c;
  const omega = 125.04 - 1934.136 * T;
  const lambda = sunLon - 0.00569 - 0.00478 * Math.sin(omega * DEG);

  const eps0 =
    23 +
    (26 + (21.448 - T * (46.815 + T * (0.00059 - T * 0.001813))) / 60) / 60;
  const eps = eps0 + 0.00256 * Math.cos(omega * DEG);

  const decl = Math.asin(Math.sin(eps * DEG) * Math.sin(lambda * DEG));
  const y = Math.tan((eps / 2) * DEG) ** 2;
  const l0Rad = L0 * DEG;
  const eqTime =
    4 *
    RAD *
    (y * Math.sin(2 * l0Rad) -
      2 * e * Math.sin(mRad) +
      4 * e * y * Math.sin(mRad) * Math.cos(2 * l0Rad) -
      0.5 * y * y * Math.sin(4 * l0Rad) -
      1.25 * e * e * Math.sin(2 * mRad));

  const clampedLat = Math.max(-89.9, Math.min(89.9, lat));
  const latRad = clampedLat * DEG;
  const cosH =
    (Math.cos(90.833 * DEG) - Math.sin(latRad) * Math.sin(decl)) /
    (Math.cos(latRad) * Math.cos(decl));

  if (cosH > 1) return { sunrise: null, sunset: null, polarState: "night" };
  if (cosH < -1) return { sunrise: null, sunset: null, polarState: "day" };

  const hourAngleDeg = Math.acos(cosH) * RAD;
  const solarNoonMin = 720 - 4 * lng - eqTime;
  const dayStartUtc = Date.UTC(year, month - 1, day, 0, 0, 0);
  const sunriseMs =
    dayStartUtc + Math.round((solarNoonMin - 4 * hourAngleDeg) * 60_000);
  const sunsetMs =
    dayStartUtc + Math.round((solarNoonMin + 4 * hourAngleDeg) * 60_000);

  return {
    sunrise: new Date(sunriseMs).toISOString(),
    sunset: new Date(sunsetMs).toISOString(),
  };
}

function parseSunriseSunsetApi(payload: unknown): SolarTimes | null {
  if (!payload || typeof payload !== "object") return null;
  const record = payload as {
    status?: unknown;
    results?: { sunrise?: unknown; sunset?: unknown };
  };
  if (record.status !== "OK" || !record.results) return null;
  const { sunrise, sunset } = record.results;
  if (typeof sunrise !== "string" || typeof sunset !== "string") return null;

  const sunriseMs = Date.parse(sunrise);
  const sunsetMs = Date.parse(sunset);
  if (!Number.isFinite(sunriseMs) || !Number.isFinite(sunsetMs)) return null;

  // api.sunrise-sunset.org encodes polar night as 1970-01-01T00:00:00+00:00
  // and midnight sun as 1970-01-01T00:00:01+00:00.
  if (sunriseMs === 0 && sunsetMs === 0) {
    return { sunrise: null, sunset: null, polarState: "night" };
  }
  if (sunriseMs === 1000 && sunsetMs === 1000) {
    return { sunrise: null, sunset: null, polarState: "day" };
  }
  if (sunsetMs <= sunriseMs) return null;

  return {
    sunrise: new Date(sunriseMs).toISOString(),
    sunset: new Date(sunsetMs).toISOString(),
  };
}

export async function fetchSunriseSunset(
  lat: number,
  lng: number,
  dateStr: string,
  options: { fetchImpl?: typeof fetch; bypassCache?: boolean } = {},
): Promise<SolarTimes | null> {
  const fetchImpl = options.fetchImpl ?? fetch;
  const roundedLat = Math.round(lat * 100) / 100;
  const roundedLng = Math.round(lng * 100) / 100;
  const key = `${roundedLat},${roundedLng},${dateStr}`;

  if (!options.bypassCache) {
    const cached = solarApiCache.get(key);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.data;
    }
  }

  const url =
    `https://api.sunrise-sunset.org/json?lat=${roundedLat}&lng=${roundedLng}` +
    `&date=${encodeURIComponent(dateStr)}&formatted=0`;

  try {
    const response = await fetchImpl(url, {
      method: "GET",
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(2500),
      cache: "no-store",
    });
    if (!response.ok) return null;
    const json: unknown = await response.json();
    const parsed = parseSunriseSunsetApi(json);
    if (!parsed) return null;

    if (!options.bypassCache) {
      if (solarApiCache.size >= CACHE_MAX_ENTRIES) {
        const oldest = solarApiCache.keys().next().value;
        if (oldest) solarApiCache.delete(oldest);
      }
      solarApiCache.set(key, {
        data: parsed,
        expiresAt: Date.now() + CACHE_TTL_MS,
      });
    }
    return parsed;
  } catch {
    return null;
  }
}

export function evaluateDaylight(
  now: Date,
  times: SolarTimes,
): {
  isDay: boolean;
  theme: ThemeName;
  nextTransition: string | null;
} {
  if (times.polarState === "day") {
    return { isDay: true, theme: "light", nextTransition: null };
  }
  if (times.polarState === "night") {
    return { isDay: false, theme: "dark", nextTransition: null };
  }

  const nowMs = now.getTime();
  const sunriseMs = times.sunrise ? Date.parse(times.sunrise) : NaN;
  const sunsetMs = times.sunset ? Date.parse(times.sunset) : NaN;

  if (!Number.isFinite(sunriseMs) || !Number.isFinite(sunsetMs)) {
    return { isDay: true, theme: "light", nextTransition: null };
  }

  if (nowMs < sunriseMs) {
    return {
      isDay: false,
      theme: "dark",
      nextTransition: new Date(sunriseMs).toISOString(),
    };
  }
  if (nowMs < sunsetMs) {
    return {
      isDay: true,
      theme: "light",
      nextTransition: new Date(sunsetMs).toISOString(),
    };
  }

  // After today's sunset: next sunrise is roughly 24 hours after today's sunrise.
  return {
    isDay: false,
    theme: "dark",
    nextTransition: new Date(sunriseMs + 86_400_000).toISOString(),
  };
}

export async function resolveDaylight(
  request: Request,
  options: {
    now?: Date;
    fetchImpl?: typeof fetch;
    bypassCache?: boolean;
  } = {},
): Promise<DaylightInfo> {
  const now = options.now ?? new Date();
  const url = new URL(request.url);
  const clientTz = url.searchParams.get("tz");
  const location = resolveLocation(request.headers, clientTz, now);

  if (!location) {
    const fallbackTz = validateTimeZone(clientTz) ?? "UTC";
    const hour = localHourInTimeZone(now, fallbackTz);
    const isDay = hour >= 6 && hour < 18;
    return {
      theme: isDay ? "light" : "dark",
      isDay,
      sunrise: null,
      sunset: null,
      nextTransition: null,
      location: { timezone: fallbackTz },
      source: "clock",
    };
  }

  const dateStr = localDateInTimeZone(now, location.timezone);
  const apiTimes = await fetchSunriseSunset(
    location.lat,
    location.lng,
    dateStr,
    {
      fetchImpl: options.fetchImpl,
      bypassCache: options.bypassCache,
    },
  );

  const source: DaylightSource = apiTimes ? "sunrise-sunset-api" : "solar-math";
  const times =
    apiTimes ?? computeSolarTimes(location.lat, location.lng, dateStr);
  const evaluated = evaluateDaylight(now, times);

  return {
    theme: evaluated.theme,
    isDay: evaluated.isDay,
    sunrise: times.sunrise,
    sunset: times.sunset,
    nextTransition: evaluated.nextTransition,
    ...(times.polarState ? { polarState: times.polarState } : {}),
    location: {
      ...(location.city ? { city: location.city } : {}),
      ...(location.country ? { country: location.country } : {}),
      timezone: location.timezone,
    },
    source,
  };
}
