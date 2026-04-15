import { asUrn, TribbleDB } from "@rgrannell1/tribbledb";
import { countryUrn } from "../models/urn.ts";
import { readers } from "../commons/parser.ts";
import { KnownRelations, KnownTypes } from "../constants.ts";
import type { Country } from "../types.ts";

export type SubjectStats = {
  wildSpecies: number;
  totalSpecies: number;
  irishWildSpecies: number;
};

import {
  parseAlbum,
  parseAmphibian,
  parseCountry,
  parseFeature,
  parseFish,
  parseInsect,
  parseLocation,
  parseMammal,
  parsePhoto,
  parsePlace,
  parsePlane,
  parseReptile,
  parseSubject,
  parseTransfer,
  parseUnesco,
  parseVideo,
} from "./parsers.ts";

export const { one: readCountry, many: readCountries } = readers(parseCountry);
export const { one: readPlace, many: readPlaces } = readers(parsePlace);
export const { one: readLocation, many: readLocations } = readers(
  parseLocation,
);
export const { one: readUnesco, many: readUnescos } = readers(parseUnesco);
export const { one: readAlbum, many: readAlbums } = readers(parseAlbum);
export const { one: readTransfer, many: readTransfers } = readers(
  parseTransfer,
);
export const { one: readMammal, many: readMammals } = readers(parseMammal);
export const { one: readReptile, many: readReptiles } = readers(parseReptile);
export const { one: readInsect, many: readInsects } = readers(parseInsect);
// Thank you, english.
export const { one: readFish, many: readFishes } = readers(parseFish);
export const { one: readPlane, many: readPlanes } = readers(parsePlane);
export const { one: readSubject, many: readSubjects } = readers(parseSubject);
export const { one: readAmphibian, many: readAmphibians } = readers(
  parseAmphibian,
);
export const { one: readVideo, many: readVideos } = readers(parseVideo);
export const { one: readPhoto, many: readPhotos } = readers(parsePhoto);
export const { one: readFeature, many: readFeatures } = readers(parseFeature);

/*
 * Count wild, total, and Irish wild bird species seen across all photos.
 *
 * "Wild" means the subject URN has ?context=wild (or no context).
 * "Irish" means the base bird URN has a birdwatchUrl relation.
 */
export function readBirdStats(tdb: TribbleDB): SubjectStats {
  const wildBirdSubjects = tdb.search({
    relation: KnownRelations.SUBJECT,
    target: { type: KnownTypes.BIRD, qs: { context: "wild" } },
  }).triples();

  const allBirdSubjects = tdb.search({
    relation: KnownRelations.SUBJECT,
    target: { type: KnownTypes.BIRD },
  }).triples();

  const wildBirdIds = new Set(
    wildBirdSubjects.map(([, , targetUrn]) => asUrn(targetUrn).id),
  );
  const allBirdIds = new Set(
    allBirdSubjects.map(([, , targetUrn]) => asUrn(targetUrn).id),
  );

  let irishWildSpecies = 0;
  for (const birdId of wildBirdIds) {
    const hasBirdwatch = tdb.search({
      source: { type: KnownTypes.BIRD, id: birdId },
      relation: KnownRelations.BIRDWATCH_URL,
    }).triples().length > 0;

    if (hasBirdwatch) {
      irishWildSpecies++;
    }
  }

  return {
    wildSpecies: wildBirdIds.size,
    totalSpecies: allBirdIds.size,
    irishWildSpecies,
  };
}

const IRELAND_URN = countryUrn("ireland");

/*
 * Count wild, total, and Irish wild mammal species seen across all photos.
 *
 * "Wild" means the subject URN has ?context=wild (or no context).
 * "Irish" means the photo also has a location relation to Ireland (transitive).
 */
