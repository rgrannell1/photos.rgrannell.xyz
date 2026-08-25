/* Indexed thing-cover reader tests. */

import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import type { Triple } from "@rgrannell1/tribbledb";
import { readThingCover } from "../ts/services/photos.ts";
import { isNone, NONE } from "../ts/commons/maybe.ts";

const PHOTO = "urn:ró:photo:cover";
const BIRD = "urn:ró:bird:robin";
const triples: Triple[] = [
  [PHOTO, "albumId", "urn:ró:album:test"],
  [PHOTO, "createdAt", "0"],
  [PHOTO, "fullImage", "full.webp"],
  [PHOTO, "midImageLossyUrl", "mid.webp"],
  [PHOTO, "mosaicColours", "hash"],
  [PHOTO, "previewJpegUrl", "preview.jpg"],
  [PHOTO, "thumbnailUrl", "thumb.webp"],
  [PHOTO, "contrastingGrey", "white"],
  [PHOTO, "cover", BIRD],
];

Deno.test("readThingCover uses indexed relation traversal", () => {
  const tdb = new TribbleDB(triples);
  Object.defineProperty(tdb, "search", {
    value: () => {
      throw new Error("broad search called");
    },
  });

  const cover = readThingCover(tdb, BIRD);
  if (isNone(cover) || cover.id !== PHOTO) {
    throw new Error(`expected ${PHOTO}`);
  }
});

Deno.test("readThingCover returns NONE without a cover", () => {
  const tdb = new TribbleDB([]);
  if (readThingCover(tdb, BIRD) !== NONE) {
    throw new Error("expected no cover");
  }
});
