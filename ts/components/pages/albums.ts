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
import { ALBUMS_BANNER_MOSAIC, BANNER_MOSAIC_DIMENSION } from "../../constants/banners.ts";

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
      { key: `year-${group.year}`, id: `year-${group.year}` },
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

/*
 * Construct a list of albums
 */
function AlbumsList() {
  return {
    view(vnode: m.Vnode<AlbumsListAttrs>) {
      const { albums, services, selectedCountry, selectedTrip } = vnode.attrs;

      const showRecap = selectedCountry === undefined &&
        selectedTrip === undefined;

      const groups = groupAlbumsByYear(
        albums,
        services,
        showRecap,
        new Date().getFullYear(),
      );

      const $albumComponents: m.Children[] = [];
      let startIdx = 0;

      // TODO this blocks render too long
      for (const group of groups) {
        $albumComponents.push(...drawYearGroup(group, services, startIdx));
        startIdx += group.albums.length;
      }

      return m("section.album-container", $albumComponents);
    },
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
 * we hit the pass cap. Bails if the heading is gone (navigation).
 */
function settleYearScroll(
  year: string,
  spy: { passes: number; previousY: number },
): void {
  const heading = document.getElementById(`year-${year}`);
  if (!heading) {
    return;
  }

  heading.scrollIntoView();
  spy.passes += 1;

  if (window.scrollY !== spy.previousY && spy.passes < YEAR_SCROLL_MAX_PASSES) {
    spy.previousY = window.scrollY;
    setTimeout(() => settleYearScroll(year, spy), 120);
  }
}

/* Scroll a year's heading to the top, for an initial ?year= deep link. */
function scrollToYear(year: string): void {
  settleYearScroll(year, { passes: 0, previousY: -1 });
}

/* */
export function AlbumsPage() {
  let scrollFrame: number | null = null;
  let reflectedYear: string | null = null;

  const onScroll = () => {
    if (scrollFrame !== null) {
      return;
    }
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = null;
      const year = currentYearInView();
      if (year && year !== reflectedYear) {
        reflectedYear = year;
        reflectYearInUrl(year);
      }
    });
  };

  return {
    oninit() {
      setTitle("Albums - photos");
    },
    oncreate() {
      const initialYear = m.route.param("year");
      if (initialYear) {
        requestAnimationFrame(() => scrollToYear(initialYear));
      }
      window.addEventListener("scroll", onScroll, { passive: true });
    },
    onremove() {
      window.removeEventListener("scroll", onScroll);
      if (scrollFrame !== null) {
        cancelAnimationFrame(scrollFrame);
      }
    },
    view(vnode: m.Vnode<AlbumsPageAttrs>) {
      const { albums, services, visible, selectedCountry, selectedTrip } =
        vnode.attrs;

      const onSelectCountry = (slug: string | undefined) => {
        broadcast("navigate", { route: slug ? `/albums/${slug}` : "/albums" });
      };

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
          onSelect: onSelectCountry,
        }),
        $tripShare,
      ]);

      // hardcoded CDN banner: the high-res `banner` rendition of photo:548d64a50a
      // (mirror BANNER_SOURCE_FILES). update by hand if the photo is re-encoded.
      const bannerSrc = "https://photos-cdn.rgrannell.xyz/d6cf0f7cc7.webp";
      const bannerDataUrl = encodeBitmapDataURL(
        ALBUMS_BANNER_MOSAIC,
        BANNER_MOSAIC_DIMENSION,
        BANNER_MOSAIC_DIMENSION,
      );

      return m("div", {
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
    },
  };
}
