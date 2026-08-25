/* Build Leaflet place markers and their popup content. */

import type { LatLngBounds, LayerGroup } from "leaflet";
import type { GeocodedPlaceWithCover } from "./places.ts";
import { urnToUrl } from "../commons/urn.ts";
import {
  MAP_POPUP_THUMBNAIL_CLASS,
  MAP_UNKNOWN_PLACE_LABEL,
} from "../constants/map.ts";

type LeafletLib = typeof import("leaflet");

export function placePopupHtml(place: GeocodedPlaceWithCover): string {
  const href = urnToUrl(place.id);
  const label = place.name || MAP_UNKNOWN_PLACE_LABEL;
  const link = `<a href="${href}">${label}</a>`;
  if (!place.coverThumbnailUrl) {
    return link;
  }

  const image = `<img src="${place.coverThumbnailUrl}" alt="" ` +
    `class="${MAP_POPUP_THUMBNAIL_CLASS}" loading="lazy" />`;
  return `${image}<br />${link}`;
}

export function addPlaceMarker(
  leaflet: LeafletLib,
  markersLayer: LayerGroup,
  bounds: LatLngBounds,
  place: GeocodedPlaceWithCover,
): void {
  const latitude = place.latitude;
  const longitude = place.longitude;
  const hasInvalidCoordinates = !Number.isFinite(latitude) ||
    !Number.isFinite(longitude);
  if (hasInvalidCoordinates) {
    return;
  }

  const marker = leaflet.marker([latitude, longitude]);
  marker.bindPopup(placePopupHtml(place));
  marker.addTo(markersLayer);
  bounds.extend([latitude, longitude]);
}
