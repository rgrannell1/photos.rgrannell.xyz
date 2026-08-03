/*
 * App entry point. Every top-level side effect happens here: event
 * bindings, the tribble stream load, the route mount, and prefetches.
 */

import m from "mithril";
import { bindGlobalListeners } from "./app/listeners.ts";
import { routes } from "./app/routes.ts";
import { state } from "./app/context.ts";
import { completeLoad } from "./state.ts";
import { prefetchFlags } from "./components/flag.ts";

bindGlobalListeners();

completeLoad(state, () => m.redraw()).catch((err) => {
  console.error("tribble load failed", err);
});

m.route(document.body, "/albums", routes);
prefetchFlags();
