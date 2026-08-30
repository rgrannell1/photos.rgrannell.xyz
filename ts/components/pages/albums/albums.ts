import type { Album, Country } from "../../../types/domain.ts";

import { type Maybe, NONE } from "../../../commons/collections/maybe.ts";
import {
  initAlbumsPage,
  mountAlbumsPage,
  unmountAlbumsPage,
} from "./grouping.ts";
import { viewAlbumsPage } from "./page.ts";

export type AlbumsListAttrs = {
  albums: Album[];
  readAlbumCountries: (album: Album) => Country[];
  readYearRecap: (year: number) => Maybe<string>;
  visible: boolean;
  selectedCountry: Maybe<string>;
  selectedTrip: Maybe<string>;
};

export type YearGroup = {
  year: number;
  // year heading shows for past years only. The current year runs headerless
  showHeading: boolean;
  // markdown recap, only on the unfiltered album view with a heading
  recap: Maybe<string>;
  albums: Album[];
};

export type AlbumsPageAttrs = {
  albums: Album[];
  countries: Country[];
  readAlbumCountries: (album: Album) => Country[];
  readYearRecap: (year: number) => Maybe<string>;
  tripName: Maybe<string>;
  visible: boolean;
  selectedCountry: Maybe<string>;
  selectedTrip: Maybe<string>;
};

export type AlbumsPageState = {
  // teardown for the year-scroll tracker, set on mount
  teardownYearScroll: Maybe<() => void>;
};

export function AlbumsPage() {
  const pageState: AlbumsPageState = {
    teardownYearScroll: NONE,
  };

  return {
    oninit: initAlbumsPage,
    oncreate: mountAlbumsPage.bind(null, pageState),
    onremove: unmountAlbumsPage.bind(null, pageState),
    view: viewAlbumsPage,
  };
}
