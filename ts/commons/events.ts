// Application event handling and navigation.

import type { ApplicationEventPayloads, ApplicationEvents } from "../types.ts";

export function broadcast<Label extends ApplicationEvents>(
  label: Label,
  detail: ApplicationEventPayloads[Label],
) {
  console.info(`broadcasting event: ${label}`, detail);

  document.dispatchEvent(
    new CustomEvent(label, {
      detail,
    }),
  );
}

export function listen<Label extends ApplicationEvents>(
  label: Label,
  callback: (event: CustomEvent<ApplicationEventPayloads[Label]>) => void,
) {
  document.addEventListener(label, callback as EventListener);
}

export function block(event: Event) {
  event?.preventDefault();
}

/*
 * True when a click carries a modifier key or is not a plain left-click, i.e.
 * the user is asking the browser to open the link in a new tab/window. Such
 * clicks should be left to the browser rather than intercepted for SPA routing.
 */
export function isModifiedClick(event: MouseEvent): boolean {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
    event.button !== 0;
}

export function navigate(route: string) {
  return (event: Event) => {
    broadcast("navigate", { route });
    block(event);
  };
}
