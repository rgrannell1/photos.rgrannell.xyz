/*
 * Flag sprite loading: the build-hashed sprite URL, and idle-time warming
 * of the sprite into the browser and service-worker caches.
 */

import type { AppWindow } from "../types.ts";

/*
 * The build-hashed sprite URL, baked into index.html.
 */
export function spriteUrl(): string {
  return (window as AppWindow).flagSprite;
}

function ignoreError(): void {}

function warmFlagSprite(): void {
  fetch(spriteUrl(), { priority: "low" }).catch(ignoreError);
}

/*
 * Warm the flag sprite into the browser and service-worker cache without
 * blocking boot. Runs in idle time; failures are ignored.
 */
export function prefetchFlags(): void {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(warmFlagSprite, { timeout: 4000 });
  } else {
    setTimeout(warmFlagSprite, 1000);
  }
}
