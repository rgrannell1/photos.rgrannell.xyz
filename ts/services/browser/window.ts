import { SMALL_DEVICE_WIDTH } from "../../constants/layout.ts";

type ShareState = { sharing: boolean };

export function isSmallerThan(width: number = SMALL_DEVICE_WIDTH): boolean {
  return globalThis.matchMedia(`(max-width: ${width}px)`).matches;
}

export function setTitle(title: string) {
  document.title = title;
}

/* Transforms photos.rho.ie to sharephoto.rho.ie */
export function sharePhotoUrl(path: string): string {
  const hostname = window.location.hostname;
  const shareHost = hostname.replace(/^photos\./, "sharephoto.");
  return `https://${shareHost}/${path}`;
}

export function openUrl(url: string): void {
  window.location.href = url;
}

/* Native share sheet availability (mobile only). */
export function canNativeShare(): boolean {
  return Boolean(navigator.share);
}

function logShareError(err: unknown): void {
  console.error("Error sharing:", err);
}

function setSharing(state: ShareState, sharing: boolean): void {
  state.sharing = sharing;
}

async function shareNativeUrl(url: string, name: string): Promise<void> {
  const title = `${name} - ${window.location.hostname}`;
  const shareData = { title, url };
  await navigator.share(shareData);
}

/* State flag drives button label while sheet is open. */
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
