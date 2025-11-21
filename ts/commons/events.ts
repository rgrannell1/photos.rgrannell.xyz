/*
 * Handle state-updates in response to events by delegating to other services. Handles
 * state-updates and rerenders.
 */

import type { ApplicationEvents } from "../types.ts";

/*
 * Broadcast a custom application event to the document.
 */
export function broadcast(
  label: ApplicationEvents,
  detail: CustomEvent["detail"],
) {
  console.info(`broadcasting event: ${label}`, detail);

  (window as any).document.dispatchEvent(
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
  (window as any).document.addEventListener(label, callback);
}

/*
 * Prevent default action for an event.
 *
 * @param event The event to block.
 */
export function block(event: Event) {
  event?.preventDefault();
}

/*
 * Broadcast a navigation event and block the default action.
 *
 * @param route The route to navigate to.
 */
export function navigate(route: string) {
  return (event: Event) => {
    broadcast("navigate", { route });
    block(event);
  };
}
