import m from "mithril";
import type { Photo as PhotoType, Services } from "../types.ts";
import { arrayify } from "../commons/arrays.ts";
import { Strings } from "../commons/strings.ts";

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

type PhotoComponentAttrs = {
  photo: PhotoType;
  services: Services;
};

/* */
function Description() {
  return {
    view(vnode: m.Vnode<PhotoComponentAttrs>) {
      const { photo } = vnode.attrs;

      const html = Strings.preprocessDescription(
        photo.description ?? photo.summary ?? "",
      );
      if (html) {
        return m("td", m.trust(html));
      }

      return m("td", "—");
    },
  };
}

/* */
function Location() {
  return {
    view(vnode: m.Vnode<PhotoComponentAttrs>) {
      const { photo, services } = vnode.attrs;

      const $locations = services.toThingLinks(arrayify(photo.location));
      return m("td", $locations.length > 0 ? $locations : "—");
    },
  };
}

/* */
function Rating() {
  return {
    view(vnode: m.Vnode<PhotoComponentAttrs>) {
      const { photo, services } = vnode.attrs;

      const $rating = services.toThingLinks([photo.rating]);
      return m("td", $rating.length > 0 ? $rating : "—");
    },
  };
}

/* */
function Style() {
  return {
    view(vnode: m.Vnode<PhotoComponentAttrs>) {
      const { photo, services } = vnode.attrs;

      const $style = services.toThingLinks([photo.style]);
      return m("td", $style.length > 0 ? $style : "—");
    },
  };
}

/* */
function Subject() {
  return {
    view(vnode: m.Vnode<PhotoComponentAttrs>) {
      const { photo, services } = vnode.attrs;

      const $subject = services.toThingLinks(arrayify(photo.subject));
      return m("td", $subject.length > 0 ? $subject : "—");
    },
  };
}

/* */
function Country() {
  return {
    view(vnode: m.Vnode<PhotoComponentAttrs>) {
      const { photo, services } = vnode.attrs;

      const $countries = services.toThingLinks(arrayify(photo.country));
      return m("td", $countries.length > 0 ? $countries : "—");
    },
  };
}

type PhotoInfoAttrs = {
  photo: PhotoType;
  services: Services;
};

/* */
export function PhotoInfo() {
  return {
    view(vnode: m.Vnode<PhotoInfoAttrs>) {
      const { photo, services } = vnode.attrs;

      const infoItems = [];

      if (photo.description || photo.summary) {
        infoItems.push(m("tr", [
          m(Heading, { text: "Description" }),
          m(Description, { photo, services }),
        ]));
      }

      infoItems.push(
        m("tr", [
          m(Heading, { text: "Country" }),
          m(Country, { photo, services }),
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
        m("tr", [
          m(Heading, { text: "Subject" }),
          m(Subject, { photo, services }),
        ]),
      );

      return m("table.metadata-table", infoItems);
    },
  };
}
