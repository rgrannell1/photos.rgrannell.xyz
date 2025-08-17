import { Triple } from "js/types.js";
import { KnownRelations } from "../constants.js";
import { parseUrn } from "../library/tribble.js";

const CONFIG = window.envConfig;

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
  // TODO handle arrays
  static isUrn(candidate) {
    return candidate && candidate.startsWith("urn:ró");
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

  static is(urn, type) {
    return Things.isUrn(urn) && Things.parseUrn(urn).type === type;
  }

  static toURL(urn) {
    if (!Things.isUrn(urn)) {
      throw new Error(`Invalid URN: ${urn}`);
    }

    const { type, id } = Things.parseUrn(urn);
    return `#/thing/${type}:${id}`;
  }

  static sameURN(urn1, urn2) {
    if (!Things.isUrn(urn1) || !Things.isUrn(urn2)) {
      return false;
    }

    const parsed1 = Things.parseUrn(urn1);
    const parsed2 = Things.parseUrn(urn2);

    return parsed1.type === parsed2.type && parsed1.id === parsed2.id;
  }

  static isRating(value) {
    return /^[⭐]{1,5}$/.test(value);
  }

  static hasId(urn, id) {
    return Things.isUrn(urn) && Things.parseUrn(urn).id === id;
  }

  static sameType(urn0, urn1) {
    if (!Things.isUrn(urn0) || !Things.isUrn(urn1)) {
      return false;
    }

    const parsed0 = Things.parseUrn(urn0);
    const parsed1 = Things.parseUrn(urn1);

    return parsed0.type === parsed1.type;
  }

  static isType(urn, type) {
    if (!Things.isUrn(urn)) {
      return false;
    }

    const parsed = Things.parseUrn(urn);
    return parsed.type === type;
  }
}

export class Binomials {
  static pretty(binomial) {
    const pretty = binomial.replace(/-/g, " ");
    return pretty.charAt(0).toUpperCase() + pretty.slice(1);
  }

  static toCommonName(tdb, binomial) {
    return tdb.search({
      source: { id: binomial },
      relation: KnownRelations.NAME,
    }).firstTarget() ?? binomial;
  }

  static birdwatchUrl(tdb, urn) {
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
      source: { type: "country" },
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
      source: { type: "country", id: parsed.id },
      relation: KnownRelations.NAME,
    }).firstTarget();

    return {
      urn,
      name,
    };
  }
}

/*
 * We enter ratings as literals; convert them to URNs
 *
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

/*
 * Convert `country` relations to URNs
 *
 */
export function countriesAsUrns(triple: Triple) {
  if (Triples.getRelation(triple) !== KnownRelations.COUNTRY) {
    return [triple];
  }

  const countryId = Triples.getTarget(triple).toLowerCase().replace(" ", "-");
  const countryUrn = `urn:ró:country:${countryId}`;

  return [
    [
      Triples.getSource(triple),
      Triples.getRelation(triple),
      countryUrn
    ],
  ];
}

/*
 * We remove CDN hostnames from our URLS; re-add them for relevant
 * relations
 *
 */
export function expandCdnUrls(triple: Triple) {
  for (
    const relation of [
      "thumbnail_url",
      "full_image",
      "poster_url",
      "video_url_1080p",
      "video_url_480p",
      "video_url_720p",
      "video_url_unscaled",
    ]
  ) {
    if (Triples.getRelation(triple) === relation) {
      return [
        [
          Triples.getSource(triple),
          relation,
          `${CONFIG.photos_url}${Triples.getTarget(triple)}`,
        ],
      ];
    }
  }

  return [triple];
}

/*
 * For compression, we remove urn prefixes from URNs before transmitting them. Re-add them
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
