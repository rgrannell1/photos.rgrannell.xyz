export function capitalise(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Irregular plurals come from published listing entities.
export function pluralise(str: string): string {
  return str + "s";
}

export function countLabel(count: number, noun: string): string {
  const word = count === 1 ? noun : pluralise(noun);
  return `${count} ${word}`;
}

export function binomial(binomial: string) {
  const pretty = binomial.replace(/-/g, " ");
  return capitalise(pretty);
}

export function titleCase(str: string): string {
  return str.split(" ").map(capitalise).join(" ");
}

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
