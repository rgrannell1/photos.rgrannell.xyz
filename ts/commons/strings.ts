/* String Utilities */

export function capitalise(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/*
 * Naive plural; type labels with irregular plurals come from the published
 * listing entities, not from here.
 */
export function pluralise(str: string): string {
  return str + "s";
}

/*
 * A count with its pluralised noun, e.g countLabel(3, "photo") -> "3 photos"
 * and countLabel(1, "photo") -> "1 photo".
 */
export function countLabel(count: number, noun: string): string {
  const word = count === 1 ? noun : pluralise(noun);
  return `${count} ${word}`;
}

export function binomial(binomial: string) {
  const pretty = binomial.replace(/-/g, " ");
  return capitalise(pretty);
}

/**
 * Humanise an id for display (e.g. "train station" -> "Train station",
 * "national-park" -> "National park").
 */
export function humanise(str: string): string {
  const spaced = str.replace(/-/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase();
}

/*
 * Markdown renderer is mangling descriptions.
 */
export function preprocessDescription(description: string): string {
  return description.replace(/\\"/g, '"');
}
