/* Support albums operations. */

import m from "mithril";
import { AlbumYearGroup } from "../../album/year-group.ts";
import type { Album } from "../../../types/domain.ts";
import { setTitle } from "../../../services/browser/window.ts";
import { mountYearScroll } from "../../../services/rendering/year-scroll/year-scroll.ts";
import { setRoute } from "../../../services/browser/routes.ts";
import { albumYear } from "../../../domain/media/albums.ts";
import {
  type BatchRenderer,
  createBatchRenderer,
} from "../../../services/rendering/batch-render.ts";
import { RENDER_BATCH_SIZE } from "../../../constants/layout.ts";
import {
  fromNullable,
  isNone,
  isSome,
  type Maybe,
  NONE,
} from "../../../commons/collections/maybe.ts";
import type { AlbumsListAttrs, AlbumsPageState, YearGroup } from "./albums.ts";

/**
 * Split a date-sorted album list into consecutive year runs.
 */
export function groupAlbumsByYear(
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
    const recap = showsRecap ? readYearRecap(year) : NONE;
    groups.push({ year, showHeading, recap, albums: [album] });
  }

  return groups;
}

/** Schedules the next album batch against the filtered album count. */
export function scheduleListBatch(
  batch: BatchRenderer,
  vnode: m.VnodeDOM<AlbumsListAttrs>,
): void {
  batch.schedule(vnode.attrs.albums.length);
}

/** Restarts batch rendering after either album filter changes. */
export function resetListBatchOnFilterChange(
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

/** Reads the visible year groups and omits recaps from filtered views. */
export function readVisibleAlbumGroups(
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

/** Renders visible album groups while preserving their global positions. */
export function viewAlbumsList(
  batch: BatchRenderer,
  vnode: m.Vnode<AlbumsListAttrs>,
): m.Children {
  const groups = readVisibleAlbumGroups(batch, vnode.attrs);
  const albumComponents: m.Children[] = [];
  let startIdx = 0;
  for (const group of groups) {
    const $yearGroup = m(AlbumYearGroup, {
      key: `year-group-${group.year}`,
      ...group,
      readAlbumCountries: vnode.attrs.readAlbumCountries,
      startIdx,
    });
    albumComponents.push($yearGroup);
    startIdx += group.albums.length;
  }
  return m("section.album-container", albumComponents);
}

/** Creates an album list with progressive batch rendering. */
export function AlbumsList() {
  const batch = createBatchRenderer(RENDER_BATCH_SIZE);

  return {
    oncreate: scheduleListBatch.bind(null, batch),
    onbeforeupdate: resetListBatchOnFilterChange.bind(null, batch),
    onupdate: scheduleListBatch.bind(null, batch),
    view: viewAlbumsList.bind(null, batch),
  };
}

/** Sets the browser title for the albums page. */
export function initAlbumsPage(): void {
  setTitle("Albums - photos");
}

/** Starts year-based scrolling and stores its teardown callback. */
export function mountAlbumsPage(pageState: AlbumsPageState): void {
  pageState.teardownYearScroll = mountYearScroll(
    fromNullable(m.route.param("year")),
  );
}

/** Stops year-based scrolling when it is active. */
export function unmountAlbumsPage(pageState: AlbumsPageState): void {
  if (isSome(pageState.teardownYearScroll)) {
    pageState.teardownYearScroll();
  }
  pageState.teardownYearScroll = NONE;
}

/** Navigates to the albums route for the selected country. */
export function selectCountry(slug: Maybe<string>): void {
  const route = isSome(slug) ? `/albums/${slug}` : "/albums";
  setRoute(route);
}
