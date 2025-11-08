import m from "mithril";
import type { AppWindow, Stats } from "../types";

/*
 * We inject this in at runtime, so validate its structure
 *
 */
function isStats(stats: unknown): stats is Stats {
  if (typeof stats !== "object" || stats === null) {
    console.warn("Stats is not an object");
  }

  const keys = [
    "photos",
    "albums",
    "years",
    "countries",
    "bird_species",
    "mammal_species",
    "amphibian_species",
    "reptile_species",
    "unesco_sites",
  ] as const;

  for (const key of keys) {
    if (!(key in stats)) {
      console.warn(`Stats is missing key: ${key}`);
    }

    if (typeof (stats as Record<string, unknown>)[key] !== "number") {
      console.warn(`Stats key ${key} is not a number`);
    }
  }

  return true;
}

/*
 * Show statistics and links for the album pages
 *
 */
export function AlbumStats() {
  const stats = (window as AppWindow).stats;

  return {
    view() {
      if (!isStats(stats)) {
        return m("p");
      }

      return m("p.photo-stats", [
        `${stats.photos} `,
        m("a", { href: "#/photos" }, "photos"),
        " · ",
        m("a", { href: "#/videos" }, "videos"),
        " · ",
        `${stats.albums} albums · ${stats.years} years · `,
        `${stats.countries} `,
        m("a", { href: "#/listing/country" }, "countries"),
        " · ",
        `${stats.bird_species} `,
        m("a", { href: "#/listing/bird" }, "bird species"),
        " · ",
        `${stats.mammal_species} `,
        m("a", { href: "#/listing/mammal" }, "mammal species"),
        " · a few ",
        m("a", { href: "#/listing/amphibian" }, "amphibians"),
        " and ",
        m("a", { href: "#/listing/reptile" }, "reptiles"),
        " · ",
        `${stats.unesco_sites} `,
        m("a", { href: "#/thing/unesco:*" }, "UNESCO sites"),
      ]);
    },
  };
}
