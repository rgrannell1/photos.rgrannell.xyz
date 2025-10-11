import m from "mithril";
import { AboutApp, AlbumsApp, VideosApp } from "./app.ts";

m.route(document.body, "/albums", {
  "/albums": AlbumsApp,
  "/about": AboutApp,
  "/videos": VideosApp,
});
