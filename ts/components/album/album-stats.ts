import m from "mithril";
import type { AppWindow } from "../../types.ts";
import { parseStats } from "../../services/parsers.ts";

function viewAlbumStats(stats: ReturnType<typeof parseStats>): m.Children {
  if (!stats) {
    return m("p");
  }

  return m("p.photo-stats", [
    `${stats.photos} `,
    m("a", { href: "#/photos" }, "photos"),
    " · ",
    `${stats.videos} `,
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
    " · ",
    `${stats.unesco_sites} `,
    m("a", { href: "#/thing/place_feature:unesco" }, "UNESCO sites"),
  ]);
}

/*
 * Show statistics and links for the album pages
 */
export function AlbumStats() {
  const stats = parseStats((window as AppWindow).stats);

  return { view: viewAlbumStats.bind(null, stats) };
}
