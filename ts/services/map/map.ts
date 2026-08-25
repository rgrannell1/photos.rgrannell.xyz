/* Leaflet map: tile layer, place markers, trip polylines. Lazy-loads on mount. */

import type {
  LatLngBounds,
  LayerGroup,
  Map as LeafletMap,
} from "leaflet";
import type { TripPolyline } from "../../domain/map.ts";
import type { GeocodedPlaceWithCover } from "../../domain/places.ts";
import { curveTripLine, tripLineOptions } from "./map-lines.ts";
import { addPlaceMarker } from "./map-markers.ts";
import { LEAFLET_MAP_SELECTOR } from "../../constants/selectors.ts";
import {
  MAP_BOUNDS_MAX_ZOOM,
  MAP_BOUNDS_PADDING_PX,
  MAP_INITIAL_CENTRE,
  MAP_INITIAL_ZOOM,
  MAP_MARKER_BATCH_DELAY_MS,
  MAP_MARKER_BATCH_SIZE,
  MAP_TILE_ATTRIBUTION,
  MAP_TILE_MAX_ZOOM,
  MAP_TILE_URL,
} from "../../constants/map.ts";
import { fromNullable, isNone, isSome, type Maybe, NONE, some } from "../../commons/maybe.ts";

type LeafletLib = typeof import("leaflet");

function createLeafletMap(leaflet: LeafletLib, container: HTMLElement): LeafletMap {
  const leafletMap = leaflet.map(container, {
    center: MAP_INITIAL_CENTRE,
    zoom: MAP_INITIAL_ZOOM,
    zoomControl: true,
    worldCopyJump: true,
  });

  leaflet.tileLayer(MAP_TILE_URL, {
    maxZoom: MAP_TILE_MAX_ZOOM,
    attribution: MAP_TILE_ATTRIBUTION,
  }).addTo(leafletMap);

  return leafletMap;
}

function ensureLeafletMap(
  leaflet: LeafletLib,
  existingMap: Maybe<LeafletMap>,
  container: Maybe<HTMLElement>,
): Maybe<LeafletMap> {
  if (isSome(existingMap) || isNone(container)) {
    return existingMap;
  }
  return some(createLeafletMap(leaflet, container));
}

function destroyLeafletMap(
  existingMap: Maybe<LeafletMap>,
): Maybe<LeafletMap> {
  if (isNone(existingMap)) {
    return existingMap;
  }
  existingMap.remove();
  return NONE;
}

function invalidateNow(existingMap: LeafletMap): void {
  existingMap.invalidateSize();
}

function invalidateMapSizeSoon(existingMap: Maybe<LeafletMap>) {
  if (isNone(existingMap)) {
    return;
  }
  requestAnimationFrame(invalidateNow.bind(null, existingMap));
}

function syncTripPolylines(
  leaflet: LeafletLib,
  existingMap: Maybe<LeafletMap>,
  existingLayer: Maybe<LayerGroup>,
  tripPolylines: TripPolyline[],
): Maybe<LayerGroup> {
  if (isNone(existingMap)) {
    return existingLayer;
  }

  const linesLayer = isSome(existingLayer)
    ? existingLayer
    : leaflet.layerGroup().addTo(existingMap);
  linesLayer.clearLayers();

  for (const { latLngs, mode } of tripPolylines) {
    const curved = curveTripLine(latLngs);
    leaflet.polyline(curved, tripLineOptions(fromNullable(mode))).addTo(linesLayer);
  }

  return some(linesLayer);
}

