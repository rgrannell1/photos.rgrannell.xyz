import { KnownRelations } from "../constants.js";
import { parseUrn, TribbleDB } from "../library/tribble.js";

export class Triples {
  static isUrnSource(triple) {
    return Things.isUrn(triple[0]);
  }
  static hasRelation(triple, relation) {
    return triple[1] === relation;
  }
  static hasUrnTarget(triple) {
    return Things.isUrn(triple[2]);
  }

  static getSource(triple) {
    return triple[0];
  }

  static getRelation(triple) {
    return triple[1];
  }

  static getTarget(triple) {
    return triple[2];
  }
}

export class Things {
  // TODO handle arrays
  static isUrn(candidate) {
    return candidate && candidate.startsWith("urn:ró");
  }
  static parseUrn(urn) {
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
  static details(tdb, name) {

      // narrow down the search to triples about country names and flags
      const countriesData = tdb.search({
        source: { type: 'country' },
        relation: {relation: [KnownRelations.NAME, KnownRelations.FLAG]}
      })

      // grab the URN based on the name
      const urn = countriesData.search({
        relation: KnownRelations.NAME,
        target: { id: name }
      }).firstSource();

      const parsed = parseUrn(urn);

      // and the flag based on the URN
      const flag = countriesData.search({
        source: parsed,
        relation: KnownRelations.FLAG
      }).firstTarget();

      return {
        urn,
        name,
        flag
      }
  }

  static urnDetails(tdb, urn) {
      const parsed = parseUrn(urn);

      // narrow down the search to triples about country names and flags
      const name = tdb.search({
        source: { type: 'country', id: parsed.id },
        relation: KnownRelations.NAME
      }).firstTarget()

      return {
        urn,
        name
      }
  }
}

let triblesUpdated = false;
let tribbleDb = new TribbleDB([]);

function ratingsAsUrns(triple) {
  if (Triples.getRelation(triple) !== KnownRelations.RATING) {
    return [triple];
  }

  return [[
    Triples.getSource(triple),
    Triples.getRelation(triple),
    `urn:ró:rating:${encodeURIComponent(Triples.getTarget(triple))}`,
  ]];
}

function countriesAsUrns(triple) {
  if (Triples.getRelation(triple) !== KnownRelations.COUNTRY) {
    return [triple];
  }

  const countryId = Triples.getTarget(triple).toLowerCase().replace(" ", "-");
  const countryUrn = `urn:ró:country:${countryId}`;

  return [
    [
      Triples.getSource(triple),
      Triples.getRelation(triple),
      countryUrn,
      countryUrn,
      Triples.getRelation(triple),
      Triples.getTarget(triple),
    ],
  ];
}

// TODO tag each photo with a year

export function getTribbleDB(triples) {
  if (!triblesUpdated) {
    tribbleDb.add(triples);
    tribbleDb = tribbleDb
      .flatMap(ratingsAsUrns)
      .flatMap(countriesAsUrns);

    triblesUpdated = true;
  }

  return tribbleDb;
}
