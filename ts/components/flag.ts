/*
 * Flag icons from the vexilla assets. Places vexilla does not cover show no flag.
 */

import m from "mithril";
import { flagManifest } from "../services/browser/flags.ts";
import { isNone, type Maybe, NONE } from "../commons/collections/maybe.ts";

// Place name to vexilla flag asset. See /flags
const CUSTOM_FLAGS: Record<string, string> = {
  "Tenerife": "es-tenerife",
  "Gran Canaria": "es-gran-canaria",
  "Lanzarote": "es-lanzarote",
  "Mallorca": "es-mallorca",
  "Denmark": "dk",
  "Freetown Christiania": "dk-christiania",
  "England": "gb-england",
  "France": "fr",
  "Germany": "de",
  "Ireland": "ie",
  "Italy": "it",
  "Northern Ireland": "gb",
  "Norway": "no",
  "Portugal": "pt",
  "Scotland": "gb-scotland",
  "Slovenia": "si",
  "Spain": "es",
  "Sweden": "se",
  "Switzerland": "ch",
  "The Netherlands": "nl",
  "United States of America": "us",
  "Wales": "gb-wales",
  "United Kingdom": "gb",
};

/*
 * Find the vexilla flag id for a place name, if one exists
 */
export function customFlagAsset(name: Maybe<string>): Maybe<string> {
  const hasCustomFlag = !isNone(name) &&
    Object.prototype.hasOwnProperty.call(CUSTOM_FLAGS, name);
  if (hasCustomFlag) {
    const asset = CUSTOM_FLAGS[name];
    return asset;
  }
  return NONE;
}

function spriteOffset(position: number, count: number): number {
  return count > 1 ? (position / (count - 1)) * 100 : 0;
}

/*
 * Percentage positioning scales the icon with the font size, without a known
 * pixel cell width.
 */
function spriteCellStyle(position: number): Record<string, string> {
  const { sprite, count } = flagManifest();
  const offsetX = spriteOffset(position, count);

  return {
    "background-image": `url(${sprite})`,
    "background-size": "auto 100%",
    "background-position": `${offsetX}% 0`,
  };
}

function drawFlagImage(src: string, label: string): m.Children {
  return m("img.flag-icon", { src, alt: label, loading: "lazy" });
}

export type FlagIconAttrs = {
  name: Maybe<string>;
  big?: boolean;
};

function drawLargeFlag(
  asset: string,
  label: string,
  big: boolean | undefined,
): m.Children {
  const largeAsset = flagManifest().big[asset];
  if (big !== true || largeAsset === undefined) {
    return null;
  }
  return drawFlagImage(largeAsset, label);
}

function drawFlagSprite(position: number, label: string): m.Children {
  const style = spriteCellStyle(position);
  const attrs = { role: "img", "aria-label": label, style };
  return m("span.flag-icon", attrs);
}

function drawSpriteFlag(asset: string, label: string): m.Children {
  const position = flagManifest().positions[asset];
  if (position === undefined) {
    return null;
  }
  return drawFlagSprite(position, label);
}

function drawFlag(asset: string, label: string, big?: boolean): m.Children {
  const largeFlag = drawLargeFlag(asset, label, big);
  if (largeFlag !== null) {
    return largeFlag;
  }
  const spriteFlag = drawSpriteFlag(asset, label);
  return spriteFlag;
}

function viewFlagIcon(vnode: m.Vnode<FlagIconAttrs>): m.Children {
  const { name, big } = vnode.attrs;
  const asset = customFlagAsset(name);
  if (isNone(name) || isNone(asset)) {
    return null;
  }

  const label = `${name} flag`;
  return drawFlag(asset, label, big);
}

/*
 * CSS sizes the element, so the layout never shifts on load.
 */
export function FlagIcon() {
  return { view: viewFlagIcon };
}
