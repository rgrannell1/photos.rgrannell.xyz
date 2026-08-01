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
        return m("img.flag-icon", { src, alt: `${name} flag`, loading: "lazy" });
      }

      return emoji;
    },
  };
}
