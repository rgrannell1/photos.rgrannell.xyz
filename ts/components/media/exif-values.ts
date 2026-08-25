/* Format raw EXIF fields for the photo metadata table. */

import { UNKNOWN_EXIF_VALUE } from "../../constants/display.ts";
import { isNone, type Maybe } from "../../commons/maybe.ts";

export function formatDimensions(
  width: Maybe<string>,
  height: Maybe<string>,
): string {
  if (isNone(width) || isNone(height)) {
    return UNKNOWN_EXIF_VALUE;
  }
  return `${width} x ${height}`;
}

export function formatFocalLength(focalLength: Maybe<string>): string {
  if (isNone(focalLength) || !focalLength || focalLength === UNKNOWN_EXIF_VALUE) {
    return UNKNOWN_EXIF_VALUE;
  }
  if (focalLength === "0") {
    return "Manual lens";
  }
  return `${focalLength}mm`;
}

export function formatShutterSpeed(exposureTime: Maybe<string>): string {
  if (isNone(exposureTime)) {
    return UNKNOWN_EXIF_VALUE;
  }

  const seconds = parseFloat(exposureTime);
  if (Number.isNaN(seconds)) {
    return UNKNOWN_EXIF_VALUE;
  }
  if (seconds >= 1) {
    return `${seconds} s`;
  }
  return `1/${Math.round(1 / seconds)} s`;
}

export function formatAperture(fStop: Maybe<string>): string {
  if (isNone(fStop) || !fStop || fStop === UNKNOWN_EXIF_VALUE) {
    return UNKNOWN_EXIF_VALUE;
  }
  if (fStop === "0.0") {
    return "Manual aperture control";
  }
  return `ƒ/${fStop}`;
}
