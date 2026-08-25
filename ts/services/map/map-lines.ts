/* Build curved trip coordinates and their Leaflet line style. */

import type { PolylineOptions } from "leaflet";
import {
  MAP_ARC_BULGE_FACTOR,
  MAP_LAND_TRIP_LINE_COLOUR,
  MAP_LIGHT_LINE_MODES,
  MAP_MIN_LEG_LENGTH,
  MAP_SEGMENTS_PER_LEG,
  MAP_TRIP_LINE_COLOUR,
  MAP_TRIP_LINE_OPACITY,
  MAP_TRIP_LINE_WEIGHT,
} from "../../constants/map.ts";
import { isSome, type Maybe } from "../../commons/maybe.ts";

type Coordinate = [number, number];

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

/* Calculate a point on a quadratic Bezier curve. */
function bezierPoint(
  start: Coordinate,
  control: Coordinate,
  end: Coordinate,
  progress: number,
): Coordinate {
  const inverse = 1 - progress;
  const latitude = inverse * inverse * start[0] +
    2 * inverse * progress * control[0] +
    progress * progress * end[0];
  const longitude = inverse * inverse * start[1] +
    2 * inverse * progress * control[1] +
    progress * progress * end[1];
  return [latitude, longitude];
}

/* Find the north-facing unit vector perpendicular to a trip leg. */
function northPerpendicular(
  latitudeDelta: number,
  longitudeDelta: number,
): Coordinate {
  let latitude = longitudeDelta;
  let longitude = -latitudeDelta;
  if (latitude < 0) {
    latitude = -longitudeDelta;
    longitude = latitudeDelta;
  }

  const length = Math.sqrt(latitude * latitude + longitude * longitude) ||
    MAP_MIN_LEG_LENGTH;
  return [latitude / length, longitude / length];
}

/* Place the Bezier control point north of a trip leg. */
function arcControlPoint(start: Coordinate, end: Coordinate): Coordinate {
  const latitudeDelta = end[0] - start[0];
  const longitudeDelta = end[1] - start[1];
  const legLength = Math.sqrt(
    latitudeDelta * latitudeDelta + longitudeDelta * longitudeDelta,
  ) || MAP_MIN_LEG_LENGTH;
  const [northLatitude, northLongitude] = northPerpendicular(
    latitudeDelta,
    longitudeDelta,
  );
  const bulge = MAP_ARC_BULGE_FACTOR * legLength;
  const middleLatitude = (start[0] + end[0]) / 2;
  const middleLongitude = (start[1] + end[1]) / 2;
  return [
    middleLatitude + bulge * northLatitude,
    middleLongitude + bulge * northLongitude,
  ];
}

function curveTripLeg(
  start: Coordinate,
  end: Coordinate,
  segmentsPerLeg: number,
): Coordinate[] {
  const control = arcControlPoint(start, end);
  const coordinates: Coordinate[] = [start];
  for (let segmentIdx = 1; segmentIdx < segmentsPerLeg; segmentIdx++) {
    const progress = segmentIdx / segmentsPerLeg;
    coordinates.push(bezierPoint(start, control, end, progress));
  }
  coordinates.push(end);
  return coordinates;
}

export function curveTripLine(
  coordinates: Coordinate[],
  segmentsPerLeg = MAP_SEGMENTS_PER_LEG,
): Coordinate[] {
  if (coordinates.length < 2) {
    return coordinates;
  }

  const curvedCoordinates: Coordinate[] = [];
  for (let idx = 0; idx < coordinates.length - 1; idx++) {
    const leg = curveTripLeg(
      coordinates[idx],
      coordinates[idx + 1],
      segmentsPerLeg,
    );
    const newCoordinates = idx === 0 ? leg : leg.slice(1);
    curvedCoordinates.push(...newCoordinates);
  }
  return curvedCoordinates;
}
