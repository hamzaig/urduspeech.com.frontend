import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="auth-wrap">
      <h1>Page not found</h1>
      <Link href="/studio">Open your studio</Link>
    </main>
  );
}
