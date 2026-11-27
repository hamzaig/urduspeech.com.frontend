import test from "node:test";
import assert from "node:assert/strict";
import { fetchFinalVideo } from "../lib/final-video";

const grant = {
  action: "https://media.example.test/v1/downloads/stream",
  ticket: "A".repeat(43),
  expiresIn: 60,
};
const signal = new AbortController().signal;
const sample = Uint8Array.of(0, 1, 132, 241, 0);

test("final playback redeems the ticket and preserves the exact MP4 bytes", async () => {
  const updates: number[] = [];
  const file = await fetchFinalVideo(
    grant,
    signal,
    (received) => updates.push(received),
    async (url, request) => {
      assert.equal(url, grant.action);
      assert.equal(request?.method, "POST");
      assert.equal(request?.credentials, "omit");
      assert.equal(request?.redirect, "error");
      assert.equal(request?.signal, signal);
      assert.equal(String(request?.body), "ticket=" + grant.ticket);
      return new Response(sample, {
        headers: { "Content-Type": "video/mp4", "Content-Length": "5" },
      });
    },
  );
  assert.equal(file.type, "video/mp4");
  assert.deepEqual(new Uint8Array(await file.arrayBuffer()), sample);
  assert.equal(updates.at(-1), 5);
});

test("an expired ticket, incomplete file, unexpected media type or oversized file cannot play", async () => {
  for (const response of [
    new Response(null, { status: 404 }),
    new Response(sample, {
      headers: { "content-type": "video/mp4", "content-length": "8" },
    }),
    new Response("<html>oops</html>", {
      headers: { "content-type": "text/html" },
    }),
    new Response(null, {
      headers: { "content-type": "video/mp4", "content-length": "5000000000" },
    }),
  ]) {
    await assert.rejects(
      fetchFinalVideo(
        grant,
        signal,
        () => {},
        async () => response,
      ),
    );
  }
});
