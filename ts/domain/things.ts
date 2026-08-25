/* Pure labels for raw domain entities. */

import { asUrn, type TripleObject } from "@rgrannell1/tribbledb";
import { one } from "../commons/arrays.ts";
import { isNone, withDefault } from "../commons/maybe.ts";
import { titleCase } from "../commons/strings.ts";

export function taxonLabel(taxon: TripleObject): string {
  const urn = one(taxon.id);
  const fallback = isNone(urn) ? "" : asUrn(urn).id.replace(/-/g, " ");
  const name = withDefault(one(taxon.name), fallback);
  const label = withDefault(one(taxon.commonName), name);

  return titleCase(String(label));
}
