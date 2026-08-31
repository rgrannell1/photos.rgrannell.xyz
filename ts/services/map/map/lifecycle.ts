/* Support map operations. */

/* Support map operations. */
import { NONE } from "../../../commons/collections/maybe.ts";
import type { MapHandle, MapState, MountMapOptions } from "../map.ts";
import {
  initialiseMapStateReferences,
  initMap,
  unmountMap,
  updateMap,
} from "./markers.ts";

/** Reset map data that tracks rendered places, routes, and marker bounds. */
export function initialiseMapStateData(mapState: MapState): void {
  mapState.lastSidebarVisible = NONE;
  mapState.lastPlaces = [];
  mapState.lastTripPolylines = [];
  mapState.markerBatchIdx = 0;
  mapState.markerBounds = NONE;
}

/** Create map state with empty data and unset Leaflet references. */
export function createMapState(): MapState {
  const mapState = {} as MapState;
  initialiseMapStateReferences(mapState);
  initialiseMapStateData(mapState);
  return mapState;
}

/** Load Leaflet on demand and initialise the map with mount options. */
export function loadLeaflet(
  mapState: MapState,
  options: MountMapOptions,
): void {
  const { root, places, tripPolylines } = options;
  const initialiseMap = initMap.bind(
    null,
    mapState,
    root,
    places,
    tripPolylines,
  );
  import("leaflet").then(initialiseMap);
}

/** Expose state-bound map update and teardown operations. */
export function createMapHandle(mapState: MapState): MapHandle {
  const update = updateMap.bind(null, mapState);
  const teardown = unmountMap.bind(null, mapState);
  return { update, teardown };
}
