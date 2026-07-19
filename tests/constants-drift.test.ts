/*
 * Guard against vocabulary drift between constants/ and the published
 * triples: every known relation and type must appear in the data, or be
 * declared as derived client-side. A mirror-side rename then fails here
 * instead of silently returning empty search results.
 */

import { KnownRelations, KnownTypes } from "../ts/constants/data.ts";
import { LISTED_TYPES, UNLISTED_SUBJECT_TYPES } from "../ts/constants/display.ts";

// relations added client-side by semantic/derive.ts, absent from the manifest
const DERIVED_RELATIONS = new Set<string>([
  KnownRelations.YEAR,
  KnownRelations.CONTAINS,
  KnownRelations.PLACES_WITH_FEATURE,
  KnownRelations.TRIP,
]);

// curie-shortened URNs look like [i:type:id]
const CURIE_TYPE_REGEX = /^\[i:([a-z_]+):/;

async function loadPublishedVocabulary() {
  const envUrl = new URL("../manifest/env.json", import.meta.url);
  const env = JSON.parse(await Deno.readTextFile(envUrl));

  const triplesUrl = new URL(
    `../manifest/triples.${env.publication_id}.json`,
    import.meta.url,
  );
  const triples: [unknown, string, unknown][] = JSON.parse(
    await Deno.readTextFile(triplesUrl),
  );

  const relations = new Set<string>();
  const types = new Set<string>();
  const subjectTypes = new Set<string>();

  for (const [source, relation, target] of triples) {
    relations.add(relation);

    for (const value of [source, target]) {
      if (typeof value !== "string") {
        continue;
      }
      const match = CURIE_TYPE_REGEX.exec(value);
      if (match) {
        types.add(match[1]);
      }
    }

    if (relation === KnownRelations.SUBJECT && typeof target === "string") {
      const match = CURIE_TYPE_REGEX.exec(target);
      if (match) {
        subjectTypes.add(match[1]);
      }
    }
  }

  return { relations, types, subjectTypes };
}

const { relations, types, subjectTypes } = await loadPublishedVocabulary();

Deno.test("every KnownRelations value exists in the data or is derived", () => {
  const testCases = Object.entries(KnownRelations) as [string, string][];

  const missing = testCases.filter(([, relation]) =>
    !relations.has(relation) && !DERIVED_RELATIONS.has(relation)
  );

  if (missing.length > 0) {
    throw new Error(
      `relations missing from published data: ${JSON.stringify(missing)}`,
    );
  }
});

Deno.test("every KnownTypes value exists in the data", () => {
  const testCases = Object.entries(KnownTypes) as [string, string][];

  const missing = testCases.filter(([, typeName]) => !types.has(typeName));

  if (missing.length > 0) {
    throw new Error(
      `types missing from published data: ${JSON.stringify(missing)}`,
    );
  }
});

Deno.test("every subject type in the data is listed or deliberately unlisted", () => {
  const listed = new Set(LISTED_TYPES.map(([typeName]) => typeName));

  const unreachable = [...subjectTypes].filter((typeName) =>
    !listed.has(typeName) && !UNLISTED_SUBJECT_TYPES.has(typeName)
  );

  if (unreachable.length > 0) {
    throw new Error(
      `subject types unreachable from the listings index: ${
        JSON.stringify(unreachable)
      }`,
    );
  }
});
