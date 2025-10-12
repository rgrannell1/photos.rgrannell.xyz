import m from "mithril";
import { AboutApp, AlbumApp, AlbumsApp, VideosApp } from "./app.ts";
import { listen } from "./events.ts";

m.route(document.body, "/albums", {
  "/albums": AlbumsApp,
  "/about": AboutApp,
  "/videos": VideosApp,
  "/album/:id": AlbumApp,
});

listen("navigate", (event: Event) => {
  const { route } = (event as CustomEvent).detail;

  m.route.set(route);
})