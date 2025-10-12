/*
 * Handle state-updates in response to events by delegating to other services. Handles
 * state-updates and rerenders.
 */

import { ApplicationEvents } from "./types.ts";

/*
 * Broadcast a custom application event to the document.
 */
export function broadcast(
  label: ApplicationEvents,
  detail: CustomEvent["detail"],
) {
  console.info(`broadcasting event: ${label}`, detail);
  if (label === "navigate") console.trace();

  document.dispatchEvent(
    new CustomEvent(label, {
      detail,
    }),
  );
}

/*
 * Listen for custom application events.
 */
export function listen(
  label: ApplicationEvents,
  callback: (event: Event) => void,
) {
  document.addEventListener(label, callback);
}

/*
 * Prevent default action for an event.
 *
 * @param event The event to block.
 */
export function block(event: Event) {
  event?.preventDefault();
}

export function navigate(route: string) {
  return (event: Event) => {
    broadcast("navigate", { route });
    block(event);
  };
}
