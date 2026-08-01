import m from "mithril";
import "./app/listeners.ts";
import { routes } from "./app/routes.ts";
import { prefetchFlags } from "./components/flag.ts";

m.route(document.body, "/albums", routes);
prefetchFlags();
