import m from "mithril";
import { KnownTypes, NonListableTypes } from "../constants.ts";
import { capitalise, pluralise } from "../commons/strings.ts";
import { asUrn, type TripleObject } from "@rgrannell1/tribbledb";
import { broadcast, navigate } from "../commons/events.ts";
import type { Services } from "../types.ts";
import { PhotoAlbum } from "../components/photo-album.ts";
import { encodeBitmapDataURL, loadingMode } from "../services/photos.ts";
import { one } from "../commons/arrays.ts";
import { ThingMetadata } from "../components/thing-metadata.ts";

/*
 * Derive an optional inline badge for the listing card title.
 * Irish birds (those with a birdwatch URL) get the Ireland flag.
 */
function listingTitleExtra(thing: TripleObject, listingType: string): string | undefined {
  if (listingType === KnownTypes.BIRD && thing.birdwatchUrl) {
    return "🇮🇪";
  }
  return undefined;
}

/*
 * Draw an album for a single thing
 */
function drawThingAlbum(
  services: Services,
  thing: TripleObject,
  listingType: string,
  idx: number,
) {
  const id = one(thing.id);

  if (!id) {
    return [];
  }

  const coverPhoto = services.readThingCover(id);
  if (!coverPhoto) {
    return [];
  }

  const { id: thingId, type } = asUrn(id);

  return [m(PhotoAlbum, {
    imageUrl: coverPhoto.fullImage,
    thumbnailUrl: coverPhoto.thumbnailUrl,
    thumbnailDataUrl: encodeBitmapDataURL(coverPhoto?.mosaicColours),
    loading: loadingMode(idx),
    trip: undefined,
    child: m(ThingMetadata, { thing, titleExtra: listingTitleExtra(thing, listingType) }),
    onclick: navigate(`/thing/${type}:${thingId}`),
  })];
}

type AlbumsListAttrs = { services: Services; things: TripleObject[]; listingType: string };

const BATCH_SIZE = 10;

/*
 * Display the component albums incrementally to avoid blocking the DOM.
 * The first batch renders synchronously; subsequent batches are scheduled
 * via setTimeout so the browser can paint between each one.
 */
function AlbumsList() {
  let rendered = BATCH_SIZE;
  let batchScheduled = false;

  function scheduleBatch(total: number) {
    if (rendered >= total || batchScheduled) return;
    batchScheduled = true;
    setTimeout(() => {
      rendered = Math.min(rendered + BATCH_SIZE, total);
      batchScheduled = false;
      m.redraw();
    }, 1);
  }

  return {
    onbeforeupdate(vnode: m.Vnode<AlbumsListAttrs>, old: m.VnodeDOM<AlbumsListAttrs>) {
      if (vnode.attrs.listingType !== old.attrs.listingType) {
        rendered = BATCH_SIZE;
      }
    },
    oncreate(vnode: m.VnodeDOM<AlbumsListAttrs>) {
      scheduleBatch(vnode.attrs.things.length);
    },
    onupdate(vnode: m.VnodeDOM<AlbumsListAttrs>) {
      scheduleBatch(vnode.attrs.things.length);
    },
    view(vnode: m.Vnode<AlbumsListAttrs>) {
      const { services, things, listingType } = vnode.attrs;
      return m("section.album-container",
        things.slice(0, rendered).flatMap((thing, idx) => drawThingAlbum(services, thing, listingType, idx))
      );
    },
  };
}

/*
 * Bird-specific listing details: species counts broken down by wild/total and Irish wild.
 * The Ireland flag is clickable to toggle filtering to Irish species only.
 */
function BirdListingDetails() {
  return {
    view(vnode: m.Vnode<{ services: Services; filter: string | undefined; onToggleIreland: () => void }>) {
      const { services, filter, onToggleIreland } = vnode.attrs;
      const { wildSpecies, totalSpecies, irishWildSpecies } = services.readBirdStats();
      const irelandActive = filter === "ireland";

      return m("p.listing-details",
        m("span.listing-filter-flag", {
          title: "Filter to Irish species",
          class: irelandActive ? "listing-filter-flag--selected" : undefined,
          onclick: onToggleIreland,
        }, "🇮🇪"),
        ` ${irishWildSpecies} species · 🗺️ ${totalSpecies} species, ${wildSpecies} wild`,
      );
    },
  };
}

/*
 * Mammal-specific listing details: species counts broken down by wild/total and Irish wild
 */
function MammalListingDetails() {
  return {
    view(vnode: m.Vnode<{ services: Services }>) {
      const { services } = vnode.attrs;
      const { wildSpecies, totalSpecies, irishWildSpecies } = services.readMammalStats();

      return m("p.listing-details",
        `🇮🇪 ${irishWildSpecies} species · 🗺️ ${totalSpecies} species, ${wildSpecies} wild`,
      );
    },
  };
}

/*
 * Display type-specific detail content beneath the listing title
 */
function ListingDetails() {
  return {
    view(vnode: m.Vnode<{ type: string; services: Services; filter: string | undefined; onToggleIreland: () => void }>) {
      const { type, services, filter, onToggleIreland } = vnode.attrs;

      if (type === KnownTypes.BIRD) {
        return m(BirdListingDetails, { services, filter, onToggleIreland });
      }

      if (type === KnownTypes.MAMMAL) {
        return m(MammalListingDetails, { services });
      }

      return null;
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
  visible: boolean;
  filter: string | undefined;
};

/*
 * Render the listing page. It shows
 * each member of a category (e.g countries)
 */
export function ListingPage() {
  return {
    view(vnode: m.Vnode<ListingPageAttrs>) {
      const { type, things, services, visible, filter } = vnode.attrs;

      const onToggleIreland = () => {
        const isActive = filter === "ireland";
        broadcast("navigate", { route: isActive ? `/listing/${type}` : `/listing/${type}/ireland` });
      };

      const displayThings = (type === KnownTypes.BIRD && filter === "ireland")
        ? things.filter((thing) => thing.birdwatchUrl)
        : things;

      const $md = [
        m(ListingTitle, { type }),
        m(ListingDetails, { type, services, filter, onToggleIreland }),
      ];

      if (!NonListableTypes.has(type)) {
        $md.push(
          m("section.album-metadata", [
            m(ListingThingsButton, { type }),
          ]),
        );
      }

      return m("div", {
        class: visible ? "page sidebar-visible" : "page",
      }, [
        m("section.album-metadata", $md),
        m(AlbumsList, { services, things: displayThings, listingType: type }),
      ]);
    },
  };
}
