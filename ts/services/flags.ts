/* Sprite preloaded from index.html to land before first paint. */

import type { AppWindow, FlagManifest } from "../types.ts";

export function flagManifest(): FlagManifest {
  return (window as AppWindow).flags;
}
