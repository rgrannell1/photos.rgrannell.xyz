import m from "mithril";
import { ThingSubtitle, ThingTitle } from "../components/thing-title.ts";
import { asUrn } from "@rgrannell1/tribbledb";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { ExternalLink } from "../components/external-link.ts";
import { arrayify, one } from "../commons/arrays.ts";
import { Strings } from "../commons/strings.ts";
import type { Album, Services } from "../types.ts";
import { CountryLink } from "../components/place-links.ts";
import { ThingLink } from "../components/thing-link.ts";
import { UnescoLink } from "../components/unesco-link.ts";
import { Photo } from "../components/photo.ts";
import { Photos } from "../services/photos.ts";
import { PhotoAlbumMetadata } from "../components/photo-album-metadata.ts";
import { PhotoAlbum } from "../components/photo-album.ts";
import { block, broadcast } from "../commons/events.ts";
import { PlacesList } from "../components/places-list.ts";
import { setify } from "../commons/sets.ts";

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
        $links.push(
          m("li", m(ExternalLink, { href: wikipedia, text: "[wikipedia]" })),
        );
      }

      const birdwatch = one(thing.birdwatchUrl);
      if (birdwatch) {
        $links.push(
          m("li", m(ExternalLink, { href: birdwatch, text: "[birdwatch]" })),
        );
      }

      // -- add google maps URL
      return m("ul.link-list", $links);
    },
  };
}

function ThingMetadata() {

  return {
    view(vnode: m.Vnode<ThingPageAttrs>) {
      const metadata: Record<string, m.Children> = {};
      const { urn, things, services } = vnode.attrs;
      const parsed = asUrn(urn);

      // -- add the thing type
      metadata.Classification = m("a", {
        href: `#/listing/${parsed.type}`,
      }, Strings.capitalise(parsed.type));

      // -- add the location of the thing
      const locatedIn = things.flatMap((thing) => arrayify(thing.in));
      if (locatedIn.length > 0) {
        metadata['Located In'] = m(PlacesList, {
          services,
          urns: setify(locatedIn)
        })
      }

      if (things.length !== 1) {
        return;
      }

      const [thing] = things;

      // -- add feature information
      const features = services.readParsedFeatures(setify(thing.feature));

      if (features.length > 0) {
        metadata["Place Features"] = m(
          "ul",
          features.map((feature) => {
            const urn = one(feature.id)!;

            return m(
              "li",
              { key: `feature-${urn}` },
              m(ThingLink, { urn, thing: feature }),
            );
          }),
        );
      }

      // add contained places (e.g for countries)
      if (thing.contains) {
        metadata['Contains'] = m(PlacesList, {
          services,
          urns: setify(thing.contains)
        })
      }

      if (thing.unescoId) {
        const unescoDetails = services.readUnesco(one(thing.unescoId)!);

        metadata['UNESCO'] = m('li',
          m(UnescoLink, { urn: thing.unescoId, thing: unescoDetails ?? {} }),
        )
      }

      const $rows = Object.entries(metadata).map(([key, value]) => {
        return m("tr", [
          m("th.exif-heading", key),
          m("td", value),
        ]);
      });

      // TODO seen in, first photographed
      return m("div", [
        m("h3", "Details"),
        m("table.metadata-table", $rows),
      ]);
    },
  };
}

function onAlbumClick(id: string, title: string, event: Event) {
  const parsed = asUrn(id);

  broadcast("navigate", { route: `/album/${parsed.id}`, title });
  block(event);
}

function AlbumSection() {
  return {
    view(vnode: m.Vnode<ThingPageAttrs>) {
      const { things, services } = vnode.attrs;

      const urns = Object.values(things).flatMap((thing) => arrayify(thing.id));
      const albums = services.readAlbumsByThingIds(new Set(urns));

      // Broken, with odd mithril child-element issue
      const $albums = albums.map((album: Album) => {
        // duplicated model. move to render(model) code
        const $countryLinks = album.countries.map((country) => {
          return m(CountryLink, {
            country,
            key: `album-country-${album.id}-${country.id}`,
            mode: "flag",
          });
        });

        const $md = m(PhotoAlbumMetadata, {
          title: album.name,
          minDate: album.minDate,
          maxDate: album.maxDate,
          count: album.photosCount,
          countryLinks: $countryLinks,
        });

        const $album = m(PhotoAlbum, {
          imageUrl: album.thumbnailUrl,
          thumbnailUrl: album.thumbnailUrl,
          thumbnailDataUrl: Photos.encodeBitmapDataURL(album.mosaicColours),
          loading: "lazy",
          minDate: album.minDate,
          onclick: onAlbumClick.bind(null, album.id, album.name),
        });

        return m(
          "div",
          { key: `album-${album.id}` },
          $album,
          $md
        );
      });

      return m(
        "section.album-container",
        $albums,
      );
    },
  };
}

function PhotoSection() {
  return {
    view(vnode: m.Vnode<ThingPageAttrs>) {
      const { things, services } = vnode.attrs;
      console.log(things)

      const urns = Object.values(things).flatMap((thing) => Array.isArray(thing.id) ? thing.id : [thing.id]);
      const photos = services.readPhotosByThingIds(new Set(urns));

      return m(
        "section.photo-container",
        photos.map((photo, idx) => {
          const loading = Photos.loadingMode(idx);

          return m(Photo, {
            key: `photo-${photo.id}`,
            photo,
            loading,
            interactive: true,
          });
        }),
      );
    },
  };
}

export function ThingPage() {
  return {
    view(vnode: m.Vnode<ThingPageAttrs>) {
      const { urn, things, services } = vnode.attrs;

      return m("div", [
        m("section.thing-page", [
          m(ThingTitle, { urn, things }),
          m(ThingSubtitle, { urn }),
          m("br"),
          m(ThingUrls, { urn, things, services }),
          m(ThingMetadata, { urn, things, services }),
          m("h3", "Photos"),
          m(PhotoSection, { urn, things, services }),
          m("h3", "Albums"),
          //m(AlbumSection, { urn, things, services }),
        ]),
      ]);
    },
  };
}
