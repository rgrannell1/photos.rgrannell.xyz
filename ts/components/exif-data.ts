import m from "mithril";
import { Dates } from "../services/dates.ts";
import type { Photo as PhotoType } from "../types.ts";
import { ThingLink } from "./thing-link.ts";

type ExifDataAttrs = {
  photo: PhotoType;
};

type HeadingAttrs = {
  text: string;
};

function Heading() {
  return {
    view(vnode: m.Vnode<HeadingAttrs>) {
      const { text } = vnode.attrs;
      return m("th.exif-heading", text);
    },
  };
}

function CameraModel() {
  return {
    view(vnode: m.Vnode<ExifDataAttrs>) {
      const { photo } = vnode.attrs;

      if (photo.model) {
        return m(
          "td",
          m(ThingLink, { urn: photo.model, name: photo.model, classes: [] }),
        );
      }

      return m("td", "Unknown");
    },
  };
}

function ExifDimensions() {
  return {
    view(vnode: m.Vnode<ExifDataAttrs>) {
      const { photo } = vnode.attrs;

      if (typeof photo.width === "string" && typeof photo.height === "string") {
        return m("td", `${photo.width} x ${photo.height}`);
      }

      return m("td", "Unknown");
    },
  };
}

function FocalLength() {
  return {
    view(vnode: m.Vnode<ExifDataAttrs>) {
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
    },
  };
}

function ShutterSpeed() {
  return {
    view(vnode: m.Vnode<ExifDataAttrs>) {
      const { photo } = vnode.attrs;

      if (typeof photo.exposureTime === "number") {
        return m("td", `1/${Math.round(1 / photo.exposureTime)}`);
      }

      return m("td", "Unknown");
    },
  };
}

function Aperture() {
  return {
    view(vnode: m.Vnode<ExifDataAttrs>) {
      const { photo } = vnode.attrs;

      if (photo.fStop === "Unknown") {
        return m("td", "Unknown");
      } else if (photo.fStop === "0.0") {
        return m("td", "Manual aperture control");
      } else if (!photo.fStop) {
        return m("td", "Unknown");
      }

      return m("td", `ƒ/${photo.fStop}`);
    },
  };
}

export function ExifData() {
  return {
    view(vnode: m.Vnode<ExifDataAttrs>) {
      const { photo } = vnode.attrs;

      const $dateTime = m("tr", [
        m(Heading, { text: "Date-Time" }),
        m("td", m("time", Dates.formatCreatedAt(photo.createdAt))),
      ]);

      const $model = m("tr", [
        m(Heading, { text: "Camera Model" }),
        m(CameraModel, { photo }),
      ]);

      const $dimensions = m("tr", [
        m(Heading, { text: "Dimensions" }),
        m(ExifDimensions, { photo }),
      ]);

      const $focalLength = m("tr", [
        m(Heading, { text: "Focal Length" }),
        m(FocalLength, { photo }),
      ]);

      const $shutterSpeed = m("tr", [
        m(Heading, { text: "Shutter Speed" }),
        m(ShutterSpeed, { photo }),
      ]);

      const $aperture = m("tr", [
        m(Heading, { text: "Aperture" }),
        m(Aperture, { photo }),
      ]);

      const $iso = m("tr", [
        m(Heading, { text: "ISO" }),
        m("td", photo.iso ?? "Unknown"),
      ]);

      return m(
        "div",
        m("h3", "Exif Data"),
        m("table.metadata-table", [
          $dateTime,
          $model,
          $dimensions,
          $focalLength,
          $shutterSpeed,
          $aperture,
          $iso,
        ])
      );
    },
  };
}
