import m from "mithril";
import {
  AboutApp,
  AlbumApp,
  AlbumsApp,
  ListingApp,
  PhotoApp,
  PhotosApp,
  ThingApp,
  VideosApp,
} from "./app.ts";

m.route(document.body, "/albums", {
  "/albums": AlbumsApp,
  "/about": AboutApp,
  "/videos": VideosApp,
  "/photos": PhotosApp,
  "/album/:id": AlbumApp,
  "/thing/:id": ThingApp,
  "/photo/:id": PhotoApp,
  "/listing/:type": ListingApp,
});
