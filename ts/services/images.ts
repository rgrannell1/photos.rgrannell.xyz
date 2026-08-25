/* Progressive image loading: placeholder drops behind real image on paint. */

import { THUMBNAIL_PLACEHOLDER_SELECTOR } from "../constants/selectors.ts";

export function hidePlaceholderOnLoad(event: Event): void {
  const $placeholder = (event.target as HTMLElement)?.parentNode
    ?.querySelector(
      THUMBNAIL_PLACEHOLDER_SELECTOR,
    ) as HTMLElement;

  if (!$placeholder) {
    return;
  }

  $placeholder.style.zIndex = "-1";
}
