import m from "mithril";
import type { AppWindow } from "../../types/browser.ts";
import { parseStats } from "../../services/browser/stats.ts";

function viewAlbumStats(result: ReturnType<typeof parseStats>): m.Children {
  if (!result.ok) {
    return m("p");
  }
  const stats = result.value;

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

export function AlbumStats() {
  const stats = parseStats((window as AppWindow).stats);

  return { view: viewAlbumStats.bind(null, stats) };
}
