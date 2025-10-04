import { PHOTO_WIDTH } from "../constants";

const coloursCache: Map<string, string> = new Map();

export class Photos {
  /*
   * Determine whether a photo should be eagerly or lazily loaded
   * depending on page position
   */
  static loadingMode(idx: number): "eager" | "lazy" {
    const viewportWidth = globalThis.innerWidth;
    const viewportHeight = globalThis.innerHeight;

    const imageDimension = PHOTO_WIDTH;
    const maxImagesPerRow = Math.floor(viewportWidth / imageDimension);
    const maxRowsInFold = Math.floor(viewportHeight / imageDimension);

    return idx > (maxImagesPerRow * maxRowsInFold) + 1 ? "lazy" : "eager";
  }

  /*
   * Convert a mosaic colour string into a bitmap data URL
   *
   */
  static encodeBitmapDataURL(colours: string): string {
    if (coloursCache.has(colours)) {
      return coloursCache.get(colours) as string;
    }

    const coloursList = colours.split("#").map((colour: string) =>
      `#${colour}`
    );
    const canvas = document.createElement("canvas");
    canvas.width = 2;
    canvas.height = 2;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("context missing");
    }
    ctx.fillStyle = coloursList[1];
    ctx.fillRect(0, 0, 1, 1);
    ctx.fillStyle = coloursList[2];
    ctx.fillRect(1, 0, 1, 1);
    ctx.fillStyle = coloursList[3];
    ctx.fillRect(0, 1, 1, 1);
    ctx.fillStyle = coloursList[4];
    ctx.fillRect(1, 1, 1, 1);

    coloursCache.set(colours, canvas.toDataURL("image/png"));
    return coloursCache.get(colours) as string;
  }
}
