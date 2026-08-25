/* Publish browser events used for application navigation and shell actions. */

export type ApplicationEventPayloads = {
  click_burger_menu: Record<string, never>;
  navigate: { route: string };
};

export type ApplicationEvents = keyof ApplicationEventPayloads;

export function broadcast<Label extends ApplicationEvents>(
  label: Label,
  detail: ApplicationEventPayloads[Label],
): void {
  console.info(`broadcasting event: ${label}`, detail);
  document.dispatchEvent(new CustomEvent(label, { detail }));
}

export function listen<Label extends ApplicationEvents>(
  label: Label,
  callback: (event: CustomEvent<ApplicationEventPayloads[Label]>) => void,
): void {
  document.addEventListener(label, callback as EventListener);
}

export function block(event: Event): void {
  event.preventDefault();
}

export function isModifiedClick(event: MouseEvent): boolean {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
    event.button !== 0;
}

export function navigate(route: string): (event: Event) => void {
  return (event: Event) => {
    broadcast("navigate", { route });
    block(event);
  };
}
