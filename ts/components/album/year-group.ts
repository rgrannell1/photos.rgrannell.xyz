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

function viewAlbumYearGroup(
  vnode: m.Vnode<AlbumYearGroupAttrs>,
): m.Children {
  const { year, showHeading, recap, albums, readAlbumCountries, startIdx } =
    vnode.attrs;

  const $components: m.Children[] = [];

  if (showHeading) {
    $components.push(m(
      "h2.year-heading",
      {
        key: `year-${year}`,
        id: `${ALBUM_YEAR_HEADING_ID_PREFIX}${year}`,
        class: year <= BEFORE_TIMES_FINAL_YEAR ? "before-times" : undefined,
      },
      year.toString(),
    ));
  }

  const showsRecap = showHeading && isSome(recap);
  if (showsRecap) {
    $components.push(
      m(YearRecap, { key: `year-recap-${year}`, markdown: recap }),
    );
  }

  for (const [albumIdx, album] of albums.entries()) {
    $components.push(
      m(AlbumCard, {
        key: `album-${album.id}`,
        album,
        countries: readAlbumCountries(album),
        loading: loadingMode(startIdx + albumIdx),
        trip: fromNullable(album.trip),
        containerAttrs: {
          "data-testid": "album-row",
          "data-album-title": album.name,
        },
      }),
    );
  }

  return $components;
}

export function AlbumYearGroup() {
  return { view: viewAlbumYearGroup };
}
