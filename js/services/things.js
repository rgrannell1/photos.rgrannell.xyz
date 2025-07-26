import { KnownRelations } from "../constants.js";

export class TriplesDB {
  static findSourceRelation(relation, triples, urn) {
    if (!Array.isArray(triples)) {
      throw new TypeError("Triples must be an array");
    }

    const match = triples.find((triple) => {
      return Things.sameURN(triple[0], urn) &&
        Triples.hasRelation(triple, relation);
    });

    if (!match) {
      return null;
    }

    return Triples.getTarget(match);
  }

  static findSubject(triples, urn) {
    return TriplesDB.findSourceRelation(KnownRelations.SUBJECT, triples, urn);
  }

  static findLocation(triples, urn) {
    return TriplesDB.findSourceRelation(KnownRelations.LOCATION, triples, urn);
  }

  static findRating(triples, urn) {
    return TriplesDB.findSourceRelation(KnownRelations.RATING, triples, urn);
  }

  static findName(triples, urn) {
    return TriplesDB.findSourceRelation(KnownRelations.NAME, triples, urn);
  }

  static findBirdwatchUrl(triples, urn) {
    return TriplesDB.findSourceRelation(
      KnownRelations.BIRDWATCH_URL,
      triples,
      urn,
    );
  }

  static findWikipedia(triples, urn) {
    return TriplesDB.findSourceRelation(KnownRelations.WIKIPEDIA, triples, urn);
  }

  static findLongitude(triples, urn) {
    return TriplesDB.findSourceRelation(KnownRelations.LONGITUDE, triples, urn);
  }
  static findLatitude(triples, urn) {
    return TriplesDB.findSourceRelation(KnownRelations.LATITUDE, triples, urn);
  }
}

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

  static filterRelation(triples, relation) {
    return triples.filter((triple) => {
      return triple[1] === relation;
    });
  }

  static filterSourceId(triples, urn) {
    if (!Things.isUrn(urn)) {
      throw new Error(`Invalid URN: ${urn}`);
    }

    const parsedUrn = Things.parseUrn(urn);
    return triples.filter((triple) => {
      return Things.sameURN(triple[0], urn) ||
        Things.hasId(triple[0], parsedUrn.id);
    });
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

  static toCommonName(triples, binomial) {
    const namedTriples = Triples.filterRelation(triples, KnownRelations.NAME);
    const match = namedTriples.find((triple) =>
      Things.hasId(triple[0], binomial)
    );

    if (match) {
      return Triples.getTarget(match);
    }

    return binomial;
  }

  static birdwatchUrl(triples, urn) {
    const matches = Triples.filterSourceId(
      Triples.filterRelation(triples, KnownRelations.BIRDWATCH_URL),
      urn,
    );

    if (matches.length === 0) {
      return;
    }

    const [match] = matches;
    return Triples.getTarget(match);
  }
}

export class Wikipedias {
  static toURL(triples, urn) {
    return TriplesDB.findWikipedia(urn, triples);
  }
}
