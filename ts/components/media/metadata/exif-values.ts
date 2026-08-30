/* Format raw EXIF fields for the photo metadata table. */

/* Format raw EXIF fields for the photo metadata table. */
import { UNKNOWN_EXIF_VALUE } from "../../../constants/display.ts";
import { isNone, type Maybe, type None } from "../../../commons/collections/maybe.ts";

export function formatDimensions(
  width: Maybe<string>,
  height: Maybe<string>,
): string {
  const isUnknown = isNone(width) || isNone(height);
  if (isUnknown) {
    return UNKNOWN_EXIF_VALUE;
  }
  const dimensions = `${width} x ${height}`;
  return dimensions;
}

function isUnknownExifValue(
  value: Maybe<string>,
): value is None | "" | typeof UNKNOWN_EXIF_VALUE {
  const isMissing = isNone(value) || !value;
  const isUnknown = value === UNKNOWN_EXIF_VALUE;
  return isMissing || isUnknown;
}

export function formatFocalLength(focalLength: Maybe<string>): string {
  const isUnknown = isUnknownExifValue(focalLength);
  if (isUnknown) {
    return UNKNOWN_EXIF_VALUE;
  }
  if (focalLength === "0") {
    return "Manual lens";
  }
  const formatted = `${focalLength}mm`;
  return formatted;
}

function formatSubsecondShutter(seconds: number): string {
  const denominator = Math.round(1 / seconds);
  return `1/${denominator} s`;
}

function formatShutterSeconds(seconds: number): string {
  if (seconds >= 1) {
    return `${seconds} s`;
  }
  return formatSubsecondShutter(seconds);
}

export function formatShutterSpeed(exposureTime: Maybe<string>): string {
  if (isNone(exposureTime)) {
    return UNKNOWN_EXIF_VALUE;
  }

  const seconds = parseFloat(exposureTime);
  if (Number.isNaN(seconds)) {
    return UNKNOWN_EXIF_VALUE;
  }
  const formatted = formatShutterSeconds(seconds);
  return formatted;
}

export function formatAperture(fStop: Maybe<string>): string {
  const isUnknown = isUnknownExifValue(fStop);
  if (isUnknown) {
    return UNKNOWN_EXIF_VALUE;
  }
  if (fStop === "0.0") {
    return "Manual aperture control";
  }
  const formatted = `ƒ/${fStop}`;
  return formatted;
}
