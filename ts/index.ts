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

listen("navigate", (event: Event) => {
  const { route } = (event as CustomEvent).detail;

  m.route.set(route);
});
