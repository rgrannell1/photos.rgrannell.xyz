/* One year of albums: a heading, an optional recap, then album cards. */

import m from "mithril";
import type { Album, Country } from "../../types/domain.ts";
import { YearRecap } from "./year-recap.ts";
import { AlbumCard } from "./album-card.ts";
import { loadingMode } from "../../services/rendering/photos.ts";
import { BEFORE_TIMES_FINAL_YEAR } from "../../constants/display.ts";
import { ALBUM_YEAR_HEADING_ID_PREFIX } from "../../constants/selectors.ts";
import { fromNullable, isSome, type Maybe } from "../../commons/maybe.ts";

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

function drawYearHeading(year: number, showHeading: boolean): m.Children {
  if (!showHeading) {
    return null;
  }
  return m("h2.year-heading", {
    key: `year-${year}`,
    id: `${ALBUM_YEAR_HEADING_ID_PREFIX}${year}`,
    class: year <= BEFORE_TIMES_FINAL_YEAR ? "before-times" : undefined,
  }, year.toString());
}

function drawYearRecap(
  year: number,
  recap: Maybe<string>,
  showHeading: boolean,
): m.Children {
  if (!showHeading || !isSome(recap)) {
    return null;
  }
  return m(YearRecap, { key: `year-recap-${year}`, markdown: recap });
}

function drawAlbumCard(
  attrs: AlbumYearGroupAttrs,
  album: Album,
  albumIdx: number,
): m.Children {
  return m(AlbumCard, {
    key: `album-${album.id}`,
    album,
    countries: attrs.readAlbumCountries(album),
    loading: loadingMode(attrs.startIdx + albumIdx),
    trip: fromNullable(album.trip),
    containerAttrs: {
      "data-testid": "album-row",
      "data-album-title": album.name,
    },
  });
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