type MapState = {
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

function addMarkerBatch(mapState: MapState): void {
  const { leafletLib, leafletMap, markersLayer, markerBounds } = mapState;
  const lacksMarkerState = isNone(leafletLib) ||
    isNone(leafletMap) ||
    isNone(markersLayer) ||
    isNone(markerBounds);
  if (lacksMarkerState) return;

  const end = Math.min(
    mapState.markerBatchIdx + MAP_MARKER_BATCH_SIZE,
    mapState.lastPlaces.length,
  );
  for (let idx = mapState.markerBatchIdx; idx < end; idx++) {
    addPlaceMarker(
      leafletLib,
      markersLayer,
      markerBounds,
      mapState.lastPlaces[idx],
    );
  }
  mapState.markerBatchIdx = end;
  if (mapState.markerBatchIdx < mapState.lastPlaces.length) {
    setTimeout(addMarkerBatch.bind(null, mapState), MAP_MARKER_BATCH_DELAY_MS);
  } else if (markerBounds.isValid()) {
    const padding: [number, number] = [
      MAP_BOUNDS_PADDING_PX,
      MAP_BOUNDS_PADDING_PX,
    ];
    leafletMap.fitBounds(markerBounds, {
      padding,
      maxZoom: MAP_BOUNDS_MAX_ZOOM,
    });
  }
}

function startPlaceMarkers(
  mapState: MapState,
  places: GeocodedPlaceWithCover[],
): void {
  const { leafletLib, markersLayer } = mapState;
  if (isNone(leafletLib) || isNone(markersLayer)) return;
  markersLayer.clearLayers();
  mapState.lastPlaces = places;
  mapState.markerBatchIdx = 0;
  mapState.markerBounds = some(leafletLib.latLngBounds([]));
  addMarkerBatch(mapState);
}

function initMap(
  mapState: MapState,
  root: HTMLElement,
  places: GeocodedPlaceWithCover[],
  tripPolylines: TripPolyline[],
  leaflet: LeafletLib,
): void {
  mapState.leafletLib = leaflet;
  const container = root.querySelector(LEAFLET_MAP_SELECTOR) as HTMLElement | null;
  mapState.mapContainer = fromNullable(container);

  mapState.leafletMap = ensureLeafletMap(
    leaflet,
    mapState.leafletMap,
    mapState.mapContainer,
  );
  if (isNone(mapState.leafletMap)) {
    return;
  }
  mapState.markersLayer = some(leaflet.layerGroup().addTo(mapState.leafletMap));
  mapState.tripLinesLayer = syncTripPolylines(
    leaflet,
    mapState.leafletMap,
    mapState.tripLinesLayer,
    tripPolylines,
  );
  mapState.lastTripPolylines = tripPolylines;
  startPlaceMarkers(mapState, places);
  invalidateMapSizeSoon(mapState.leafletMap);
}

function updateMap(
  mapState: MapState,
  visible: boolean,
  places: GeocodedPlaceWithCover[],
  tripPolylines: TripPolyline[],
): void {
  if (mapState.lastSidebarVisible !== visible) {
    invalidateMapSizeSoon(mapState.leafletMap);
  }
  mapState.lastSidebarVisible = visible;

  const leafletLib = mapState.leafletLib;
  const tripLinesChanged = tripPolylines !== mapState.lastTripPolylines;
  const canSyncTripLines = isSome(leafletLib) && tripLinesChanged;
  if (canSyncTripLines) {
    mapState.tripLinesLayer = syncTripPolylines(
      leafletLib,
      mapState.leafletMap,
      mapState.tripLinesLayer,
      tripPolylines,
    );
    mapState.lastTripPolylines = tripPolylines;
  }

  if (places !== mapState.lastPlaces) {
    startPlaceMarkers(mapState, places);
  }
}

function unmountMap(mapState: MapState): void {
  mapState.leafletMap = destroyLeafletMap(mapState.leafletMap);
  mapState.mapContainer = NONE;
  mapState.markersLayer = NONE;
  mapState.tripLinesLayer = NONE;
  mapState.lastPlaces = [];
  mapState.lastTripPolylines = [];
  mapState.leafletLib = NONE;
}

export type MapHandle = {
  update: (
    visible: boolean,
    places: GeocodedPlaceWithCover[],
    tripPolylines: TripPolyline[],
  ) => void;
  teardown: () => void;
};

/* Lazy-loads Leaflet. Pre-load updates are dropped. */
export function mountMap(
  root: HTMLElement,
  places: GeocodedPlaceWithCover[],
  tripPolylines: TripPolyline[],
): MapHandle {
  const mapState: MapState = {
    leafletLib: NONE,
    leafletMap: NONE,
    mapContainer: NONE,
    lastSidebarVisible: NONE,
    markersLayer: NONE,
    tripLinesLayer: NONE,
    lastPlaces: [],
    lastTripPolylines: [],
    markerBatchIdx: 0,
    markerBounds: NONE,
  };

  import("leaflet").then(
    initMap.bind(null, mapState, root, places, tripPolylines),
  );

  return {
    update: updateMap.bind(null, mapState),
    teardown: unmountMap.bind(null, mapState),
  };
}
