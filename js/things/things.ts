import { Triple } from "../types.ts";
import { CDN_RELATIONS, KnownRelations, KnownThings } from "../constants.js";
import { parseUrn } from "../library/tribble.js";
import { Strings } from "../strings.ts";

export { CURIES, expandTripleCuries } from "./curie.ts";

export class Triples {
  static isUrnSource(triple: [string, string, string]) {
    return Things.isUrn(triple[0]);
  }
  static hasRelation(triple: [string, string, string], relation: string) {
    return triple[1] === relation;
  }
  static hasUrnTarget(triple: [string, string, string]) {
    return Things.isUrn(triple[2]);
  }

  static getSource(triple: [string, string, string]) {
    return triple[0];
  }

  static getRelation(triple: [string, string, string]) {
    return triple[1];
  }

  static getTarget(triple: [string, string, string]) {
    return triple[2];
  }
}

export class Things {
  static isUrn(candidate: unknown): candidate is string {
    return typeof candidate === "string" && candidate.startsWith("urn:ró");
  }
  static parseUrn(urn: string) {
    if (!Things.isUrn(urn)) {
      throw new Error(`Invalid URN: ${urn}`);
    }

    const type = urn.split(":")[2];
    const [urnPart, queryString] = urn.split("?");
    const id = urnPart.split(":")[3];
    const qs = queryString
      ? Object.fromEntries(new URLSearchParams(queryString))
      : {};

    return {
      type,
      id,
      qs,
    };
  }

  static is(urn: unknown, type: string) {
    return Things.isUrn(urn) && Things.parseUrn(urn).type === type;
  }

  static toURL(urn: unknown) {
    if (!Things.isUrn(urn)) {
      throw new Error(`Invalid URN: ${urn}`);
    }

    const { type, id } = Things.parseUrn(urn);
    return `#/thing/${type}:${id}`;
  }

  static sameURN(urn1: unknown, urn2: unknown) {
    if (!Things.isUrn(urn1) || !Things.isUrn(urn2)) {
      return false;
    }

    const parsed1 = Things.parseUrn(urn1);
    const parsed2 = Things.parseUrn(urn2);

    return parsed1.type === parsed2.type && parsed1.id === parsed2.id;
  }

  static isRating(value: string) {
    return /^[⭐]{1,5}$/.test(value);
  }

  static hasId(urn: unknown, id: string) {
    return Things.isUrn(urn) && Things.parseUrn(urn).id === id;
  }

  static sameType(urn0: unknown, urn1: unknown) {
    if (!Things.isUrn(urn0) || !Things.isUrn(urn1)) {
      return false;
    }

    const parsed0 = Things.parseUrn(urn0);
    const parsed1 = Things.parseUrn(urn1);

    return parsed0.type === parsed1.type;
  }

  static isType(urn: unknown, type: string) {
    if (!Things.isUrn(urn)) {
      return false;
    }

    const parsed = Things.parseUrn(urn);
    return parsed.type === type;
  }
}

export class Binomials {
  static pretty(binomial: string) {
    const pretty = binomial.replace(/-/g, " ");
    return Strings.capitalise(pretty);
  }

  static toCommonName(tdb: any, binomial: string) {
    return tdb.search({
      source: { id: binomial },
      relation: KnownRelations.NAME,
    }).firstTarget() ?? binomial;
  }

  static birdwatchUrl(tdb: any, urn: string) {
    const { id } = parseUrn(urn);

    return tdb.search({
      source: { id },
      relation: KnownRelations.BIRDWATCH_URL,
    }).firstTarget();
  }
}

export class Countries {
  // TODO deprecate this, as we move away from passing
  // non URN data to the client
  static details(tdb: any, name: string) {
    // narrow down the search to triples about country names and flags
    const countriesData = tdb.search({
      source: { type: KnownThings.COUNTRY },
      relation: { relation: [KnownRelations.NAME, KnownRelations.FLAG] },
    });

    // grab the URN based on the name
    const urn = countriesData.search({
      relation: KnownRelations.NAME,
      target: { id: name },
    }).firstSource();

    const parsed = parseUrn(urn);

    // and the flag based on the URN
    const flag = countriesData.search({
      source: parsed,
      relation: KnownRelations.FLAG,
    }).firstTarget();

    return {
      urn,
      name,
      flag,
    };
  }

