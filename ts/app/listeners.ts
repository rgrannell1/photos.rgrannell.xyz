/*
 * Global UI event wiring. Bound once from entry point.
 */

import m from "mithril";
import { listen } from "../commons/events.ts";
import { state } from "./context.ts";

export function bindGlobalListeners() {
  listen("navigate", (event) => {
    const { route } = event.detail;
    console.info(`navigating to route: ${route}`);

    state.sidebarVisible = false;
    m.route.set(route);
  });

  listen("click_burger_menu", () => {
    state.sidebarVisible = !state.sidebarVisible;
  });
}
