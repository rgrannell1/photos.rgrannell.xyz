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

export function initialiseMapStateData(mapState: MapState): void {
  mapState.lastSidebarVisible = NONE;
  mapState.lastPlaces = [];
  mapState.lastTripPolylines = [];
  mapState.markerBatchIdx = 0;
  mapState.markerBounds = NONE;
}

export function createMapState(): MapState {
  const mapState = {} as MapState;
  initialiseMapStateReferences(mapState);
  initialiseMapStateData(mapState);
  return mapState;
}

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

export function createMapHandle(mapState: MapState): MapHandle {
  const update = updateMap.bind(null, mapState);
  const teardown = unmountMap.bind(null, mapState);
  return { update, teardown };
}
