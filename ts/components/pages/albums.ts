import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import { AlbumBanner } from "../album/album-banner.ts";
import { ShareButton } from "../share-button.ts";
import { AlbumStats } from "../album/album-stats.ts";
import { YearRecap } from "../album/year-recap.ts";
import type { Album, Country } from "../../types.ts";
import { thumbHashDataUrl, loadingMode } from "../../services/photos.ts";
import { AlbumCard } from "../album/album-card.ts";
import { setTitle, sharePhotoUrl } from "../../services/window.ts";
import { mountYearScroll } from "../../services/year-scroll.ts";
import { broadcast } from "../../commons/events.ts";
import { albumYear } from "../../services/albums.ts";
import { CountryFilter } from "../album/country-filter.ts";
import {
  ALBUMS_BANNER_MOSAIC,
  ALBUMS_BANNER_URL,
} from "../../constants/banners.ts";
import {
  type BatchRenderer,
  createBatchRenderer,
} from "../../services/batch-render.ts";
import { BEFORE_TIMES_FINAL_YEAR } from "../../constants/display.ts";
import { RENDER_BATCH_SIZE } from "../../constants/layout.ts";

type AlbumsListAttrs = {
  albums: Album[];
  readAlbumCountries: (album: Album) => Country[];
  readYearRecap: (year: number) => string | undefined;
  visible: boolean;
  selectedCountry: string | undefined;
  selectedTrip: string | undefined;
};

type YearGroup = {
  year: number;
  // year heading shows for past years only. The current year runs headerless
  showHeading: boolean;
  // markdown recap, only on the unfiltered album view with a heading
  recap: string | undefined;
  albums: Album[];
};

/*
 * Split a date-sorted album list into consecutive year runs.
 */
function groupAlbumsByYear(
  albums: Album[],
  readYearRecap: (year: number) => string | undefined,
  showRecap: boolean,
  currentYear: number,
): YearGroup[] {
  const groups: YearGroup[] = [];

  for (const album of albums) {
    const year = albumYear(album);
    const lastGroup = groups[groups.length - 1];

    if (lastGroup && lastGroup.year === year) {
      lastGroup.albums.push(album);
      continue;
    }

    const showHeading = year !== currentYear;
    const recap = showHeading && showRecap
      ? readYearRecap(year)
      : undefined;
    groups.push({ year, showHeading, recap, albums: [album] });
  }

  return groups;
}

/*
 * startIdx is the group's position in the full album list, for the loading mode.
 */
function drawYearGroup(
  group: YearGroup,
  readAlbumCountries: (album: Album) => Country[],
  startIdx: number,
): m.Children[] {
  const $components: m.Children[] = [];

  if (group.showHeading) {
    $components.push(m(
      "h2.year-heading",
      {
        key: `year-${group.year}`,
        id: `year-${group.year}`,
        class: group.year <= BEFORE_TIMES_FINAL_YEAR ? "before-times" : undefined,
      },
      group.year.toString(),
    ));

    if (group.recap) {
      $components.push(
        m(YearRecap, { key: `year-recap-${group.year}`, markdown: group.recap }),
      );
    }
  }

  for (const [albumIdx, album] of group.albums.entries()) {
    $components.push(
      m(AlbumCard, {
        key: `album-${album.id}`,
        album,
        countries: readAlbumCountries(album),
        loading: loadingMode(startIdx + albumIdx),
        trip: album.trip,
        containerAttrs: {
          "data-testid": "album-row",
          "data-album-title": album.name,
        },
      }),
    );
  }

  return $components;
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

function viewAlbumsList(
  batch: BatchRenderer,
  vnode: m.Vnode<AlbumsListAttrs>,
): m.Children {
  const { albums, readAlbumCountries, readYearRecap, selectedCountry, selectedTrip } =
    vnode.attrs;

  const showRecap = selectedCountry === undefined &&
    selectedTrip === undefined;

  const groups = groupAlbumsByYear(
    albums.slice(0, batch.count()),
    readYearRecap,
    showRecap,
    new Date().getFullYear(),
  );

  const $albumComponents: m.Children[] = [];
  let startIdx = 0;

  for (const group of groups) {
    $albumComponents.push(...drawYearGroup(group, readAlbumCountries, startIdx));
    startIdx += group.albums.length;
  }

  return m("section.album-container", $albumComponents);
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

type AlbumsPageAttrs = {
  albums: Album[];
  countries: Country[];
  readAlbumCountries: (album: Album) => Country[];
  readYearRecap: (year: number) => string | undefined;
  tripName: string | undefined;
  visible: boolean;
  selectedCountry: string | undefined;
  selectedTrip: string | undefined;
};

type AlbumsPageState = {
  // teardown for the year-scroll tracker, set on mount
  teardownYearScroll: (() => void) | null;
};

function initAlbumsPage(): void {
  setTitle("Albums - photos");
}

function mountAlbumsPage(pageState: AlbumsPageState): void {
  pageState.teardownYearScroll = mountYearScroll(m.route.param("year"));
}

function unmountAlbumsPage(pageState: AlbumsPageState): void {
  pageState.teardownYearScroll?.();
  pageState.teardownYearScroll = null;
}

function selectCountry(slug: string | undefined): void {
  broadcast("navigate", { route: slug ? `/albums/${slug}` : "/albums" });
}

function viewAlbumsPage(vnode: m.Vnode<AlbumsPageAttrs>): m.Children {
  const {
    albums,
    countries,
    readAlbumCountries,
    readYearRecap,
    tripName,
    visible,
    selectedCountry,
    selectedTrip,
  } =
    vnode.attrs;

  const $tripShare = selectedTrip
    ? m("section.trip-share", [
      m("h2.trip-title", tripName),
      m(ShareButton, {
        url: sharePhotoUrl(`trip/${asUrn(selectedTrip).id}`),
        name: tripName as string,
      }),
    ])
    : null;

  const $md = m("section.album-metadata", [
    m(AlbumStats),
    m(CountryFilter, {
      countries,
      selectedCountry,
      onSelect: selectCountry,
    }),
    $tripShare,
  ]);

  const bannerSrc = ALBUMS_BANNER_URL;
  const bannerDataUrl = thumbHashDataUrl(ALBUMS_BANNER_MOSAIC);

  return m("main", {
    class: visible ? "page sidebar-visible" : "page",
  }, [
    m(AlbumBanner, {
      src: bannerSrc,
      alt: "Albums",
      thumbnailDataUrl: bannerDataUrl,
    }),
    $md,
    m(AlbumsList, {
      albums,
      readAlbumCountries,
      readYearRecap,
      visible,
      selectedCountry,
      selectedTrip,
    }),
  ]);
}

export function AlbumsPage() {
  const pageState: AlbumsPageState = {
    teardownYearScroll: null,
  };

  return {
    oninit: initAlbumsPage,
    oncreate: mountAlbumsPage.bind(null, pageState),
    onremove: unmountAlbumsPage.bind(null, pageState),
    view: viewAlbumsPage,
  };
}
