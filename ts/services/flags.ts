/*
 * Flag asset access: the build-baked manifest. The sprite itself is preloaded
 * from index.html, so it lands before first paint.
 */

import type { AppWindow, FlagManifest } from "../types.ts";

/*
 * The flag manifest baked into index.html by the build.
 */
export function flagManifest(): FlagManifest {
  return (window as AppWindow).flags;
}
