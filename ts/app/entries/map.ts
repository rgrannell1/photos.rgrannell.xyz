/* Resolve the map route and retain its completed map model. */

/* Resolve the map route and retain its completed map model. */
import { MapPage } from "../../components/pages/map.ts";
import type { TripPolyline } from "../../domain/map.ts";
import type { GeocodedPlaceWithCover } from "../../domain/places.ts";
import { services, state } from "../context.ts";
import { pageEntry } from "../shell.ts";

let placesForMap: GeocodedPlaceWithCover[] = [];
let tripPolylines: TripPolyline[] = [];
let mapDataRead = false;

/** Refreshes the retained place and trip data for the map route. */
function readMapData() {
  placesForMap = services.readGeocodedPlacesWithCovers();
  tripPolylines = services.readTransferPolylines();
  mapDataRead = true;
}

export const mapEntry = pageEntry({
  page: MapPage,
  /** Refreshes map data when the route opens after application load. */
  onmatch() {
    if (state.loaded) {
      readMapData();
    }
  },
  /** Returns no page before load, then resolves retained map attributes. */
  resolve() {
    if (!state.loaded) {
      return "";
    }

    if (!mapDataRead) {
      readMapData();
    }

    return {
      attrs: {
        visible: state.sidebarVisible,
        places: placesForMap,
        tripPolylines,
      },
    };
  },
});
