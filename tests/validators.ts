import { Expectations, ValidationError, Validator } from "./types.ts";

export function relations(expectations: Expectations): Validator {
  return function (object: unknown): ValidationError[] {
    if (typeof object !== "object" || object === null) {
      return [{
        message: "non-object tripleobject passed",
      }];
    }

    const results: ValidationError[] = [];
    const encounteredRelations: Set<string> = new Set();

    for (const [rel, value] of Object.entries(object)) {
      const checker = expectations[rel];

      if (!checker) {
        continue;
      }

      encounteredRelations.add(rel);

      const subcheck = checker(value);
      if (subcheck.length > 0) {
        // TODO, merge subchecks in here.
        results.push({
          message: `failed check for relation ${rel}`,
        });
        results.push(...subcheck);
      }
    }

    for (const rel of Object.keys(expectations)) {
      if (!encounteredRelations.has(rel)) {
        results.push({
          message: `triple object missing expected relation ${rel}`,
        });
      }
    }

    return [];
  };
}

export function string(value: unknown): ValidationError[] {
  if (typeof value !== "string") {
    return [{
      message: `expected string, received ${value} (${typeof value})`,
    }];
  }

  if (value.length === 0) {
    return [{ message: "received empty string" }];
  }

  return [];
}