  static urnDetails(tdb: any, urn: string) {
    const parsed = parseUrn(urn);

    // narrow down the search to triples about country names and flags
    const name = tdb.search({
      source: { type: KnownThings.COUNTRY, id: parsed.id },
      relation: KnownRelations.NAME,
    }).firstTarget();

    const flag = tdb.search({
      source: parsed,
      relation: KnownRelations.FLAG,
    }).firstTarget();

    return {
      urn,
      name,
      flag
    };
  }
}

/*
 * We enter ratings as literals; convert them to URNs
 */
export function ratingsAsUrns(triple: Triple) {
  if (Triples.getRelation(triple) !== KnownRelations.RATING) {
    return [triple];
  }

  return [[
    Triples.getSource(triple),
    Triples.getRelation(triple),
    `urn:ró:rating:${encodeURIComponent(Triples.getTarget(triple))}`,
  ]];
}

export function placesToCountries(triple: Triple) {
  if (Triples.getRelation(triple) !== KnownRelations.LOCATION) {
    return [triple];
  }

  const place = Triples.getTarget(triple);
  if (!Things.is(place, KnownThings.COUNTRY)) {
    return [triple];
  }

  return [[
    Triples.getSource(triple),
    KnownRelations.COUNTRY,
    place,
  ]];
}

/*
 * Convert `country` relations to URNs
 */
export function countriesAsUrns(triple: Triple) {
  if (Triples.getRelation(triple) !== KnownRelations.COUNTRY) {
    return [triple];
  }

  const countryId = Triples.getTarget(triple).toLowerCase().replace(/ /g, "-");
  const countryUrn = `urn:ró:country:${countryId}`;

  return [
    [
      Triples.getSource(triple),
      Triples.getRelation(triple),
      countryUrn,
    ],
  ];
}

/*
 * We remove CDN hostnames from our URLS; re-add them for relevant
 * relations
 */
export function expandCdnUrls(cdnUrl: string, triple: Triple) {
  for (const relation of CDN_RELATIONS) {
    if (Triples.getRelation(triple) === relation) {
      return [
        [
          Triples.getSource(triple),
          relation,
          `${cdnUrl}${Triples.getTarget(triple)}`,
        ],
      ];
    }
  }

  return [triple];
}

/*
 * For compression, we remove urn prefixes from URNs before transmitting them. Re-add them
 * to parts prefixed with `::`
 *
 * @param triple The triple to expand
 */
export function expandUrns(triple: Triple) {
  const [source, relation, target] = triple;

  return [[
    source.startsWith("::") ? `urn:ró:${source.slice(2)}` : source,
    relation,
    target.startsWith("::") ? `urn:ró:${target.slice(2)}` : target,
  ]];
}

/*
 * Rename relations into a JS-friendly casing format, since we're mapping this stuff onto properties
 */
export function renameRelations(triple: Triple) {
  const [source, relation, target] = triple;
  return [[
    source,
    Strings.camelCase(relation),
    target
  ]]
}

/*
 * Allow search by season
 */
export function addSeason(triple: Triple) {
  if (Triples.getRelation(triple) !== KnownRelations.CREATED_AT) {
    return [triple];
  }

  const date = new Date(Triples.getTarget(triple));
  if (isNaN(date.getTime())) {
    return [triple];
  }

  const month = date.getUTCMonth() + 1;
  let season = "Winter";
  if (month >= 3 && month <= 5) {
    season = "Spring";
  } else if (month >= 6 && month <= 8) {
    season = "Summer";
  } else if (month >= 9 && month <= 11) {
    season = "Autumn";
  }

  return [
    triple,
    [
      Triples.getSource(triple),
      KnownRelations.SEASON,
      season,
    ],
  ];
}

export function addYear(triple: Triple) {
  if (Triples.getRelation(triple) !== KnownRelations.CREATED_AT) {
    return [triple];
  }

  const date = new Date(Triples.getTarget(triple));
  if (isNaN(date.getTime())) {
    return [triple];
  }

  const year = date.getUTCFullYear().toString();

  return [
    triple,
    [
      Triples.getSource(triple),
      KnownRelations.YEAR,
      year,
    ],
  ];
}
