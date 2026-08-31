/* Build Leaflet place markers and their popup content. */

/* Build Leaflet place markers and their popup content. */
import type { LatLngBounds, LayerGroup } from "leaflet";
import type { GeocodedPlaceWithCover } from "../../../domain/places.ts";
import { urnToUrl } from "../../../commons/urn.ts";
import {
  MAP_POPUP_THUMBNAIL_CLASS,
  MAP_UNKNOWN_PLACE_LABEL,
} from "../../../constants/map.ts";

type LeafletLib = typeof import("leaflet");

export type PlaceMarkerTarget = {
  leaflet: LeafletLib;
  markersLayer: LayerGroup;
  bounds: LatLngBounds;
};

/** Builds lazy-loaded thumbnail markup for a place popup. */
function coverThumbnailHtml(place: GeocodedPlaceWithCover): string {
  const source = place.coverThumbnailUrl;
  return `<img src="${source}" alt="" class="${MAP_POPUP_THUMBNAIL_CLASS}" ` +
    `loading="lazy" />`;
}

/** Builds a place link with a fallback label. */
function placeLinkHtml(place: GeocodedPlaceWithCover): string {
  const href = urnToUrl(place.id);
  const label = place.name || MAP_UNKNOWN_PLACE_LABEL;
  return `<a href="${href}">${label}</a>`;
}

/** Builds popup markup with an optional cover thumbnail. */
export function placePopupHtml(place: GeocodedPlaceWithCover): string {
  const link = placeLinkHtml(place);
  if (!place.coverThumbnailUrl) {
    return link;
  }

  const image = coverThumbnailHtml(place);
  return `${image}<br />${link}`;
}

/** Reports whether a place has finite latitude and longitude values. */
function hasValidCoordinates(place: GeocodedPlaceWithCover): boolean {
  return Number.isFinite(place.latitude) && Number.isFinite(place.longitude);
}

/** Adds one place marker and extends the shared map bounds. */
function mountPlaceMarker(
  target: PlaceMarkerTarget,
  place: GeocodedPlaceWithCover,
): void {
  const coordinates: [number, number] = [place.latitude, place.longitude];
  const marker = target.leaflet.marker(coordinates);
  marker.bindPopup(placePopupHtml(place));
  marker.addTo(target.markersLayer);
  target.bounds.extend(coordinates);
}

/** Adds a place marker when its coordinates are valid. */
export function addPlaceMarker(
  target: PlaceMarkerTarget,
  place: GeocodedPlaceWithCover,
): void {
  if (!hasValidCoordinates(place)) {
    return;
  }
  mountPlaceMarker(target, place);
}
