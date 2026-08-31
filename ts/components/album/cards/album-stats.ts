import m from "mithril";
import type { AppWindow, Stats } from "../../../types/browser.ts";
import { parseStats } from "../../../services/browser/stats.ts";

/** Draws a count followed by its linked label. */
function drawLinkedCount(
  count: number,
  href: string,
  label: string,
): m.Children[] {
  const countText = `${count} `;
  const link = m("a", { href }, label);
  return [countText, link];
}

/** Draws linked photo and video totals. */
function drawMediaStats(stats: Stats): m.Children[] {
  const photos = drawLinkedCount(stats.photos, "#/photos", "photos");
  const videos = drawLinkedCount(stats.videos, "#/videos", "videos");
  return [...photos, " · ", ...videos, " · "];
}

/** Draws linked bird and mammal species totals. */
function drawSpeciesStats(stats: Stats): m.Children[] {
  const birds = drawLinkedCount(
    stats.bird_species,
    "#/listing/bird",
    "bird species",
  );
  const mammals = drawLinkedCount(
    stats.mammal_species,
    "#/listing/mammal",
    "mammal species",
  );
  return [...birds, " · ", ...mammals, " · "];
}

/** Renders parsed album statistics or an empty paragraph when invalid. */
function viewAlbumStats(result: ReturnType<typeof parseStats>): m.Children {
  if (!result.ok) {
    return m("p");
  }
  const stats = result.value;
  const mediaStats = drawMediaStats(stats);
  const timeStats = `${stats.albums} albums · ${stats.years} years · `;
  const countries = drawLinkedCount(
    stats.countries,
    "#/listing/country",
    "countries",
  );
  const speciesStats = drawSpeciesStats(stats);
  const sites = drawLinkedCount(
    stats.unesco_sites,
    "#/thing/place_feature:unesco",
    "UNESCO sites",
  );

  return m("p.photo-stats", [
    mediaStats,
    timeStats,
    countries,
    " · ",
    speciesStats,
    sites,
  ]);
}

/** Defines the album statistics component from embedded window data. */
export function AlbumStats() {
  const stats = parseStats((window as AppWindow).stats);

  return { view: viewAlbumStats.bind(null, stats) };
}
