/* Support map operations. */

/* Support map operations. */
import type { TripPolyline } from "../../../domain/map.ts";
import type { GeocodedPlaceWithCover } from "../../../domain/places.ts";
import { isNone, NONE } from "../../../commons/collections/maybe.ts";
import type { LeafletLib, MapState } from "../map.ts";
import {
  destroyLeafletMap,
  ensureLeafletMap,
  invalidateMapSizeSoon,
  syncTripPolylines,
} from "./leaflet.ts";
import {
  createMapLayers,
  setMapContainer,
  startPlaceMarkers,
} from "./polylines.ts";

export function ensureMountedMap(
  mapState: MapState,
  leaflet: LeafletLib,
): void {
  mapState.leafletMap = ensureLeafletMap(
    leaflet,
    mapState.leafletMap,
    mapState.mapContainer,
  );
}

export function syncInitialTripLines(
  mapState: MapState,
  leaflet: LeafletLib,
  tripPolylines: TripPolyline[],
): void {
  mapState.tripLinesLayer = syncTripPolylines(
    leaflet,
    mapState.leafletMap,
    mapState.tripLinesLayer,
    tripPolylines,
  );
  mapState.lastTripPolylines = tripPolylines;
}

export function initMap(
  mapState: MapState,
  root: HTMLElement,
  places: GeocodedPlaceWithCover[],
  tripPolylines: TripPolyline[],
  leaflet: LeafletLib,
): void {
  mapState.leafletLib = leaflet;
  setMapContainer(mapState, root);
  ensureMountedMap(mapState, leaflet);
  if (isNone(mapState.leafletMap)) {
    return;
  }
  createMapLayers(mapState, leaflet);
  syncInitialTripLines(mapState, leaflet, tripPolylines);
  startPlaceMarkers(mapState, places);
  invalidateMapSizeSoon(mapState.leafletMap);
}

export function syncSidebarVisibility(
  mapState: MapState,
  visible: boolean,
): void {
  if (mapState.lastSidebarVisible !== visible) {
    invalidateMapSizeSoon(mapState.leafletMap);
  }
  mapState.lastSidebarVisible = visible;
}

export function syncChangedTripLines(
  mapState: MapState,
  tripPolylines: TripPolyline[],
): void {
  const leafletLib = mapState.leafletLib;
  const tripLinesChanged = tripPolylines !== mapState.lastTripPolylines;
  if (isNone(leafletLib) || !tripLinesChanged) {
    return;
  }

  mapState.tripLinesLayer = syncTripPolylines(
    leafletLib,
    mapState.leafletMap,
    mapState.tripLinesLayer,
    tripPolylines,
  );
  mapState.lastTripPolylines = tripPolylines;
}

export function updateMap(
  mapState: MapState,
  visible: boolean,
  places: GeocodedPlaceWithCover[],
  tripPolylines: TripPolyline[],
): void {
  syncSidebarVisibility(mapState, visible);
  syncChangedTripLines(mapState, tripPolylines);

  if (places !== mapState.lastPlaces) {
    startPlaceMarkers(mapState, places);
  }
}

export function clearMapLayers(mapState: MapState): void {
  mapState.leafletMap = destroyLeafletMap(mapState.leafletMap);
  mapState.mapContainer = NONE;
  mapState.markersLayer = NONE;
  mapState.tripLinesLayer = NONE;
}

export function clearMapData(mapState: MapState): void {
  mapState.lastPlaces = [];
  mapState.lastTripPolylines = [];
  mapState.leafletLib = NONE;
}

export function unmountMap(mapState: MapState): void {
  clearMapLayers(mapState);
  clearMapData(mapState);
}

export function initialiseMapStateReferences(mapState: MapState): void {
  mapState.leafletLib = NONE;
  mapState.leafletMap = NONE;
  mapState.mapContainer = NONE;
  mapState.markersLayer = NONE;
  mapState.tripLinesLayer = NONE;
}
