// App entry point for event bindings, tribble stream load, and routing.

import m from "mithril";
import { bindGlobalListeners } from "./app/listeners.ts";
import { routes } from "./app/routes.ts";
import { state } from "./app/context.ts";
import { completeLoad } from "./state.ts";

bindGlobalListeners();

completeLoad(state, () => m.redraw()).catch((err) => {
  console.error("tribble load failed", err);
});

m.route(document.body, "/albums", routes);
