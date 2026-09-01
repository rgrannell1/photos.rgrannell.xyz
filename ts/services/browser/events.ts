/* Publish browser events used for application navigation and shell actions. */

export enum ApplicationEvent {
  ClickBurgerMenu = "click_burger_menu",
  CloseSidebar = "close_sidebar",
}

export type ApplicationEventPayloads = {
  [ApplicationEvent.ClickBurgerMenu]: Record<string, never>;
  [ApplicationEvent.CloseSidebar]: Record<string, never>;
};

/** Dispatches a typed application event on the document. */
export function broadcast<Label extends ApplicationEvent>(
  label: Label,
  detail: ApplicationEventPayloads[Label],
): void {
  const message = `broadcasting event: ${label}`;
  console.info(message, detail);
  const event = new CustomEvent(label, { detail });
  document.dispatchEvent(event);
}

/** Registers a typed application event listener on the document. */
export function listen<Label extends ApplicationEvent>(
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
