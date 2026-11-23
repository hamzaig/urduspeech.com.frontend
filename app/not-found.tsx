import type { Metadata } from "next";
import Link from "next/link";
import { PublicPage } from "@/components/public-site";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The requested UrduSpeech page could not be found.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <PublicPage mainClassName="account-page">
      <div className="public-container account-compact">
        <section className="account-panel">
          <h1>Page not found</h1>
          <p>The page may have moved or the link may be incomplete.</p>
          <Link className="button" href="/">
            Back to homepage
          </Link>
        </section>
      </div>
    </PublicPage>
  );
}
