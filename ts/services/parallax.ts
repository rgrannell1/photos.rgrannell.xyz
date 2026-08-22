/* Banner parallax: CSS scroll-driven animations with JS fallback. */

import { supportsCSSScrollDrivenAnimations } from "./feature-detection.ts";
import { PARALLAX_MAX_PX, PARALLAX_RATE } from "../constants/layout.ts";

type ParallaxState = {
  // pending requestAnimationFrame id, or null when idle
  rafId: number | null;
};

function noop(): void {}

function applyParallax(img: HTMLImageElement): void {
  const offsetY = Math.min(
    window.scrollY * PARALLAX_RATE,
    PARALLAX_MAX_PX,
  );
  img.style.transform = `translateY(${offsetY}px)`;
}

function stepParallax(
  parallaxState: ParallaxState,
  img: HTMLImageElement,
): void {
  applyParallax(img);
  parallaxState.rafId = null;
}

function trackBannerScroll(
  parallaxState: ParallaxState,
  img: HTMLImageElement,
): void {
  if (parallaxState.rafId !== null) {
    return;
  }
  parallaxState.rafId = requestAnimationFrame(
    stepParallax.bind(null, parallaxState, img),
  );
}

function unmountParallax(
  parallaxState: ParallaxState,
  onScroll: () => void,
): void {
  window.removeEventListener("scroll", onScroll);
  if (parallaxState.rafId !== null) {
    cancelAnimationFrame(parallaxState.rafId);
  }
}

/* CSS path teardown is a no-op. The effect lives in the stylesheet. */
export function mountParallax(section: HTMLElement): () => void {
  if (supportsCSSScrollDrivenAnimations()) {
    console.log("[parallax] using CSS scroll-driven animations");
    section.classList.add("parallax-css");
    return noop;
  }

  console.log("[parallax] CSS scroll-driven animations unsupported, using JS fallback");

  const img = section.querySelector(
    ".album-banner-image",
  ) as HTMLImageElement | null;
  if (!img) {
    return noop;
  }

  const parallaxState: ParallaxState = { rafId: null };
  const onScroll = trackBannerScroll.bind(null, parallaxState, img);
  window.addEventListener("scroll", onScroll, { passive: true });
  applyParallax(img);

  return unmountParallax.bind(null, parallaxState, onScroll);
}
