import Link from "next/link";
import { PublicPage } from "@/components/public-site";

export default function NotFound() {
  return (
    <PublicPage mainClassName="account-page">
      <section className="account-panel">
        <h1>Page not found</h1>
        <p>The page may have moved or the link may be incomplete.</p>
        <Link className="button" href="/">
          Back to homepage
        </Link>
      </section>
    </PublicPage>
  );
}
