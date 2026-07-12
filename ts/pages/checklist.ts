import m from "mithril";
import { broadcast } from "../commons/events.ts";
import { ImagePair } from "../components/photo.ts";
import { encodeBitmapDataURL } from "../services/photos.ts";
import type { Photo, Services } from "../types.ts";
import type { ChecklistEntry } from "../services/stats.ts";

// Side length in pixels of the per-species cover thumbnail in the life-list.
const CHECKLIST_THUMB_PX = 144;

/*
 * Parse a Unix timestamp string into a Date.
 * Handles both second-precision (10-digit) and millisecond-precision (13-digit) timestamps.
 */
function parseFirstSeen(timestamp: string): Date {
  const numeric = parseInt(timestamp);
  // Heuristic: timestamps under 10^10 are in seconds, larger are in milliseconds
  return numeric > 9_999_999_999 ? new Date(numeric) : new Date(numeric * 1000);
}

/*
 * Format a Unix timestamp string into a human-readable date.
 */
function formatFirstSeen(timestamp: string): string {
  return parseFirstSeen(timestamp).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/*
 * The calendar year a bird was first seen in.
 */
function firstSeenYear(timestamp: string): number {
  return parseFirstSeen(timestamp).getFullYear();
}

/*
 * Details line above the checklist with three filter options:
 * Irish wild only, all wild, or all (including captive).
 */
function ChecklistDetails() {
  return {
    view(
      vnode: m.Vnode<
        {
          entries: ChecklistEntry[];
          filter: string | undefined;
          onSelect: (filter: string | undefined) => void;
        }
      >,
    ) {
      const { entries, filter, onSelect } = vnode.attrs;

      const irishWildCount =
        entries.filter((entry) => entry.isIrish && entry.isWild).length;
      const wildCount = entries.filter((entry) => entry.isWild).length;
      const totalCount = entries.length;

      const displayCount = filter === "ireland"
        ? irishWildCount
        : filter === "all"
        ? totalCount
        : wildCount;

      return m(
        "p.listing-details",
        m("span.listing-filter-flag", {
          title: "Irish wild species",
          class: filter === "ireland"
            ? "listing-filter-flag--selected"
            : undefined,
          onclick: () => onSelect("ireland"),
        }, "🇮🇪"),
        " ",
        m("span.listing-filter-flag", {
          title: "All wild species",
          class: !filter ? "listing-filter-flag--selected" : undefined,
          onclick: () => onSelect(undefined),
        }, "🗺️"),
        " ",
        m("span.listing-filter-flag", {
          title: "All species including captive",
          class: filter === "all" ? "listing-filter-flag--selected" : undefined,
          onclick: () => onSelect("all"),
        }, "all"),
        ` · ${displayCount} species`,
      );
    },
  };
}

/*
 * The per-species cover thumbnail cell, with a blur-up placeholder. Links to the
 * species page. Renders an empty cell when a species has no cover photo.
 */
function ChecklistPhoto() {
  return {
    view(vnode: m.Vnode<{ cover: Photo | undefined; href: string }>) {
      const { cover, href } = vnode.attrs;

      if (!cover) {
        return m("td.checklist-photo");
      }

      return m("td.checklist-photo", m(ImagePair, {
        href,
        thumbnailUrl: cover.thumbnailUrl,
        thumbnailDataUrl: encodeBitmapDataURL(cover.mosaicColours),
        loading: "lazy",
        onclick: undefined,
        width: CHECKLIST_THUMB_PX,
        height: CHECKLIST_THUMB_PX,
      }));
    },
  };
}

/*
 * A single row in the checklist table.
 */
function ChecklistRow() {
  return {
    view(
      vnode: m.Vnode<
        {
          entry: ChecklistEntry;
          cover: Photo | undefined;
          position: number;
          highlightedYear: boolean;
        }
      >,
    ) {
      const { entry, cover, position, highlightedYear } = vnode.attrs;
      const href = `#/thing/bird:${entry.birdId}`;

      return m("tr.checklist-row", [
        m("td.checklist-number", {
          class: highlightedYear ? "checklist-number--highlighted" : undefined,
        }, `${position}`),
        m(ChecklistPhoto, { cover, href }),
        m("td.checklist-name", [
          entry.isIrish ? m("span.checklist-irish-flag", "🇮🇪 ") : null,
          m("a.checklist-name-link", { href }, entry.name),
        ]),
        m("td.checklist-first-seen", formatFirstSeen(entry.firstSeen)),
      ]);
    },
  };
}

/*
 * The checklist table itself.
 */
function ChecklistTable() {
  return {
    view(
      vnode: m.Vnode<
        {
          entries: ChecklistEntry[];
          covers: Map<string, Photo>;
          filter: string | undefined;
        }
      >,
    ) {
      const { entries, covers, filter } = vnode.attrs;

      // Assign position numbers from the full unfiltered list, then apply filter
      const withPositions = entries.map((entry, idx) => ({
        entry,
        position: idx + 1,
      }));
      const displayed = filter === "ireland"
        ? withPositions.filter(({ entry }) => entry.isIrish && entry.isWild)
        : filter === "all"
        ? withPositions
        : withPositions.filter(({ entry }) => entry.isWild);

      // Alternate year bands between dimmed and highlighted position numbers,
      // so it is easy to see which birds were first seen in which year
      const yearParity = new Map<number, number>();
      for (const { entry } of displayed) {
        const year = firstSeenYear(entry.firstSeen);
        if (!yearParity.has(year)) {
          yearParity.set(year, yearParity.size % 2);
        }
      }

      return m("table.checklist-table", [
        m("thead", [
          m("tr", [
            m("th.checklist-number", "#"),
            m("th.checklist-photo", ""),
            m("th", "Name"),
            m("th", "First seen"),
          ]),
        ]),
        m(
          "tbody",
          displayed.map(({ entry, position }) => {
            const parity = yearParity.get(firstSeenYear(entry.firstSeen));
            return m(ChecklistRow, {
              entry,
              cover: covers.get(entry.birdId),
              position,
              highlightedYear: parity === 1,
            });
          }),
        ),
      ]);
    },
  };
}

type ChecklistPageAttrs = {
  entries: ChecklistEntry[];
  covers: Map<string, Photo>;
  services: Services;
  visible: boolean;
  filter: string | undefined;
};

/*
 * Render the bird life-list checklist page.
 * Only includes birds seen in a wild context.
 */
export function ChecklistPage() {
  return {
    view(vnode: m.Vnode<ChecklistPageAttrs>) {
      const { entries, covers, visible, filter } = vnode.attrs;

      const onSelect = (newFilter: string | undefined) => {
        broadcast("navigate", {
          route: newFilter ? `/life-list/${newFilter}` : "/life-list",
        });
      };

      const description = "I am not a very committed birder, but I do like " +
        "photographing the different species I see. Here's my life list.";

      return m("div", {
        class: visible ? "page sidebar-visible" : "page",
      }, [
        m("section.album-metadata", [
          m("h1.albums-header", "Life List"),
          m(ChecklistDetails, { entries, filter, onSelect }),
        ]),
        m(
          "p.photo-album-description",
          description,
        ),
        m("section.checklist-container", [
          m(ChecklistTable, { entries, covers, filter }),
        ]),
      ]);
    },
  };
}
