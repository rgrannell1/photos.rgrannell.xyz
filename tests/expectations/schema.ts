/* Schema expectations for generated test data. */

import { type GenericSchema, safeParse } from "valibot";

export function expectValuesMatchSchema(
  schema: GenericSchema,
  values: unknown[],
  context: string,
): void {
  for (let idx = 0; idx < values.length; idx++) {
    const result = safeParse(schema, values[idx]);
    if (!result.success) {
      throw new Error(`${context} ${idx} is invalid: ${JSON.stringify(result.issues)}`);
    }
  }
}
