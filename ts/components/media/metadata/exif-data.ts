/* Render the photo EXIF metadata table. */

import m from "mithril";
import {
  type ReadThing,
  toThingLinks,
} from "../../thing/navigation/thing-links.ts";
import type { ReadThingEmoji } from "../../thing/navigation/thing-link.ts";
import * as Dates from "../../../commons/dates.ts";
import type { Photo as PhotoType } from "../../../types/domain.ts";
import { MetadataRow } from "./metadata-row.ts";
import {
  formatAperture,
  formatDimensions,
  formatFocalLength,
  formatShutterSpeed,
} from "./exif-values.ts";
import { UNKNOWN_EXIF_VALUE } from "../../../constants/display.ts";
import {
  fromNullable,
  type Maybe,
  withDefault,
} from "../../../commons/collections/maybe.ts";

type ExifDataAttrs = {
  photo: PhotoType;
  readThing: ReadThing;
  readEmoji: ReadThingEmoji;
};

type CameraModelAttrs = {
  model: Maybe<string>;
  readThing: ReadThing;
  readEmoji: ReadThingEmoji;
};

/** Render a camera model as thing links, with an unknown-value fallback. */
function viewCameraModel(vnode: m.Vnode<CameraModelAttrs>): m.Children {
  const { model, readThing, readEmoji } = vnode.attrs;

  const $model = toThingLinks(readThing, readEmoji, [model]);
  if ($model.length > 0) {
    return $model;
  }

  return UNKNOWN_EXIF_VALUE;
}

/** Create the camera-model component. */
function CameraModel() {
  return { view: viewCameraModel };
}

/** Render the photo creation date metadata row. */
function drawDateRow(photo: PhotoType): m.Children {
  const $date = m("time", Dates.formatCreatedAt(photo.createdAt));
  const $row = m(MetadataRow, { label: "Date-Time" }, $date);
  return $row;
}

/** Render camera model and image dimension metadata rows. */
function drawCameraDetailRows(attrs: ExifDataAttrs): m.Children[] {
  const { photo, readThing, readEmoji } = attrs;
  const $model = m(CameraModel, {
    model: fromNullable(photo.model),
    readThing,
    readEmoji,
  });
  const $modelRow = m(MetadataRow, { label: "Camera Model" }, $model);
  const dimensions = formatDimensions(
    fromNullable(photo.width),
    fromNullable(photo.height),
  );
  const $dimensionsRow = m(MetadataRow, { label: "Dimensions" }, dimensions);
  return [$modelRow, $dimensionsRow];
}

/** Render all camera metadata rows in display order. */
function drawCameraRows(attrs: ExifDataAttrs): m.Children[] {
  const $dateRow = drawDateRow(attrs.photo);
  const $detailRows = drawCameraDetailRows(attrs);
  return [$dateRow, ...$detailRows];
}

/** Render the focal-length metadata row. */
function drawLensRows(photo: PhotoType): m.Children[] {
  const focalLength = formatFocalLength(fromNullable(photo.focalLength));
  const $focalRow = m(MetadataRow, { label: "Focal Length" }, focalLength);
  return [$focalRow];
}

/** Render shutter speed, aperture, and ISO metadata rows. */
function drawExposureRows(photo: PhotoType): m.Children[] {
  const shutterSpeed = formatShutterSpeed(fromNullable(photo.exposureTime));
  const aperture = formatAperture(fromNullable(photo.fStop));
  const iso = withDefault(fromNullable(photo.iso), UNKNOWN_EXIF_VALUE);
  const $shutterRow = m(MetadataRow, { label: "Shutter Speed" }, shutterSpeed);
  const $apertureRow = m(MetadataRow, { label: "Aperture" }, aperture);
  const $isoRow = m(MetadataRow, { label: "ISO" }, iso);
  return [$shutterRow, $apertureRow, $isoRow];
}

/** Render the complete EXIF metadata table for a photo. */
function viewExifData(vnode: m.Vnode<ExifDataAttrs>): m.Children {
  const $cameraRows = drawCameraRows(vnode.attrs);
  const $lensRows = drawLensRows(vnode.attrs.photo);
  const $exposureRows = drawExposureRows(vnode.attrs.photo);
  const rows = [...$cameraRows, ...$lensRows, ...$exposureRows];
  return m("table.metadata-table", rows);
}

/** Create the photo EXIF metadata component. */
export function ExifData(): m.Component<ExifDataAttrs> {
  return { view: viewExifData };
}
