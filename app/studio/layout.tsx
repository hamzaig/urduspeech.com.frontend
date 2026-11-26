import type { Metadata } from "next";
import { Shell } from "@/components/shell";
import "../editor.css";
import "../caption-fonts.css";
import "./studio.css";

export const metadata: Metadata = {
  title: {
    default: "Studio",
    template: "%s | UrduSpeech Studio",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Shell>{children}</Shell>;
}
