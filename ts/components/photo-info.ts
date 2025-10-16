import m from "mithril";
import { Photo as PhotoType } from "../types.ts";

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
};

function Description() {
  return {
    view(vnode: m.Vnode<PhotoComponentAttrs>) {
      const { photo } = vnode.attrs;
      return m("td", photo.description || "—");
    },
  };
}

function Location() {
  return {
    view(vnode: m.Vnode<PhotoComponentAttrs>) {
      const { photo } = vnode.attrs;
      const location = Array.isArray(photo.location)
        ? photo.location.join(", ")
        : photo.location;
      return m("td", location || "—");
    },
  };
}

function Rating() {
  return {
    view(vnode: m.Vnode<PhotoComponentAttrs>) {
      const { photo } = vnode.attrs;
      return m("td", photo.rating || "—");
    },
  };
}

function Style() {
  return {
    view(vnode: m.Vnode<PhotoComponentAttrs>) {
      const { photo } = vnode.attrs;
      return m("td", photo.style || "—");
    },
  };
}

type PhotoInfoAttrs = {
  photo: PhotoType;
};

export function PhotoInfo() {
  return {
    view(vnode: m.Vnode<PhotoInfoAttrs>) {
      const { photo } = vnode.attrs;

      const infoItems = [
        m("tr", [
          m(Heading, { text: "Description" }),
          m(Description, { photo }),
        ]),
        m("tr", [
          m(Heading, { text: "Location" }),
          m(Location, { photo }),
        ]),
        m("tr", [
          m(Heading, { text: "Rating" }),
          m(Rating, { photo }),
        ]),
        m("tr", [
          m(Heading, { text: "Style" }),
          m(Style, { photo }),
        ]),
      ];

      return m("table.metadata-table", infoItems);
    },
  };
}
