/* Leaflet map configuration and presentation values. */

// Terrain tile URL template.
export const MAP_TILE_URL =
  "https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png";

// Terrain tile provider attribution.
export const MAP_TILE_ATTRIBUTION =
  `Map tiles by <a href="https://stadiamaps.com/">Stadia Maps</a> ` +
  `&amp; <a href="https://stamen.com/">Stamen Design</a>, ` +
  `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`;

// Initial map centre.
export const MAP_INITIAL_CENTRE: [number, number] = [20, 0];

// Initial world map zoom.
export const MAP_INITIAL_ZOOM = 2;

// Maximum terrain tile zoom.
export const MAP_TILE_MAX_ZOOM = 20;

// Places added to the map in each batch.
export const MAP_MARKER_BATCH_SIZE = 20;

// Delay between marker batches.
export const MAP_MARKER_BATCH_DELAY_MS = 1;

// Label for a place without a name.
export const MAP_UNKNOWN_PLACE_LABEL = "Unknown Place";

// CSS class for images inside marker popups.
export const MAP_POPUP_THUMBNAIL_CLASS = "leaflet-popup-thumbnail";

// Padding around fitted marker bounds.
export const MAP_BOUNDS_PADDING_PX = 20;

// Maximum zoom after fitting marker bounds.
export const MAP_BOUNDS_MAX_ZOOM = 8;

// Default trip line colour.
export const MAP_TRIP_LINE_COLOUR = "#2563eb";

// Lighter trip line colour for land transport.
export const MAP_LAND_TRIP_LINE_COLOUR = "#60a5fa";

// Transport modes shown with the lighter trip line.
export const MAP_LIGHT_LINE_MODES = new Set(["car", "train"]);

// Trip line width in pixels.
export const MAP_TRIP_LINE_WEIGHT = 3;

// Trip line opacity.
export const MAP_TRIP_LINE_OPACITY = 0.7;

// Curved segments generated for each trip leg.
export const MAP_SEGMENTS_PER_LEG = 16;

// Trip line arc height relative to leg length.
export const MAP_ARC_BULGE_FACTOR = 0.25;

// Minimum divisor for zero-length trip legs.
export const MAP_MIN_LEG_LENGTH = 1e-6;
