import m from "mithril";
import { KnownTypes } from "../../constants/data.ts";
import { NonListableTypes } from "../../constants/display.ts";
import { capitalise, pluralise } from "../../commons/strings.ts";
import { asUrn, type TripleObject } from "@rgrannell1/tribbledb";
import { broadcast, navigate } from "../../commons/events.ts";
import type { Services } from "../../types.ts";
import { PhotoAlbum } from "../album/photo-album.ts";
import { encodeBitmapDataURL, loadingMode } from "../../services/photos.ts";
import { one } from "../../commons/arrays.ts";
import { ThingCaption } from "../thing/thing-caption.ts";
import {
  type BatchRenderer,
  createBatchRenderer,
} from "../../services/batch-render.ts";
import { RENDER_BATCH_SIZE } from "../../constants/layout.ts";

/*
 * Derive an optional inline badge for the listing card title.
 * Irish birds (those with a birdwatch URL) get the Ireland flag.
 */
function listingTitleExtra(
  thing: TripleObject,
  listingType: string,
): string | undefined {
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
  listingType: string,
  thing: TripleObject,
  idx: number,
): m.Children[] {
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
    key: `thing-${id}`,
    label: one(thing.name) ?? thingId,
    imageUrl: coverPhoto.fullImage,
    thumbnailUrl: coverPhoto.thumbnailUrl,
    thumbnailDataUrl: encodeBitmapDataURL(coverPhoto?.mosaicColours),
    loading: loadingMode(idx),
    trip: undefined,
    child: m(ThingCaption, {
      thing,
      titleExtra: listingTitleExtra(thing, listingType),
    }),
    onclick: navigate(`/thing/${type}:${thingId}`),
  })];
}

type AlbumsListAttrs = {
  services: Services;
  things: TripleObject[];
  listingType: string;
};

function resetListingBatchOnTypeChange(
  batch: BatchRenderer,
  vnode: m.Vnode<AlbumsListAttrs>,
  old: m.VnodeDOM<AlbumsListAttrs>,
): void {
  if (vnode.attrs.listingType !== old.attrs.listingType) {
    batch.reset();
  }
}

function scheduleListingBatch(
  batch: BatchRenderer,
  vnode: m.VnodeDOM<AlbumsListAttrs>,
): void {
  batch.schedule(vnode.attrs.things.length);
}

function viewAlbumsList(
  batch: BatchRenderer,
  vnode: m.Vnode<AlbumsListAttrs>,
): m.Children {
  const { services, things, listingType } = vnode.attrs;
  return m(
    "section.album-container",
    { "data-testid": "listing-cards" },
    things.slice(0, batch.count())
      .flatMap(drawThingAlbum.bind(null, services, listingType)),
  );
}

/*
 * Display the component albums incrementally to avoid blocking the DOM.
 * The first batch renders synchronously; subsequent batches are scheduled
 * via setTimeout so the browser can paint between each one.
 */
function AlbumsList() {
  const batch = createBatchRenderer(RENDER_BATCH_SIZE);

  return {
    onbeforeupdate: resetListingBatchOnTypeChange.bind(null, batch),
    oncreate: scheduleListingBatch.bind(null, batch),
    onupdate: scheduleListingBatch.bind(null, batch),
    view: viewAlbumsList.bind(null, batch),
  };
}

type BirdListingDetailsAttrs = {
  services: Services;
  filter: string | undefined;
  onToggleIreland: () => void;
};

function viewBirdListingDetails(
  vnode: m.Vnode<BirdListingDetailsAttrs>,
): m.Children {
  const { services, filter, onToggleIreland } = vnode.attrs;
  const { wildSpecies, totalSpecies, irishWildSpecies } = services
    .readBirdStats();
  const irelandActive = filter === "ireland";

  return m(
    "p.listing-details",
    { "data-testid": "listing-details" },
    m("span.listing-filter-flag", {
      title: "Filter to Irish species",
      class: irelandActive ? "listing-filter-flag--selected" : undefined,
      onclick: onToggleIreland,
    }, "🇮🇪"),
    ` ${irishWildSpecies} species · 🗺️ ${totalSpecies} species, ${wildSpecies} wild`,
  );
}

