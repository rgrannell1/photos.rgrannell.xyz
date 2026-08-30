/* Support albums operations. */

import m from "mithril";
import { AlbumYearGroup } from "../../album/year-group.ts";
import type { Album } from "../../../types/domain.ts";
import { setTitle } from "../../../services/browser/window.ts";
import { mountYearScroll } from "../../../services/rendering/year-scroll/year-scroll.ts";
import { broadcast } from "../../../services/browser/events.ts";
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

/*
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

export function scheduleListBatch(
  batch: BatchRenderer,
  vnode: m.VnodeDOM<AlbumsListAttrs>,
): void {
  batch.schedule(vnode.attrs.albums.length);
}

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

export function viewAlbumsList(
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

export function AlbumsList() {
  const batch = createBatchRenderer(RENDER_BATCH_SIZE);

  return {
    oncreate: scheduleListBatch.bind(null, batch),
    onbeforeupdate: resetListBatchOnFilterChange.bind(null, batch),
    onupdate: scheduleListBatch.bind(null, batch),
    view: viewAlbumsList.bind(null, batch),
  };
}

export function initAlbumsPage(): void {
  setTitle("Albums - photos");
}

export function mountAlbumsPage(pageState: AlbumsPageState): void {
  pageState.teardownYearScroll = mountYearScroll(
    fromNullable(m.route.param("year")),
  );
}

export function unmountAlbumsPage(pageState: AlbumsPageState): void {
  if (isSome(pageState.teardownYearScroll)) {
    pageState.teardownYearScroll();
  }
  pageState.teardownYearScroll = NONE;
}

export function selectCountry(slug: Maybe<string>): void {
  const route = isSome(slug) ? `/albums/${slug}` : "/albums";
  broadcast("navigate", { route });
}
