import { test } from "node:test";
import assert from "node:assert/strict";
import { getNavCurrent, nextRadioIndex } from "../lib/public-a11y";
import {
  captionLanguageMeta,
  captionOutputLanguages,
} from "../lib/caption-demo";

test("getNavCurrent marks exact matches as page and nested routes as location", () => {
  assert.equal(getNavCurrent("/guides", "/guides"), "page");
  assert.equal(
    getNavCurrent("/guides/urdu-roman-urdu-and-english", "/guides"),
    "location",
  );
  assert.equal(getNavCurrent("/guides-extra", "/guides"), undefined);
  assert.equal(getNavCurrent("/pricing", "/guides"), undefined);
  assert.equal(getNavCurrent(null, "/guides"), undefined);
});

test("nextRadioIndex supports arrow wraparound, Home, End, and ignores unrelated keys", () => {
  assert.equal(nextRadioIndex("ArrowDown", 0, 3), 1);
  assert.equal(nextRadioIndex("ArrowRight", 2, 3), 0);
  assert.equal(nextRadioIndex("ArrowUp", 0, 3), 2);
  assert.equal(nextRadioIndex("ArrowLeft", 1, 3), 0);
  assert.equal(nextRadioIndex("Home", 2, 3), 0);
  assert.equal(nextRadioIndex("End", 0, 3), 2);
  assert.equal(nextRadioIndex("Tab", 0, 3), null);
  assert.equal(nextRadioIndex("Enter", 0, 3), null);
  assert.equal(nextRadioIndex("ArrowDown", 0, 0), null);
});

test("captionLanguageMeta and captionOutputLanguages expose explicit language and direction metadata", () => {
  assert.deepEqual(captionLanguageMeta.urdu, {
    label: "Urdu",
    lang: "ur",
    dir: "rtl",
  });
  assert.deepEqual(captionLanguageMeta.romanUrdu, {
    label: "Roman Urdu",
    lang: "ur-Latn",
    dir: "ltr",
  });
  assert.deepEqual(captionLanguageMeta.english, {
    label: "English",
    lang: "en",
    dir: "ltr",
  });

  assert.deepEqual(captionOutputLanguages("urdu"), ["urdu"]);
  assert.deepEqual(captionOutputLanguages("romanUrdu"), ["romanUrdu"]);
  assert.deepEqual(captionOutputLanguages("english"), ["english"]);
  assert.deepEqual(captionOutputLanguages("bilingual"), ["urdu", "english"]);
});
