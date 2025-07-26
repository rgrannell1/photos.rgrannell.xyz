
import { KnownRelations } from "../constants.js";

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
}

export class Binomials {
  static pretty(binomial) {
    const pretty = binomial.replace(/-/g, ' ');
    return pretty.charAt(0).toUpperCase() + pretty.slice(1);
  }

  static toCommonName(triples, binomial) {
    const match = triples.find(triple => {
      const [source, relation, _] = triple;

      if (!Things.isUrn(source)) {
        return false;
      }

      const parsed = Things.parseUrn(source);
      return parsed.id === binomial && relation === KnownRelations.NAME;
    })

    if (match) {
      return match[2];
    }

    return binomial;
  }

  static birdwatchUrl(triples, urn) {
    if (!Things.isUrn(urn)) {
      throw new Error(`Invalid URN: ${urn}`);
    }

    const urnId = Things.parseUrn(urn).id;


    const match = triples.find(triple => {
      const [birdUrn, relation, _] = triple;
console.log(urn, triple)
      if (!Things.isUrn(birdUrn) || relation !== KnownRelations.BIRDWATCH_URL) {
        return false;
      }

      const sourceBirdUrn = Things.parseUrn(birdUrn);
      if (sourceBirdUrn.type !== "bird") {
        return false;
      }

      return sourceBirdUrn.id === urnId;
    });

  if (match) {
      return match[2];
    }
  }
}
