import m from "mithril";
import { ThingSubtitle, ThingTitle } from "../components/thing-title.ts";
import { asUrn } from "@rgrannell1/tribbledb";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { ExternalLink } from "../components/external-link.ts";
import { arrayify, one } from "../commons/arrays.ts";
import type { Album, Services } from "../types.ts";
import { CountryLink } from "../components/place-links.ts";
import { Photo } from "../components/photo.ts";
import { Photos } from "../services/photos.ts";
import { PhotoAlbumMetadata } from "../components/photo-album-metadata.ts";
import { PhotoAlbum } from "../components/photo-album.ts";
import { block, broadcast } from "../commons/events.ts";
import { PlacesList } from "../components/places-list.ts";
import { setify, setOf } from "../commons/sets.ts";
import { KnownRelations } from "../constants.ts";
import { ListingLink } from "../components/listing-link.ts";
import { FeaturesList } from "../components/features-list.ts";
import { UnescoList } from "../components/unesco-list.ts";

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

      metadata.Classification = m(ListingLink, { urn });

      const locatedIn = setOf<string>(KnownRelations.IN, things);

      if (locatedIn.size > 0) {
        metadata["Located In"] = m(PlacesList, { services, urns: locatedIn });
      }

      if (things.length !== 1) {
        return;
      }

      const [thing] = things;
      // The non-wildcard case

      if (thing.features) {
        metadata["Place Type"] = m(FeaturesList, {
          urns: setify(thing.features),
          services,
        });
      }

      if (thing.contains) {
        metadata["Contains"] = m(PlacesList, {
          services,
          urns: setify(thing.contains),
        });
      }

      if (thing.unescoId) {
        metadata["UNESCO"] = m(UnescoList, {
          urns: new Set(arrayify(thing.unescoId)),
          services,
        });
      }

      // TODO add `seen in`, first photographed

      // convert the metadaTa to a table

      const $rows = Object.entries(metadata).map(([key, value]) => {
        return m("tr", [
          m("th.exif-heading", key),
          m("td", value),
        ]);
      });

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

      const urns = setOf<string>("id", things);
      const albums = services.readAlbumsByThingIds(new Set(urns));

      // Broken, with odd mithril child-element issue
      const $albums = albums.map((album) => {
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
          trip: undefined,
          child: m("p"),
        });

        return m(
          "div",
          $album,
          $md,
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

      const urns = setOf<string>("id", things);
      const photos = services.readPhotosByThingIds(urns);

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
          m(AlbumSection, { urn, things, services }),
        ]),
      ]);
    },
  };
}
