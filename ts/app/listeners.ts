/*
 * Global UI event wiring: navigation and the burger menu.
 */

import m from "mithril";
import { listen } from "../commons/events.ts";
import { state } from "./context.ts";

listen("navigate", (event: Event) => {
  const { route } = (event as CustomEvent).detail;
  console.info(`navigating to route: ${route}`);

  state.sidebarVisible = false;
  m.route.set(route);
});

listen("click_burger_menu", () => {
  state.sidebarVisible = !state.sidebarVisible;
});
