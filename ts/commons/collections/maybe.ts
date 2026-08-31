/* Represent values that can be missing. */

export const NONE = Symbol("none");

export type None = typeof NONE;
export type Present<Value> = Exclude<Value, None | undefined>;
export type Maybe<Value> = Exclude<Value, undefined> | None;

/** Wraps a defined value as an optional value. */
export function some<Value>(value: Exclude<Value, undefined>): Maybe<Value> {
  return value;
}

/** Converts null or undefined to the missing-value sentinel. */
export function fromNullable<Value>(
  value: Value | null | undefined,
): Maybe<NonNullable<Value>> {
  return value === null || value === undefined ? NONE : value;
}

/** Reports whether an optional value is the missing-value sentinel. */
export function isNone<Value>(value: Maybe<Value>): value is None {
  return value === NONE;
}

/** Converts the missing-value sentinel to undefined. */
export function toUndefined<Value>(
  value: Maybe<Value>,
): Exclude<Value, undefined> | undefined {
  return isNone(value) ? undefined : value;
}

/** Reports whether an optional value is present. */
export function isSome<Value>(
  value: Maybe<Value>,
): value is Exclude<Value, undefined> {
  return value !== NONE;
}

/** Transforms a present value and preserves a missing value. */
export function mapMaybe<Input, Output>(
  value: Maybe<Input>,
  transform: (value: Exclude<Input, undefined>) => Exclude<Output, undefined>,
): Maybe<Output> {
  return isNone(value) ? NONE : transform(value);
}

/** Returns a present value or the supplied fallback. */
export function withDefault<Value>(
  value: Maybe<Value>,
  fallback: Exclude<Value, undefined>,
): Exclude<Value, undefined> {
  return isNone(value) ? fallback : value;
}