export function readMammalStats(tdb: TribbleDB): SubjectStats {
  const wildMammalTriples = tdb.search({
    relation: KnownRelations.SUBJECT,
    target: { type: KnownTypes.MAMMAL, qs: { context: "wild" } },
  }).triples();

  const allMammalSubjects = tdb.search({
    relation: KnownRelations.SUBJECT,
    target: { type: KnownTypes.MAMMAL },
  }).triples();

  // Build photo -> [mammal ids] map for wild subjects
  const wildPhotoToMammals = new Map<string, Set<string>>();
  for (const [photoUrn, , targetUrn] of wildMammalTriples) {
    const mammalId = asUrn(targetUrn).id;
    let mammalSet = wildPhotoToMammals.get(photoUrn);
    if (!mammalSet) {
      mammalSet = new Set();
      wildPhotoToMammals.set(photoUrn, mammalSet);
    }
    mammalSet.add(mammalId);
  }

  // Photos with an Ireland location (transitive, so includes places within Ireland)
  const irelandPhotoUrns = new Set(
    tdb.search({
      relation: KnownRelations.LOCATION,
      target: IRELAND_URN,
    }).sources(),
  );

  // Wild mammal species seen in Ireland
  const irishWildMammalIds = new Set<string>();
  for (const [photoUrn, mammalIds] of wildPhotoToMammals) {
    if (irelandPhotoUrns.has(photoUrn)) {
      for (const mammalId of mammalIds) {
        irishWildMammalIds.add(mammalId);
      }
    }
  }

  const wildMammalIds = new Set(
    wildMammalTriples.map(([, , targetUrn]) => asUrn(targetUrn).id),
  );
  const allMammalIds = new Set(
    allMammalSubjects.map(([, , targetUrn]) => asUrn(targetUrn).id),
  );

  return {
    wildSpecies: wildMammalIds.size,
    totalSpecies: allMammalIds.size,
    irishWildSpecies: irishWildMammalIds.size,
  };
}

export type ChecklistEntry = {
  birdId: string;
  name: string;
  firstSeen: string;
  isIrish: boolean;
  isWild: boolean;
};

/*
 * Read the bird life-list, sorted chronologically by first sighting.
 *
 * Includes both wild and captive sightings. "First seen" is read directly
 * from the firstSeen triple relation on each bird URN.
 * isWild is true if the bird has been photographed in a wild context at least once.
 */
export function readWildBirdChecklist(tdb: TribbleDB): ChecklistEntry[] {
  const firstSeenTriples = tdb.search({
    source: { type: KnownTypes.BIRD },
    relation: KnownRelations.FIRST_SEEN,
  }).triples();

  const wildBirdIds = new Set(
    tdb.search({
      relation: KnownRelations.SUBJECT,
      target: { type: KnownTypes.BIRD, qs: { context: "wild" } },
    }).triples().map(([, , birdUrn]) => asUrn(birdUrn).id),
  );

  const entries: ChecklistEntry[] = [];

  for (const [birdUrn, , firstSeen] of firstSeenTriples) {
    const birdId = asUrn(birdUrn).id;
    if (birdId === "unknown") continue;

    const birdThing = tdb.search({
      source: { type: KnownTypes.BIRD, id: birdId },
    }).firstObject();

    const rawName = birdThing?.name;
    const name =
      (Array.isArray(rawName) ? rawName[0] : rawName as string | undefined) ??
        birdId;

    const isIrish = tdb.search({
      source: { type: KnownTypes.BIRD, id: birdId },
      relation: KnownRelations.BIRDWATCH_URL,
    }).triples().length > 0;

    const isWild = wildBirdIds.has(birdId);

    entries.push({ birdId, name, firstSeen: firstSeen as string, isIrish, isWild });
  }

  // Sort chronologically — earliest first-sighting first
  entries.sort((entryA, entryB) =>
    parseInt(entryA.firstSeen) - parseInt(entryB.firstSeen)
  );

  return entries;
}

/*
 * Read all countries from the TribbleDB, sorted by name
 */
export function readAllCountries(tdb: TribbleDB): Country[] {
  const ids = tdb.search({
    source: { type: KnownTypes.PLACE },
    relation: KnownRelations.FLAG,
  }).sources();

  const countries = readCountries(tdb, ids) as Country[];

  const flagToName = new Map(
    countries
      .filter((country) => country.flag)
      .map((country) => [country.flag!, country.name]),
  );

  return countries.sort((countryA, countryB) => {
    const nameA = flagToName.get(countryA.flag ?? "") ?? countryA.name;
    const nameB = flagToName.get(countryB.flag ?? "") ?? countryB.name;
    return nameA.localeCompare(nameB);
  });
}
