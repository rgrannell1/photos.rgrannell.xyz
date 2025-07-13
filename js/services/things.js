
export class Things {
  static isUrn(candidate) {
    return candidate.startsWith('urn:ró')
  }
  static parseUrn(urn) {
    if (!Things.isUrn(urn)) {
      throw new Error(`Invalid URN: ${urn}`);
    }

    const type = urn.split(':')[2];
    const [urnPart, queryString] = urn.split('?');
    const id = urnPart.split(':')[3];
    const qs = queryString ? Object.fromEntries(new URLSearchParams(queryString)) : {};

    return {
      type,
      id,
      qs
    }
  }

  static is(urn, type) {
    return Things.isUrn(urn) && Things.parseUrn(urn).type === type;
  }
}
