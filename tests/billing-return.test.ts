import { test } from "node:test";
import assert from "node:assert/strict";
import {
  parseCheckoutReturn,
  verifiedPaymentReturn,
} from "../lib/billing-return";
const id = "01000000-0000-4000-8000-000000000001";
test("checkout return only selects an authenticated status lookup and cannot prove payment", () => {
  assert.deepEqual(parseCheckoutReturn("?checkout=success&transaction=" + id), {
    kind: "success",
    transactionId: id,
  });
  assert.deepEqual(
    parseCheckoutReturn("?checkout=cancelled&transaction=" + id),
    { kind: "cancelled", transactionId: id },
  );
  for (const search of [
    "",
    "?checkout=success",
    "?checkout=unknown&transaction=" + id,
    "?checkout=success&transaction=../other",
    "?checkout=success&checkout=cancelled&transaction=" + id,
    "?checkout=success&transaction=" + id + "&transaction=" + id,
  ])
    assert.equal(parseCheckoutReturn(search), null);
  assert.equal(
    verifiedPaymentReturn(
      { transactionId: id, provider: "stripe", status: "pending" },
      id,
    ).paid,
    false,
  );
  assert.equal(
    verifiedPaymentReturn(
      { transactionId: id, provider: "stripe", status: "outcome_unknown" },
      id,
    ).terminal,
    false,
  );
});
test("only the exact server-verified Stripe transaction reports payment, with terminal failures preserved", () => {
  assert.equal(
    verifiedPaymentReturn(
      { transactionId: id, provider: "stripe", status: "succeeded" },
      id,
    ).paid,
    true,
  );
  for (const status of ["declined", "ended"]) {
    const result = verifiedPaymentReturn(
      { transactionId: id, provider: "stripe", status },
      id,
    );
    assert.equal(result.paid, false);
    assert.equal(result.terminal, true);
  }
  assert.throws(() =>
    verifiedPaymentReturn(
      { transactionId: id, provider: "manual", status: "succeeded" },
      id,
    ),
  );
  assert.throws(() =>
    verifiedPaymentReturn(
      { transactionId: "different", provider: "stripe", status: "succeeded" },
      id,
    ),
  );
});
