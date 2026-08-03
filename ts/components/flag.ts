/*
 * Flag icons for territories that lack a Unicode flag. Known places map to
 * symbols in a single SVG sprite built from the vexilla assets; everything
 * else falls back to the emoji string from the triples.
 */

import m from "mithril";
import type { AppWindow } from "../types.ts";

// Place name to vexilla flag asset; see /flags
const CUSTOM_FLAGS: Record<string, string> = {
  "Tenerife": "es-tenerife",
  "Gran Canaria": "es-gran-canaria",
  "Lanzarote": "es-lanzarote",
  "Mallorca": "es-mallorca",
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
  "Fuerteventura": "es-fuerteventura",
  "La Palma": "es-la-palma",
  "La Gomera": "es-la-gomera",
  "El Hierro": "es-el-hierro",
  "Balearic Islands": "es-balears",
  "Menorca": "es-menorca",
  "Ibiza": "es-eivissa",
  "Catalonia": "es-catalonia",
  "Basque Country": "es-basque",
  "Galicia": "es-galicia",
  "Azores": "pt-azores",
  "Madeira": "pt-madeira",
  "Brittany": "fr-brittany",
  "Sicily": "it-sicily",
  "Sardinia": "it-sardinia",
  "Cornwall": "gb-cornwall",
  "Shetland": "gb-shetland",
  "Orkney": "gb-orkney",
  "Flanders": "be-flanders",
  "Friesland": "nl-frisia",
  "Sápmi": "eu-sapmi",
  "Crete": "gr-crete",
  "United Kingdom": "gb",
};

/*
 * Find the sprite symbol id for a place name, if one exists
 */
export function customFlagAsset(name: string | undefined): string | undefined {
  if (name && Object.prototype.hasOwnProperty.call(CUSTOM_FLAGS, name)) {
    return CUSTOM_FLAGS[name];
  }
  return undefined;
}

/*
 * The build-hashed sprite URL, baked into index.html.
 */
function spriteUrl(): string {
  return (window as AppWindow).flagSprite;
}

function ignoreError(): void {}

function warmFlagSprite(): void {
  fetch(spriteUrl(), { priority: "low" }).catch(ignoreError);
}

/*
 * Warm the flag sprite into the browser and service-worker cache without
 * blocking boot. Runs in idle time; failures are ignored.
 */
export function prefetchFlags(): void {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(warmFlagSprite, { timeout: 4000 });
  } else {
    setTimeout(warmFlagSprite, 1000);
  }
}

export type FlagIconAttrs = {
  name: string | undefined;
  emoji: string;
};

function viewFlagIcon(vnode: m.Vnode<FlagIconAttrs>): m.Children {
  const { name, emoji } = vnode.attrs;
  const asset = customFlagAsset(name);

  if (asset) {
    return m(
      "svg.flag-icon",
      { role: "img", "aria-label": `${name} flag` },
      m("use", { href: `${spriteUrl()}#${asset}` }),
    );
  }

  return emoji;
}

/*
 * Render a place flag: a sprite tile for mapped names, else the emoji.
 * The svg element is sized by CSS, so the layout never shifts on load.
 */
export function FlagIcon() {
  return { view: viewFlagIcon };
}
