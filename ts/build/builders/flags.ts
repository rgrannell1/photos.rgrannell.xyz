/* Support builders operations. */

/* Support builders operations. */
import type {
  PublishedBigFlag,
  PublishedSprite,
  SpriteMetadata,
} from "./builders.ts";
import { formatDigest } from "./source.ts";

/** Returns a stable SHA-256 digest for binary asset content. */
export async function hashBytes(
  bytes: Uint8Array<ArrayBuffer>,
): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return formatDigest(digest);
}

/** Handles an absent flag asset during an idempotent reset. */
export function ignoreMissingFlagAssets(): void {
  return;
}

/** Removes generated flag sprites while preserving vendor source assets. */
export async function removeGeneratedFlagSprites(): Promise<void> {
  for await (const entry of Deno.readDir("flags")) {
    const isGeneratedSprite = entry.isFile && entry.name.startsWith("sprite.");
    if (isGeneratedSprite) {
      await Deno.remove(`flags/${entry.name}`);
    }
  }
}

/** Recreates the output directory for hashed full-size flag assets. */
export async function resetBigFlagDirectory(): Promise<void> {
  const directory = "flags/big";
  const options = { recursive: true };
  await Deno.remove(directory, options).catch(ignoreMissingFlagAssets);
  await Deno.mkdir(directory, options);
}

/** Clears all generated flag assets before publication. */
export async function clearFlagAssets(): Promise<void> {
  await removeGeneratedFlagSprites();
  await resetBigFlagDirectory();
}

/** Copies one vendor flag to a content-addressed public path. */
export async function publishBigFlag(
  entryName: string,
): Promise<PublishedBigFlag> {
  const flagId = entryName.replace(/\.svg$/, "");
  const bytes = await Deno.readFile(`flags/vendor/big/${entryName}`);
  const hash = await hashBytes(bytes);
  const outputPath = `flags/big/${flagId}.${hash}.svg`;
  const url = `/flags/big/${flagId}.${hash}.svg`;
  await Deno.writeFile(outputPath, bytes);
  return { id: flagId, url };
}

/** Publishes the vendor sprite under its content hash and returns that hash. */
export async function publishSpriteBytes(): Promise<string> {
  const bytes = await Deno.readFile("flags/vendor/sprite.avif");
  const hash = await hashBytes(bytes);
  await Deno.writeFile(`flags/sprite.${hash}.avif`, bytes);
  return hash;
}

/** Reads the metadata that maps flags to positions in the vendor sprite. */
export async function readSpriteMetadata(): Promise<SpriteMetadata> {
  const content = await Deno.readTextFile("flags/vendor/sprite.json");
  return JSON.parse(content);
}

/** Publishes the flag sprite and returns its hash with its layout metadata. */
export async function publishFlagSprite(): Promise<PublishedSprite> {
  const hash = await publishSpriteBytes();
  const metadata = await readSpriteMetadata();
  return { hash, metadata };
}

/** Publishes every full-size SVG flag and maps each flag ID to its public URL. */
export async function publishBigFlags(): Promise<Record<string, string>> {
  const big: Record<string, string> = {};
  for await (const entry of Deno.readDir("flags/vendor/big")) {
    if (!entry.name.endsWith(".svg")) {
      continue;
    }
    const published = await publishBigFlag(entry.name);
    big[published.id] = published.url;
  }
  return big;
}
