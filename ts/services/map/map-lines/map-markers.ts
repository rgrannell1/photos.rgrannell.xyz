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

function coverThumbnailHtml(place: GeocodedPlaceWithCover): string {
  const source = place.coverThumbnailUrl;
  return `<img src="${source}" alt="" class="${MAP_POPUP_THUMBNAIL_CLASS}" ` +
    `loading="lazy" />`;
}

function placeLinkHtml(place: GeocodedPlaceWithCover): string {
  const href = urnToUrl(place.id);
  const label = place.name || MAP_UNKNOWN_PLACE_LABEL;
  return `<a href="${href}">${label}</a>`;
}

export function placePopupHtml(place: GeocodedPlaceWithCover): string {
  const link = placeLinkHtml(place);
  if (!place.coverThumbnailUrl) {
    return link;
  }

  const image = coverThumbnailHtml(place);
  return `${image}<br />${link}`;
}

function hasValidCoordinates(place: GeocodedPlaceWithCover): boolean {
  return Number.isFinite(place.latitude) && Number.isFinite(place.longitude);
}

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

export function addPlaceMarker(
  target: PlaceMarkerTarget,
  place: GeocodedPlaceWithCover,
): void {
  if (!hasValidCoordinates(place)) {
    return;
  }
  mountPlaceMarker(target, place);
}
