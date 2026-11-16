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
