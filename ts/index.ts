import m from "mithril";
import { AboutApp, AlbumApp, AlbumsApp, VideosApp, ThingApp, MetadataApp } from "./app.ts";
import { listen } from "./events.ts";

m.route(document.body, "/albums", {
  "/albums": AlbumsApp,
  "/about": AboutApp,
  "/videos": VideosApp,
  "/album/:id": AlbumApp,
  "/thing/:id": ThingApp,
  "/metadata/:id": MetadataApp
});
