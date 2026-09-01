/* One year of albums: a heading, an optional recap, then album cards. */

import m from "mithril";
import type { Album, Country } from "../../types/domain.ts";
import { YearRecap } from "./year-recap.ts";
import { AlbumCard, type AlbumCardAttrs } from "./cards/album-card.ts";
import { selectLoadingMode } from "../../services/rendering/year-scroll/photos.ts";
import { BEFORE_TIMES_FINAL_YEAR } from "../../constants/display.ts";
import { ALBUM_YEAR_HEADING_ID_PREFIX } from "../../constants/selectors.ts";
import {
  fromNullable,
  isSome,
  type Maybe,
} from "../../commons/collections/maybe.ts";

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

/** Mark years in the site's early-history range for distinct styling. */
function yearHeadingClass(year: number): string | undefined {
  return year <= BEFORE_TIMES_FINAL_YEAR ? "before-times" : undefined;
}

/** Draw a keyed year heading, or a keyed placeholder when hidden. */
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

/** Draw a keyed recap only when the year heading and recap both exist. */
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

/** Build test metadata for an album card container. */
function albumContainerAttrs(album: Album): m.Attributes {
  return {
    "data-testid": "album-row",
    "data-album-title": album.name,
  };
}

/** Build album card attributes with the list-relative loading mode. */
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
    loading: selectLoadingMode(loadingIdx),
    trip: fromNullable(album.trip),
    containerAttrs: albumContainerAttrs(album),
  };
}

/** Draw one album card within its year group. */
function drawAlbumCard(
  attrs: AlbumYearGroupAttrs,
  album: Album,
  albumIdx: number,
): m.Children {
  const cardAttrs = albumCardAttrs(attrs, album, albumIdx);
  return m(AlbumCard, cardAttrs);
}

/** Draw a year heading, optional recap, and its album cards. */
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

/** Create the album year group component. */
export function AlbumYearGroup(): m.Component<AlbumYearGroupAttrs> {
  return { view: viewAlbumYearGroup };
}
