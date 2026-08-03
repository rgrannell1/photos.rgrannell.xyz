import m from "mithril";
import { asUrn } from "@rgrannell1/tribbledb";
import { AlbumBanner } from "../album/album-banner.ts";
import { AlbumShareButton } from "../album/album-share-button.ts";
import { AlbumStats } from "../album/album-stats.ts";
import { YearRecap } from "../album/year-recap.ts";
import type { Album, Services } from "../../types.ts";
import { encodeBitmapDataURL, loadingMode } from "../../services/photos.ts";
import { AlbumCard } from "../album/album-card.ts";
import { setTitle, sharePhotoUrl } from "../../services/window.ts";
import { broadcast } from "../../commons/events.ts";
import { albumYear } from "../../services/albums.ts";
import { setify } from "../../commons/sets.ts";
import { CountryFilter } from "../album/country-filter.ts";
import {
  ALBUMS_BANNER_MOSAIC,
  ALBUMS_BANNER_URL,
  BANNER_MOSAIC_DIMENSION,
} from "../../constants/banners.ts";
import {
  type BatchRenderer,
  createBatchRenderer,
} from "../media/batch-render.ts";
import { BEFORE_TIMES_FINAL_YEAR } from "../../constants/display.ts";
import { RENDER_BATCH_SIZE } from "../../constants/layout.ts";

type AlbumsListAttrs = {
  albums: Album[];
  services: Services;
  visible: boolean;
  selectedCountry: string | undefined;
  selectedTrip: string | undefined;
};

type YearGroup = {
  year: number;
  // year heading shown for past years only; the current year runs headerless
  showHeading: boolean;
  // markdown recap, only on the unfiltered album view with a heading
  recap: string | undefined;
  albums: Album[];
};

/*
 * Pure transform: split a date-sorted album list into consecutive year runs,
 * each annotated with its heading and recap.
 */
function groupAlbumsByYear(
  albums: Album[],
  services: Services,
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
      ? services.readYearRecap(year)
      : undefined;
    groups.push({ year, showHeading, recap, albums: [album] });
  }

  return groups;
}

/*
 * Render one year group: optional heading and recap, then the album cards.
 * startIdx is the album's position in the full list, for the loading mode.
 */
