import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deletion status",
  description:
    "Check progress on an account deletion request using your private UrduSpeech deletion receipt.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DeletionStatusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
