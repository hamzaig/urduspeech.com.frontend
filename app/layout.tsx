import type { Metadata, Viewport } from "next";
import "@fontsource-variable/public-sans";
import "@fontsource-variable/bricolage-grotesque";
import "./tokens.css";
import "./base.css";
import "./globals.css";
import "./public.css";
import "./site.css";
import "./premium.css";
import "./theme.css";
import "./ajrak.css";
import { AnalyticsProvider } from "@/components/analytics-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { THEME_INIT_SCRIPT } from "@/lib/theme-script";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f6fa" },
    { media: "(prefers-color-scheme: dark)", color: "#151d4a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://urduspeech.com"),
  title: {
    default: "UrduSpeech — AI Urdu Captions & Transcripts",
    template: "%s | UrduSpeech",
  },
  description:
    "Turn spoken Urdu audio and video into editable Nastaliq, Roman Urdu, English, and bilingual transcripts, SRT/VTT subtitles, and captioned MP4 exports.",
  applicationName: "UrduSpeech",
  manifest: "/manifest.webmanifest",
};

const SPECULATION_RULES = JSON.stringify({
  prefetch: [
    {
      where: {
        and: [
          { href_matches: "/*" },
          { not: { href_matches: "/api/*" } },
          { not: { href_matches: "/studio/*" } },
          { not: { href_matches: "/studio" } },
          { not: { href_matches: "/auth/*" } },
          { not: { href_matches: "/deletion-status" } },
        ],
      },
      eagerness: "moderate",
    },
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-type="software" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{ __html: SPECULATION_RULES }}
        />
      </head>
      <body>
        <ThemeProvider>
          <AnalyticsProvider />
          <a className="skip" href="#main">
            Skip to content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
