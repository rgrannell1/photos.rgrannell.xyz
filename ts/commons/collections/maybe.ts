/* Represent values that can be missing. */

export const NONE = Symbol("none");

export type None = typeof NONE;
export type Present<Value> = Exclude<Value, None | undefined>;
export type Maybe<Value> = Exclude<Value, undefined> | None;

export function some<Value>(value: Exclude<Value, undefined>): Maybe<Value> {
  return value;
}

export function fromNullable<Value>(
  value: Value | null | undefined,
): Maybe<NonNullable<Value>> {
  return value === null || value === undefined ? NONE : value;
}

export function isNone<Value>(value: Maybe<Value>): value is None {
  return value === NONE;
}

export function toUndefined<Value>(
  value: Maybe<Value>,
): Exclude<Value, undefined> | undefined {
  return isNone(value) ? undefined : value;
}

export function isSome<Value>(
  value: Maybe<Value>,
): value is Exclude<Value, undefined> {
  return value !== NONE;
}

export function mapMaybe<Input, Output>(
  value: Maybe<Input>,
  transform: (value: Exclude<Input, undefined>) => Exclude<Output, undefined>,
): Maybe<Output> {
  return isNone(value) ? NONE : transform(value);
}

export function withDefault<Value>(
  value: Maybe<Value>,
  fallback: Exclude<Value, undefined>,
): Exclude<Value, undefined> {
  return isNone(value) ? fallback : value;
}
