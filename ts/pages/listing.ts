import m from "mithril";
import { NonListableTypes } from "../constants.ts";
import { capitalise, pluralise } from "../commons/strings.ts";
import { asUrn, type TripleObject } from "@rgrannell1/tribbledb";
import { navigate } from "../commons/events.ts";
import type { Services } from "../types.ts";
import { PhotoAlbum } from "../components/photo-album.ts";
import { encodeBitmapDataURL, loadingMode } from "../services/photos.ts";
import { one } from "../commons/arrays.ts";
import { ThingMetadata } from "../components/thing-metadata.ts";

/*
 * Draw an album for a single thing
 */
function drawThingAlbum(services: Services, thing: TripleObject, idx: number) {
  const id = one(thing.id);

  if (!id) {
    return [];
  }

  const coverPhoto = services.readThingCover(id);
  if (!coverPhoto) {
    return [];
  }

  const $md = m(ThingMetadata, { thing });

  const { id: thingId, type } = asUrn(id);

  // Placeholder implementation
  return [m(PhotoAlbum, {
    imageUrl: coverPhoto.fullImage,
    thumbnailUrl: coverPhoto.thumbnailUrl,
    thumbnailDataUrl: encodeBitmapDataURL(coverPhoto?.mosaicColours),
    loading: loadingMode(idx),
    trip: undefined,
    child: $md,
    onclick: navigate(`/thing/${type}:${thingId}`),
  })];
}

/*
 * Display the component albums and metadata
 * in the listing page
 */
function AlbumsList() {
  return {
    view(vnode: m.Vnode<{ services: Services; things: TripleObject[] }>) {
      const { services, things } = vnode.attrs;

      const $albumComponents = things.flatMap((thing, idx) => {
        console.log("Drawing album for thing:", thing);
        return drawThingAlbum(services, thing, idx);
      });

      return m("section.album-container", $albumComponents);
    },
  };
}

/*
 * Display a pluralised title for the listing page,
 * e.g "Countries"
 */
function ListingTitle() {
  return {
    view(vnode: m.Vnode<{ type: string }>) {
      const { type } = vnode.attrs;
      return m(
        "h1.albums-header",
        `${capitalise(pluralise(type))}`,
      );
    },
  };
}

/*
 * Link to the things page for this type (wildcard)
 */
function ListingThingsButton() {
  return {
    view(vnode: m.Vnode<{ type: string }>) {
      const { type } = vnode.attrs;
      return m("a", {
        href: `#/thing/${type}:*`,
        onclick: navigate(`/thing/${type}:*`),
      }, `See all ${type} photos`);
    },
  };
}

type ListingPageAttrs = {
  type: string;
  things: TripleObject[];
  services: Services;
};

/*
 * Render the listing page. It shows
 * each member of a category (e.g countries)
 */
export function ListingPage() {
  return {
    view(vnode: m.Vnode<ListingPageAttrs>) {
      const { type, things, services } = vnode.attrs;

      const $md = [
        m(ListingTitle, { type }),
      ];

      if (!NonListableTypes.has(type)) {
        $md.push(
          m("section.album-metadata", [
            m(ListingThingsButton, { type }),
          ]),
        );
      }

      return m("div.page", [
        m("section.album-metadata", $md),
        m(AlbumsList, { services, things }),
      ]);
    },
  };
}
