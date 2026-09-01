/* Support map lines operations. */

/* Support map lines operations. */
import { MAP_MIN_LEG_LENGTH } from "../../../constants/map.ts";
import type {
  BezierPointOptions,
  BezierValues,
  Coordinate,
} from "./map-lines.ts";

/** Calculates quadratic Bezier weights for a curve position. */
export function calculateBezierWeights(progress: number): BezierValues {
  const inverse = 1 - progress;
  const startWeight = inverse * inverse;
  const controlWeight = 2 * inverse * progress;
  return [startWeight, controlWeight, progress * progress];
}

/** Interpolates one coordinate axis along a quadratic Bezier curve. */
export function interpolateBezierCoordinate(
  values: BezierValues,
  progress: number,
): number {
  const [start, control, end] = values;
  const [startWeight, controlWeight, endWeight] =
    calculateBezierWeights(progress);
  return startWeight * start + controlWeight * control + endWeight * end;
}

/** Interpolates the latitude for a Bezier point. */
export function interpolateBezierLatitude(options: BezierPointOptions): number {
  const { start, control, end, progress } = options;
  const values: BezierValues = [start[0], control[0], end[0]];
  return interpolateBezierCoordinate(values, progress);
}

/** Interpolates the longitude for a Bezier point. */
export function interpolateBezierLongitude(options: BezierPointOptions): number {
  const { start, control, end, progress } = options;
  const values: BezierValues = [start[1], control[1], end[1]];
  return interpolateBezierCoordinate(values, progress);
}

/* Calculate a point on a quadratic Bezier curve. */
/** Calculates a coordinate on a quadratic Bezier curve. */
export function calculateBezierPoint(
  start: Coordinate,
  control: Coordinate,
  end: Coordinate,
  progress: number,
): Coordinate {
  const options = { start, control, end, progress };
  const latitude = interpolateBezierLatitude(options);
  const longitude = interpolateBezierLongitude(options);
  return [latitude, longitude];
}

/** Measures a coordinate vector with a non-zero minimum length. */
export function calculateCoordinateLength(coordinate: Coordinate): number {
  const [latitude, longitude] = coordinate;
  const squaredLength = latitude * latitude + longitude * longitude;
  return Math.sqrt(squaredLength) || MAP_MIN_LEG_LENGTH;
}

/** Flips a vector when needed so its latitude points north. */
export function orientNorth(coordinate: Coordinate): Coordinate {
  const [latitude, longitude] = coordinate;
  return latitude < 0 ? [-latitude, -longitude] : coordinate;
}

/* Find the north-facing unit vector perpendicular to a trip leg. */
/** Finds the north-facing unit vector perpendicular to a trip leg. */
export function calculateNorthPerpendicular(
  latitudeDelta: number,
  longitudeDelta: number,
): Coordinate {
  const perpendicular: Coordinate = [longitudeDelta, -latitudeDelta];
  const [latitude, longitude] = orientNorth(perpendicular);
  const length = calculateCoordinateLength([latitude, longitude]);
  return [latitude / length, longitude / length];
}

/** Calculates the vector from one coordinate to another. */
export function calculateCoordinateDelta(
  start: Coordinate,
  end: Coordinate,
): Coordinate {
  return [end[0] - start[0], end[1] - start[1]];
}

/** Calculates the midpoint between two coordinates. */
export function calculateCoordinateMidpoint(
  start: Coordinate,
  end: Coordinate,
): Coordinate {
  return [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2];
}
