/* Leaflet map: tile layer, place markers, trip polylines. Lazy-loads on mount. */

/* Leaflet map: tile layer, place markers, trip polylines. Lazy-loads on mount. */
import type { LatLngBounds, LayerGroup, Map as LeafletMap } from "leaflet";
import type { TripPolyline } from "../../domain/map.ts";
import type { GeocodedPlaceWithCover } from "../../domain/places.ts";

import type { Maybe } from "../../commons/collections/maybe.ts";
import {
  createMapHandle,
  createMapState,
  loadLeaflet,
} from "./map/lifecycle.ts";

export type LeafletLib = typeof import("leaflet");

export type MapState = {
  leafletLib: Maybe<LeafletLib>;
  leafletMap: Maybe<LeafletMap>;
  mapContainer: Maybe<HTMLElement>;
  lastSidebarVisible: Maybe<boolean>;
  markersLayer: Maybe<LayerGroup>;
  tripLinesLayer: Maybe<LayerGroup>;
  lastPlaces: GeocodedPlaceWithCover[];
  lastTripPolylines: TripPolyline[];
  markerBatchIdx: number;
  markerBounds: Maybe<LatLngBounds>;
};

export type ReadyMarkerState = {
  leafletLib: LeafletLib;
  leafletMap: LeafletMap;
  markersLayer: LayerGroup;
  markerBounds: LatLngBounds;
};

export type MapHandle = {
  update: (
    visible: boolean,
    places: GeocodedPlaceWithCover[],
    tripPolylines: TripPolyline[],
  ) => void;
  teardown: () => void;
};

export type MountMapOptions = {
  root: HTMLElement;
  places: GeocodedPlaceWithCover[];
  tripPolylines: TripPolyline[];
};

/* Lazy-loads Leaflet. Pre-load updates are dropped. */
/** Mounts a lazy Leaflet map and returns its update and teardown handle. */
export function mountMap(
  root: HTMLElement,
  places: GeocodedPlaceWithCover[],
  tripPolylines: TripPolyline[],
): MapHandle {
  const mapState = createMapState();
  loadLeaflet(mapState, { root, places, tripPolylines });
  return createMapHandle(mapState);
}
