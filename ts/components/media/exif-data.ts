import m from "mithril";
import { toThingLinks, type ReadThing } from "../thing/thing-links.ts";
import type { ReadThingEmoji } from "../thing/thing-link.ts";
import * as Dates from "../../services/dates.ts";
import type { Photo as PhotoType } from "../../types.ts";
import { Heading } from "./heading.ts";

type ExifDataAttrs = {
  photo: PhotoType;
  readThing: ReadThing;
  readEmoji: ReadThingEmoji;
};

function viewCameraModel(vnode: m.Vnode<ExifDataAttrs>): m.Children {
  const { photo, readThing, readEmoji } = vnode.attrs;

  const $model = toThingLinks(readThing, readEmoji, [photo.model]);
  if ($model.length > 0) {
    return m("td", $model);
  }

  return m("td", "Unknown");
}

function CameraModel() {
  return { view: viewCameraModel };
}

function viewExifDimensions(vnode: m.Vnode<ExifDataAttrs>): m.Children {
  const { photo } = vnode.attrs;

  if (typeof photo.width === "string" && typeof photo.height === "string") {
    return m("td", `${photo.width} x ${photo.height}`);
  }

  return m("td", "Unknown");
}

function ExifDimensions() {
  return { view: viewExifDimensions };
}

function viewFocalLength(vnode: m.Vnode<ExifDataAttrs>): m.Children {
  const { photo } = vnode.attrs;
  if (photo.focalLength === "Unknown") {
    return m("td", "Unknown");
  } else if (photo.focalLength === "0") {
    return m("td", "Manual lens");
  } else if (!photo.focalLength) {
    return m("td", "Unknown");
  } else {
    return m("td", `${photo.focalLength}mm`);
  }
}

function FocalLength() {
  return { view: viewFocalLength };
}

function viewShutterSpeed(vnode: m.Vnode<ExifDataAttrs>): m.Children {
  const { photo } = vnode.attrs;
  const { exposureTime } = photo;

  if (typeof exposureTime === "string") {
    const parsed = parseFloat(exposureTime);
    if (isNaN(parsed)) {
      return m("td", "Unknown");
    } else if (parsed >= 1) {
      return m("td", `${parsed} s`);
    } else {
      return m("td", `1/${Math.round(1 / parsed)} s`);
    }
  }

  return m("td", "Unknown");
}

function ShutterSpeed() {
  return { view: viewShutterSpeed };
}

function viewAperture(vnode: m.Vnode<ExifDataAttrs>): m.Children {
  const { photo } = vnode.attrs;

  if (photo.fStop === "Unknown") {
    return m("td", "Unknown");
  } else if (photo.fStop === "0.0") {
    return m("td", "Manual aperture control");
  } else if (!photo.fStop) {
    return m("td", "Unknown");
  }

  return m("td", `ƒ/${photo.fStop}`);
}

function Aperture() {
  return { view: viewAperture };
}

function viewExifData(vnode: m.Vnode<ExifDataAttrs>): m.Children {
  const { photo, readThing, readEmoji } = vnode.attrs;

  const $dateTime = m("tr", [
    m(Heading, { text: "Date-Time" }),
    m("td", m("time", Dates.formatCreatedAt(photo.createdAt))),
  ]);

  const $model = m("tr", [
    m(Heading, { text: "Camera Model" }),
    m(CameraModel, { photo, readThing, readEmoji }),
  ]);

  const $dimensions = m("tr", [
    m(Heading, { text: "Dimensions" }),
    m(ExifDimensions, { photo, readThing, readEmoji }),
  ]);

  const $focalLength = m("tr", [
    m(Heading, { text: "Focal Length" }),
    m(FocalLength, { photo, readThing, readEmoji }),
  ]);

  const $shutterSpeed = m("tr", [
    m(Heading, { text: "Shutter Speed" }),
    m(ShutterSpeed, { photo, readThing, readEmoji }),
  ]);

  const $aperture = m("tr", [
    m(Heading, { text: "Aperture" }),
    m(Aperture, { photo, readThing, readEmoji }),
  ]);

  const $iso = m("tr", [
    m(Heading, { text: "ISO" }),
    m("td", photo.iso ?? "Unknown"),
  ]);

  return m("table.metadata-table", [
    $dateTime,
    $model,
    $dimensions,
    $focalLength,
    $shutterSpeed,
    $aperture,
    $iso,
  ]);
}

export function ExifData() {
  return { view: viewExifData };
}
