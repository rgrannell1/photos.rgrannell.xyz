/*
 * DOM effects for progressive image loading: the mosaic placeholder drops
 * behind the real image once it paints.
 */

export function hidePlaceholderOnLoad(event: Event): void {
  const $placeholder = (event.target as HTMLElement)?.parentNode
    ?.querySelector(
      ".thumbnail-placeholder",
    ) as HTMLElement;

  if (!$placeholder) {
    return;
  }

  $placeholder.style.zIndex = "-1";
}
