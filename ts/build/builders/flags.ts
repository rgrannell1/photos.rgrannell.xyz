/* Support builders operations. */

/* Support builders operations. */
import type {
  PublishedBigFlag,
  PublishedSprite,
  SpriteMetadata,
} from "./builders.ts";
import { formatDigest } from "./source.ts";

export async function hashBytes(
  bytes: Uint8Array<ArrayBuffer>,
): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return formatDigest(digest);
}

export function ignoreMissingFlagAssets(): void {
  return;
}

export async function removeGeneratedFlagSprites(): Promise<void> {
  for await (const entry of Deno.readDir("flags")) {
    const isGeneratedSprite = entry.isFile && entry.name.startsWith("sprite.");
    if (isGeneratedSprite) {
      await Deno.remove(`flags/${entry.name}`);
    }
  }
}

export async function resetBigFlagDirectory(): Promise<void> {
  const directory = "flags/big";
  const options = { recursive: true };
  await Deno.remove(directory, options).catch(ignoreMissingFlagAssets);
  await Deno.mkdir(directory, options);
}

export async function clearFlagAssets(): Promise<void> {
  await removeGeneratedFlagSprites();
  await resetBigFlagDirectory();
}

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

export async function publishSpriteBytes(): Promise<string> {
  const bytes = await Deno.readFile("flags/vendor/sprite.avif");
  const hash = await hashBytes(bytes);
  await Deno.writeFile(`flags/sprite.${hash}.avif`, bytes);
  return hash;
}

export async function readSpriteMetadata(): Promise<SpriteMetadata> {
  const content = await Deno.readTextFile("flags/vendor/sprite.json");
  return JSON.parse(content);
}

export async function publishFlagSprite(): Promise<PublishedSprite> {
  const hash = await publishSpriteBytes();
  const metadata = await readSpriteMetadata();
  return { hash, metadata };
}

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
