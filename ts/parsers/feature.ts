import { TribbleDB } from "@rgrannell1/tribbledb";
import type { TripleObject } from "@rgrannell1/tribbledb";
import type { Feature } from "../types.ts";
import { FeatureSchema } from "./schemas.ts";
import { parseObject } from "./parser.ts";

/* */
export function parseFeature(
  _: TribbleDB,
  feature: TripleObject,
) {
  return parseObject(FeatureSchema, "feature", feature);
}
