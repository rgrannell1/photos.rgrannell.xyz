/* Browser helpers for photo loading and ThumbHash placeholders. */

import { PHOTO_WIDTH } from "../../constants/layout.ts";
import { isNone, type Maybe, NONE } from "../../commons/maybe.ts";
import { thumbHashFromBase64, thumbHashToRGBA } from "../../vendor/thumbhash.ts";

const PLACEHOLDER_CACHE: Map<string, string> = new Map();

export function loadingMode(idx: number): "eager" | "lazy" {
  const viewportWidth = globalThis.innerWidth;
  const viewportHeight = globalThis.innerHeight;
  const maxImagesPerRow = Math.floor(viewportWidth / PHOTO_WIDTH);
  const maxRowsInFold = Math.floor(viewportHeight / PHOTO_WIDTH);

  return idx > (maxImagesPerRow * maxRowsInFold) + 1 ? "lazy" : "eager";
}

/* ThumbHash to placeholder PNG. NONE for missing, legacy, or malformed hashes. */
export function thumbHashDataUrl(hash: Maybe<string>): Maybe<string> {
  const isUnsupportedHash = isNone(hash) || !hash || hash.startsWith("#");
  if (isUnsupportedHash) {
    return NONE;
  }

  const cached = PLACEHOLDER_CACHE.get(hash);
  if (cached !== undefined) {
    return cached;
  }

  let decoded;
  try {
    decoded = thumbHashToRGBA(thumbHashFromBase64(hash));
  } catch {
    return NONE;
  }
  const { width, height, rgba } = decoded;
  if (!width || !height) {
    return NONE;
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("context missing");
  }

  const pixels = new ImageData(new Uint8ClampedArray(rgba), width, height);
  context.putImageData(pixels, 0, 0);

  const dataUrl = canvas.toDataURL("image/png");
  PLACEHOLDER_CACHE.set(hash, dataUrl);
  return dataUrl;
}
