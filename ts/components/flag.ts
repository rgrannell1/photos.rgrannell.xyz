/*
 * Flag icons from the vexilla assets. Places vexilla does not cover show no flag.
 */

import m from "mithril";
import { flagManifest } from "../services/flags.ts";

// Place name to vexilla flag asset. See /flags
const CUSTOM_FLAGS: Record<string, string> = {
  "Tenerife": "es-tenerife",
  "Gran Canaria": "es-gran-canaria",
  "Lanzarote": "es-lanzarote",
  "Mallorca": "es-mallorca",
  "Denmark": "dk",
  "Christiania": "dk-christiania",
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
 * Find the vexilla flag id for a place name, if one exists
 */
export function customFlagAsset(name: string | undefined): string | undefined {
  if (name && Object.prototype.hasOwnProperty.call(CUSTOM_FLAGS, name)) {
    return CUSTOM_FLAGS[name];
  }
  return undefined;
}

/*
 * Percentage positioning scales the icon with the font size, without a known
 * pixel cell width.
 */
function spriteCellStyle(position: number): Record<string, string> {
  const { sprite, count } = flagManifest();
  const offsetX = count > 1 ? (position / (count - 1)) * 100 : 0;

  return {
    "background-image": `url(${sprite})`,
    "background-size": "auto 100%",
    "background-position": `${offsetX}% 0`,
  };
}

export type FlagIconAttrs = {
  name: string | undefined;
  big?: boolean;
};

function viewFlagIcon(vnode: m.Vnode<FlagIconAttrs>): m.Children {
  const { name, big } = vnode.attrs;
  const asset = customFlagAsset(name);
  if (!asset) {
    return null;
  }

  const manifest = flagManifest();
  const label = `${name} flag`;

  // big flags over the byte budget fall back to the sprite cell
  if (big && manifest.big[asset]) {
    return m("img.flag-icon", {
      src: manifest.big[asset],
      alt: label,
      loading: "lazy",
    });
  }

  const position = manifest.positions[asset];
  if (position === undefined) {
    return null;
  }

  return m("span.flag-icon", {
    role: "img",
    "aria-label": label,
    style: spriteCellStyle(position),
  });
}

/*
 * CSS sizes the element, so the layout never shifts on load.
 */
export function FlagIcon() {
  return { view: viewFlagIcon };
}
