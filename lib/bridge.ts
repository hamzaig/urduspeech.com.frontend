// Fixed-origin bridge: the browser never receives backend/provider credentials.
import routes from "./routes.json";
export const SESSION_COOKIE = "__Host-urduspeech_session";
export const MAX_BODY = 512 * 1024;
const allowed = routes.map((r) => ({
  method: r.method,
  re: new RegExp("^" + r.path.replace(/\{[^}]+\}/g, "[a-zA-Z0-9_.:-]+") + "$"),
}));
export function allowedRoute(path: string, method: string) {
  return (
    !path.includes("%") &&
    !path.includes("..") &&
    allowed.some((r) => r.method === method && r.re.test(path))
  );
}
function problem(status: number, code: string) {
  return Response.json(
    { code },
    { status, headers: { "Cache-Control": "private, no-store" } },
  );
}
export async function bridge(
  request: Request,
  segments: string[],
  env: Record<string, string | undefined>,
  send: typeof fetch = fetch,
): Promise<Response> {
  const path = "/" + segments.join("/");
  if (!allowedRoute(path, request.method))
    return problem(404, "ROUTE_UNAVAILABLE");
  let upstream: URL, origin: URL;
  try {
    upstream = new URL(env.BACKEND_ORIGIN!);
    origin = new URL(env.APP_ORIGIN!);
    if (
      upstream.protocol !== "https:" ||
      origin.protocol !== "https:" ||
      upstream.username ||
      upstream.password ||
      upstream.pathname !== "/" ||
      upstream.search ||
      upstream.hash ||
      origin.origin !== env.APP_ORIGIN
    )
      throw Error();
  } catch {
    return problem(503, "SERVICE_NOT_CONFIGURED");
  }
  const unsafe = !["GET", "HEAD"].includes(request.method);
  if (unsafe && request.headers.get("origin") !== origin.origin)
    return problem(403, "ORIGIN_REJECTED");
  if (request.headers.get("sec-fetch-site") === "cross-site")
    return problem(403, "ORIGIN_REJECTED");
  const headers = new Headers({
    accept: request.headers.get("accept") ?? "application/json",
  });
  const cookie = request.headers
    .get("cookie")
    ?.split(";")
    .map((s) => s.trim())
    .filter((s) => s.startsWith(SESSION_COOKIE + "="))
    .join("; ");
  if (cookie) headers.set("cookie", cookie);
  if (unsafe) headers.set("origin", origin.origin);
  for (const name of [
    "idempotency-key",
    "if-match",
    "if-none-match",
    "range",
    "deletion-receipt",
    "deletion-account-id",
  ]) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  let body: Uint8Array | undefined;
  if (unsafe && request.body) {
    if (
      !request.headers
        .get("content-type")
        ?.toLowerCase()
        .startsWith("application/json")
    )
      return problem(415, "JSON_REQUIRED");
    if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY)
      return problem(413, "BODY_TOO_LARGE");
    const reader = request.body.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      size += part.value.length;
      if (size > MAX_BODY) {
        await reader.cancel();
        return problem(413, "BODY_TOO_LARGE");
      }
      chunks.push(part.value);
    }
    body = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
      body.set(chunk, offset);
      offset += chunk.length;
    }
    headers.set("content-type", "application/json");
  }
  const incoming = new URL(request.url);
  upstream.pathname = path;
  upstream.search = incoming.search;
  try {
    const response = await send(upstream, {
      method: request.method,
      headers,
      body: body as BodyInit | undefined,
      redirect: "manual",
      cache: "no-store",
      signal: AbortSignal.any([request.signal, AbortSignal.timeout(55_000)]),
    });
    // No redirects are part of the public API contract. Never relay an upstream location.
    if (
      response.status >= 300 &&
      response.status < 400 &&
      response.status !== 304
    ) {
      await response.body?.cancel();
      return problem(502, "UNEXPECTED_RESPONSE");
    }
    const out = new Headers({
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "no-referrer",
    });
    for (const key of [
      "content-type",
      "content-disposition",
      "etag",
      "retry-after",
      "content-range",
      "accept-ranges",
    ]) {
      const value = response.headers.get(key);
      if (value) out.set(key, value);
    }
    for (const value of response.headers.getSetCookie()) {
      if (
        value.startsWith(SESSION_COOKIE + "=") &&
        !/;\s*domain=/i.test(value) &&
        /;\s*secure(?:;|$)/i.test(value) &&
        /;\s*httponly(?:;|$)/i.test(value) &&
        /;\s*path=\/(?:;|$)/i.test(value)
      )
        out.append("set-cookie", value);
    }
    return new Response(response.body, {
      status: response.status,
      headers: out,
    });
  } catch {
    return problem(502, "SERVICE_UNAVAILABLE");
  }
}
