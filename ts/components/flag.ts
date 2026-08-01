/*
 * Flag icons for territories that lack a Unicode flag. Known places map to
 * SVG assets from the vexilla project; everything else falls back to the
 * emoji string from the triples.
 */

import m from "mithril";

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
  "Mount Athos": "gr-mount-athos",
  "Ionian Islands": "gr-ionian-islands",
  "United Kingdom": "gb",
};

/*
 * Find the custom flag asset path for a place name, if one exists
 */
export function customFlagSrc(name: string | undefined): string | undefined {
  if (name && Object.prototype.hasOwnProperty.call(CUSTOM_FLAGS, name)) {
    return `/flags/${CUSTOM_FLAGS[name]}.svg`;
  }
  return undefined;
}

/*
 * Warm every flag into the browser and service-worker cache without
 * blocking boot. Runs in idle time; failures are ignored.
 */
export function prefetchFlags(): void {
  const warm = () => {
    for (const asset of Object.values(CUSTOM_FLAGS)) {
      fetch(`/flags/${asset}.svg`, { priority: "low" }).catch(() => {});
    }
  };

  if ("requestIdleCallback" in window) {
    requestIdleCallback(warm, { timeout: 4000 });
  } else {
    setTimeout(warm, 1000);
  }
}

export type FlagIconAttrs = {
  name: string | undefined;
  emoji: string;
};

/*
 * Render a place flag: a custom SVG for mapped names, else the emoji
 */
export function FlagIcon() {
  return {
    view(vnode: m.Vnode<FlagIconAttrs>) {
      const { name, emoji } = vnode.attrs;
      const src = customFlagSrc(name);

      if (src) {
        return m("img.flag-icon", { src, alt: `${name} flag` });
      }

      return emoji;
    },
  };
}
