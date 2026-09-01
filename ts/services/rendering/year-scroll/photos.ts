/* Browser helpers for photo loading and ThumbHash placeholders. */

/* Browser helpers for photo loading and ThumbHash placeholders. */
import { PHOTO_WIDTH } from "../../../constants/layout.ts";
import { ImageLoadingMode } from "../../../constants/display.ts";
import { isSome, type Maybe, NONE } from "../../../commons/collections/maybe.ts";
import {
  thumbHashFromBase64,
  thumbHashToRGBA,
} from "../../../vendor/thumbhash.ts";

const PLACEHOLDER_CACHE: Map<string, string> = new Map();
type DecodedThumbHash = ReturnType<typeof thumbHashToRGBA>;

/** Estimates how many square photos fit within the current viewport. */
function calculateVisibleImageCapacity(): number {
  const viewportWidth = globalThis.innerWidth;
  const viewportHeight = globalThis.innerHeight;
  const maxImagesPerRow = Math.floor(viewportWidth / PHOTO_WIDTH);
  const maxRowsInFold = Math.floor(viewportHeight / PHOTO_WIDTH);
  return maxImagesPerRow * maxRowsInFold;
}

/** Selects eager loading for images within or just beyond the initial fold. */
export function selectLoadingMode(idx: number): ImageLoadingMode {
  const imagesInFold = calculateVisibleImageCapacity();
  const isBelowFold = idx > imagesInFold + 1;
  return isBelowFold ? ImageLoadingMode.Lazy : ImageLoadingMode.Eager;
}

/** Decodes a ThumbHash, or returns NONE when the hash is malformed. */
function decodeThumbHash(hash: string): Maybe<DecodedThumbHash> {
  try {
    return thumbHashToRGBA(thumbHashFromBase64(hash));
  } catch {
    return NONE;
  }
}

/** Creates a canvas with the decoded ThumbHash dimensions. */
function createThumbHashCanvas(
  width: number,
  height: number,
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  const dimensions = { width, height };
  Object.assign(canvas, dimensions);
  return canvas;
}

/** Converts decoded RGBA bytes into browser image data. */
function createThumbHashPixels(decoded: DecodedThumbHash): ImageData {
  const { width, height, rgba } = decoded;
  const bytes = new Uint8ClampedArray(rgba);
  return new ImageData(bytes, width, height);
}

/** Draws decoded ThumbHash pixels onto a canvas. */
function drawThumbHash(
  canvas: HTMLCanvasElement,
  decoded: DecodedThumbHash,
): void {
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("context missing");
  }
  const pixels = createThumbHashPixels(decoded);
  context.putImageData(pixels, 0, 0);
}

/** Renders a decoded ThumbHash as a PNG data URL. */
function renderThumbHash(decoded: DecodedThumbHash): string {
  const { width, height } = decoded;
  const canvas = createThumbHashCanvas(width, height);
  drawThumbHash(canvas, decoded);
  return canvas.toDataURL("image/png");
}

/** Checks that a decoded ThumbHash has non-zero dimensions. */
function isValidThumbHash(
  decoded: Maybe<DecodedThumbHash>,
): decoded is DecodedThumbHash {
  return isSome(decoded) && Boolean(decoded.width) && Boolean(decoded.height);
}

/** Renders a ThumbHash and caches its PNG data URL by hash. */
function renderAndCacheThumbHash(
  hash: string,
  decoded: DecodedThumbHash,
): string {
  const dataUrl = renderThumbHash(decoded);
  PLACEHOLDER_CACHE.set(hash, dataUrl);
  return dataUrl;
}

/** Accepts current ThumbHashes and rejects missing, empty, or legacy values. */
function isSupportedThumbHash(hash: Maybe<string>): hash is string {
  return isSome(hash) && Boolean(hash) && !hash.startsWith("#");
}

/** Returns a rendered placeholder, or NONE when decoding produces no image. */
function renderDecodedThumbHash(hash: string): Maybe<string> {
  const decoded = decodeThumbHash(hash);
  if (!isValidThumbHash(decoded)) {
    return NONE;
  }
  return renderAndCacheThumbHash(hash, decoded);
}

/* ThumbHash to placeholder PNG. NONE for missing, legacy, or malformed hashes. */
/** Returns a cached PNG placeholder for a supported ThumbHash. */
export function thumbHashDataUrl(hash: Maybe<string>): Maybe<string> {
  if (!isSupportedThumbHash(hash)) {
    return NONE;
  }

  const supportedHash = hash;
  const cached = PLACEHOLDER_CACHE.get(supportedHash);
  if (cached !== undefined) {
    return cached;
  }

  return renderDecodedThumbHash(supportedHash);
}
