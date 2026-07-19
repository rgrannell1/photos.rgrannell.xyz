import m from "mithril";
import "./app/listeners.ts";
import { routes } from "./app/routes.ts";

m.route(document.body, "/albums", routes);
