/*
 * Leaflet map management for the map page: tile layer, batched place
 * markers, and curved trip polylines. Leaflet loads lazily on mount. All
 * map DOM interaction lives here; the page component only holds a handle.
 */

import type {
  LatLngBounds,
  LayerGroup,
  Map as LeafletMap,
  PolylineOptions,
} from "leaflet";
import type { TripPolyline } from "./albums.ts";
import type { GeocodedPlaceWithCover } from "./places.ts";
import { urnToUrl } from "../models/urn.ts";

type LeafletLib = typeof import("leaflet");

const TERRAIN_TILES =
  "https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png";

const TERRAIN_ATTRIBUTION =
  `Map tiles by <a href="https://stadiamaps.com/">Stadia Maps</a> ` +
  `&amp; <a href="https://stamen.com/">Stamen Design</a>, ` +
  `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`;

function createLeafletMap(leaflet: LeafletLib, container: HTMLElement): LeafletMap {
  const leafletMap = leaflet.map(container, {
    center: [20, 0],
    zoom: 2,
    zoomControl: true,
    worldCopyJump: true,
  });

  leaflet.tileLayer(TERRAIN_TILES, {
    maxZoom: 20,
    attribution: TERRAIN_ATTRIBUTION,
  }).addTo(leafletMap);

  return leafletMap;
}

function ensureLeafletMap(
  leaflet: LeafletLib,
  existingMap: LeafletMap | undefined,
  container: HTMLElement | undefined,
): LeafletMap | undefined {
  if (existingMap || !container) {
    return existingMap;
  }
  return createLeafletMap(leaflet, container);
}

function destroyLeafletMap(
  existingMap: LeafletMap | undefined,
): LeafletMap | undefined {
  if (!existingMap) {
    return existingMap;
  }
  existingMap.remove();
  return undefined;
}

function invalidateNow(existingMap: LeafletMap): void {
  existingMap.invalidateSize();
}

function invalidateMapSizeSoon(existingMap: LeafletMap | undefined) {
  if (!existingMap) {
    return;
  }
  requestAnimationFrame(invalidateNow.bind(null, existingMap));
}

const MARKER_BATCH_SIZE = 20;

function addMarker(
  leaflet: LeafletLib,
  markersLayer: LayerGroup,
  bounds: LatLngBounds,
  place: GeocodedPlaceWithCover,
): void {
  const latitude = place.latitude;
  const longitude = place.longitude;

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return;
  }

  const marker = leaflet.marker([latitude, longitude]);
  const href = urnToUrl(place.id);
  const popupLabel = place.name || "Unknown Place";
  const thumbnailImg = place.coverThumbnailUrl
    ? `<img src="${place.coverThumbnailUrl}" alt="" ` +
      `class="leaflet-popup-thumbnail" loading="lazy" />`
    : "";
  const imagePart = thumbnailImg ? `${thumbnailImg}<br />` : "";
  marker.bindPopup(imagePart + `<a href="${href}">${popupLabel}</a>`);
  marker.addTo(markersLayer);
  bounds.extend([latitude, longitude]);
}

const TRIP_LINE_DEFAULT = "#2563eb";
const TRIP_LINE_CAR_TRAIN = "#60a5fa";

function tripLineOptions(mode: string | undefined): PolylineOptions {
  const color = mode === "car" || mode === "train"
    ? TRIP_LINE_CAR_TRAIN
    : TRIP_LINE_DEFAULT;
  return {
    color,
    weight: 3,
    opacity: 0.7,
  };
}

const SEGMENTS_PER_LEG = 16;
const BULGE_FACTOR = 0.25;

/*
 * Quadratic Bezier point: B(t) = (1-t)²A + 2(1-t)tC + t²B.
 */
function bezierPoint(
  start: [number, number],
  control: [number, number],
  end: [number, number],
  progress: number,
): [number, number] {
  const inverse = 1 - progress;
  const lat = inverse * inverse * start[0] +
    2 * inverse * progress * control[0] +
    progress * progress * end[0];
  const lng = inverse * inverse * start[1] +
    2 * inverse * progress * control[1] +
    progress * progress * end[1];
  return [lat, lng];
}

/*
 * Arc between two points that bulges "up" (north): control point is offset
 * perpendicular to the segment, on the north side, by a fraction of the
 * segment length so short lines get a gentle circular-style bend.
 */
function arcLatLngs(
  start: [number, number],
  end: [number, number],
  segmentsPerLeg: number,
): [number, number][] {
  const dlat = end[0] - start[0];
  const dlng = end[1] - start[1];
  const len = Math.sqrt(dlat * dlat + dlng * dlng) || 1e-6;
  let perpLat = dlng;
  let perpLng = -dlat;
  if (perpLat < 0) {
    perpLat = -dlng;
    perpLng = dlat;
  }
  const perpLen = Math.sqrt(perpLat * perpLat + perpLng * perpLng) || 1e-6;
  perpLat /= perpLen;
  perpLng /= perpLen;
  const bulge = BULGE_FACTOR * len;
  const midLat = (start[0] + end[0]) / 2;
  const midLng = (start[1] + end[1]) / 2;
  const control: [number, number] = [
    midLat + bulge * perpLat,
    midLng + bulge * perpLng,
  ];
  const out: [number, number][] = [start];
  for (let segmentIdx = 1; segmentIdx < segmentsPerLeg; segmentIdx++) {
    out.push(bezierPoint(start, control, end, segmentIdx / segmentsPerLeg));
  }
  out.push(end);
  return out;
}

