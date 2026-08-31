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

/** Creates a Leaflet map with the configured initial viewport. */
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

/** Adds the configured tile source and attribution to a map. */
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

/** Creates a Leaflet map with its base tile layer. */
export function createLeafletMap(
  leaflet: LeafletLib,
  container: HTMLElement,
): LeafletMap {
  const leafletMap = createBaseMap(leaflet, container);
  addTileLayer(leaflet, leafletMap);
  return leafletMap;
}

/** Creates a map only when no map exists and a container is available. */
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

/** Removes an existing map and returns the empty map state. */
export function destroyLeafletMap(
  existingMap: Maybe<LeafletMap>,
): Maybe<LeafletMap> {
  if (isNone(existingMap)) {
    return existingMap;
  }
  existingMap.remove();
  return NONE;
}

/** Recalculates a Leaflet map's container dimensions immediately. */
export function invalidateNow(existingMap: LeafletMap): void {
  existingMap.invalidateSize();
}

/** Schedules a map size recalculation for the next animation frame. */
export function invalidateMapSizeSoon(existingMap: Maybe<LeafletMap>) {
  if (isNone(existingMap)) {
    return;
  }
  requestAnimationFrame(invalidateNow.bind(null, existingMap));
}

/** Reuses the trip layer or adds a new layer to the map. */
export function readTripLinesLayer(
  leaflet: LeafletLib,
  leafletMap: LeafletMap,
  existingLayer: Maybe<LayerGroup>,
): LayerGroup {
  return isSome(existingLayer)
    ? existingLayer
    : leaflet.layerGroup().addTo(leafletMap);
}

/** Adds all trip polylines to the supplied layer. */
export function drawTripPolylines(
  leaflet: LeafletLib,
  linesLayer: LayerGroup,
  tripPolylines: TripPolyline[],
): void {
  for (const tripPolyline of tripPolylines) {
    addTripPolyline(leaflet, linesLayer, tripPolyline);
  }
}

/** Replaces the map's trip polylines while preserving its layer. */
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
