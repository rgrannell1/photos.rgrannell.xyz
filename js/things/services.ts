
import { KnownRelations } from "../constants.js";
import { asUrn } from "../library/tribble.js";

function getName(tdb, urn: string): string | undefined {
    const { id, type } = asUrn(urn);

    const definedName = tdb.search({
      source: { id, type },
      relation: KnownRelations.NAME,
    }).firstTarget();

    if (typeof definedName === "undefined") {
      return definedName;
    }

    if (typeof definedName !== "string") {
      throw new TypeError(`name is not a string: ${definedName}`);
    }

    return definedName;
}

export class ThingsService {
  static getName(tdb, urn: string): string | undefined {
    return getName(tdb, urn);
  }
  static videoObjects(tdb) {
    return tdb.search({
      source: { type: "video" },
    }).objects();
  }
  static photoObjects(tdb) {
    return tdb.search({
      source: { type: "photo" },
    }).objects();
  }
  static albumObjects(tdb) {
    return tdb.search({
      source: { type: "album" },
    }).objects();
  }
}
