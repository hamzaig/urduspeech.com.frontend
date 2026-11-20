"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { DaylightInfo, ThemeMode, ThemeName } from "@/lib/daylight";
import { SUN_CACHE_KEY, THEME_MODE_KEY } from "@/lib/theme-script";

type SunCache = {
  savedAt: number;
  tz: string;
  info: DaylightInfo;
  sunrise: string | null;
  sunset: string | null;
  polarState?: "day" | "night";
};

type ThemeContextValue = {
  mode: ThemeMode;
  resolvedTheme: ThemeName;
  daylight: DaylightInfo | null;
  loading: boolean;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const CACHE_FRESH_MS = 2 * 60 * 60 * 1000; // Re-query API at most every 2h unless a transition occurred

function getClientTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  } catch {
    return "";
  }
}

function readStoredMode(): ThemeMode {
  try {
    const value = localStorage.getItem(THEME_MODE_KEY);
    if (value === "light" || value === "dark" || value === "auto") return value;
  } catch {
    // Ignore storage errors (private mode / blocked storage)
  }
  return "auto";
}

function readSunCache(currentTz: string): SunCache | null {
  try {
    const raw = localStorage.getItem(SUN_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<SunCache>;
    if (!parsed || !parsed.info || typeof parsed.savedAt !== "number") {
      return null;
    }
    if (currentTz && parsed.tz && parsed.tz !== currentTz) return null;
    return parsed as SunCache;
  } catch {
    return null;
  }
}

function writeSunCache(tz: string, info: DaylightInfo) {
  try {
    const entry: SunCache = {
      savedAt: Date.now(),
      tz,
      info,
      sunrise: info.sunrise,
      sunset: info.sunset,
      polarState: info.polarState,
    };
    localStorage.setItem(SUN_CACHE_KEY, JSON.stringify(entry));
  } catch {
    // Ignore storage errors
  }
}

function evaluateCachedTheme(
  info: DaylightInfo,
  nowMs = Date.now(),
): ThemeName {
  if (info.polarState === "day") return "light";
  if (info.polarState === "night") return "dark";
  if (info.sunrise && info.sunset) {
    const sr = Date.parse(info.sunrise);
    const ss = Date.parse(info.sunset);
    if (Number.isFinite(sr) && Number.isFinite(ss)) {
      return nowMs >= sr && nowMs < ss ? "light" : "dark";
    }
  }
  return info.theme;
}

function applyThemeToDom(theme: ThemeName, mode: ThemeMode, animate: boolean) {
  const root = document.documentElement;
  const changed = root.dataset.theme !== theme;

  if (animate && changed) {
    root.classList.add("theme-transition");
    window.setTimeout(() => {
      root.classList.remove("theme-transition");
    }, 360);
  }

  root.dataset.theme = theme;
  root.dataset.themeMode = mode;
  root.style.colorScheme = theme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("auto");
  const [resolvedTheme, setResolvedTheme] = useState<ThemeName>("light");
  const [daylight, setDaylight] = useState<DaylightInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const modeRef = useRef<ThemeMode>("auto");
  const timerRef = useRef<number | null>(null);

  const fetchDaylight = useCallback(async (force = false) => {
    const tz = getClientTimeZone();
    if (!force) {
      const cached = readSunCache(tz);
      if (cached) {
        const now = Date.now();
        const nextMs = cached.info.nextTransition
          ? Date.parse(cached.info.nextTransition)
          : NaN;
        const passedTransition = Number.isFinite(nextMs) && now >= nextMs;
        if (!passedTransition && now - cached.savedAt < CACHE_FRESH_MS) {
          const liveTheme = evaluateCachedTheme(cached.info, now);
          const refreshed: DaylightInfo = {
            ...cached.info,
            isDay: liveTheme === "light",
            theme: liveTheme,
          };
          setDaylight(refreshed);
          setLoading(false);
          if (modeRef.current === "auto") {
            setResolvedTheme(liveTheme);
            applyThemeToDom(liveTheme, "auto", false);
          }
          return refreshed;
        }
      }
    }

    try {
      const query = tz ? `?tz=${encodeURIComponent(tz)}` : "";
      const response = await fetch(`/api/daylight${query}`, {
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Daylight request failed");
      const data = (await response.json()) as DaylightInfo;
      writeSunCache(tz, data);
      setDaylight(data);
      setLoading(false);
      if (modeRef.current === "auto") {
        setResolvedTheme(data.theme);
        applyThemeToDom(data.theme, "auto", true);
      }
      return data;
    } catch {
      setLoading(false);
      if (modeRef.current === "auto") {
        const hour = new Date().getHours();
        const fallback: ThemeName = hour >= 6 && hour < 18 ? "light" : "dark";
        setResolvedTheme(fallback);
        applyThemeToDom(fallback, "auto", false);
      }
      return null;
    }
  }, []);

  // Initialize from DOM/localStorage on mount and fetch live sunrise/sunset
  useEffect(() => {
    const initialMode = readStoredMode();
    modeRef.current = initialMode;
    setModeState(initialMode);

    const domTheme =
      document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    const initialTheme: ThemeName =
      initialMode === "auto" ? domTheme : initialMode;
    setResolvedTheme(initialTheme);
    applyThemeToDom(initialTheme, initialMode, false);

    void fetchDaylight(false);
  }, [fetchDaylight]);

  // Schedule an automatic refresh right when the next sunrise/sunset occurs
  useEffect(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (!daylight?.nextTransition) return;

    const targetMs = Date.parse(daylight.nextTransition);
    if (!Number.isFinite(targetMs)) return;

    // Cap timeout at 6 hours to avoid 32-bit timer overflow and stay fresh
    const delay = Math.max(
      15_000,
      Math.min(targetMs - Date.now() + 2_000, 6 * 60 * 60 * 1000),
    );
    timerRef.current = window.setTimeout(() => {
      void fetchDaylight(true);
    }, delay);

    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [daylight?.nextTransition, fetchDaylight]);

  // Re-check when returning to a backgrounded tab (e.g. laptop woke up after sunset)
  useEffect(() => {
    function onVisible() {
      if (document.visibilityState === "visible") {
        void fetchDaylight(false);
      }
    }
    function onStorage(event: StorageEvent) {
      if (event.key !== THEME_MODE_KEY) return;
      const next = readStoredMode();
      modeRef.current = next;
      setModeState(next);
      if (next === "light" || next === "dark") {
        setResolvedTheme(next);
        applyThemeToDom(next, next, true);
      } else if (daylight) {
        const sunTheme = evaluateCachedTheme(daylight);
        setResolvedTheme(sunTheme);
        applyThemeToDom(sunTheme, "auto", true);
      } else {
        void fetchDaylight(false);
      }
    }
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("storage", onStorage);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("storage", onStorage);
    };
  }, [daylight, fetchDaylight]);

  const setMode = useCallback(
    (nextMode: ThemeMode) => {
      modeRef.current = nextMode;
      setModeState(nextMode);
      try {
        localStorage.setItem(THEME_MODE_KEY, nextMode);
      } catch {
        // Ignore storage errors
      }

      if (nextMode === "light" || nextMode === "dark") {
        setResolvedTheme(nextMode);
        applyThemeToDom(nextMode, nextMode, true);
      } else if (daylight) {
        const sunTheme = evaluateCachedTheme(daylight);
        setResolvedTheme(sunTheme);
        applyThemeToDom(sunTheme, "auto", true);
      } else {
        const hour = new Date().getHours();
        const fallback: ThemeName = hour >= 6 && hour < 18 ? "light" : "dark";
        setResolvedTheme(fallback);
        applyThemeToDom(fallback, "auto", true);
        void fetchDaylight(true);
      }
    },
    [daylight, fetchDaylight],
  );

  return (
    <ThemeContext.Provider
      value={{ mode, resolvedTheme, daylight, loading, setMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return ctx;
}
