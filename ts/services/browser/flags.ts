/* Sprite preloaded from index.html to land before first paint. */

/* Sprite preloaded from index.html to land before first paint. */
import type { AppWindow, FlagManifest } from "../../types/browser.ts";

export function flagManifest(): FlagManifest {
  return (window as AppWindow).flags;
}
