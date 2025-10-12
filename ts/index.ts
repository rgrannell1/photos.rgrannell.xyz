import m from "mithril";
import { AboutApp, AlbumApp, AlbumsApp, VideosApp, PhotosApp, ThingApp, MetadataApp } from "./app.ts";

m.route(document.body, "/albums", {
  "/albums": AlbumsApp,
  "/about": AboutApp,
  "/videos": VideosApp,
  "/photos": PhotosApp,
  "/album/:id": AlbumApp,
  "/thing/:id": ThingApp,
  "/metadata/:id": MetadataApp
});
