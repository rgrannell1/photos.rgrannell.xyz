import { Triple } from "@rgrannell1/tribbledb";

import { CDN_RELATIONS, KnownRelations, RelationSymmetries } from "../constants.ts";
import { Strings } from "../strings.ts";

export const CURIES = {
  "i": "urn:ró:",
  "birdwatch": "https://birdwatchireland.ie/birds/",
  "photos": "https://photos-cdn.rgrannell.xyz/",
  "wiki": "https://en.wikipedia.org/wiki/",
};

const CURIE_REGEX = /^\[([a-z]*):(.*)\]$/;
const ENDPOINT = "https://photos-cdn.rgrannell.xyz";

/*
 * Convert star ratings into URNs.
 */
export function convertRatingsToUrns(triple: Triple): Triple[] {
  const [src, rel, tgt] = triple;

  if (rel !== KnownRelations.RATING) {
    return [triple];
  }

  return [[
    src,
    rel,
    `urn:ró:rating:${encodeURIComponent(tgt)}`,
  ]];
}

/*
 * Convert `country` relations to URNs
 */
export function convertCountriesToUrns(triple: Triple): Triple[] {
  const [src, rel, tgt] = triple;

  if (rel !== KnownRelations.COUNTRY) {
    return [triple];
  }

  const id = tgt.toLowerCase().replace(/ /g, "-");
  const countryUrn = `urn:ró:country:${id}`;

  return [[
    src,
    rel,
    countryUrn,
  ]];
}

/*
 * Expand CDN urls with their endpoint
 */
export function expandCdnUrls(triple: Triple): Triple[] {
  const [src, rel, tgt] = triple;

  const isCDNRelation = Array.from(CDN_RELATIONS).some((candidate: string) => {
    return rel === candidate;
  });

  if (!isCDNRelation) {
    return [triple];
  }


  return [[
    src,
    rel,
    `${ENDPOINT}${tgt}`,
  ]];
}

export function convertRelationCasing(triple: Triple): Triple[] {
  const [src, rel, tgt] = triple;

  return [[
    src,
    Strings.camelCase(rel),
    tgt,
  ]]
}

/*
 * Expand shortened URNS into urn:ró:
 */
export function expandUrns(triple: Triple): Triple[] {
  const [src, rel, tgt] = triple;

  return [[
    typeof src === "string" && src.startsWith("::")
      ? `urn:ró:${src.slice(2)}`
      : src,
    rel,
    typeof tgt === "string" && tgt.startsWith("::")
      ? `urn:ró:${tgt.slice(2)}`
      : tgt,
  ]];
}


/*
 * Allow search by season
 *
 */
export function addSeason(triple: Triple) {
  const [src, rel, tgt] = triple;

  if (rel !== KnownRelations.CREATED_AT) {
    return [triple];
  }

  const date = new Date(tgt);
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
      src,
      KnownRelations.SEASON,
      season,
    ],
  ];
}

/*
 * Add years as a relation, when a date is present
 *
 */
export function addYear(triple: Triple) {
  const [src, rel, tgt] = triple;

  if (rel !== KnownRelations.CREATED_AT) {
    return [triple];
  }

  const date = new Date(tgt);
  if (isNaN(date.getTime())) {
    return [triple];
  }

  const year = date.getUTCFullYear().toString();

  return [
    triple,
    [
      src,
      KnownRelations.YEAR,
      year,
    ],
  ];
}

/*
 * Reverse relationships
 *
 */
export function addInverseRelations(triple: Triple) {
  const [src, rel, tgt] = triple;

  for (const [left, right] of RelationSymmetries) {
    if (rel === left) {
      return [
        triple,
        [
          tgt,
          right,
          src,
        ],
      ];
    }
  }

  return [triple];
}

export function expandCurie(curies: Record<string, string>, value: string) {
  if (typeof value !== "string" || !CURIE_REGEX.test(value)) {
    return value;
  }
  const match = value.match(CURIE_REGEX);

  if (!match) {
    return value;
  }

  const prefix = match[1];
  const id = match[2];

  return curies[prefix] ? `${curies[prefix]}${id}` : value;
}

export function expandTripleCuries(
  triple: Triple,
) {
  const [src, rel, tgt] = triple;

  const expandedSource = expandCurie(CURIES, src);
  const expandedTarget = expandCurie(CURIES, tgt);

  if (CURIE_REGEX.test(expandedSource)) {
    throw new Error(
      `Source still matches CURIE regex after expansion: "${src}" ${expandedSource}`,
    );
  }
  if (CURIE_REGEX.test(expandedTarget)) {
    throw new Error(
      `Target still matches CURIE regex after expansion: "${tgt}" ${expandedTarget}`,
    );
  }

  return [
    [
      expandedSource,
      rel,
      expandedTarget,
    ],
  ];
}

export function deriveTriples(
  triple: Triple,
): Triple[] {
  const tripleProcessors = [
    convertRatingsToUrns,
    convertCountriesToUrns,
    convertRelationCasing,
    expandCdnUrls,
    expandUrns,
    addSeason,
    addYear,
    addInverseRelations,
    expandTripleCuries,
  ];

  let outputTriples: Triple[] = [triple];
  for (const fn of tripleProcessors) {
    outputTriples = outputTriples.flatMap(fn as any);
  }

  return outputTriples;
}
