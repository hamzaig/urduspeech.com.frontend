import { test } from "node:test";
import assert from "node:assert/strict";
import { bridge, MAX_BODY } from "../lib/bridge";
import { captionChanges } from "../lib/caption-edits";

for (const [hours, count] of [
  [3, 1919],
  [6, 3839],
]) {
  test(`one edited cue on a ${hours}-hour track fits the bridge request limit`, async () => {
    const text = "\u0627".repeat(40) + "\n" + "\u0628".repeat(40);
    const cues = Array.from({ length: count }, (_, position) => ({
      position,
      startMs: position * 5500,
      endMs: position * 5500 + 4000,
      text,
      sourceStart: 0,
      sourceEnd: 81,
      confidence: 0.95,
      granularity: "word-group",
      fallback: false,
    }));
    const position = Math.floor(count / 2);
    const changed = {
      position,
      startMs: cues[position].startMs + 200,
      endMs: cues[position].endMs,
      text: "Updated caption",
    };
    const edited = cues.map((cue) =>
      cue.position === position ? { ...cue, ...changed } : cue,
    );
    assert.deepEqual(captionChanges(cues, cues), []);
    const changes = captionChanges(cues, edited);
    const legacyBody = JSON.stringify({ cues: edited });
    const compactBody = JSON.stringify({ changes });
    assert.ok(Buffer.byteLength(legacyBody) > MAX_BODY);
    assert.deepEqual(changes, [changed]);

    const env = {
      APP_ORIGIN: "https://app.example.test",
      BACKEND_ORIGIN: "https://api.example.test",
    };
    const segments = ["v1", "caption-tracks", "track-1"];
    const request = (body: string) =>
      new Request(`${env.APP_ORIGIN}/api/backend/${segments.join("/")}`, {
        method: "PATCH",
        headers: {
          origin: env.APP_ORIGIN,
          "content-type": "application/json",
          "if-match": '"caption:track-1:1"',
          "idempotency-key": "edit-one-cue",
        },
        body,
      });
    let calls = 0;
    const send: typeof fetch = async (_url, init) => {
      calls++;
      const headers = new Headers(init?.headers);
      assert.equal(headers.get("if-match"), '"caption:track-1:1"');
      assert.equal(headers.get("idempotency-key"), "edit-one-cue");
      assert.equal(await new Response(init?.body).text(), compactBody);
      return Response.json({ id: "track-2" });
    };
    const before = await bridge(request(legacyBody), segments, env, send);
    assert.equal(before.status, 413);
    assert.equal(calls, 0);
    const after = await bridge(request(compactBody), segments, env, send);
    assert.equal(after.status, 200);
    assert.equal(calls, 1);
  });
}
