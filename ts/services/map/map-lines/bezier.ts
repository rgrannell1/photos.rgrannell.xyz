/* Support map lines operations. */

/* Support map lines operations. */
import { MAP_MIN_LEG_LENGTH } from "../../../constants/map.ts";
import type {
  BezierPointOptions,
  BezierValues,
  Coordinate,
} from "./map-lines.ts";

export function bezierWeights(progress: number): BezierValues {
  const inverse = 1 - progress;
  const startWeight = inverse * inverse;
  const controlWeight = 2 * inverse * progress;
  return [startWeight, controlWeight, progress * progress];
}

export function bezierCoordinate(
  values: BezierValues,
  progress: number,
): number {
  const [start, control, end] = values;
  const [startWeight, controlWeight, endWeight] = bezierWeights(progress);
  return startWeight * start + controlWeight * control + endWeight * end;
}

export function bezierLatitude(options: BezierPointOptions): number {
  const { start, control, end, progress } = options;
  const values: BezierValues = [start[0], control[0], end[0]];
  return bezierCoordinate(values, progress);
}

export function bezierLongitude(options: BezierPointOptions): number {
  const { start, control, end, progress } = options;
  const values: BezierValues = [start[1], control[1], end[1]];
  return bezierCoordinate(values, progress);
}

/* Calculate a point on a quadratic Bezier curve. */
export function bezierPoint(
  start: Coordinate,
  control: Coordinate,
  end: Coordinate,
  progress: number,
): Coordinate {
  const options = { start, control, end, progress };
  const latitude = bezierLatitude(options);
  const longitude = bezierLongitude(options);
  return [latitude, longitude];
}

export function coordinateLength(coordinate: Coordinate): number {
  const [latitude, longitude] = coordinate;
  const squaredLength = latitude * latitude + longitude * longitude;
  return Math.sqrt(squaredLength) || MAP_MIN_LEG_LENGTH;
}

export function orientNorth(coordinate: Coordinate): Coordinate {
  const [latitude, longitude] = coordinate;
  return latitude < 0 ? [-latitude, -longitude] : coordinate;
}

/* Find the north-facing unit vector perpendicular to a trip leg. */
export function northPerpendicular(
  latitudeDelta: number,
  longitudeDelta: number,
): Coordinate {
  const perpendicular: Coordinate = [longitudeDelta, -latitudeDelta];
  const [latitude, longitude] = orientNorth(perpendicular);
  const length = coordinateLength([latitude, longitude]);
  return [latitude / length, longitude / length];
}

export function coordinateDelta(
  start: Coordinate,
  end: Coordinate,
): Coordinate {
  return [end[0] - start[0], end[1] - start[1]];
}

export function coordinateMidpoint(
  start: Coordinate,
  end: Coordinate,
): Coordinate {
  return [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2];
}
