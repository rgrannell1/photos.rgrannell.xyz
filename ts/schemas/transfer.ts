/*
 * Valibot schema for transfer entities (travel between places).
 */

import * as v from "valibot";

export const TransferSchema = v.object({
  id: v.string(),
  source: v.string(),
  destination: v.string(),
  mode: v.optional(v.string()),
});
