

export function arrayify<T>(value: T | T[] | undefined): T[] {
  if (value === undefined) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
}


export function one<T>(value: T | T[] | undefined): T | undefined {
  if (value === undefined) {
    return undefined;
  }

  return Array.isArray(value) ? value[0] : value;
}
