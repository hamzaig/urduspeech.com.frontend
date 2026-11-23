import { test } from "node:test";
import assert from "node:assert/strict";
import { bridge, allowedRoute, MAX_BODY, SESSION_COOKIE } from "../lib/bridge";
const env = {
  BACKEND_ORIGIN: "https://api.example.test",
  APP_ORIGIN: "https://urduspeech.com",
};
function request(path = "/v1/session", init: RequestInit = {}) {
  return new Request("https://urduspeech.com/api/backend" + path, init);
}
test("download metadata binds the native POST action to the fixed backend and excludes the file stream route", async () => {
  const id = "01000000-0000-4000-8000-000000000001",
    ticket = "a".repeat(43),
    path = `/v1/renders/${id}/download-ticket`;
  const response = await bridge(
    request(path, {
      method: "POST",
      headers: { origin: env.APP_ORIGIN, "content-type": "application/json" },
      body: "{}",
    }),
    ["v1", "renders", id, "download-ticket"],
    env,
    async () =>
      Response.json({
        ticket,
        expiresIn: 60,
        action: "https://foreign.test/steal",
      }),
  );
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    ticket,
    expiresIn: 60,
    action: env.BACKEND_ORIGIN + "/v1/downloads/stream",
  });
  assert.equal(allowedRoute("/v1/downloads/stream", "POST"), false);
  assert.equal(response.headers.get("cache-control"), "private, no-store");
});
test("malformed and oversized download grants fail before a native action is returned", async () => {
  const id = "01000000-0000-4000-8000-000000000001",
    path = `/v1/exports/${id}/download-ticket`;
  for (const payload of [
    { ticket: "bad", expiresIn: 60 },
    { ticket: "a".repeat(43), expiresIn: 600 },
    { ticket: "a".repeat(2000), expiresIn: 60 },
  ]) {
    const response = await bridge(
      request(path, {
        method: "POST",
        headers: { origin: env.APP_ORIGIN, "content-type": "application/json" },
        body: "{}",
      }),
      ["v1", "exports", id, "download-ticket"],
      env,
      async () => Response.json(payload),
    );
    assert.equal(response.status, 502);
    assert.equal((await response.json()).action, undefined);
  }
});
test("only known public product paths are bridged", () => {
  for (const p of [
    "/health/ready",
    "/v1/admin/unreviewed-route",
    "/v1/webhooks/stripe",
    "/v1/../health/ready",
    "/v1/projects/%2fetc",
    "/v1/internal-auth",
  ])
    assert.equal(allowedRoute(p, "GET"), false, p);
  assert.equal(allowedRoute("/v1/projects", "GET"), true);
  assert.equal(allowedRoute("/v1/projects", "PUT"), false);
  assert.equal(allowedRoute("/v1/admin/settings", "GET"), true);
  assert.equal(allowedRoute("/v1/admin/billing/manual-payments", "GET"), true);
  assert.equal(allowedRoute("/v1/admin/compute/accounts", "DELETE"), false);
});
test("unsafe requests require exact canonical origin, including sign-in", async () => {
  for (const origin of [
    undefined,
    "https://evil.test",
    "https://urduspeech.com.evil.test",
    "null",
  ]) {
    let calls = 0;
    const headers: Record<string, string> = {
      "content-type": "application/json",
    };
    if (origin) headers.origin = origin;
    const response = await bridge(
      request("/v1/auth/sign-in", { method: "POST", headers, body: "{}" }),
      ["v1", "auth", "sign-in"],
      env,
      async () => {
        calls++;
        return new Response("{}");
      },
    );
    assert.equal(response.status, 403);
    assert.equal(calls, 0);
  }
});
test("fixed backend target, only session cookie forwarded, no client proxy headers", async () => {
  let seen = false;
  const response = await bridge(
    request("/v1/projects?limit=10", {
      headers: {
        cookie: `other=private; ${SESSION_COOKIE}=opaque`,
        "x-forwarded-for": "attacker",
        authorization: "Bearer forbidden",
      },
    }),
    ["v1", "projects"],
    env,
    async (url, init) => {
      assert.equal(
        String(url),
        "https://api.example.test/v1/projects?limit=10",
      );
      const h = new Headers(init?.headers);
      assert.equal(h.get("cookie"), SESSION_COOKIE + "=opaque");
      assert.equal(h.get("x-forwarded-for"), null);
      assert.equal(h.get("authorization"), null);
      assert.equal(init?.redirect, "manual");
      seen = true;
      return Response.json({ projects: [] });
    },
  );
  assert.equal(seen, true);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "private, no-store");
});
test("response cookies remain separate, including expiry comma; foreign cookies are dropped", async () => {
  const h = new Headers();
  h.append(
    "set-cookie",
    `${SESSION_COOKIE}=new; Expires=Thu, 01 Jan 2037 00:00:00 GMT; Path=/; Secure; HttpOnly; SameSite=Lax`,
  );
  h.append("set-cookie", "other=secret; Secure; HttpOnly; Path=/");
  const r = await bridge(
    request(),
    ["v1", "session"],
    env,
    async () => new Response("{}", { headers: h }),
  );
  assert.equal(r.headers.getSetCookie().length, 1);
  assert.match(r.headers.getSetCookie()[0], /Expires=Thu, 01 Jan/);
});
test("metadata size is enforced while reading, independent of content-length", async () => {
  let calls = 0;
  const r = await bridge(
    request("/v1/projects", {
      method: "POST",
      headers: { origin: env.APP_ORIGIN, "content-type": "application/json" },
      body: "a".repeat(MAX_BODY + 1),
    }),
    ["v1", "projects"],
    env,
    async () => {
      calls++;
      return new Response("{}");
    },
  );
  assert.equal(r.status, 413);
  assert.equal(calls, 0);
});
test("misconfiguration and redirects fail closed without leaking locations", async () => {
  const noConfig = await bridge(request(), ["v1", "session"], {});
  assert.equal(noConfig.status, 503);
  const redirect = await bridge(
    request(),
    ["v1", "session"],
    env,
    async () =>
      new Response(null, {
        status: 302,
        headers: { location: "https://evil.test" },
      }),
  );
  assert.equal(redirect.status, 502);
  assert.equal(redirect.headers.get("location"), null);
});
test("unsafe JSON forwards origin, etag and idempotency key intact", async () => {
  const r = await bridge(
    request("/v1/projects", {
      method: "POST",
      headers: {
        origin: env.APP_ORIGIN,
        "content-type": "application/json",
        "if-match": '"v1"',
        "idempotency-key": "owned-key",
      },
      body: "{}",
    }),
    ["v1", "projects"],
    env,
    async (_url, init) => {
      const h = new Headers(init?.headers);
      assert.equal(h.get("origin"), env.APP_ORIGIN);
      assert.equal(h.get("if-match"), '"v1"');
      assert.equal(h.get("idempotency-key"), "owned-key");
      return Response.json({});
    },
  );
  assert.equal(r.status, 200);
});
test("deletion receipts and account identity reach only the fixed backend without being copied into response headers", async () => {
  const receipt = "a".repeat(64),
    accountId = "01000000-0000-4000-8000-000000000001";
  const response = await bridge(
    request("/v1/account", {
      method: "DELETE",
      headers: {
        origin: env.APP_ORIGIN,
        "idempotency-key": "owned-deletion",
        "deletion-receipt": receipt,
        "deletion-account-id": accountId,
      },
    }),
    ["v1", "account"],
    env,
    async (url, init) => {
      assert.equal(String(url), env.BACKEND_ORIGIN + "/v1/account");
      const headers = new Headers(init?.headers);
      assert.equal(headers.get("deletion-receipt"), receipt);
      assert.equal(headers.get("deletion-account-id"), accountId);
      return Response.json({ id: "fixture" });
    },
  );
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("deletion-receipt"), null);
});
test("an empty streamed DELETE body is forwarded without a JSON entity and preserves the receipt and expired cookie", async () => {
  for (const contentType of [undefined, "application/json"]) {
    let calls = 0;
    const headers = new Headers({
      origin: env.APP_ORIGIN,
      "idempotency-key": "owned-empty-deletion",
      "deletion-receipt": "a".repeat(64),
      "content-length": "0",
    });
    if (contentType) headers.set("content-type", contentType);
    const init: RequestInit & { duplex: "half" } = {
      method: "DELETE",
      headers,
      body: new ReadableStream<Uint8Array>({
        start(controller) {
          controller.close();
        },
      }),
      duplex: "half",
    };
    const incoming = request("/v1/account", init);
    assert.notEqual(incoming.body, null);
    const response = await bridge(
      incoming,
      ["v1", "account"],
      env,
      async (_url, outgoing) => {
        calls++;
        assert.equal(outgoing?.body, undefined);
        const sent = new Headers(outgoing?.headers);
        assert.equal(sent.get("content-type"), null);
        assert.equal(sent.get("content-length"), null);
        assert.equal(sent.get("deletion-receipt"), "a".repeat(64));
        assert.equal(sent.get("idempotency-key"), "owned-empty-deletion");
        return Response.json(
          { id: "owned-deletion", access: "revoked" },
          {
            status: 202,
            headers: {
              "set-cookie": `${SESSION_COOKIE}=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax`,
            },
          },
        );
      },
    );
    assert.equal(response.status, 202);
    assert.equal(calls, 1);
    assert.match(response.headers.getSetCookie()[0], /Max-Age=0/);
  }
});
test("a nonempty unsafe body still requires JSON before contacting the backend", async () => {
  let calls = 0;
  const response = await bridge(
    request("/v1/account", {
      method: "DELETE",
      headers: { origin: env.APP_ORIGIN, "content-type": "text/plain" },
      body: "not-json",
    }),
    ["v1", "account"],
    env,
    async () => {
      calls++;
      return Response.json({});
    },
  );
  assert.equal(response.status, 415);
  assert.equal(calls, 0);
});
test("signs the Vercel-observed client IP only when a strong secret is configured", async () => {
  const { createHmac } = await import("node:crypto");
  const secret = "s".repeat(40);
  let seen: Headers | undefined;
  const capture = async (_url: URL | RequestInfo, init?: RequestInit) => {
    seen = new Headers(init?.headers);
    return Response.json({});
  };
  const req = () =>
    request("/v1/session", {
      headers: {
        "x-real-ip": "203.0.113.9",
        "x-urduspeech-client-ip": "1.1.1.1",
      },
    });
  await bridge(
    req(),
    ["v1", "session"],
    { ...env, BFF_CLIENT_IP_SECRET: secret },
    capture,
  );
  const ts = seen!.get("x-urduspeech-client-ts")!;
  assert.equal(seen!.get("x-urduspeech-client-ip"), "203.0.113.9");
  assert.equal(
    seen!.get("x-urduspeech-client-sig"),
    createHmac("sha256", secret).update(`${ts}.203.0.113.9`).digest("hex"),
  );
  await bridge(req(), ["v1", "session"], env, capture);
  assert.equal(seen!.get("x-urduspeech-client-ip"), null);
  assert.equal(seen!.get("x-urduspeech-client-sig"), null);
});
