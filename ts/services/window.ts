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

/*
 * Navigate the whole window to a URL (a full page load, not an SPA route)
 */
export function openUrl(url: string): void {
  window.location.href = url;
}

/*
 * Whether the native share sheet is available (mobile); desktop links out instead
 */
export function canNativeShare(): boolean {
  return Boolean(navigator.share);
}

/*
 * Open the native share sheet for a URL. The state flag drives the button
 * label while the sheet is open.
 */
export async function nativeShare(
  state: { sharing: boolean },
  url: string,
  name: string,
): Promise<void> {
  state.sharing = true;

  try {
    await navigator.share({
      title: `${name} - ${window.location.hostname}`,
      url,
    });
  } catch (err) {
    console.error("Error sharing:", err);
  } finally {
    state.sharing = false;
  }
}
