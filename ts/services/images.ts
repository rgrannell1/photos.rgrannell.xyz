/* Progressive image loading: placeholder drops behind real image on paint. */

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
