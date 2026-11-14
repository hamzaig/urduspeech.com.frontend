import { test } from "node:test";
import assert from "node:assert/strict";
import { uploadParts } from "../lib/upload";
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
