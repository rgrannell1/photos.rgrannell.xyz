/*
 * Window lookup
 */

import { SMALL_DEVICE_WIDTH } from "../constants";

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
