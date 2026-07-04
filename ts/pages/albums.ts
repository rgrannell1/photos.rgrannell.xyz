import m from "mithril";
import { AlbumBanner } from "../components/album-banner.ts";
import { AlbumStats } from "../components/album-stats.ts";
import { YearRecap } from "../components/year-recap.ts";
import type { Album, Services } from "../types.ts";
import { encodeBitmapDataURL, loadingMode } from "../services/photos.ts";
import { PhotoAlbumMetadata } from "../components/photo-album-metadata.ts";
import { PhotoAlbum } from "../components/photo-album.ts";
import { setTitle } from "../services/window.ts";
import { CountryLink } from "../components/place-links.ts";
import { block, broadcast, navigate } from "../commons/events.ts";
import { albumYear } from "../services/albums.ts";
import { asUrn } from "@rgrannell1/tribbledb";
import { setify } from "../commons/sets.ts";
import { CountryFilter } from "../components/country-filter.ts";

type AlbumsListAttrs = {
  albums: Album[];
  services: Services;
  visible: boolean;
};

function onAlbumClick(id: string, title: string, event: Event) {
  const parsed = asUrn(id);

  broadcast("navigate", { route: `/album/${parsed.id}`, title });
  block(event);
}

function drawAlbum(
  state: { year: number },
  album: Album,
  idx: number,
  services: Services,
) {
  const loading = loadingMode(idx);

  const $albumComponents: m.Children[] = [];

  // push year header if a new year
  if (state.year !== albumYear(album)) {
    state.year = albumYear(album);

    if (state.year !== new Date().getFullYear()) {
      const $h2 = m(
        "h2.album-year-heading",
        { key: `year-${state.year}`, id: `year-${state.year}` },
        state.year.toString(),
      );
      $albumComponents.push($h2);

      const recap = services.readYearRecap(state.year);
      if (recap) {
        $albumComponents.push(
          m(YearRecap, { key: `year-recap-${state.year}`, markdown: recap }),
        );
      }
    }
  }

  const $countryLinks = services.readCountries(setify(album.country)).map(
    (country) => {
      return m(CountryLink, {
        country,
        key: `album-country-${album.id}-${country.id}`,
        mode: "flag",
      });
    },
  );

  const $md = m(PhotoAlbumMetadata, {
    title: album.name,
    minDate: album.minDate,
    maxDate: album.maxDate,
    count: album.photosCount,
    countryLinks: $countryLinks,
    dateRange: album.dateRange,
    shortDateRange: album.shortDateRange,
  });

  const $album = m(PhotoAlbum, {
    trip: album.trip,
    imageUrl: album.thumbnailUrl,
    thumbnailUrl: album.thumbnailUrl,
    thumbnailDataUrl: encodeBitmapDataURL(album.mosaic),
    loading: loading,
    minDate: album.minDate,
    onclick: onAlbumClick.bind(null, album.id, album.name),
  });

  $albumComponents.push(
    m("div", {
      key: `album-${album.id}`,
      "data-testid": "album-row",
      "data-album-title": album.name,
    }, [
      $album,
      $md,
    ]),
  );

  return $albumComponents;
}

/*
 * Construct a list of albums
 */
function AlbumsList() {
  return {
    view(vnode: m.Vnode<AlbumsListAttrs>) {
      const state = { year: 2005 };
      const { albums, services } = vnode.attrs;

      const $albumComponents: m.Children[] = [];

      // TODO this blocks render too long
      for (let idx = 0; idx < albums.length; idx++) {
        $albumComponents.push(...drawAlbum(state, albums[idx], idx, services));
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
      const { albums, services, visible, selectedCountry } = vnode.attrs;

      const onSelectCountry = (slug: string | undefined) => {
        broadcast("navigate", { route: slug ? `/albums/${slug}` : "/albums" });
      };

      const $md = m("section.album-metadata", [
        m(AlbumStats),
        m(CountryFilter, {
          services,
          selectedCountry,
          onSelect: onSelectCountry,
        }),
      ]);

      // hardcoded CDN banner: the high-res `banner` rendition of photo:548d64a50a
      // (mirror BANNER_SOURCE_FILES). update by hand if the photo is re-encoded.
      const bannerSrc = "https://photos-cdn.rgrannell.xyz/d6cf0f7cc7.webp";

      return m("div", {
        class: visible ? "page sidebar-visible" : "page",
      }, [
        m(AlbumBanner, { src: bannerSrc, alt: "Albums" }),
        $md,
        //m(YearCursor),
        m(AlbumsList, { albums, services, visible }),
      ]);
    },
  };
}
