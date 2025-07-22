export class Things {
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
