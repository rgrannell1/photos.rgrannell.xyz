/*
 * Global UI event wiring. Bound once from entry point.
 */

import { ApplicationEvent, listen } from "../services/browser/events.ts";
import { hideSidebar, toggleSidebar } from "../state.ts";
import { state } from "./context.ts";

/** Closes the sidebar for internal navigation. */
function handleCloseSidebar(): void {
  hideSidebar(state);
}

/** Toggles the sidebar for a burger-menu event. */
function handleBurgerMenu(): void {
  toggleSidebar(state);
}

/** Binds global navigation and burger-menu listeners and returns their handles. */
export function bindGlobalListeners() {
  const sidebarListener = listen(
    ApplicationEvent.CloseSidebar,
    handleCloseSidebar,
  );
  const burgerListener = listen(
    ApplicationEvent.ClickBurgerMenu,
    handleBurgerMenu,
  );
  return { sidebarListener, burgerListener };
}
