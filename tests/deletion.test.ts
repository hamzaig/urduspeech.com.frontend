import { test } from "node:test";
import assert from "node:assert/strict";
import {
  newDeletionReceipt,
  parseDeletion,
  deletionHeaders,
} from "../lib/deletion";
test("deletion receipts have independent random authority and retain their original account and idempotency identity", () => {
  const id = "01000000-0000-4000-8000-000000000001",
    first = newDeletionReceipt(id),
    second = newDeletionReceipt(id);
  assert.match(first.receipt, /^[a-f0-9]{64}$/);
  assert.notEqual(first.receipt, second.receipt);
  assert.notEqual(first.operationKey, second.operationKey);
  assert.deepEqual(
    parseDeletion(JSON.stringify({ ...first, ignored: "not-retained" })),
    first,
  );
  assert.equal(deletionHeaders(first)["Deletion-Account-Id"], id);
  assert.equal(deletionHeaders(first)["Idempotency-Key"], first.operationKey);
  for (const invalid of [
    "null",
    "{",
    JSON.stringify({ ...first, accountId: "-".repeat(36) }),
    JSON.stringify({ ...first, receipt: "too-short" }),
    "a".repeat(4097),
  ])
    assert.equal(parseDeletion(invalid), null);
});
