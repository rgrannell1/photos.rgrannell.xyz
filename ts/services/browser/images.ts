/* Progressive image loading: placeholder drops behind real image on paint. */

/* Progressive image loading: placeholder drops behind real image on paint. */
import { THUMBNAIL_PLACEHOLDER_SELECTOR } from "../../constants/selectors.ts";

function findPlaceholder(event: Event): HTMLElement | null {
  const image = event.target as HTMLElement;
  const parent = image?.parentNode;
  return parent?.querySelector(
    THUMBNAIL_PLACEHOLDER_SELECTOR,
  ) as HTMLElement | null;
}

export function hidePlaceholderOnLoad(event: Event): void {
  const $placeholder = findPlaceholder(event);

  if (!$placeholder) {
    return;
  }

  $placeholder.style.zIndex = "-1";
}
