import m from "mithril";
import type { Video as VideoType, Services } from "../types.ts";
import { arrayify } from "../commons/arrays.ts";
import { preprocessDescription } from "../commons/strings.ts";

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

type VideoComponentAttrs = {
  video: VideoType;
  services: Services;
};

/* */
function Description() {
  return {
    view(vnode: m.Vnode<VideoComponentAttrs>) {
      const { video } = vnode.attrs;

      const html = preprocessDescription(video.description ?? "");
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
    view(vnode: m.Vnode<VideoComponentAttrs>) {
      const { video, services } = vnode.attrs;

      const $locations = services.toThingLinks(arrayify(video.location));
      return m("td", $locations.length > 0 ? $locations : "—");
    },
  };
}

/* */
function Rating() {
  return {
    view(vnode: m.Vnode<VideoComponentAttrs>) {
      const { video, services } = vnode.attrs;

      const $rating = services.toThingLinks([video.rating]);
      return m("td", $rating.length > 0 ? $rating : "—");
    },
  };
}

/* */
function Style() {
  return {
    view(vnode: m.Vnode<VideoComponentAttrs>) {
      const { video, services } = vnode.attrs;

      const $style = services.toThingLinks([video.style]);
      return m("td", $style.length > 0 ? $style : "—");
    },
  };
}

/* */
function Subject() {
  return {
    view(vnode: m.Vnode<VideoComponentAttrs>) {
      const { video, services } = vnode.attrs;

      const $subject = services.toThingLinks(arrayify(video.subject));
      return m("td", $subject.length > 0 ? $subject : "—");
    },
  };
}

type VideoInfoAttrs = {
  video: VideoType;
  services: Services;
};

/* */
export function VideoInfo() {
  return {
    view(vnode: m.Vnode<VideoInfoAttrs>) {
      const { video, services } = vnode.attrs;

      const infoItems = [];

      if (video.description) {
        infoItems.push(m("tr", [
          m(Heading, { text: "Description" }),
          m(Description, { video, services }),
        ]));
      }

      infoItems.push(
        m("tr", [
          m(Heading, { text: "Location" }),
          m(Location, { video, services }),
        ]),
        m("tr", [
          m(Heading, { text: "Rating" }),
          m(Rating, { video, services }),
        ]),
        m("tr", [
          m(Heading, { text: "Style" }),
          m(Style, { video, services }),
        ]),
        m("tr", [
          m(Heading, { text: "Subject" }),
          m(Subject, { video, services }),
        ]),
      );

      return m("table.metadata-table", infoItems);
    },
  };
}
