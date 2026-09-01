/* Properties of album media readers over valid generated graphs. */

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
import { PROPERTY_RUN_COUNT } from "./data/properties.ts";

// Bound the exhaustive photo and video count product to 49 cases per seed.
const MAX_MEDIA_COUNT = 6;

Deno.test("album media readers conserve generated relations", () => {
  for (let runIdx = 0; runIdx < PROPERTY_RUN_COUNT; runIdx++) {
    for (let photoCount = 0; photoCount <= MAX_MEDIA_COUNT; photoCount++) {
      for (let videoCount = 0; videoCount <= MAX_MEDIA_COUNT; videoCount++) {
        const graph = generateAlbumGraph({ photoCount, videoCount });
        const tdb = new TribbleDB(permuteTriples(graph.triples));
        const context = `run ${runIdx + 1}, ${photoCount} photos, ` +
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
