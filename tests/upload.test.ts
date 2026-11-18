import { test } from "node:test";
import assert from "node:assert/strict";
import { uploadParts, finishUpload, type ReceiptStore } from "../lib/upload";
import { createHash } from "node:crypto";
const upload = {
  id: "upload-1",
  projectId: "project-1",
  mediaId: "media-1",
  byteSize: 7,
  partSize: 4,
  partCount: 2,
  state: "uploading",
};
test("multipart uses exact byte slices, captures etags, and reports only completed bytes", async () => {
  const original = globalThis.fetch;
  const sizes: number[] = [];
  const progress: number[] = [];
  globalThis.fetch = async () =>
    Response.json({
      url: "https://owned.s3.us-east-2.amazonaws.com/key?signature=private",
    });
  try {
    const parts = await uploadParts(
      new Blob(["1234567"]),
      upload,
      (p) => progress.push(p.completed),
      undefined,
      async (_url, init) => {
        sizes.push((init!.body as Blob).size);
        assert.equal(init!.credentials, "omit");
        return new Response("", {
          headers: { etag: '"part-' + sizes.length + '"' },
        });
      },
    );
    assert.deepEqual(sizes, [4, 3]);
    assert.deepEqual(progress, [4, 7]);
    assert.equal(parts.length, 2);
    assert.equal(parts[1].partNumber, 2);
  } finally {
    globalThis.fetch = original;
  }
});
test("resume reuses only parts with matching local bytes, stored hash and remote receipt", async () => {
  const original = globalThis.fetch,
    putSizes: number[] = [];
  let signatures = 0;
  globalThis.fetch = async () => {
    signatures++;
    return Response.json({
      url: "https://owned.s3.us-east-2.amazonaws.com/key",
    });
  };
  const first = {
    partNumber: 1,
    size: 4,
    etag: '"first"',
    sha256: createHash("sha256").update("1234").digest("hex"),
  };
  const receipts: ReceiptStore = {
    read: (_id, part) => (part === 1 ? first : null),
    save() {},
  };
  try {
    const completed: number[] = [];
    const parts = await uploadParts(
      new Blob(["1234567"]),
      upload,
      (p) => completed.push(p.completed),
      undefined,
      async (_url, init) => {
        putSizes.push((init!.body as Blob).size);
        return new Response(null, { headers: { etag: '"new"' } });
      },
      { parts: [first], receipts },
    );
    assert.deepEqual(putSizes, [3]);
    assert.equal(signatures, 1);
    assert.deepEqual(completed, [4, 7]);
    assert.equal(parts[0].etag, '"first"');
    putSizes.length = 0;
    await uploadParts(
      new Blob(["xxxx567"]),
      upload,
      () => {},
      undefined,
      async (_url, init) => {
        putSizes.push((init!.body as Blob).size);
        return new Response(null, { headers: { etag: '"replacement"' } });
      },
      { parts: [first], receipts },
    );
    assert.deepEqual(putSizes, [4, 3]);
  } finally {
    globalThis.fetch = original;
  }
});
test("a different device without local hash receipts reuploads every part instead of stitching unverified bytes", async () => {
  const original = globalThis.fetch,
    puts: number[] = [];
  globalThis.fetch = async () =>
    Response.json({ url: "https://owned.s3.us-east-2.amazonaws.com/key" });
  try {
    await uploadParts(
      new Blob(["1234567"]),
      upload,
      () => {},
      undefined,
      async (_url, init) => {
        puts.push((init!.body as Blob).size);
        return new Response(null, { headers: { etag: '"replacement"' } });
      },
      {
        parts: [{ partNumber: 1, size: 4, etag: '"first"' }],
        receipts: { read: () => null, save() {} },
      },
    );
    assert.deepEqual(puts, [4, 3]);
  } finally {
    globalThis.fetch = original;
  }
});
test("reload after an ambiguous finalize replays its canonical durable manifest and idempotency key", async () => {
  const original = globalThis.fetch,
    calls: string[] = [],
    parts = [
      { partNumber: 1, etag: '"first"' },
      { partNumber: 2, etag: '"last"' },
    ];
  globalThis.fetch = async (url, init) => {
    calls.push(String(url));
    if (!init?.method)
      return Response.json({
        ...upload,
        state: "completing",
        parts: [],
        finalization: { operationKey: "stored-finalization-key", parts },
      });
    assert.equal(
      new Headers(init.headers).get("idempotency-key"),
      "stored-finalization-key",
    );
    assert.deepEqual(JSON.parse(String(init.body)), { parts });
    return Response.json({ ...upload, state: "checksum_pending" });
  };
  try {
    const result = await finishUpload(new Blob(["1234567"]), upload, () => {});
    assert.equal(result.state, "checksum_pending");
    assert.equal(calls.length, 2);
    assert.match(calls[1], /\/finalize$/);
  } finally {
    globalThis.fetch = original;
  }
});
test("failed part never produces successful progress or a finalize payload", async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async () =>
    Response.json({ url: "https://owned.s3.us-east-2.amazonaws.com/key" });
  let completed = 0;
  try {
    await assert.rejects(
      uploadParts(
        new Blob(["1234567"]),
        upload,
        () => completed++,
        undefined,
        async () => new Response("", { status: 403 }),
      ),
      /UPLOAD_PART_FAILED/,
    );
    assert.equal(completed, 0);
  } finally {
    globalThis.fetch = original;
  }
});
test("untrusted signed destinations and missing etags fail closed", async () => {
  const original = globalThis.fetch;
  let uploads = 0;
  try {
    globalThis.fetch = async () =>
      Response.json({ url: "https://evil.test/key" });
    await assert.rejects(
      uploadParts(
        new Blob(["1234567"]),
        upload,
        () => {},
        undefined,
        async () => {
          uploads++;
          return new Response();
        },
      ),
      /UPLOAD_DESTINATION_INVALID/,
    );
    assert.equal(uploads, 0);
    globalThis.fetch = async () =>
      Response.json({ url: "https://owned.s3.us-east-2.amazonaws.com/key" });
    await assert.rejects(
      uploadParts(
        new Blob(["1234567"]),
        upload,
        () => {},
        undefined,
        async () => new Response(),
      ),
      /UPLOAD_ETAG_MISSING/,
    );
  } finally {
    globalThis.fetch = original;
  }
});
