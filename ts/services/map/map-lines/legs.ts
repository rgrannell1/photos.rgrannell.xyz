/* Support map lines operations. */

/* Support map lines operations. */
import { MAP_ARC_BULGE_FACTOR } from "../../../constants/map.ts";
import type {
  Coordinate,
  CurveInteriorOptions,
  TripLegOptions,
} from "./map-lines.ts";
import {
  bezierPoint,
  coordinateDelta,
  coordinateLength,
  coordinateMidpoint,
  northPerpendicular,
} from "./bezier.ts";

/** Multiplies both coordinate axes by a scale. */
export function scaleCoordinate(
  coordinate: Coordinate,
  scale: number,
): Coordinate {
  const [latitude, longitude] = coordinate;
  return [scale * latitude, scale * longitude];
}

/** Calculates a northward arc offset proportional to leg length. */
export function arcOffset(start: Coordinate, end: Coordinate): Coordinate {
  const [latitudeDelta, longitudeDelta] = coordinateDelta(start, end);
  const legLength = coordinateLength([latitudeDelta, longitudeDelta]);
  const [northLatitude, northLongitude] = northPerpendicular(
    latitudeDelta,
    longitudeDelta,
  );
  const bulge = MAP_ARC_BULGE_FACTOR * legLength;
  return scaleCoordinate([northLatitude, northLongitude], bulge);
}

/* Place the Bezier control point north of a trip leg. */
/** Places a Bezier control point north of a trip leg. */
export function arcControlPoint(
  start: Coordinate,
  end: Coordinate,
): Coordinate {
  const [middleLatitude, middleLongitude] = coordinateMidpoint(start, end);
  const [offsetLatitude, offsetLongitude] = arcOffset(start, end);
  return [middleLatitude + offsetLatitude, middleLongitude + offsetLongitude];
}

/** Reads one interior curve point by segment index. */
export function readInteriorPoint(
  options: CurveInteriorOptions,
  segmentIdx: number,
): Coordinate {
  const { start, control, end, segmentsPerLeg } = options;
  const progress = segmentIdx / segmentsPerLeg;
  return bezierPoint(start, control, end, progress);
}

/** Calculates all interior points for a segmented curve. */
export function curveInteriorPoints(
  options: CurveInteriorOptions,
): Coordinate[] {
  const coordinates: Coordinate[] = [];
  for (let segmentIdx = 1; segmentIdx < options.segmentsPerLeg; segmentIdx++) {
    const point = readInteriorPoint(options, segmentIdx);
    coordinates.push(point);
  }
  return coordinates;
}

/** Curves one trip leg while retaining both endpoints. */
export function curveTripLeg(
  start: Coordinate,
  end: Coordinate,
  segmentsPerLeg: number,
): Coordinate[] {
  const control = arcControlPoint(start, end);
  const options = { start, control, end, segmentsPerLeg };
  const coordinates = curveInteriorPoints(options);
  return [start, ...coordinates, end];
}

/** Reads and curves the selected leg from trip coordinates. */
export function readTripLeg(options: TripLegOptions): Coordinate[] {
  const { coordinates, legIdx, segmentsPerLeg } = options;
  const start = coordinates[legIdx];
  const end = coordinates[legIdx + 1];
  return curveTripLeg(start, end, segmentsPerLeg);
}

/** Appends one curved leg without duplicating a shared endpoint. */
export function appendTripLeg(options: TripLegOptions): void {
  const leg = readTripLeg(options);
  const coordinates = options.legIdx === 0 ? leg : leg.slice(1);
  options.curvedCoordinates.push(...coordinates);
}

/** Appends all curved legs and advances the mutable leg index. */
export function appendTripLegs(options: TripLegOptions): void {
  const legCount = options.coordinates.length - 1;
  for (let legIdx = 0; legIdx < legCount; legIdx++) {
    options.legIdx = legIdx;
    appendTripLeg(options);
  }
}
