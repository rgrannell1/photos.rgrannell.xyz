// Album page navigation, used by album grid cards.

import { asUrn } from "@rgrannell1/tribbledb";
import { block, broadcast, isModifiedClick } from "./events.ts";

// Used as the anchor href, so albums can open in a new tab.
export function albumRoute(id: string): string {
  const parsed = asUrn(id);
  return `#!/album/${parsed.id}`;
}

export function onAlbumClick(id: string, event: Event) {
  // Let modified clicks fall through, so the browser opens a new tab.
  if (isModifiedClick(event as MouseEvent)) {
    return;
  }

  const parsed = asUrn(id);

  broadcast("navigate", { route: `/album/${parsed.id}` });
  block(event);
}
