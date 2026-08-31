/* Build curved trip coordinates and their Leaflet line style. */

/* Build curved trip coordinates and their Leaflet line style. */
import type { PolylineOptions } from "leaflet";
import {
  MAP_LAND_TRIP_LINE_COLOUR,
  MAP_LIGHT_LINE_MODES,
  MAP_SEGMENTS_PER_LEG,
  MAP_TRIP_LINE_COLOUR,
  MAP_TRIP_LINE_OPACITY,
  MAP_TRIP_LINE_WEIGHT,
} from "../../../constants/map.ts";
import { isSome, type Maybe } from "../../../commons/collections/maybe.ts";
import { appendTripLegs } from "./legs.ts";

export type Coordinate = [number, number];

export type BezierValues = [number, number, number];

export type BezierPointOptions = {
  start: Coordinate;
  control: Coordinate;
  end: Coordinate;
  progress: number;
};

export type TripLegOptions = {
  coordinates: Coordinate[];
  curvedCoordinates: Coordinate[];
  legIdx: number;
  segmentsPerLeg: number;
};

/** Select the map line style for the current display mode. */
export function tripLineOptions(mode: Maybe<string>): PolylineOptions {
  const usesLightLine = isSome(mode) && MAP_LIGHT_LINE_MODES.has(mode);
  const color = usesLightLine
    ? MAP_LAND_TRIP_LINE_COLOUR
    : MAP_TRIP_LINE_COLOUR;
  return {
    color,
    weight: MAP_TRIP_LINE_WEIGHT,
    opacity: MAP_TRIP_LINE_OPACITY,
  };
}

export type CurveInteriorOptions = {
  start: Coordinate;
  control: Coordinate;
  end: Coordinate;
  segmentsPerLeg: number;
};

/** Add curved points for each trip leg, or preserve a line with fewer than two points. */
export function curveTripLine(
  coordinates: Coordinate[],
  segmentsPerLeg = MAP_SEGMENTS_PER_LEG,
): Coordinate[] {
  if (coordinates.length < 2) {
    return coordinates;
  }

  const curvedCoordinates: Coordinate[] = [];
  const options = { coordinates, curvedCoordinates, legIdx: 0, segmentsPerLeg };
  appendTripLegs(options);
  return curvedCoordinates;
}