function smoothLatLngs(
  latLngs: [number, number][],
  segmentsPerLeg: number,
): [number, number][] {
  if (latLngs.length < 2) {
    return latLngs;
  }
  const out: [number, number][] = [];
  for (let idx = 0; idx < latLngs.length - 1; idx++) {
    const leg = arcLatLngs(
      latLngs[idx],
      latLngs[idx + 1],
      segmentsPerLeg,
    );
    if (idx === 0) {
      out.push(...leg);
    } else {
      out.push(...leg.slice(1));
    }
  }
  return out;
}

function syncTripPolylines(
  leaflet: LeafletLib,
  existingMap: LeafletMap | undefined,
  existingLayer: LayerGroup | undefined,
  tripPolylines: TripPolyline[],
): LayerGroup | undefined {
  if (!existingMap) {
    return existingLayer;
  }

  const linesLayer = existingLayer ?? leaflet.layerGroup().addTo(existingMap);
  linesLayer.clearLayers();

  for (const { latLngs, mode } of tripPolylines) {
    const curved = smoothLatLngs(latLngs, SEGMENTS_PER_LEG);
    leaflet.polyline(curved, tripLineOptions(mode)).addTo(linesLayer);
  }

  return linesLayer;
}

type MapState = {
  leafletLib: LeafletLib | undefined;
  leafletMap: LeafletMap | undefined;
  mapContainer: HTMLElement | undefined;
  lastSidebarVisible: boolean | undefined;
  markersLayer: LayerGroup | undefined;
  tripLinesLayer: LayerGroup | undefined;
  lastPlaces: GeocodedPlaceWithCover[];
  lastTripPolylines: TripPolyline[];
  markerBatchIdx: number;
  markerBounds: LatLngBounds | undefined;
};

function addMarkerBatch(mapState: MapState): void {
  const { leafletLib, leafletMap, markersLayer, markerBounds } = mapState;
  if (!leafletLib || !leafletMap || !markersLayer || !markerBounds) return;

  const end = Math.min(
    mapState.markerBatchIdx + MARKER_BATCH_SIZE,
    mapState.lastPlaces.length,
  );
  for (let idx = mapState.markerBatchIdx; idx < end; idx++) {
    addMarker(leafletLib, markersLayer, markerBounds, mapState.lastPlaces[idx]);
  }
  mapState.markerBatchIdx = end;
  if (mapState.markerBatchIdx < mapState.lastPlaces.length) {
    setTimeout(addMarkerBatch.bind(null, mapState), 1);
  } else if (markerBounds.isValid()) {
    leafletMap.fitBounds(markerBounds, { padding: [20, 20], maxZoom: 8 });
  }
}

function startPlaceMarkers(
  mapState: MapState,
  places: GeocodedPlaceWithCover[],
): void {
  if (!mapState.leafletLib || !mapState.markersLayer) return;
  mapState.markersLayer.clearLayers();
  mapState.lastPlaces = places;
  mapState.markerBatchIdx = 0;
  mapState.markerBounds = mapState.leafletLib.latLngBounds([]);
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
  mapState.mapContainer =
    root.querySelector(".leaflet-map") as HTMLElement | null ||
    undefined;

  mapState.leafletMap = ensureLeafletMap(
    leaflet,
    mapState.leafletMap,
    mapState.mapContainer,
  );
  mapState.markersLayer = leaflet.layerGroup().addTo(mapState.leafletMap!);
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

  if (
    mapState.leafletLib &&
    tripPolylines !== mapState.lastTripPolylines
  ) {
    mapState.tripLinesLayer = syncTripPolylines(
      mapState.leafletLib,
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
  mapState.mapContainer = undefined;
  mapState.markersLayer = undefined;
  mapState.tripLinesLayer = undefined;
  mapState.lastPlaces = [];
  mapState.lastTripPolylines = [];
  mapState.leafletLib = undefined;
}

export type MapHandle = {
  // apply new attrs: sidebar visibility, places, and trip polylines
  update: (
    visible: boolean,
    places: GeocodedPlaceWithCover[],
    tripPolylines: TripPolyline[],
  ) => void;
  teardown: () => void;
};

/*
 * Mount a Leaflet map inside root's .leaflet-map container. Leaflet loads
 * lazily; updates before it arrives are dropped, matching mount-time attrs.
 */
export function mountMap(
  root: HTMLElement,
  places: GeocodedPlaceWithCover[],
  tripPolylines: TripPolyline[],
): MapHandle {
  const mapState: MapState = {
    leafletLib: undefined,
    leafletMap: undefined,
    mapContainer: undefined,
    lastSidebarVisible: undefined,
    markersLayer: undefined,
    tripLinesLayer: undefined,
    lastPlaces: [],
    lastTripPolylines: [],
    markerBatchIdx: 0,
    markerBounds: undefined,
  };

  import("leaflet").then(
    initMap.bind(null, mapState, root, places, tripPolylines),
  );

  return {
    update: updateMap.bind(null, mapState),
    teardown: unmountMap.bind(null, mapState),
  };
}
