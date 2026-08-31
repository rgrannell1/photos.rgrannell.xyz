/*
 * Global UI event wiring. Bound once from entry point.
 */

import m from "mithril";
import { listen } from "../services/browser/events.ts";
import { hideSidebar, toggleSidebar } from "../state.ts";
import { state } from "./context.ts";

/** Handles app navigation events and closes the sidebar. */
function handleNavigate(event: CustomEvent<{ route: string }>): void {
  const { route } = event.detail;
  const message = `navigating to route: ${route}`;
  console.info(message);

  hideSidebar(state);
  m.route.set(route);
}

/** Toggles the sidebar for a burger-menu event. */
function handleBurgerMenu(): void {
  toggleSidebar(state);
}

/** Binds global navigation and burger-menu listeners and returns their handles. */
export function bindGlobalListeners() {
  const navigationListener = listen("navigate", handleNavigate);
  const burgerListener = listen("click_burger_menu", handleBurgerMenu);
  return { navigationListener, burgerListener };
}
