/* One year of albums: a heading, an optional recap, then album cards. */

import m from "mithril";
import type { Album, Country } from "../../types/domain.ts";
import { YearRecap } from "./year-recap.ts";
import { AlbumCard, type AlbumCardAttrs } from "./cards/album-card.ts";
import { loadingMode } from "../../services/rendering/year-scroll/photos.ts";
import { BEFORE_TIMES_FINAL_YEAR } from "../../constants/display.ts";
import { ALBUM_YEAR_HEADING_ID_PREFIX } from "../../constants/selectors.ts";
import { fromNullable, isSome, type Maybe } from "../../commons/collections/maybe.ts";

export type AlbumYearGroupAttrs = {
  year: number;
  // year heading shows for past years only. The current year runs headerless
  showHeading: boolean;
  // markdown recap, only on the unfiltered album view with a heading
  recap: Maybe<string>;
  albums: Album[];
  readAlbumCountries: (album: Album) => Country[];
  // the first album's position in the full album list, for the loading mode
  startIdx: number;
};

function yearHeadingClass(year: number): string | undefined {
  return year <= BEFORE_TIMES_FINAL_YEAR ? "before-times" : undefined;
}

function drawYearHeading(year: number, showHeading: boolean): m.Children {
  if (!showHeading) {
    return m.fragment({ key: `year-${year}` }, []);
  }
  const headingAttrs = {
    key: `year-${year}`,
    id: `${ALBUM_YEAR_HEADING_ID_PREFIX}${year}`,
    class: yearHeadingClass(year),
  };
  return m("h2.year-heading", headingAttrs, year.toString());
}

function drawYearRecap(
  year: number,
  recap: Maybe<string>,
  showHeading: boolean,
): m.Children {
  const hasRecap = showHeading && isSome(recap);
  if (!hasRecap) {
    return m.fragment({ key: `year-recap-${year}` }, []);
  }
  const recapAttrs = { key: `year-recap-${year}`, markdown: recap };
  return m(YearRecap, recapAttrs);
}

function albumContainerAttrs(album: Album): m.Attributes {
  return {
    "data-testid": "album-row",
    "data-album-title": album.name,
  };
}

function albumCardAttrs(
  attrs: AlbumYearGroupAttrs,
  album: Album,
  albumIdx: number,
): AlbumCardAttrs & m.Attributes {
  const loadingIdx = attrs.startIdx + albumIdx;
  return {
    key: `album-${album.id}`,
    album,
    countries: attrs.readAlbumCountries(album),
    loading: loadingMode(loadingIdx),
    trip: fromNullable(album.trip),
    containerAttrs: albumContainerAttrs(album),
  };
}

function drawAlbumCard(
  attrs: AlbumYearGroupAttrs,
  album: Album,
  albumIdx: number,
): m.Children {
  const cardAttrs = albumCardAttrs(attrs, album, albumIdx);
  return m(AlbumCard, cardAttrs);
}

function viewAlbumYearGroup(
  vnode: m.Vnode<AlbumYearGroupAttrs>,
): m.Children {
  const { year, showHeading, recap, albums } = vnode.attrs;
  const components = [
    drawYearHeading(year, showHeading),
    drawYearRecap(year, recap, showHeading),
  ];
  for (const [albumIdx, album] of albums.entries()) {
    components.push(drawAlbumCard(vnode.attrs, album, albumIdx));
  }
  return components;
}

export function AlbumYearGroup() {
  return { view: viewAlbumYearGroup };
}
