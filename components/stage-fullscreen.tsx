"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { Maximize, Minimize } from "lucide-react";

type WebKitDocument = Document & {
  webkitFullscreenEnabled?: boolean;
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => void;
};
type StageSurface = HTMLElement & { webkitRequestFullscreen?: () => void };

/** Keep the original video, editable overlay and transport together in the DOM. */
export function bindStageFullscreen(
  surface: StageSurface,
  button: HTMLButtonElement,
  onChange: (active: boolean) => void,
) {
  const doc: WebKitDocument = surface.ownerDocument;
  const listeners = new AbortController();
  const options = { signal: listeners.signal };
  let mode: "inline" | "viewport" | "native" = "inline";
  let popover = false;
  const background: HTMLElement[] = [];

  function ownsFullscreen() {
    return (doc.fullscreenElement ?? doc.webkitFullscreenElement) === surface;
  }

  function exitNative() {
    const exit = doc.fullscreenElement
      ? doc.exitFullscreen
      : doc.webkitExitFullscreen;
    // An exit can race the browser's Escape or OS-level exit.
    void Promise.resolve(exit?.call(doc)).catch(() => {});
  }

  function reset(restoreFocus: boolean) {
    mode = "inline";
    if (popover) {
      surface.removeAttribute("popover");
      popover = false;
    }
    delete surface.dataset.stageFullscreen;
    for (const sibling of background.splice(0)) sibling.inert = false;
    if (restoreFocus) {
      onChange(false);
      button.focus({ preventScroll: true });
    }
  }

  function syncNative() {
    if (ownsFullscreen()) {
      if (mode === "inline") {
        // The user closed the player while the native request was pending.
        if (!surface.dataset.stageFullscreen) exitNative();
      } else {
        mode = "native";
        surface.dataset.stageFullscreen = mode;
      }
    } else if (mode === "native") reset(true);
  }

  function useViewport() {
    // A top-layer popover also escapes clipped or scrolling editor panels.
    if (mode !== "viewport" || !surface.showPopover || popover) return;
    surface.popover = "manual";
    try {
      surface.showPopover();
      popover = true;
    } catch {
      surface.removeAttribute("popover");
    }
  }

  async function requestNative() {
    try {
      if (
        doc.fullscreenEnabled !== false &&
        typeof surface.requestFullscreen === "function" &&
        typeof doc.exitFullscreen === "function"
      ) {
        await surface.requestFullscreen();
      } else if (
        doc.webkitFullscreenEnabled !== false &&
        surface.webkitRequestFullscreen &&
        doc.webkitExitFullscreen
      ) {
        await surface.webkitRequestFullscreen();
      } else {
        return useViewport();
      }
      syncNative();
    } catch {
      useViewport();
    }
  }

  function toggle() {
    if (mode !== "inline") {
      if (ownsFullscreen()) exitNative();
      else reset(true);
      return;
    }

    mode = "viewport";
    surface.dataset.stageFullscreen = mode;
    for (
      let branch = surface;
      branch.parentElement && branch !== doc.body;
      branch = branch.parentElement
    ) {
      for (const sibling of branch.parentElement.children) {
        if (
          sibling !== branch &&
          sibling instanceof HTMLElement &&
          !sibling.inert
        ) {
          sibling.inert = true;
          background.push(sibling);
        }
      }
    }
    onChange(true);
    button.focus({ preventScroll: true });

    // The browser needs the original click's transient user activation.
    void requestNative();
  }

  function onKey(event: KeyboardEvent) {
    if (mode === "inline" || event.key !== "Escape") return;
    event.preventDefault();
    event.stopPropagation(); // Leave the editor's Enlarge setting alone.
    toggle();
  }

  button.addEventListener("click", toggle, options);
  doc.addEventListener("keydown", onKey, { ...options, capture: true });
  doc.addEventListener("fullscreenchange", syncNative, options);
  doc.addEventListener("webkitfullscreenchange", syncNative, options);
  surface.addEventListener("webkitfullscreenerror", useViewport, options);
  return () => {
    listeners.abort();
    if (mode === "inline") return;
    if (ownsFullscreen()) exitNative();
    reset(false);
  };
}

export function StageFullscreenControl({
  media,
}: {
  media: RefObject<HTMLMediaElement | null>;
}) {
  const trigger = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const button = trigger.current;
    const surface = button?.closest(".stage-transport")?.parentElement;
    if (button && surface && surface.contains(media.current)) {
      return bindStageFullscreen(surface, button, setActive);
    }
  }, [media]);

  const label = active ? "Exit fullscreen" : "Enter fullscreen";
  const Icon = active ? Minimize : Maximize;
  return (
    <button
      ref={trigger}
      type="button"
      className="stage-transport-button"
      aria-label={label}
      title={label}
    >
      <Icon size={17} aria-hidden="true" />
    </button>
  );
}
