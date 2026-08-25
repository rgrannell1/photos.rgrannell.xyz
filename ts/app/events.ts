// Application event handling and navigation.

export type ApplicationEventPayloads = {
  click_burger_menu: Record<string, never>;
  navigate: { route: string };
};

export type ApplicationEvents = keyof ApplicationEventPayloads;

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

// True when a click asks the browser for a new tab. Routing must not intercept it.
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
