// Album page navigation, used by album grid cards.

import { asUrn } from "@rgrannell1/tribbledb";
import { block, broadcast, isModifiedClick } from "./events.ts";

// hashbang route to an album's page, used as the anchor href so albums can be
// opened in a new tab
export function albumRoute(id: string): string {
  const parsed = asUrn(id);
  return `#!/album/${parsed.id}`;
}

export function onAlbumClick(id: string, event: Event) {
  // let modified/middle clicks fall through to the browser so the album route
  // opens in a new tab
  if (isModifiedClick(event as MouseEvent)) {
    return;
  }

  const parsed = asUrn(id);

  broadcast("navigate", { route: `/album/${parsed.id}` });
  block(event);
}
