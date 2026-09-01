/* Pure labels for raw domain entities. */

/* Pure labels for raw domain entities. */
import { asUrn, type TripleObject } from "@rgrannell1/tribbledb";
import { selectFirst } from "../commons/collections/arrays.ts";
import { isNone, withDefault } from "../commons/collections/maybe.ts";
import { titleCase } from "../commons/strings.ts";

/** Selects the best available thing name and formats it as a title. */
export function formatTaxonLabel(taxon: TripleObject): string {
  const urn = selectFirst(taxon.id);
  const fallback = isNone(urn) ? "" : asUrn(urn).id.replace(/-/g, " ");
  const name = withDefault(selectFirst(taxon.name), fallback);
  const label = withDefault(selectFirst(taxon.commonName), name);

  return titleCase(String(label));
}
