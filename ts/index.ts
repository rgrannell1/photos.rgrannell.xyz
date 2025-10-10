import m from "mithril";
import { AboutApp, AlbumsApp } from "./app.ts";

m.route(document.body, '/albums', {
  '/albums': AlbumsApp,
  '/about': AboutApp,
});
