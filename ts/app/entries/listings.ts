/* Resolve listing routes after the derived catalogue is ready. */

import m from "mithril";
import { asUrn, type TripleObject } from "@rgrannell1/tribbledb";
import { one } from "../../commons/arrays.ts";
import { capitalise, pluralise } from "../../commons/strings.ts";
import { ListingPage } from "../../components/pages/listing.ts";
import { ListingsPage } from "../../components/pages/listings.ts";
import { KnownTypes } from "../../constants/data.ts";
import { COUNTRY_LISTING_TYPE } from "../../constants/display.ts";
import type { SubjectStats } from "../../services/stats.ts";
import type { Photo } from "../../types.ts";
import { services, state } from "../context.ts";
import { pageEntry } from "../shell.ts";

const listingPageComponent = ListingPage();
const listingsPageComponent = ListingsPage();

type ListingModel = {
  things: TripleObject[];
  label: string;
  isListable: boolean;
  stats: SubjectStats | undefined;
};

const listingModels = new Map<string, ListingModel>();

type CategoryModel = {
  type: string;
  label: string;
  route: string;
  cover: Photo;
};

let categoryModels: CategoryModel[] | null = null;

function readCategoryModels(): CategoryModel[] {
  return services.readListings().flatMap((listing) => {
    const type = asUrn(listing.id as string).id;
    const cover = services.readCategoryCover(type);
    return cover
      ? [{
        type,
        label: one(listing.name) as string,
        route: `/listing/${type}`,
        cover,
      }]
      : [];
  });
}

function readListingModel(type: string): ListingModel {
  const listing = services.readThing(`urn:ró:listing:${type}`);
  const things = type === COUNTRY_LISTING_TYPE
    ? services.readAllCountryThings()
    : services.readNamedTypeThings(type);
  const stats = type === KnownTypes.BIRD
    ? services.readBirdStats()
    : type === KnownTypes.MAMMAL
    ? services.readMammalStats()
    : undefined;

  return {
    things,
    label: (one(listing?.name) as string) ?? capitalise(pluralise(type)),
    isListable: one(listing?.listable) === "true",
    stats,
  };
}

export const listingEntry = pageEntry({
  page: listingPageComponent,
  resolve() {
    if (!state.loaded) {
      return "";
    }

    const type = m.route.param("type");
    if (typeof type !== "string") {
      return "No type selected";
    }

    const filter = m.route.param("filter") as string | undefined;
    const model = listingModels.get(type) ?? readListingModel(type);
    listingModels.set(type, model);

    return {
      attrs: {
        type,
        ...model,
        readThingCover: services.readThingCover,
        visible: state.sidebarVisible,
        filter,
      },
    };
  },
});

export const listingsEntry = pageEntry({
  page: listingsPageComponent,
  resolve() {
    if (!state.loaded) {
      return "";
    }

    categoryModels ??= readCategoryModels();
    return {
      attrs: { visible: state.sidebarVisible, categories: categoryModels },
    };
  },
});
