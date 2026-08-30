/* Build album routes and handle album link clicks. */

/* Build album routes and handle album link clicks. */
import { asUrn } from "@rgrannell1/tribbledb";
import { block, broadcast, isModifiedClick } from "./events.ts";

export function albumRoute(id: string): string {
  return `#!/album/${asUrn(id).id}`;
}

function readAlbumRoute(id: string): string {
  const albumId = asUrn(id).id;
  return `/album/${albumId}`;
}

export function onAlbumClick(id: string, event: Event): void {
  const isModified = isModifiedClick(event as MouseEvent);
  if (isModified) {
    return;
  }

  const route = readAlbumRoute(id);
  broadcast("navigate", { route });
  block(event);
}
