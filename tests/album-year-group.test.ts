/* Album year group fragment tests. */

import m from "mithril";
import { NONE } from "../ts/commons/maybe.ts";
import {
  AlbumYearGroup,
  type AlbumYearGroupAttrs,
} from "../ts/components/album/year-group.ts";
import type { Album } from "../ts/types/domain.ts";

const album: Album = {
  type: "album",
  id: "urn:ró:album:test",
  name: "Test",
  minDate: Date.now(),
  maxDate: Date.now(),
  thumbnailUrl: "thumbnail.avif",
  mosaic: "hash",
  photosCount: 1,
  videosCount: 0,
  dateRange: "2026",
  shortDateRange: "2026",
};

Deno.test("AlbumYearGroup keeps current-year fragment keys consistent", () => {
  const component = AlbumYearGroup();
  const vnode = {
    attrs: {
      year: new Date().getFullYear(),
      showHeading: false,
      recap: NONE,
      albums: [album],
      readAlbumCountries: () => [],
      startIdx: 0,
    },
  } as unknown as m.Vnode<AlbumYearGroupAttrs>;
  const children = component.view(vnode) as m.Children[];

  m.fragment({}, children);
});
