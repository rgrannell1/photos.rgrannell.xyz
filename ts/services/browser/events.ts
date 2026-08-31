/* Publish browser events used for application navigation and shell actions. */

export type ApplicationEventPayloads = {
  click_burger_menu: Record<string, never>;
  navigate: { route: string };
};

export type ApplicationEvents = keyof ApplicationEventPayloads;

/** Dispatches a typed application event on the document. */
export function broadcast<Label extends ApplicationEvents>(
  label: Label,
  detail: ApplicationEventPayloads[Label],
): void {
  const message = `broadcasting event: ${label}`;
  console.info(message, detail);
  const event = new CustomEvent(label, { detail });
  document.dispatchEvent(event);
}

/** Registers a typed application event listener on the document. */
export function listen<Label extends ApplicationEvents>(
  label: Label,
  callback: (event: CustomEvent<ApplicationEventPayloads[Label]>) => void,
): void {
  const listener = callback as EventListener;
  document.addEventListener(label, listener);
}

/** Prevents an event's default browser action. */
export function block(event: Event): void {
  event.preventDefault();
}

/** Reports whether a click includes any keyboard modifier. */
function hasKeyboardModifier(event: MouseEvent): boolean {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

/** Reports whether a click should retain native browser navigation. */
export function isModifiedClick(event: MouseEvent): boolean {
  const hasModifier = hasKeyboardModifier(event);
  const isAuxiliaryClick = event.button !== 0;
  return hasModifier || isAuxiliaryClick;
}

/** Broadcasts a route change and blocks the source event. */
function broadcastNavigation(route: string, event: Event): void {
  broadcast("navigate", { route });
  block(event);
}

/** Creates an event handler that requests navigation to a route. */
export function navigate(route: string): (event: Event) => void {
  return broadcastNavigation.bind(null, route);
}
