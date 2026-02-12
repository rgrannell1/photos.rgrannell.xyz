import m from "mithril";
import * as L from "leaflet";
import type { Map as LeafletMap } from "leaflet";
import type { TripPolyline } from "../services/albums.ts";
import type { GeocodedPlace } from "../services/places.ts";
import { urnToUrl } from "../models/urn.ts";

type PlaceWithCover = GeocodedPlace & { coverThumbnailUrl?: string };

type MapPageAttrs = {
  visible: boolean;
  places: PlaceWithCover[];
  tripPolylines: TripPolyline[];
};

const TERRAIN_TILES =
  "https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png";

const TERRAIN_ATTRIBUTION =
  `Map tiles by <a href="https://stadiamaps.com/">Stadia Maps</a> ` +
  `&amp; <a href="https://stamen.com/">Stamen Design</a>, ` +
  `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`;

function createLeafletMap(container: HTMLElement): LeafletMap {
  const leafletMap = L.map(container, {
    center: [20, 0],
    zoom: 2,
    zoomControl: true,
    worldCopyJump: true,
  });

  L.tileLayer(TERRAIN_TILES, {
    maxZoom: 20,
    attribution: TERRAIN_ATTRIBUTION,
  }).addTo(leafletMap);

  return leafletMap;
}

function ensureLeafletMap(
  existingMap: LeafletMap | undefined,
  container: HTMLElement | undefined,
): LeafletMap | undefined {
  if (existingMap || !container) {
    return existingMap;
  }

  return createLeafletMap(container);
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

function invalidateMapSizeSoon(existingMap: LeafletMap | undefined) {
  if (!existingMap) {
    return;
  }

  // Allow layout to settle first (sidebar open/close, responsive layout, etc.)
  requestAnimationFrame(() => existingMap.invalidateSize());
}

function syncPlaceMarkers(
  existingMap: LeafletMap | undefined,
  existingLayer: L.LayerGroup | undefined,
  places: PlaceWithCover[],
): L.LayerGroup | undefined {
  if (!existingMap) {
    return existingLayer;
  }

  const markersLayer = existingLayer ?? L.layerGroup().addTo(existingMap);
  markersLayer.clearLayers();

  if (places.length === 0) {
    return markersLayer;
  }

  const bounds = L.latLngBounds([]);

  for (const place of places) {
    const latitude = (place as any).latitude as number;
    const longitude = (place as any).longitude as number;

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      continue;
    }

    const marker = L.marker([latitude, longitude]);
    const href = urnToUrl(place.id);
    const popupLabel = place.name || "Unknown Place";

    const imagePart = place.coverThumbnailUrl
      ? `<img src="${place.coverThumbnailUrl}" alt="" class="leaflet-popup-thumbnail" loading="lazy" /><br />`
      : "";
    const linkPart = `<a href="${href}">${popupLabel}</a>`;
    const popupContent = imagePart + linkPart;

    marker.bindPopup(popupContent);

    marker.addTo(markersLayer);
    bounds.extend([latitude, longitude]);
  }

  if (bounds.isValid()) {
    existingMap.fitBounds(bounds, { padding: [20, 20], maxZoom: 8 });
  }

  return markersLayer;
}

const TRIP_LINE_OPTIONS: L.PolylineOptions = {
  color: "#2563eb",
  weight: 3,
  opacity: 0.7,
};

const SEGMENTS_PER_LEG = 16;
const BULGE_FACTOR = 0.25;

/*
 * Quadratic Bezier point: B(t) = (1-t)²A + 2(1-t)tC + t²B.
 */
function bezierPoint(
  start: [number, number],
  control: [number, number],
  end: [number, number],
  t: number,
): [number, number] {
  const u = 1 - t;
  const lat = u * u * start[0] + 2 * u * t * control[0] + t * t * end[0];
  const lng = u * u * start[1] + 2 * u * t * control[1] + t * t * end[1];
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
  for (let s = 1; s < segmentsPerLeg; s++) {
    out.push(bezierPoint(start, control, end, s / segmentsPerLeg));
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
  existingMap: LeafletMap | undefined,
  existingLayer: L.LayerGroup | undefined,
  tripPolylines: TripPolyline[],
): L.LayerGroup | undefined {
  if (!existingMap) {
    return existingLayer;
  }

  const linesLayer = existingLayer ?? L.layerGroup().addTo(existingMap);
  linesLayer.clearLayers();

  for (const { latLngs } of tripPolylines) {
    const curved = smoothLatLngs(latLngs, SEGMENTS_PER_LEG);
    L.polyline(curved, TRIP_LINE_OPTIONS).addTo(linesLayer);
  }

  return linesLayer;
}

/* */
export function MapPage(): m.Component<MapPageAttrs> {
  let leafletMap: LeafletMap | undefined;
  let mapContainer: HTMLElement | undefined;
  let lastSidebarVisible: boolean | undefined;
  let markersLayer: L.LayerGroup | undefined;
  let tripLinesLayer: L.LayerGroup | undefined;

  return {
    oncreate(vnode) {
      const root = vnode.dom as HTMLElement;
      mapContainer = root.querySelector(".leaflet-map") as HTMLElement | null ||
        undefined;

      leafletMap = ensureLeafletMap(leafletMap, mapContainer);
      tripLinesLayer = syncTripPolylines(
        leafletMap,
        tripLinesLayer,
        vnode.attrs.tripPolylines,
      );
      markersLayer = syncPlaceMarkers(
        leafletMap,
        markersLayer,
        vnode.attrs.places,
      );
      invalidateMapSizeSoon(leafletMap);
    },

    onupdate(vnode) {
      // When the sidebar visibility changes (esp. on mobile), the map needs a resize.
      if (lastSidebarVisible !== vnode.attrs.visible) {
        invalidateMapSizeSoon(leafletMap);
      }
      lastSidebarVisible = vnode.attrs.visible;

      tripLinesLayer = syncTripPolylines(
        leafletMap,
        tripLinesLayer,
        vnode.attrs.tripPolylines,
      );
      markersLayer = syncPlaceMarkers(
        leafletMap,
        markersLayer,
        vnode.attrs.places,
      );
    },

    onremove() {
      leafletMap = destroyLeafletMap(leafletMap);
      mapContainer = undefined;
      markersLayer = undefined;
      tripLinesLayer = undefined;
    },

    view(vnode) {
      const { visible: sidebarVisible } = vnode.attrs;

      return m("div", {
        class: sidebarVisible ? "page sidebar-visible" : "page",
      }, [
        m("section.photos-metadata", [
          m("h1", "Map"),
          m("p.photo-album-count", "Places I've visited"),
        ]),
        m("section.no-margin", [
          m("div.leaflet-map", {
            role: "application",
            "aria-label": "Map",
          }),
        ]),
      ]);
    },
  };
}
