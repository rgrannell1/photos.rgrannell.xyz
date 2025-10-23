import m from "mithril";
import { asUrn, TribbleDB, Triple, TripleObject } from "@rgrannell1/tribbledb";
import { ThingLink, ThingLinkAttrs } from "../components/thing-link.ts";
import { Album } from "../types.ts";
import { parseAlbum } from "../parsers/album.ts";
import { parseCountry, parsePlace } from "../parsers/location.ts";
import { parsePhoto } from "../parsers/photo.ts";
import {
  parseAmphibian,
  parseInsect,
  parseMammal,
  parseReptile,
} from "../parsers/subject.ts";
import { parseVideo } from "../parsers/video.ts";
import { one } from "../arrays.ts";

export function readThing(
  tdb: TribbleDB,
  id: string,
): TripleObject | undefined {
  const parsed = asUrn(id);

  return tdb.search({
    source: { id: parsed.id, type: parsed.type },
  }).firstObject();
}

export const readAlbum = readParsedThing.bind(null, parseAlbum);
export const readCountry = readParsedThing.bind(null, parseCountry);
export const readPlace = readParsedThing.bind(null, parsePlace);
export const readPhoto = readParsedThing.bind(null, parsePhoto);
export const readMammal = readParsedThing.bind(null, parseMammal);
export const readReptile = readParsedThing.bind(null, parseReptile);
export const readAmphibian = readParsedThing.bind(null, parseAmphibian);
export const readInsect = readParsedThing.bind(null, parseInsect);
export const readVideo = readParsedThing.bind(null, parseVideo);

export function readThings(
  tdb: TribbleDB,
  ids: Set<string>,
): TripleObject[] {
  const things: TripleObject[] = [];

  for (const id of ids) {
    const thing = readThing(tdb, id);
    if (thing) {
      things.push(thing);
    }
  }

  return things;
}

export const readParsedThings = function <T>(
  parser: (tdb: TribbleDB, thing: TripleObject) => T | undefined,
  tdb: TribbleDB,
  ids: Set<string>,
): T[] {
  const parsedThings: T[] = [];

  for (const id of ids) {
    const thing = readThing(tdb, id);
    if (!thing) {
      continue;
    }

    const parsed = parser(tdb, thing);
    if (parsed) {
      parsedThings.push(parsed);
    }
  }

  return parsedThings;
};

export const readParsedAlbums = readParsedThings.bind(null, parseAlbum);
export const readParsedCountries = readParsedThings.bind(null, parseCountry);
export const readParsedPlaces = readParsedThings.bind(null, parsePlace);
export const readParsedPhotos = readParsedThings.bind(null, parsePhoto);
export const readParsedMammals = readParsedThings.bind(null, parseMammal);
export const readParsedReptiles = readParsedThings.bind(null, parseReptile);
export const readParsedAmphibians = readParsedThings.bind(null, parseAmphibian);
export const readParsedInsects = readParsedThings.bind(null, parseInsect);
export const readParsedVideos = readParsedThings.bind(null, parseVideo);

export function readParsedThing<T>(
  parser: (tdb: TribbleDB, thing: TripleObject) => T | undefined,
  tdb: TribbleDB,
  id: string,
): T | undefined {
  const thing = readThing(tdb, id);
  if (!thing) {
    return undefined;
  }

  return parser(tdb, thing);
}

/*
 * Read all things of a given type that have a name
 */
export function readNamedTypeThings<T>(tdb: TribbleDB, type: string): TripleObject[] {
  const things = tdb.search({
    source: { type },
  }).objects();

  return things
    .filter((thing) => {
      return Object.prototype.hasOwnProperty.call(thing, "name");
    })
    .sort((thinga, thingb) => {
      const firstName = thinga.name;
      const secondName = thingb.name;

      const first = one(firstName) as string;
      const second = one(secondName) as string;

      return first.localeCompare(second);
    });
}

// TODO: remove mithril, move to presenter folder!!
export function toThingLinks(
  tdb: TribbleDB,
  urns: (string | undefined)[],
): m.Vnode<ThingLinkAttrs, {}>[] {
  return urns.flatMap((urn) => {
    if (!urn) {
      return [];
    }
    const thing = readThing(tdb, urn);
    if (!thing || !thing.name) {
      return [];
    }

    const id = asUrn(urn);

    return [m(ThingLink, {
      urn,
      thing: readThing(tdb, urn),
    })];
  });
}
