/* Generated thing-page inputs and state transitions. */

import * as Peach from "@rgrannell1/peach";
import type { TripleObject } from "@rgrannell1/tribbledb";
import { type Maybe, NONE } from "../../ts/commons/collections/maybe.ts";
import { KnownTypes } from "../../ts/constants/data.ts";
import type { ThingPageAttrs } from "../../ts/components/pages/thing/view/thing.ts";
import type { Photo, Video } from "../../ts/types/domain.ts";

export type MediaReader<Value> = (urns: Set<string>) => Value[];

export type CountingReader<Value> = {
  calls: { value: number };
  readValues: MediaReader<Value>;
};

export type ThingPageOptions = {
  urn: string;
  readVideos: MediaReader<Video>;
  readPhotos?: MediaReader<Photo>;
};

// Supply a small set that creates both repeated and changed cache keys.
const THING_URNS = [
  "urn:ró:bird:alpha",
  "urn:ró:bird:beta",
  "urn:ró:bird:gamma",
];

function readCountedValues<Value>(
  calls: { value: number },
  values: Value[],
  _urns: Set<string>,
): Value[] {
  calls.value++;
  return values;
}

function readNoValues<Value>(): Value[] {
  return [];
}

function readEmptyText(): string {
  return "";
}

function readNoCover(): Maybe<Photo> {
  return NONE;
}

function readFixedValues<Value>(values: Value[], _urns: Set<string>): Value[] {
  return values;
}

function readMappedValues<Value>(
  calls: { value: number },
  valuesByUrn: Map<string, Value[]>,
  urns: Set<string>,
): Value[] {
  calls.value++;
  const values: Value[] = [];
  for (const urn of urns) values.push(...(valuesByUrn.get(urn) ?? []));
  return values;
}

export function createCountingReader<Value>(values: Value[]): CountingReader<Value> {
  const calls = { value: 0 };
  const readValues = readCountedValues.bind(null, calls, values) as MediaReader<Value>;
  return { calls, readValues };
}

export function createFixedReader<Value>(values: Value[]): MediaReader<Value> {
  return readFixedValues.bind(null, values) as MediaReader<Value>;
}

export function createMappedReader<Value>(
  valuesByUrn: Map<string, Value[]>,
): CountingReader<Value> {
  const calls = { value: 0 };
  const readValues = readMappedValues.bind(
    null,
    calls,
    valuesByUrn,
  ) as MediaReader<Value>;
  return { calls, readValues };
}

export function generateVideos(count: number, namespace = "generated"): Video[] {
  const videos: Video[] = [];
  for (let idx = 0; idx < count; idx++) {
    videos.push({
      type: KnownTypes.VIDEO,
      id: `urn:ró:video:${namespace}-${idx}`,
      albumId: "urn:ró:album:generated",
      videoUrl480p: `https://example.test/video-${idx}.mp4`,
    });
  }
  return videos;
}

export function generatePhotos(count: number, namespace = "generated"): Photo[] {
  const photos: Photo[] = [];
  for (let idx = 0; idx < count; idx++) {
    photos.push({
      type: KnownTypes.PHOTO,
      id: `urn:ró:photo:${namespace}-${idx}`,
      albumId: "urn:ró:album:generated",
      createdAt: String(Date.UTC(2026, 0, idx + 1)),
      fullImage: `https://example.test/photo-${idx}.webp`,
      midImageLossyUrl: `https://example.test/photo-${idx}-mid.webp`,
      mosaicColours: "generated-mosaic",
      previewJpegUrl: `https://example.test/photo-${idx}.jpeg`,
      thumbnailUrl: `https://example.test/photo-${idx}-thumb.webp`,
      contrastingGrey: "#222222",
    });
  }
  return photos;
}

export function generateThingUrns(count: number): string[] {
  const selectUrn = Peach.Logic.oneOf(Peach.Number.uniform, THING_URNS);
  return Peach.Array.from(selectUrn, count)();
}

export function buildThingPageAttrs(
  options: ThingPageOptions,
): ThingPageAttrs {
  const thing: TripleObject = { id: [options.urn], name: [options.urn] };
  return {
    urn: options.urn,
    things: [thing],
    listingTitle: NONE,
    titleEmoji: "",
    isBinomial: false,
    readSeenInCountries: readNoValues,
    readAlbumEntries: readNoValues,
    readVideos: options.readVideos,
    readPhotos: options.readPhotos ?? readNoValues,
    readThingList: readNoValues,
    readThingEmoji: readEmptyText,
    readTaxonMembers: readNoValues,
    readThingCover: readNoCover,
    visible: false,
  };
}
