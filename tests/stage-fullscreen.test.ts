import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { StageTransport } from "../components/caption-stage";
import { bindStageFullscreen } from "../components/stage-fullscreen";

test("the shared source transport offers fullscreen alongside playback", () => {
  const html = renderToStaticMarkup(
    createElement(StageTransport, {
      media: { current: null },
      source: "clip.mp4",
    }),
  );
  for (const label of ["Play", "Seek", "Mute", "Enter fullscreen"]) {
    assert.ok(
      html.includes(`aria-label="${label}"`),
      `missing ${label} control`,
    );
  }
});

function player() {
  const doc = Object.assign(new EventTarget(), {
    fullscreenElement: null as HTMLElement | null,
    exitFullscreen: async () => {
      doc.fullscreenElement = null;
      doc.dispatchEvent(new Event("fullscreenchange"));
    },
  });
  const surface = Object.assign(new EventTarget(), {
    dataset: {} as Record<string, string>,
    ownerDocument: doc,
    parentElement: null,
    requestFullscreen: undefined as (() => Promise<void>) | undefined,
  });
  let focused = false;
  const trigger = Object.assign(new EventTarget(), {
    focus: () => {
      focused = true;
    },
  });
  const states: boolean[] = [];
  const detach = bindStageFullscreen(
    surface as unknown as HTMLElement,
    trigger as unknown as HTMLButtonElement,
    (active) => states.push(active),
  );
  return {
    doc,
    surface,
    states,
    detach,
    click: () => trigger.dispatchEvent(new Event("click")),
    blur: () => {
      focused = false;
    },
    focused: () => focused,
  };
}

test("browser-initiated exit restores the fullscreen control and inline layout", async () => {
  const p = player();
  p.surface.requestFullscreen = async () => {
    p.doc.fullscreenElement = p.surface as unknown as HTMLElement;
    p.doc.dispatchEvent(new Event("fullscreenchange"));
  };
  p.click();
  assert.equal(p.surface.dataset.stageFullscreen, "native");
  p.blur();
  await p.doc.exitFullscreen();
  assert.equal(p.surface.dataset.stageFullscreen, undefined);
  assert.deepEqual(p.states, [true, false]);
  assert.ok(p.focused());
  p.detach();
});

test("the exit button also closes prefixed WebKit container fullscreen", () => {
  const p = player();
  const doc = Object.assign(p.doc, {
    webkitFullscreenElement: null as HTMLElement | null,
    webkitExitFullscreen() {
      this.webkitFullscreenElement = null;
      p.doc.dispatchEvent(new Event("webkitfullscreenchange"));
    },
  });
  Object.assign(p.surface, {
    webkitRequestFullscreen() {
      doc.webkitFullscreenElement = p.surface as unknown as HTMLElement;
      doc.dispatchEvent(new Event("webkitfullscreenchange"));
    },
  });
  p.click();
  assert.equal(p.surface.dataset.stageFullscreen, "native");
  p.click();
  assert.equal(doc.webkitFullscreenElement, null);
  assert.equal(p.surface.dataset.stageFullscreen, undefined);
  assert.deepEqual(p.states, [true, false]);
  p.detach();
});

for (const support of ["missing", "rejected"] as const) {
  test(`a ${support} native request keeps the container open until Escape`, async () => {
    const p = player();
    if (support === "rejected") {
      p.surface.requestFullscreen = async () => {
        throw new Error("Denied");
      };
    }
    p.click();
    await Promise.resolve();
    assert.equal(p.surface.dataset.stageFullscreen, "viewport");
    p.blur();
    const escape = Object.assign(new Event("keydown", { cancelable: true }), {
      key: "Escape",
    });
    p.doc.dispatchEvent(escape);
    assert.ok(escape.defaultPrevented);
    assert.ok(p.focused());
    assert.equal(p.surface.dataset.stageFullscreen, undefined);
    assert.deepEqual(p.states, [true, false]);
    p.detach();
  });
}

test("unmount releases the viewport and detaches its keyboard handler", () => {
  const p = player();
  p.click();
  p.detach();
  assert.equal(p.surface.dataset.stageFullscreen, undefined);
  const escape = Object.assign(new Event("keydown", { cancelable: true }), {
    key: "Escape",
  });
  p.doc.dispatchEvent(escape);
  assert.equal(escape.defaultPrevented, false);
  p.click();
  assert.equal(p.surface.dataset.stageFullscreen, undefined);
});
