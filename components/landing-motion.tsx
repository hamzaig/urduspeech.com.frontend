"use client";

import { useEffect } from "react";

type MomentLoader = {
  mountAll: (root: Element) => Promise<unknown>;
  unmountAll: (root: Element) => void;
};

const loaderUrl = "/assets/moments/moments.js";

export function LandingMotion() {
  useEffect(() => {
    const landing = document.querySelector(".home-site");
    if (!landing) return;

    let disposed = false;
    let loader: MomentLoader | undefined;
    const motionWindow = window as Window & { __momentsManual?: boolean };
    motionWindow.__momentsManual = true;

    async function mount(root: Element) {
      loader = await import(
        /* webpackIgnore: true */
        /* turbopackIgnore: true */
        loaderUrl
      );
      if (!loader || disposed) return;
      await loader.mountAll(root);
      if (disposed) loader.unmountAll(root);
    }

    void mount(landing).catch(() => {
      loader?.unmountAll(landing);
    });

    return () => {
      disposed = true;
      loader?.unmountAll(landing);
    };
  }, []);

  return null;
}
