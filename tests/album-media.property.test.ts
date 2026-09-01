/* Properties of album media readers over valid generated graphs. */

import * as Peach from "@rgrannell1/peach";
import { TribbleDB } from "@rgrannell1/tribbledb/v2";
import {
  readAlbumPhotoIds,
  readAlbumVideoIds,
} from "../ts/services/data/albums/albums.ts";
import { expectSetsEqual } from "./expectations/sets.ts";
import {
  generateAlbumGraph,
  permuteTriples,
} from "./generators/album-graphs.ts";
import { PROPERTY_SEEDS } from "./data/properties.ts";

// Bound the exhaustive photo and video count product to 49 cases per seed.
const MAX_MEDIA_COUNT = 6;

Deno.test("album media readers conserve generated relations", () => {
  for (const seed of PROPERTY_SEEDS) {
    Peach.setSeed(seed);

    for (let photoCount = 0; photoCount <= MAX_MEDIA_COUNT; photoCount++) {
      for (let videoCount = 0; videoCount <= MAX_MEDIA_COUNT; videoCount++) {
        const graph = generateAlbumGraph({ photoCount, videoCount });
        const tdb = new TribbleDB(permuteTriples(graph.triples));
        const context = `seed ${Peach.getSeed()}, ${photoCount} photos, ` +
          `${videoCount} videos`;

        expectSetsEqual(
          readAlbumPhotoIds(tdb, graph.albumUrn),
          graph.photoUrns,
          `photo relations, ${context}`,
        );
        expectSetsEqual(
          readAlbumVideoIds(tdb, graph.albumUrn),
          graph.videoUrns,
          `video relations, ${context}`,
        );
      }
    }
  }
});