/*
 * Bird-specific listing details: species counts broken down by wild/total and Irish wild.
 * The Ireland flag is clickable to toggle filtering to Irish species only.
 */
function BirdListingDetails() {
  return { view: viewBirdListingDetails };
}

function viewMammalListingDetails(
  vnode: m.Vnode<{ services: Services }>,
): m.Children {
  const { services } = vnode.attrs;
  const { wildSpecies, totalSpecies, irishWildSpecies } = services
    .readMammalStats();

  return m(
    "p.listing-details",
    { "data-testid": "listing-details" },
    `🇮🇪 ${irishWildSpecies} species · 🗺️ ${totalSpecies} species, ${wildSpecies} wild`,
  );
}

/*
 * Mammal-specific listing details: species counts broken down by wild/total and Irish wild
 */
function MammalListingDetails() {
  return { view: viewMammalListingDetails };
}

type ListingDetailsAttrs = {
  type: string;
  services: Services;
  filter: string | undefined;
  onToggleIreland: () => void;
};

function viewListingDetails(
  vnode: m.Vnode<ListingDetailsAttrs>,
): m.Children {
  const { type, services, filter, onToggleIreland } = vnode.attrs;

  if (type === KnownTypes.BIRD) {
    return m(BirdListingDetails, { services, filter, onToggleIreland });
  }

  if (type === KnownTypes.MAMMAL) {
    return m(MammalListingDetails, { services });
  }

  return null;
}

/*
 * Display type-specific detail content beneath the listing title
 */
function ListingDetails() {
  return { view: viewListingDetails };
}

function viewListingTitle(vnode: m.Vnode<{ type: string }>): m.Children {
  const { type } = vnode.attrs;
  return m(
    "h1.albums-header",
    { "data-testid": "listing-title", "data-listing-type": type },
    `${capitalise(pluralise(type))}`,
  );
}

/*
 * Display a pluralised title for the listing page,
 * e.g "Countries"
 */
function ListingTitle() {
  return { view: viewListingTitle };
}

function viewListingThingsButton(vnode: m.Vnode<{ type: string }>): m.Children {
  const { type } = vnode.attrs;
  return m("a", {
    href: `#/thing/${type}:*`,
    onclick: navigate(`/thing/${type}:*`),
    "data-testid": "listing-things-link",
  }, `See all ${type} photos`);
}

/*
 * Link to the things page for this type (wildcard)
 */
function ListingThingsButton() {
  return { view: viewListingThingsButton };
}

type ListingPageAttrs = {
  type: string;
  things: TripleObject[];
  services: Services;
  visible: boolean;
  filter: string | undefined;
};

function toggleIrelandFilter(type: string, filter: string | undefined): void {
  const isActive = filter === "ireland";
  broadcast("navigate", {
    route: isActive ? `/listing/${type}` : `/listing/${type}/ireland`,
  });
}

function hasBirdwatchUrl(thing: TripleObject): boolean {
  return Boolean(thing.birdwatchUrl);
}

function viewListingPage(vnode: m.Vnode<ListingPageAttrs>): m.Children {
  const { type, things, services, visible, filter } = vnode.attrs;

  const onToggleIreland = toggleIrelandFilter.bind(null, type, filter);

  const displayThings = (type === KnownTypes.BIRD && filter === "ireland")
    ? things.filter(hasBirdwatchUrl)
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

  return m("main", {
    class: visible ? "page sidebar-visible" : "page",
  }, [
    m("section.album-metadata", $md),
    m(AlbumsList, { services, things: displayThings, listingType: type }),
  ]);
}

/*
 * Render the listing page. It shows
 * each member of a category (e.g countries)
 */
export function ListingPage() {
  return { view: viewListingPage };
}
