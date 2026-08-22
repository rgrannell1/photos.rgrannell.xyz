import { SMALL_DEVICE_WIDTH } from "../constants/layout.ts";

export function isSmallerThan(width: number = SMALL_DEVICE_WIDTH): boolean {
  return globalThis.matchMedia(`(max-width: ${width}px)`).matches;
}

export function setTitle(title: string) {
  document.title = title;
}

/* Transforms photos.rho.ie to sharephoto.rho.ie */
export function sharePhotoUrl(path: string): string {
  const shareHost = window.location.hostname.replace(/^photos\./, "sharephoto.");
  return `https://${shareHost}/${path}`;
}

export function openUrl(url: string): void {
  window.location.href = url;
}

/* Native share sheet availability (mobile only). */
export function canNativeShare(): boolean {
  return Boolean(navigator.share);
}

/* State flag drives button label while sheet is open. */
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
