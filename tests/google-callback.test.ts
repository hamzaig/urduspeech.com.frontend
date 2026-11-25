import { test } from "node:test";
import assert from "node:assert/strict";

// The callback route reads APP_ORIGIN/BACKEND_ORIGIN at request time.
process.env.APP_ORIGIN = "https://urduspeech.com";
process.env.BACKEND_ORIGIN = "https://api.example.test";

async function callback(redirect: unknown, status = 200) {
  const original = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ redirect }), {
      status,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;
  try {
    const { GET } = await import("../app/internal-auth/callback/google/route");
    return await GET(
      new Request(
        "https://urduspeech.com/internal-auth/callback/google?code=c&state=s",
        { headers: { "sec-fetch-site": "cross-site" } },
      ),
    );
  } finally {
    globalThis.fetch = original;
  }
}

test("the Google callback follows only same-site paths the API returns", async () => {
  const ok = await callback("/studio/new");
  assert.equal(ok.status, 303);
  assert.equal(ok.headers.get("location"), "https://urduspeech.com/studio/new");
  for (const bad of [
    "https://evil.test/x",
    "//evil.test",
    "/\\evil.test",
    42,
  ]) {
    const response = await callback(bad);
    assert.equal(
      response.headers.get("location"),
      "https://urduspeech.com/auth/sign-in?oauth=failed",
    );
  }
  const failed = await callback("/studio", 503);
  assert.equal(
    failed.headers.get("location"),
    "https://urduspeech.com/auth/sign-in?oauth=failed",
  );
});
