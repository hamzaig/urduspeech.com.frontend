import test from "node:test";
import assert from "node:assert/strict";
import { sameRenderAppearance } from "../lib/render-appearance";

test("missing font IDs and explicit catalog defaults describe the same video", () => {
  assert.ok(
    sameRenderAppearance(null, null, null, {
      urdu: "noto-nastaliq",
      latin: "inter",
    }),
  );
  assert.ok(
    sameRenderAppearance(
      { y: 0.876, scale: 1 },
      { latin: "poppins" },
      { y: 0.876, scale: 1 },
      { urdu: "noto-nastaliq", latin: "poppins" },
    ),
  );
});

test("a change to either script's font, caption position or scale requires a new MP4", () => {
  assert.equal(
    sameRenderAppearance(null, { latin: "poppins" }, null, { latin: "inter" }),
    false,
  );
  assert.equal(
    sameRenderAppearance(null, { urdu: "gulzar" }, null, {
      urdu: "noto-naskh",
    }),
    false,
  );
  assert.equal(
    sameRenderAppearance(
      { y: 0.8, scale: 1 },
      null,
      { y: 0.5, scale: 1 },
      null,
    ),
    false,
  );
  assert.equal(
    sameRenderAppearance(
      { y: 0.8, scale: 1 },
      null,
      { y: 0.8, scale: 1.3 },
      null,
    ),
    false,
  );
  assert.equal(
    sameRenderAppearance({ y: 0.8, scale: 1 }, null, null, null),
    false,
  );
});
