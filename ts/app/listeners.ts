/*
 * Global UI event wiring. Bound once from entry point.
 */

import m from "mithril";
import { listen } from "./events.ts";
import { hideSidebar, toggleSidebar } from "../state.ts";
import { state } from "./context.ts";

export function bindGlobalListeners() {
  listen("navigate", (event) => {
    const { route } = event.detail;
    console.info(`navigating to route: ${route}`);

    hideSidebar(state);
    m.route.set(route);
  });

  listen("click_burger_menu", () => {
    toggleSidebar(state);
  });
}
