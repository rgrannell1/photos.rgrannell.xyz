/* Support map operations. */

/* Leaflet map: tile layer, place markers, trip polylines. Lazy-loads on mount. */
/* Support map operations. */
/* Leaflet map: tile layer, place markers, trip polylines. Lazy-loads on mount. */
import type { LatLngBounds, LayerGroup } from "leaflet";
import type { TripPolyline } from "../../../domain/map.ts";
import type { GeocodedPlaceWithCover } from "../../../domain/places.ts";
import { curveTripLine, tripLineOptions } from "../map-lines/map-lines.ts";
import { addPlaceMarker, type PlaceMarkerTarget } from "../map-lines/map-markers.ts";
import { LEAFLET_MAP_SELECTOR } from "../../../constants/selectors.ts";
import {
  MAP_BOUNDS_MAX_ZOOM,
  MAP_BOUNDS_PADDING_PX,
  MAP_MARKER_BATCH_DELAY_MS,
  MAP_MARKER_BATCH_SIZE,
} from "../../../constants/map.ts";
import { fromNullable, isNone, some } from "../../../commons/collections/maybe.ts";
import type { LeafletLib, MapState, ReadyMarkerState } from "../map.ts";

export function addTripPolyline(
  leaflet: LeafletLib,
  linesLayer: LayerGroup,
  tripPolyline: TripPolyline,
): void {
  const curved = curveTripLine(tripPolyline.latLngs);
  const mode = fromNullable(tripPolyline.mode);
  const options = tripLineOptions(mode);
  leaflet.polyline(curved, options).addTo(linesLayer);
}

export function readReadyMarkerState(
  mapState: MapState,
): ReadyMarkerState | null {
  const { leafletLib, leafletMap, markersLayer, markerBounds } = mapState;
  if (
    isNone(leafletLib) || isNone(leafletMap) ||
    isNone(markersLayer) || isNone(markerBounds)
  ) {
    return null;
  }
  return { leafletLib, leafletMap, markersLayer, markerBounds };
}

export function finishMarkerBatch(
  mapState: MapState,
  ready: ReadyMarkerState,
): void {
  if (mapState.markerBatchIdx < mapState.lastPlaces.length) {
    setTimeout(addMarkerBatch.bind(null, mapState), MAP_MARKER_BATCH_DELAY_MS);
    return;
  }
  fitMarkerBounds(ready);
}

export function fitMarkerBounds(ready: ReadyMarkerState): void {
  if (!ready.markerBounds.isValid()) {
    return;
  }

  const padding: [number, number] = [
    MAP_BOUNDS_PADDING_PX,
    MAP_BOUNDS_PADDING_PX,
  ];
  const options = { padding, maxZoom: MAP_BOUNDS_MAX_ZOOM };
  ready.leafletMap.fitBounds(ready.markerBounds, options);
}

export function addMarkersThrough(
  mapState: MapState,
  ready: ReadyMarkerState,
  end: number,
): void {
  const target: PlaceMarkerTarget = {
    leaflet: ready.leafletLib,
    markersLayer: ready.markersLayer,
    bounds: ready.markerBounds,
  };
  for (let idx = mapState.markerBatchIdx; idx < end; idx++) {
    const place = mapState.lastPlaces[idx];
    addPlaceMarker(target, place);
  }
}

export function addMarkerBatch(mapState: MapState): void {
  const ready = readReadyMarkerState(mapState);
  if (ready === null) return;
  const end = Math.min(
    mapState.markerBatchIdx + MAP_MARKER_BATCH_SIZE,
    mapState.lastPlaces.length,
  );
  addMarkersThrough(mapState, ready, end);
  mapState.markerBatchIdx = end;
  finishMarkerBatch(mapState, ready);
}

export function resetMarkerBatch(
  mapState: MapState,
  places: GeocodedPlaceWithCover[],
  markerBounds: LatLngBounds,
): void {
  mapState.lastPlaces = places;
  mapState.markerBatchIdx = 0;
  mapState.markerBounds = some(markerBounds);
}

export function startPlaceMarkers(
  mapState: MapState,
  places: GeocodedPlaceWithCover[],
): void {
  const { leafletLib, markersLayer } = mapState;
  if (isNone(leafletLib) || isNone(markersLayer)) return;
  markersLayer.clearLayers();
  const markerBounds = leafletLib.latLngBounds([]);
  resetMarkerBatch(mapState, places, markerBounds);
  addMarkerBatch(mapState);
}

export function createMapLayers(mapState: MapState, leaflet: LeafletLib): void {
  if (isNone(mapState.leafletMap)) {
    return;
  }

  const markersLayer = leaflet.layerGroup().addTo(mapState.leafletMap);
  mapState.markersLayer = some(markersLayer);
}

export function setMapContainer(mapState: MapState, root: HTMLElement): void {
  const container = root.querySelector(LEAFLET_MAP_SELECTOR) as
    | HTMLElement
    | null;
  mapState.mapContainer = fromNullable(container);
}
