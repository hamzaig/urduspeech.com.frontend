import type { Metadata } from "next";
import "@fontsource-variable/public-sans";
import "./globals.css";
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
    <html lang="en">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
