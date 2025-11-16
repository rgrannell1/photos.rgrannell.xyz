import m from "mithril";
import { Dates } from "../services/dates.ts";
import type { Photo as PhotoType, Services } from "../types.ts";

type ExifDataAttrs = {
  photo: PhotoType;
  services: Services;
};

type HeadingAttrs = {
  text: string;
};

/* */
function Heading() {
  return {
    view(vnode: m.Vnode<HeadingAttrs>) {
      const { text } = vnode.attrs;
      return m("th.exif-heading", text);
    },
  };
}

/*
 * Display the camera model
 */
function CameraModel() {
  return {
    view(vnode: m.Vnode<ExifDataAttrs>) {
      const { photo, services } = vnode.attrs;

      const $model = services.toThingLinks([photo.model]);
      if ($model.length > 0) {
        return m("td", $model);
      }

      return m("td", "Unknown");
    },
  };
}

/*
 * Display the image dimensions
 */
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

/*
 * Display the lens focal length
 */
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

/*
 * Display the shutter speed
 */
function ShutterSpeed() {
  return {
    view(vnode: m.Vnode<ExifDataAttrs>) {
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
    },
  };
}

/*
 * Display the aperture (f-stop)
 */
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
      const { photo, services } = vnode.attrs;

      const $dateTime = m("tr", [
        m(Heading, { text: "Date-Time" }),
        m("td", m("time", Dates.formatCreatedAt(photo.createdAt))),
      ]);

      const $model = m("tr", [
        m(Heading, { text: "Camera Model" }),
        m(CameraModel, { photo, services }),
      ]);

      const $dimensions = m("tr", [
        m(Heading, { text: "Dimensions" }),
        m(ExifDimensions, { photo, services }),
      ]);

      const $focalLength = m("tr", [
        m(Heading, { text: "Focal Length" }),
        m(FocalLength, { photo, services }),
      ]);

      const $shutterSpeed = m("tr", [
        m(Heading, { text: "Shutter Speed" }),
        m(ShutterSpeed, { photo, services }),
      ]);

      const $aperture = m("tr", [
        m(Heading, { text: "Aperture" }),
        m(Aperture, { photo, services }),
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
    },
  };
}
