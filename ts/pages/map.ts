import m from "mithril";
import * as L from "leaflet";
import type { Map as LeafletMap } from "leaflet";
import type { GeocodedPlace } from "../services/places.ts";
import { urnToUrl } from "../models/urn.ts";

type MapPageAttrs = {
  visible: boolean;
  places: GeocodedPlace[];
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
  places: GeocodedPlace[],
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

    marker.bindPopup(
      `<a href="${href}">${popupLabel}</a>`,
    );

    marker.addTo(markersLayer);
    bounds.extend([latitude, longitude]);
  }

  if (bounds.isValid()) {
    existingMap.fitBounds(bounds, { padding: [20, 20], maxZoom: 8 });
  }

  return markersLayer;
}

/* */
export function MapPage(): m.Component<MapPageAttrs> {
  let leafletMap: LeafletMap | undefined;
  let mapContainer: HTMLElement | undefined;
  let lastSidebarVisible: boolean | undefined;
  let markersLayer: L.LayerGroup | undefined;

  return {
    oncreate(vnode) {
      const root = vnode.dom as HTMLElement;
      mapContainer = root.querySelector(".leaflet-map") as HTMLElement | null ||
        undefined;

      leafletMap = ensureLeafletMap(leafletMap, mapContainer);
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
