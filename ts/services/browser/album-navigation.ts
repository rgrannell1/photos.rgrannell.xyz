/* Build album routes and handle album link clicks. */

import { asUrn } from "@rgrannell1/tribbledb";
import { block, broadcast, isModifiedClick } from "./events.ts";

export function albumRoute(id: string): string {
  return `#!/album/${asUrn(id).id}`;
}

export function onAlbumClick(id: string, event: Event): void {
  if (isModifiedClick(event as MouseEvent)) {
    return;
  }

  broadcast("navigate", { route: `/album/${asUrn(id).id}` });
  block(event);
}
