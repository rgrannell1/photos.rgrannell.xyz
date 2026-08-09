/*
 * Flag asset access: the build-baked manifest, and idle-time warming of the
 * emoji sprite into the browser and service-worker caches.
 */

import type { AppWindow, FlagManifest } from "../types.ts";

/*
 * The flag manifest baked into index.html by the build.
 */
export function flagManifest(): FlagManifest {
  return (window as AppWindow).flags;
}

function ignoreError(): void {}

function warmFlagSprite(): void {
  fetch(flagManifest().sprite, { priority: "low" }).catch(ignoreError);
}

/*
 * Warm the emoji sprite into the browser and service-worker cache without
 * blocking boot. Runs in idle time; failures are ignored.
 */
export function prefetchFlags(): void {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(warmFlagSprite, { timeout: 4000 });
  } else {
    setTimeout(warmFlagSprite, 1000);
  }
}
