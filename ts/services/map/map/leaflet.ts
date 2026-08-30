/* Support map operations. */

/* Leaflet map: tile layer, place markers, trip polylines. Lazy-loads on mount. */
/* Support map operations. */
/* Leaflet map: tile layer, place markers, trip polylines. Lazy-loads on mount. */
import type { LayerGroup, Map as LeafletMap } from "leaflet";
import type { TripPolyline } from "../../../domain/map.ts";
import {
  MAP_INITIAL_CENTRE,
  MAP_INITIAL_ZOOM,
  MAP_TILE_ATTRIBUTION,
  MAP_TILE_MAX_ZOOM,
  MAP_TILE_URL,
} from "../../../constants/map.ts";
import {
  isNone,
  isSome,
  type Maybe,
  NONE,
  some,
} from "../../../commons/collections/maybe.ts";
import type { LeafletLib } from "../map.ts";
import { addTripPolyline } from "./polylines.ts";

export function createBaseMap(
  leaflet: LeafletLib,
  container: HTMLElement,
): LeafletMap {
  return leaflet.map(container, {
    center: MAP_INITIAL_CENTRE,
    zoom: MAP_INITIAL_ZOOM,
    zoomControl: true,
    worldCopyJump: true,
  });
}

export function addTileLayer(
  leaflet: LeafletLib,
  leafletMap: LeafletMap,
): void {
  const tileOptions = {
    maxZoom: MAP_TILE_MAX_ZOOM,
    attribution: MAP_TILE_ATTRIBUTION,
  };
  const tileLayer = leaflet.tileLayer(MAP_TILE_URL, tileOptions);
  tileLayer.addTo(leafletMap);
}

export function createLeafletMap(
  leaflet: LeafletLib,
  container: HTMLElement,
): LeafletMap {
  const leafletMap = createBaseMap(leaflet, container);
  addTileLayer(leaflet, leafletMap);
  return leafletMap;
}

export function ensureLeafletMap(
  leaflet: LeafletLib,
  existingMap: Maybe<LeafletMap>,
  container: Maybe<HTMLElement>,
): Maybe<LeafletMap> {
  if (isSome(existingMap) || isNone(container)) {
    return existingMap;
  }
  return some(createLeafletMap(leaflet, container));
}

export function destroyLeafletMap(
  existingMap: Maybe<LeafletMap>,
): Maybe<LeafletMap> {
  if (isNone(existingMap)) {
    return existingMap;
  }
  existingMap.remove();
  return NONE;
}

export function invalidateNow(existingMap: LeafletMap): void {
  existingMap.invalidateSize();
}

export function invalidateMapSizeSoon(existingMap: Maybe<LeafletMap>) {
  if (isNone(existingMap)) {
    return;
  }
  requestAnimationFrame(invalidateNow.bind(null, existingMap));
}

export function readTripLinesLayer(
  leaflet: LeafletLib,
  leafletMap: LeafletMap,
  existingLayer: Maybe<LayerGroup>,
): LayerGroup {
  return isSome(existingLayer)
    ? existingLayer
    : leaflet.layerGroup().addTo(leafletMap);
}

export function drawTripPolylines(
  leaflet: LeafletLib,
  linesLayer: LayerGroup,
  tripPolylines: TripPolyline[],
): void {
  for (const tripPolyline of tripPolylines) {
    addTripPolyline(leaflet, linesLayer, tripPolyline);
  }
}

export function syncTripPolylines(
  leaflet: LeafletLib,
  existingMap: Maybe<LeafletMap>,
  existingLayer: Maybe<LayerGroup>,
  tripPolylines: TripPolyline[],
): Maybe<LayerGroup> {
  if (isNone(existingMap)) {
    return existingLayer;
  }

  const linesLayer = readTripLinesLayer(leaflet, existingMap, existingLayer);
  linesLayer.clearLayers();
  drawTripPolylines(leaflet, linesLayer, tripPolylines);
  return some(linesLayer);
}
