/* Resolve listing routes after the derived catalogue is ready. */

import m from "mithril";
import {
  fromNullable,
  isNone,
  type Maybe,
  NONE,
  withDefault,
} from "../../commons/maybe.ts";
import { asUrn, type TripleObject } from "@rgrannell1/tribbledb";
import { one } from "../../commons/arrays.ts";
import { capitalise, pluralise } from "../../commons/strings.ts";
import {
  ListingPage,
  type ListingPageAttrs,
} from "../../components/pages/listing.ts";
import { ListingsPage } from "../../components/pages/listings.ts";
import { KnownTypes } from "../../constants/data.ts";
import { COUNTRY_LISTING_TYPE } from "../../constants/display.ts";
import type { SubjectStats } from "../../domain/stats.ts";
import type { Photo } from "../../types/domain.ts";
import { services, state } from "../context.ts";
import { pageEntry } from "../shell.ts";

const listingPageComponent = ListingPage();
const listingsPageComponent = ListingsPage();

type ListingModel = {
  things: TripleObject[];
  label: string;
  isListable: boolean;
  stats: Maybe<SubjectStats>;
};

const listingModels = new Map<string, ListingModel>();

type CategoryModel = {
  type: string;
  label: string;
  route: string;
  cover: Photo;
};

let categoryModels: Maybe<CategoryModel[]> = NONE;

function readCategoryModels(): CategoryModel[] {
  return services.readListings().flatMap((listing) => {
    const id = one(listing.id);
    if (isNone(id)) {
      return [];
    }

    const type = asUrn(id).id;
    const cover = services.readCategoryCover(type);
    return isNone(cover)
      ? []
      : [{
        type,
        label: withDefault(one(listing.name), type),
        route: `/listing/${type}`,
        cover,
      }];
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
    : NONE;

  return {
    things,
    label: isNone(listing)
      ? capitalise(pluralise(type))
      : withDefault(one(listing.name), capitalise(pluralise(type))),
    isListable: !isNone(listing) && one(listing.listable) === "true",
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

    const filter = fromNullable<string>(m.route.param("filter"));
    const model = listingModels.get(type) ?? readListingModel(type);
    listingModels.set(type, model);

    const attrs: ListingPageAttrs = {
      type,
      ...model,
      readThingCover: services.readThingCover,
      visible: state.sidebarVisible,
      filter,
    };
    return { attrs };
  },
});

export const listingsEntry = pageEntry({
  page: listingsPageComponent,
  resolve() {
    if (!state.loaded) {
      return "";
    }

    if (isNone(categoryModels)) {
      categoryModels = readCategoryModels();
    }
    return {
      attrs: { visible: state.sidebarVisible, categories: categoryModels },
    };
  },
});
