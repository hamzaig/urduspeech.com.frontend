import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";
import { promisify } from "node:util";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CaptionStage, StageTransport } from "../components/caption-stage";

const chrome = [
  process.env.CHROME_BIN,
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find((file) => file && existsSync(file));

test(
  "fullscreen fits the complete video above the transport in both preview layouts",
  {
    skip: chrome ? false : "Set CHROME_BIN to run the browser layout check",
  },
  async () => {
    const css = (
      await Promise.all(
        [
          "app/tokens.css",
          "app/editor.css",
          "app/studio/studio.css",
          "app/studio/projects/[id]/workspace.css",
        ].map((file) => readFile(file, "utf8")),
      )
    ).join("\n");
    const stage = renderToStaticMarkup(
      createElement(CaptionStage, {
        src: "about:blank",
        template: undefined,
        lines: [],
        placement: null,
        controls: false,
      }),
    );
    const transport = renderToStaticMarkup(
      createElement(StageTransport, {
        media: { current: null },
        source: "about:blank",
      }),
    );
    const samples = [
      { width: 844, height: 390, ratio: 9 / 16, layout: "wizard" },
      { width: 390, height: 844, ratio: 16 / 9, layout: "wizard" },
      { width: 1280, height: 720, ratio: 9 / 16, layout: "editor" },
      { width: 320, height: 568, ratio: 16 / 9, layout: "editor" },
    ];
    const wizard = `<div class="wizard-shell"><aside class="wizard-preview" data-stage-fullscreen="viewport">${stage}${transport}</aside></div>`;
    const editor = `<section class="desk-preview"><div class="preview-player" data-stage-fullscreen="viewport"><div class="preview-matte">${stage}</div>${transport}</div></section>`;
    const dir = await mkdtemp(path.join(tmpdir(), "stage-fullscreen-layout-"));
    try {
      const page = path.join(dir, "layout.html");
      await writeFile(
        page,
        `<!doctype html><body><script>
      const layouts = ${JSON.stringify({ wizard, editor })};
      const results = ${JSON.stringify(samples)}.map(({width, height, ratio, layout}) => {
        const view = document.createElement("iframe");
        view.style.cssText = "border:0;width:" + width + "px;height:" + height + "px";
        document.body.append(view);
        const doc = view.contentDocument;
        doc.head.appendChild(doc.createElement("style")).textContent = ${JSON.stringify(css)};
        doc.body.innerHTML = layouts[layout];
        const frame = doc.querySelector(".caption-stage");
        frame.style.setProperty("--stage-ratio", ratio);
        const video = frame.querySelector("video").getBoundingClientRect();
        const controls = doc.querySelector(".stage-transport").getBoundingClientRect();
        return [video.x, video.y, video.width, video.height, controls.y, controls.bottom];
      });
      document.body.textContent = JSON.stringify(results);
    </script></body>`,
      );
      const { stdout } = await promisify(execFile)(
        chrome!,
        [
          "--headless",
          "--disable-gpu",
          "--disable-background-networking",
          "--no-first-run",
          `--user-data-dir=${dir}/profile`,
          "--dump-dom",
          pathToFileURL(page).href,
        ],
        { timeout: 20_000 },
      );
      const results = JSON.parse(
        stdout.match(/<body>(\[.*?\])<\/body>/s)![1],
      ) as number[][];
      for (const [i, sample] of samples.entries()) {
        const [x, y, w, h, barTop, barBottom] = results[i];
        const width = Math.min(sample.width, barTop * sample.ratio);
        const near = (a: number, b: number) =>
          assert.ok(
            Math.abs(a - b) < 1,
            `${sample.layout} ${sample.width}×${sample.height}: got ${a}, expected ${b}`,
          );
        near(w, width);
        near(h, width / sample.ratio);
        near(x, (sample.width - w) / 2);
        near(y, (barTop - h) / 2);
        near(barBottom, sample.height);
        assert.ok(barBottom - barTop >= 44);
      }
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  },
);
