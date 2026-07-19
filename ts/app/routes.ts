/*
 * The route table: each path wrapped in the shared shell.
 */

import type m from "mithril";
import { routeResolver } from "./shell.ts";
import {
  aboutEntry,
  albumEntry,
  albumsEntry,
  checklistEntry,
  listingEntry,
  listingsEntry,
  mapEntry,
  photoEntry,
  photosEntry,
  thingEntry,
  videoEntry,
  videosEntry,
} from "./entries.ts";

export const routes: Record<string, m.RouteResolver> = {
  "/albums": routeResolver(albumsEntry),
  "/albums/:country": routeResolver(albumsEntry),
  "/about": routeResolver(aboutEntry),
  "/map": routeResolver(mapEntry),
  "/videos": routeResolver(videosEntry),
  "/photos": routeResolver(photosEntry),
  "/album/:id": routeResolver(albumEntry),
  "/thing/:pair": routeResolver(thingEntry),
  "/photo/:id": routeResolver(photoEntry),
  "/video/:id": routeResolver(videoEntry),
  "/listing/:type": routeResolver(listingEntry),
  "/listing/:type/:filter": routeResolver(listingEntry),
  "/listings": routeResolver(listingsEntry),
  "/life-list": routeResolver(checklistEntry),
  "/life-list/:filter": routeResolver(checklistEntry),
};
