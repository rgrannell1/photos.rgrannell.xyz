import m from "mithril";
import {
  AboutApp,
  AlbumApp,
  AlbumsApp,
  ChecklistApp,
  ListingApp,
  ListingsApp,
  MapApp,
  PhotoApp,
  PhotosApp,
  ThingApp,
  VideoApp,
  VideosApp,
} from "./app.ts";

m.route(document.body, "/albums", {
  "/albums": AlbumsApp,
  "/albums/:country": AlbumsApp,
  "/about": AboutApp,
  "/map": MapApp,
  "/videos": VideosApp,
  "/photos": PhotosApp,
  "/album/:id": AlbumApp,
  "/thing/:pair": ThingApp,
  "/photo/:id": PhotoApp,
  "/video/:id": VideoApp,
  "/listing/:type": ListingApp,
  "/listing/:type/:filter": ListingApp,
  "/listings": ListingsApp,
  "/checklist": ChecklistApp,
  "/checklist/:filter": ChecklistApp,
});
