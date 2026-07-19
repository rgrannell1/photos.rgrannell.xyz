/*
 * Window lookup
 */

import { SMALL_DEVICE_WIDTH } from "../constants/layout.ts";

/*
 * Check if the window is smaller than a given width
 * used to detect a mobile device
 */
export function isSmallerThan(width: number = SMALL_DEVICE_WIDTH): boolean {
  return globalThis.matchMedia(`(max-width: ${width}px)`).matches;
}

/*
 * Set the page's title
 */
export function setTitle(title: string) {
  document.title = title;
}

/*
 * Derive the sharephoto share URL from the current hostname.
 * e.g. photos.rho.ie/album/foo -> https://sharephoto.rho.ie/album/foo
 */
export function sharePhotoUrl(path: string): string {
  const shareHost = window.location.hostname.replace(/^photos\./, "sharephoto.");
  return `https://${shareHost}/${path}`;
}