function drawYearGroup(
  group: YearGroup,
  services: Services,
  startIdx: number,
): m.Children[] {
  const $components: m.Children[] = [];

  if (group.showHeading) {
    $components.push(m(
      "h2.album-year-heading",
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
        countries: services.readCountries(setify(album.country)),
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
  const { albums, services, selectedCountry, selectedTrip } = vnode.attrs;

  const showRecap = selectedCountry === undefined &&
    selectedTrip === undefined;

  const groups = groupAlbumsByYear(
    albums.slice(0, batch.count()),
    services,
    showRecap,
    new Date().getFullYear(),
  );

  const $albumComponents: m.Children[] = [];
  let startIdx = 0;

  for (const group of groups) {
    $albumComponents.push(...drawYearGroup(group, services, startIdx));
    startIdx += group.albums.length;
  }

  return m("section.album-container", $albumComponents);
}

/*
 * Construct a list of albums
 */
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
  services: Services;
  visible: boolean;
  selectedCountry: string | undefined;
  selectedTrip: string | undefined;
};

// px below the viewport top at which a year heading becomes the "current" year
const YEAR_SCROLL_OFFSET = 140;

/*
 * The year whose heading currently sits at the top of the viewport, or null
 * (e.g. while the banner is still in view). Headings are in document order
 * (newest year first), so the last one above the offset wins.
 */
function currentYearInView(): string | null {
  const headings = Array.from(
    document.querySelectorAll<HTMLElement>(".album-year-heading"),
  );

  let current: string | null = null;
  for (const heading of headings) {
    if (heading.getBoundingClientRect().top > YEAR_SCROLL_OFFSET) {
      break;
    }
    current = heading.textContent?.trim() ?? null;
  }
  return current;
}

/*
 * Reflect the year in the URL as a `year` param without triggering a re-render.
 * replaceState (rather than m.route.set) keeps the router's route and the scroll
 * position intact while making the URL shareable/bookmarkable to a year.
 */
function reflectYearInUrl(year: string): void {
  const base = m.route.get().split("?")[0];
  history.replaceState(history.state, "", `#!${base}?year=${year}`);
}

// max correction passes for a deep-link scroll while lazy images settle
const YEAR_SCROLL_MAX_PASSES = 20;

/*
 * Keep the year heading at the top while album images above it load and grow
 * the layout — re-scroll until the required scroll position stops changing, or
 * we hit the pass cap. A missing heading retries within the same cap, since
 * batched rendering may not have reached that year yet.
 */
function settleYearScroll(
  year: string,
  spy: { passes: number; previousY: number },
): void {
  const heading = document.getElementById(`year-${year}`);
  if (!heading) {
    spy.passes += 1;
    if (spy.passes < YEAR_SCROLL_MAX_PASSES) {
      setTimeout(settleYearScroll.bind(null, year, spy), 120);
    }
    return;
  }

  heading.scrollIntoView();
  spy.passes += 1;

  if (window.scrollY !== spy.previousY && spy.passes < YEAR_SCROLL_MAX_PASSES) {
    spy.previousY = window.scrollY;
    setTimeout(settleYearScroll.bind(null, year, spy), 120);
  }
}

/* Scroll a year's heading to the top, for an initial ?year= deep link. */
function scrollToYear(year: string): void {
  settleYearScroll(year, { passes: 0, previousY: -1 });
}

type AlbumsPageState = {
  // pending requestAnimationFrame id for scroll tracking, or null when idle
  scrollFrame: number | null;
  // year most recently written to the URL, to avoid redundant replaceState calls
  reflectedYear: string | null;
};

/* Reflect the year at the top of the viewport into the URL, once per frame. */
function reflectCurrentYear(pageState: AlbumsPageState): void {
  pageState.scrollFrame = null;
  const year = currentYearInView();
  if (year && year !== pageState.reflectedYear) {
    pageState.reflectedYear = year;
    reflectYearInUrl(year);
  }
}

function trackScroll(pageState: AlbumsPageState): void {
  if (pageState.scrollFrame !== null) {
    return;
  }
  pageState.scrollFrame = requestAnimationFrame(
    reflectCurrentYear.bind(null, pageState),
  );
}

function initAlbumsPage(): void {
  setTitle("Albums - photos");
}

function mountAlbumsPage(onScroll: () => void): void {
  const initialYear = m.route.param("year");
  if (initialYear) {
    requestAnimationFrame(scrollToYear.bind(null, initialYear));
  }
  window.addEventListener("scroll", onScroll, { passive: true });
}

function unmountAlbumsPage(
  pageState: AlbumsPageState,
  onScroll: () => void,
): void {
  window.removeEventListener("scroll", onScroll);
  if (pageState.scrollFrame !== null) {
    cancelAnimationFrame(pageState.scrollFrame);
  }
}

function selectCountry(slug: string | undefined): void {
  broadcast("navigate", { route: slug ? `/albums/${slug}` : "/albums" });
}

function viewAlbumsPage(vnode: m.Vnode<AlbumsPageAttrs>): m.Children {
  const { albums, services, visible, selectedCountry, selectedTrip } =
    vnode.attrs;

  const tripName = selectedTrip
    ? services.readTripName(selectedTrip) ?? "Trip"
    : undefined;

  const $tripShare = selectedTrip
    ? m("section.trip-share", [
      m("h2.trip-title", tripName),
      m(AlbumShareButton, {
        url: sharePhotoUrl(`trip/${asUrn(selectedTrip).id}`),
        name: tripName as string,
      }),
    ])
    : null;

  const $md = m("section.album-metadata", [
    m(AlbumStats),
    m(CountryFilter, {
      services,
      selectedCountry,
      onSelect: selectCountry,
    }),
    $tripShare,
  ]);

  const bannerSrc = ALBUMS_BANNER_URL;
  const bannerDataUrl = encodeBitmapDataURL(
    ALBUMS_BANNER_MOSAIC,
    BANNER_MOSAIC_DIMENSION,
    BANNER_MOSAIC_DIMENSION,
  );

  return m("main", {
    class: visible ? "page sidebar-visible" : "page",
  }, [
    m(AlbumBanner, {
      src: bannerSrc,
      alt: "Albums",
      thumbnailDataUrl: bannerDataUrl,
    }),
    $md,
    m(AlbumsList, { albums, services, visible, selectedCountry, selectedTrip }),
  ]);
}

/* */
export function AlbumsPage() {
  const pageState: AlbumsPageState = {
    scrollFrame: null,
    reflectedYear: null,
  };
  const onScroll = trackScroll.bind(null, pageState);

  return {
    oninit: initAlbumsPage,
    oncreate: mountAlbumsPage.bind(null, onScroll),
    onremove: unmountAlbumsPage.bind(null, pageState, onScroll),
    view: viewAlbumsPage,
  };
}
