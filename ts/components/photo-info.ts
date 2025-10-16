import m from "mithril";
import { Photo as PhotoType, Services } from "../types.ts";
import { ThingLink } from "./thing-link.ts";

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

type PhotoComponentAttrs = {
  photo: PhotoType;
  services: Services;
};

function Description() {
  return {
    view(vnode: m.Vnode<PhotoComponentAttrs>) {
      const { photo } = vnode.attrs;

      const html = photo.description ?? photo.summary;
      if (html) {
        return m("td", m.trust(html));
      }

      return m("td", "—");
    },
  };
}

function Location() {
  return {
    view(vnode: m.Vnode<PhotoComponentAttrs>) {
      const { photo, services } = vnode.attrs;
      const locations = Array.isArray(photo.location)
        ? photo.location
        : [photo.location];

      const $locations = services.toThingLinks(locations);
      return m("td", $locations.length > 0 ? $locations : "—");
    },
  };
}

function Rating() {
  return {
    view(vnode: m.Vnode<PhotoComponentAttrs>) {
      const { photo, services } = vnode.attrs;

      const $rating = services.toThingLinks([photo.rating]);
      return m("td", $rating.length > 0 ? $rating : "—");
    },
  };
}

function Style() {
  return {
    view(vnode: m.Vnode<PhotoComponentAttrs>) {
      const { photo, services } = vnode.attrs;

      const $style = services.toThingLinks([photo.style]);
      return m("td", $style.length > 0 ? $style : "—");
    },
  };
}

type PhotoInfoAttrs = {
  photo: PhotoType;
  services: Services;
};

export function PhotoInfo() {
  return {
    view(vnode: m.Vnode<PhotoInfoAttrs>) {
      const { photo, services } = vnode.attrs;

      const infoItems = [
        m("tr", [
          m(Heading, { text: "Description" }),
          m(Description, { photo, services }),
        ]),
        m("tr", [
          m(Heading, { text: "Location" }),
          m(Location, { photo, services }),
        ]),
        m("tr", [
          m(Heading, { text: "Rating" }),
          m(Rating, { photo, services }),
        ]),
        m("tr", [
          m(Heading, { text: "Style" }),
          m(Style, { photo, services }),
        ]),
      ];

      return m("table.metadata-table", infoItems);
    },
  };
}
