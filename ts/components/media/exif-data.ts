/* Render the photo EXIF metadata table. */

import m from "mithril";
import { toThingLinks, type ReadThing } from "../thing/thing-links.ts";
import type { ReadThingEmoji } from "../thing/thing-link.ts";
import * as Dates from "../../commons/dates.ts";
import type { Photo as PhotoType } from "../../types/domain.ts";
import { MetadataRow } from "./metadata-row.ts";
import {
  formatAperture,
  formatDimensions,
  formatFocalLength,
  formatShutterSpeed,
} from "./exif-values.ts";
import { UNKNOWN_EXIF_VALUE } from "../../constants/display.ts";
import { fromNullable, type Maybe, withDefault } from "../../commons/maybe.ts";

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

function viewCameraModel(vnode: m.Vnode<CameraModelAttrs>): m.Children {
  const { model, readThing, readEmoji } = vnode.attrs;

  const $model = toThingLinks(readThing, readEmoji, [model]);
  if ($model.length > 0) {
    return $model;
  }

  return UNKNOWN_EXIF_VALUE;
}

function CameraModel() {
  return { view: viewCameraModel };
}

function drawCameraRows(attrs: ExifDataAttrs): m.Children[] {
  const { photo, readThing, readEmoji } = attrs;
  return [
    m(
      MetadataRow,
      { label: "Date-Time" },
      m("time", Dates.formatCreatedAt(photo.createdAt)),
    ),
    m(
      MetadataRow,
      { label: "Camera Model" },
      m(CameraModel, { model: fromNullable(photo.model), readThing, readEmoji }),
    ),
    m(
      MetadataRow,
      { label: "Dimensions" },
      formatDimensions(fromNullable(photo.width), fromNullable(photo.height)),
    ),
  ];
}

function drawExposureRows(photo: PhotoType): m.Children[] {
  return [
    m(
      MetadataRow,
      { label: "Focal Length" },
      formatFocalLength(fromNullable(photo.focalLength)),
    ),
    m(
      MetadataRow,
      { label: "Shutter Speed" },
      formatShutterSpeed(fromNullable(photo.exposureTime)),
    ),
    m(MetadataRow, { label: "Aperture" }, formatAperture(fromNullable(photo.fStop))),
    m(
      MetadataRow,
      { label: "ISO" },
      withDefault(fromNullable(photo.iso), UNKNOWN_EXIF_VALUE),
    ),
  ];
}

function viewExifData(vnode: m.Vnode<ExifDataAttrs>): m.Children {
  const rows = [
    ...drawCameraRows(vnode.attrs),
    ...drawExposureRows(vnode.attrs.photo),
  ];
  return m("table.metadata-table", rows);
}

export function ExifData() {
  return { view: viewExifData };
}
