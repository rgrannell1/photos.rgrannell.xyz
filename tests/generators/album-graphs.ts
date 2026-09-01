/* Valid generated album graphs for property tests. */

import * as Peach from "@rgrannell1/peach";
import type { Triple } from "@rgrannell1/tribbledb";

export type AlbumGraph = {
  albumUrn: string;
  triples: Triple[];
  photoUrns: Set<string>;
  videoUrns: Set<string>;
};

type AlbumGraphOptions = {
  photoCount: number;
  videoCount: number;
};

// Select whether each generated URN carries a query qualifier.
const selectBoolean = Peach.Boolean.oneOf(Peach.Number.uniform);

function qualifyUrn(urn: string, qualifier: string): string {
  return selectBoolean() ? `${urn}?case=${qualifier}` : urn;
}

function generateMediaTriples(
  type: "photo" | "video",
  count: number,
  albumUrn: string,
): Triple[] {
  const triples: Triple[] = [];
  for (let idx = 0; idx < count; idx++) {
    const mediaUrn = qualifyUrn(`urn:ró:${type}:${idx}`, `media-${idx}`);
    const targetUrn = qualifyUrn(albumUrn, `album-${idx}`);
    triples.push([mediaUrn, "albumId", targetUrn]);
  }
  return triples;
}

function collectSources(triples: Triple[]): Set<string> {
  const sources = new Set<string>();
  for (const [source] of triples) sources.add(source);
  return sources;
}

export function generateAlbumGraph(options: AlbumGraphOptions): AlbumGraph {
  const albumUrn = "urn:ró:album:generated";
  const photoTriples = generateMediaTriples("photo", options.photoCount, albumUrn);
  const videoTriples = generateMediaTriples("video", options.videoCount, albumUrn);
  const unrelatedType = selectBoolean() ? "photo" : "video";
  const unrelated: Triple = [
    `urn:ró:${unrelatedType}:unrelated`,
    "albumId",
    "urn:ró:album:other",
  ];
  const triples: Triple[] = [
    [albumUrn, "name", "Generated album"],
    ...photoTriples,
    ...videoTriples,
    unrelated,
  ];

  return {
    albumUrn,
    triples,
    photoUrns: collectSources(photoTriples),
    videoUrns: collectSources(videoTriples),
  };
}

export function permuteTriples(triples: Triple[]): Triple[] {
  const shuffled = [...triples];
  for (let idx = shuffled.length - 1; idx > 0; idx--) {
    const targetIdx = Peach.Number.uniform(0, idx + 1)();
    [shuffled[idx], shuffled[targetIdx]] = [shuffled[targetIdx], shuffled[idx]];
  }
  return shuffled;
}
