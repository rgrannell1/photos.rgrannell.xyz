import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import { AlbumBanner } from "../album/album-banner.ts";
import { ShareButton } from "../share-button.ts";
import { AlbumStats } from "../album/album-stats.ts";
import { AlbumYearGroup } from "../album/year-group.ts";
import type { Album, Country } from "../../types/domain.ts";
import { thumbHashDataUrl } from "../../services/rendering/photos.ts";
import { setTitle, sharePhotoUrl } from "../../services/browser/window.ts";
import { mountYearScroll } from "../../services/rendering/year-scroll.ts";
import { broadcast } from "../../services/browser/events.ts";
import { albumYear } from "../../domain/albums.ts";
import { CountryFilter } from "../album/country-filter.ts";
import {
  ALBUMS_BANNER_MOSAIC,
  ALBUMS_BANNER_URL,
} from "../../constants/banners.ts";
import {
  type BatchRenderer,
  createBatchRenderer,
} from "../../services/rendering/batch-render.ts";
import { RENDER_BATCH_SIZE } from "../../constants/layout.ts";
import {
  fromNullable,
  isNone,
  isSome,
  type Maybe,
  NONE,
  withDefault,
} from "../../commons/maybe.ts";

type AlbumsListAttrs = {
  albums: Album[];
  readAlbumCountries: (album: Album) => Country[];
  readYearRecap: (year: number) => Maybe<string>;
  visible: boolean;
  selectedCountry: Maybe<string>;
  selectedTrip: Maybe<string>;
};

type YearGroup = {
  year: number;
  // year heading shows for past years only. The current year runs headerless
  showHeading: boolean;
  // markdown recap, only on the unfiltered album view with a heading
  recap: Maybe<string>;
  albums: Album[];
};

/*
 * Split a date-sorted album list into consecutive year runs.
 */
function groupAlbumsByYear(
  albums: Album[],
  readYearRecap: (year: number) => Maybe<string>,
  showRecap: boolean,
  currentYear: number,
): YearGroup[] {
  const groups: YearGroup[] = [];

  for (const album of albums) {
    const year = albumYear(album);
    const lastGroup = groups[groups.length - 1];
    const continuesYearGroup = lastGroup?.year === year;

    if (continuesYearGroup) {
      lastGroup.albums.push(album);
      continue;
    }

    const showHeading = year !== currentYear;
    const showsRecap = showHeading && showRecap;
    const recap = showsRecap
      ? readYearRecap(year)
      : NONE;
    groups.push({ year, showHeading, recap, albums: [album] });
  }

  return groups;
}

function scheduleListBatch(
  batch: BatchRenderer,
  vnode: m.VnodeDOM<AlbumsListAttrs>,
): void {
  batch.schedule(vnode.attrs.albums.length);
}

function resetListBatchOnFilterChange(
  batch: BatchRenderer,
  vnode: m.Vnode<AlbumsListAttrs>,
  old: m.VnodeDOM<AlbumsListAttrs>,
): void {
  const filterChanged =
    vnode.attrs.selectedCountry !== old.attrs.selectedCountry ||
    vnode.attrs.selectedTrip !== old.attrs.selectedTrip;
  if (filterChanged) {
    batch.reset();
  }
}

function readVisibleAlbumGroups(
  batch: BatchRenderer,
  attrs: AlbumsListAttrs,
): YearGroup[] {
  const showRecap = isNone(attrs.selectedCountry) && isNone(attrs.selectedTrip);
  return groupAlbumsByYear(
    attrs.albums.slice(0, batch.count()),
    attrs.readYearRecap,
    showRecap,
    new Date().getFullYear(),
  );
}

function viewAlbumsList(
  batch: BatchRenderer,
  vnode: m.Vnode<AlbumsListAttrs>,
): m.Children {
  const groups = readVisibleAlbumGroups(batch, vnode.attrs);
  const albumComponents: m.Children[] = [];
  let startIdx = 0;
  for (const group of groups) {
    const yearGroup = m(AlbumYearGroup, {
      key: `year-group-${group.year}`,
      ...group,
      readAlbumCountries: vnode.attrs.readAlbumCountries,
      startIdx,
    });
    albumComponents.push(yearGroup);
    startIdx += group.albums.length;
  }
  return m("section.album-container", albumComponents);
}

function AlbumsList() {
  const batch = createBatchRenderer(RENDER_BATCH_SIZE);

  return {
    oncreate: scheduleListBatch.bind(null, batch),
    onbeforeupdate: resetListBatchOnFilterChange.bind(null, batch),
    onupdate: scheduleListBatch.bind(null, batch),
    view: viewAlbumsList.bind(null, batch),
  };
}

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

type AlbumsPageState = {
  // teardown for the year-scroll tracker, set on mount
  teardownYearScroll: Maybe<() => void>;
};

function initAlbumsPage(): void {
  setTitle("Albums - photos");
}

function mountAlbumsPage(pageState: AlbumsPageState): void {
  pageState.teardownYearScroll = mountYearScroll(
    fromNullable(m.route.param("year")),
  );
}

function unmountAlbumsPage(pageState: AlbumsPageState): void {
  if (isSome(pageState.teardownYearScroll)) {
    pageState.teardownYearScroll();
  }
  pageState.teardownYearScroll = NONE;
}

function selectCountry(slug: Maybe<string>): void {
  const route = isSome(slug) ? `/albums/${slug}` : "/albums";
  broadcast("navigate", { route });
}

function drawTripShare(attrs: AlbumsPageAttrs): m.Children {
  if (isNone(attrs.selectedTrip)) {
    return null;
  }
  const tripLabel = withDefault(attrs.tripName, "Trip");
  return m("section.trip-share", [
    m("h2.trip-title", tripLabel),
    m(ShareButton, {
      url: sharePhotoUrl(`trip/${asUrn(attrs.selectedTrip).id}`),
      name: tripLabel,
    }),
  ]);
}

function drawAlbumsMetadata(attrs: AlbumsPageAttrs): m.Children {
  return m("section.album-metadata", [
    m(AlbumStats),
    m(CountryFilter, {
      countries: attrs.countries,
      selectedCountry: attrs.selectedCountry,
      onSelect: selectCountry,
    }),
    drawTripShare(attrs),
  ]);
}

function viewAlbumsPage(vnode: m.Vnode<AlbumsPageAttrs>): m.Children {
  const { attrs } = vnode;

  return m("main", {
    class: attrs.visible ? "page sidebar-visible" : "page",
  }, [
    m(AlbumBanner, {
      src: ALBUMS_BANNER_URL,
      alt: "Albums",
      thumbnailDataUrl: thumbHashDataUrl(ALBUMS_BANNER_MOSAIC),
    }),
    drawAlbumsMetadata(attrs),
    m(AlbumsList, {
      albums: attrs.albums,
      readAlbumCountries: attrs.readAlbumCountries,
      readYearRecap: attrs.readYearRecap,
      visible: attrs.visible,
      selectedCountry: attrs.selectedCountry,
      selectedTrip: attrs.selectedTrip,
    }),
  ]);
}

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
