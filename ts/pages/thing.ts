import m from "mithril";
import { ThingTitle } from "../components/thing-title.ts";
import { asUrn, TripleObject } from "@rgrannell1/tribbledb";
import { ExternalLink } from "../components/external-link.ts";
import { arrayify, one } from "../arrays.ts";
import { Strings } from "../strings.ts";
import { Services } from "../types.ts";
import { LocationLink } from "../components/place-links.ts";

type ThingPageAttrs = {
  urn: string;
  things: TripleObject[];
  services: Services;
};

function ThingPlaces() {
  return {
    view() {
    },
  };
}

function ThingTypeLink() {
  return {
    view() {
    },
  };
}

/*
 * Links to external sites about the thing
 *
 */
function ThingUrls() {
  return {
    view(vnode: m.Vnode<ThingPageAttrs>) {
      const { things } = vnode.attrs;

      if (things.length !== 1) {
        return m("ul");
      }

      const [thing] = things;
      const $links = [];

      const wikipedia = one(thing.wikipedia);
      if (wikipedia) {
        $links.push(m(ExternalLink, { href: wikipedia, text: "[wikipedia]" }));
      }

      const birdwatch = one(thing.birdwatchUrl);
      if (birdwatch) {
        $links.push(m(ExternalLink, { href: birdwatch, text: "[birdwatch]" }));
      }

      return m("ul", $links);
    },
  };
}

function ThingMetadata() {
  const metadata: Record<string, any> = {};

  return {
    oninit(vnode: m.Vnode<ThingPageAttrs>) {
      const { urn, things, services } = vnode.attrs;
      const parsed = asUrn(urn);

      metadata.Classification = m('a', {
        href: `#/listing/${parsed.type}`,
      }, Strings.capitalise(parsed.type));

      const places = new Set(things.flatMap(thing => {
        return arrayify(thing.in);
      }));

      if (places.size > 0) {
        const locations = services.readParsedLocations(places);

        metadata['Located In'] = m("ul", locations.map(location => {
          return m(LocationLink, { location, mode: 'name' })
        }));
      }

    },
    view(vnode: m.Vnode<ThingPageAttrs>) {
      const { urn, things } = vnode.attrs;

      const $rows = Object.entries(metadata).map(([key, value]) => {
        return m("tr", [
          m("th.exif-heading", key),
          m("td", value),
        ])
      });

      return m("div", [
        m("h3", "Details"),
        m("table.metadata-table", $rows),
      ]);
    },
  };
}

function AlbumSection() {
}

function PhotoSection() {
}

export function ThingPage() {
  return {
    view(vnode: m.Vnode<ThingPageAttrs>) {
      const { urn, things, services } = vnode.attrs;

      return m("div", [
        m("section.thing-page", [
          m(ThingTitle, { urn, things }),
          m("br"),
          m(ThingUrls, { urn, things, services }),
          m(ThingMetadata, { urn, things, services }),
        ]),
      ]);
    },
  };
}
