/* Maybe value tests. */

import {
  fromNullable,
  isNone,
  isSome,
  mapMaybe,
  NONE,
  some,
  toUndefined,
  withDefault,
} from "../ts/commons/collections/maybe.ts";
import { arrayify, one } from "../ts/commons/collections/arrays.ts";
import { setify } from "../ts/commons/collections/sets.ts";

Deno.test("Maybe identifies present and missing values", () => {
  if (!isSome(some("bird")) || isSome(NONE)) throw new Error("wrong some result");
  if (!isNone(NONE) || isNone(some("bird"))) throw new Error("wrong none result");
});

Deno.test("Maybe converts nullable boundary values", () => {
  if (fromNullable(null) !== NONE || fromNullable(undefined) !== NONE) {
    throw new Error("kept a missing boundary value");
  }
  if (fromNullable("bird") !== "bird") throw new Error("lost boundary value");
  if (toUndefined(NONE) !== undefined) throw new Error("lost undefined boundary");
});

Deno.test("mapMaybe changes present values only", () => {
  const length = mapMaybe(some("bird"), (value) => value.length);
  if (length !== 4 || mapMaybe(NONE, String) !== NONE) {
    throw new Error("wrong mapped value");
  }
});

Deno.test("withDefault unwraps values", () => {
  if (withDefault(some("bird"), "none") !== "bird") throw new Error("lost value");
  if (withDefault<string>(NONE, "none") !== "none") {
    throw new Error("lost fallback");
  }
});

Deno.test("collection helpers preserve Maybe absence", () => {
  if (one<string>(NONE) !== NONE) throw new Error("one lost NONE");
  if (one(["bird", "mammal"]) !== "bird") throw new Error("one lost first");
  if (arrayify<string>(NONE).length !== 0) throw new Error("arrayify kept NONE");
  if (setify<string>(NONE).size !== 0) throw new Error("setify kept NONE");
});
