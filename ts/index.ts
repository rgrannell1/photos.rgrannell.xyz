// App entry point.

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
