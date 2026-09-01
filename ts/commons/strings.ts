/** Uppercases the first character without changing the remaining text. */
export function capitalise(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Irregular plurals come from published listing entities.
/** Forms the default plural by appending "s". */
export function pluralise(str: string): string {
  return str + "s";
}

/** Formats a count with the singular or default plural noun. */
export function countLabel(count: number, noun: string): string {
  const word = count === 1 ? noun : pluralise(noun);
  return `${count} ${word}`;
}

/** Converts a hyphenated binomial name into display text. */
export function formatBinomial(binomial: string): string {
  const pretty = binomial.replace(/-/g, " ");
  return capitalise(pretty);
}

/** Capitalises each space-separated word. */
export function titleCase(str: string): string {
  return str.split(" ").map(capitalise).join(" ");
}

/** Converts hyphenated text to a sentence-style label. */
export function humanise(str: string): string {
  const spaced = str.replace(/-/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase();
}

/*
 * Markdown renderer is mangling descriptions.
 */
/** Restores escaped quotation marks before Markdown rendering. */
export function preprocessDescription(description: string): string {
  return description.replace(/\\"/g, '"');
}
