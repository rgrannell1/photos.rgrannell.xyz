import { SMALL_DEVICE_WIDTH } from "../../constants/layout.ts";

type ShareState = { sharing: boolean };

/** Test whether the current viewport fits within a maximum width. */
export function isSmallerThan(width: number = SMALL_DEVICE_WIDTH): boolean {
  return globalThis.matchMedia(`(max-width: ${width}px)`).matches;
}

/** Set the browser document title. */
export function setTitle(title: string): void {
  document.title = title;
}

/** Transforms photos.rho.ie to sharephoto.rho.ie */
export function sharePhotoUrl(path: string): string {
  const hostname = window.location.hostname;
  const shareHost = hostname.replace(/^photos\./, "sharephoto.");
  return `https://${shareHost}/${path}`;
}

/** Navigate the current browser window to a URL. */
export function openUrl(url: string): void {
  window.location.href = url;
}

/** Native share sheet availability (mobile only). */
export function canNativeShare(): boolean {
  return Boolean(navigator.share);
}

/** Report a native share failure without rejecting the UI action. */
function logShareError(err: unknown): void {
  console.error("Error sharing:", err);
}

/** Change the share button's busy state. */
function setSharing(state: ShareState, sharing: boolean): void {
  state.sharing = sharing;
}

/** Open the native share sheet with the site name in its title. */
async function shareNativeUrl(url: string, name: string): Promise<void> {
  const title = `${name} - ${window.location.hostname}`;
  const shareData = { title, url };
  await navigator.share(shareData);
}

/** State flag drives button label while sheet is open. */
export async function nativeShare(
  state: ShareState,
  url: string,
  name: string,
): Promise<void> {
  state.sharing = true;
  const share = shareNativeUrl(url, name);
  const stopSharing = setSharing.bind(null, state, false);
  await share.catch(logShareError).finally(stopSharing);
}
