// Handle relations that may be single-valued, multi-valued, or absent.
export function arrayify<Value>(value: Value | Value[] | undefined): Value[] {
  if (value === undefined) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}

// Distributes over unions, so `string | string[]` collapses to `string`.
type ElementOf<Value> = Value extends readonly (infer Element)[] ? Element
  : Value;

// Triple objects may hold multi-valued properties but often carry only one value.
export function one<Value>(
  value: Value | undefined,
): ElementOf<Value> | undefined {
  const first = Array.isArray(value) ? value[0] : value;
  return first as ElementOf<Value> | undefined;
}
