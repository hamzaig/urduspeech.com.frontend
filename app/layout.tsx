import type { Metadata } from "next";
import "@fontsource-variable/public-sans";
import "@fontsource-variable/bricolage-grotesque";
import "./globals.css";
import "./editor.css";
import "./public.css";
import "./site.css";
import "./home.css";
export const metadata: Metadata = {
  title: {
    default: "UrduSpeech — Creator studio",
    template: "%s | UrduSpeech",
  },
  description:
    "Turn your Urdu audio and video into editable transcripts and captions.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-type="software" className="m-enter">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
