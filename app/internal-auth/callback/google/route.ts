import { bridge } from "@/lib/bridge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FAILED = "/auth/sign-in?oauth=failed";

/**
 * Google redirects the browser here after consent. The request is a cross-site
 * top-level navigation, so it is re-issued to the bridge as a plain same-origin
 * GET carrying only the query, cookies and client IP; the OAuth state cookie,
 * checked by the API, is what proves this browser started the flow.
 */
export async function GET(request: Request) {
  const appOrigin = process.env.APP_ORIGIN;
  if (!appOrigin) return Response.redirect(new URL(FAILED, request.url), 303);
  const incoming = new URL(request.url);
  const headers = new Headers({ accept: "application/json" });
  for (const name of ["cookie", "x-real-ip", "x-forwarded-for"]) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  const target = new URL("/api/backend/v1/auth/callback/google", appOrigin);
  target.search = incoming.search;
  let location = FAILED;
  const cookies: string[] = [];
  try {
    const response = await bridge(
      new Request(target, { method: "GET", headers, signal: request.signal }),
      ["v1", "auth", "callback", "google"],
      process.env,
    );
    if (response.ok) {
      const data = (await response.json()) as { redirect?: unknown };
      // Only a same-site path is ever followed; anything else is a failure.
      if (
        typeof data.redirect === "string" &&
        data.redirect.startsWith("/") &&
        !data.redirect.startsWith("//") &&
        !data.redirect.includes("\\") &&
        new URL(data.redirect, appOrigin).origin === new URL(appOrigin).origin
      )
        location = data.redirect;
      cookies.push(...response.headers.getSetCookie());
    }
  } catch {
    location = FAILED;
  }
  const out = new Headers({
    location: new URL(location, appOrigin).href,
    "Cache-Control": "private, no-store",
    "Referrer-Policy": "no-referrer",
    "X-Robots-Tag": "noindex, nofollow",
  });
  for (const cookie of cookies) out.append("set-cookie", cookie);
  return new Response(null, { status: 303, headers: out });
}
