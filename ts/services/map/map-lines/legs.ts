/* Support map lines operations. */

/* Support map lines operations. */
import { MAP_ARC_BULGE_FACTOR } from "../../../constants/map.ts";
import type {
  Coordinate,
  CurveInteriorOptions,
  TripLegOptions,
} from "./map-lines.ts";
import {
  calculateBezierPoint,
  calculateCoordinateDelta,
  calculateCoordinateLength,
  calculateCoordinateMidpoint,
  calculateNorthPerpendicular,
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
export function calculateArcOffset(
  start: Coordinate,
  end: Coordinate,
): Coordinate {
  const [latitudeDelta, longitudeDelta] = calculateCoordinateDelta(start, end);
  const legLength = calculateCoordinateLength([latitudeDelta, longitudeDelta]);
  const [northLatitude, northLongitude] = calculateNorthPerpendicular(
    latitudeDelta,
    longitudeDelta,
  );
  const bulge = MAP_ARC_BULGE_FACTOR * legLength;
  return scaleCoordinate([northLatitude, northLongitude], bulge);
}

/* Place the Bezier control point north of a trip leg. */
/** Places a Bezier control point north of a trip leg. */
export function calculateArcControlPoint(
  start: Coordinate,
  end: Coordinate,
): Coordinate {
  const [middleLatitude, middleLongitude] = calculateCoordinateMidpoint(
    start,
    end,
  );
  const [offsetLatitude, offsetLongitude] = calculateArcOffset(start, end);
  return [middleLatitude + offsetLatitude, middleLongitude + offsetLongitude];
}

/** Calculates one interior curve point by segment index. */
export function calculateInteriorPoint(
  options: CurveInteriorOptions,
  segmentIdx: number,
): Coordinate {
  const { start, control, end, segmentsPerLeg } = options;
  const progress = segmentIdx / segmentsPerLeg;
  return calculateBezierPoint(start, control, end, progress);
}

/** Calculates all interior points for a segmented curve. */
export function calculateCurveInteriorPoints(
  options: CurveInteriorOptions,
): Coordinate[] {
  const coordinates: Coordinate[] = [];
  for (let segmentIdx = 1; segmentIdx < options.segmentsPerLeg; segmentIdx++) {
    const point = calculateInteriorPoint(options, segmentIdx);
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
  const control = calculateArcControlPoint(start, end);
  const options = { start, control, end, segmentsPerLeg };
  const coordinates = calculateCurveInteriorPoints(options);
  return [start, ...coordinates, end];
}

/** Curves the selected leg from trip coordinates. */
export function curveSelectedTripLeg(options: TripLegOptions): Coordinate[] {
  const { coordinates, legIdx, segmentsPerLeg } = options;
  const start = coordinates[legIdx];
  const end = coordinates[legIdx + 1];
  return curveTripLeg(start, end, segmentsPerLeg);
}

/** Appends one curved leg without duplicating a shared endpoint. */
export function appendTripLeg(options: TripLegOptions): void {
  const leg = curveSelectedTripLeg(options);
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
