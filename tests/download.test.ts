import { test } from "node:test";
import assert from "node:assert/strict";
import { downloadForm, startDownload } from "../lib/download";
test("keeps download authority in the POST body and permits only the HTTPS stream action", async () => {
  const grant = {
    ticket: "a".repeat(43),
    expiresIn: 60,
    action: "https://backend.example.test/v1/downloads/stream",
  };
  assert.deepEqual(downloadForm(grant), {
    action: grant.action,
    method: "POST",
    ticket: grant.ticket,
  });
  assert.ok(!downloadForm(grant).action.includes(grant.ticket));
  for (const action of [
    "http://backend.example.test/v1/downloads/stream",
    "https://owner:password@backend.example.test/v1/downloads/stream",
    "https://backend.example.test/other",
    "https://backend.example.test/v1/downloads/stream?ticket=private",
    "https://backend.example.test/v1/downloads/stream#private",
    "https://backend.example.test:444/v1/downloads/stream",
  ])
    assert.throws(
      () => downloadForm({ ...grant, action }),
      /DOWNLOAD_DESTINATION_INVALID/,
    );
  assert.throws(
    () => downloadForm({ ...grant, ticket: "bad" }),
    /DOWNLOAD_DESTINATION_INVALID/,
  );
  assert.throws(
    () => downloadForm({ ...grant, expiresIn: 600 }),
    /DOWNLOAD_DESTINATION_INVALID/,
  );
  await assert.rejects(
    startDownload("https://foreign.test/download"),
    /DOWNLOAD_PATH_INVALID/,
  );
});
