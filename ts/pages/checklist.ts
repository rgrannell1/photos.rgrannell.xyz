import m from "mithril";
import { broadcast } from "../commons/events.ts";
import { binomial } from "../commons/strings.ts";
import type { Services } from "../types.ts";
import type { ChecklistEntry } from "../services/readers.ts";

/*
 * Format a Unix timestamp string into a human-readable date.
 * Handles both second-precision (10-digit) and millisecond-precision (13-digit) timestamps.
 */
function formatFirstSeen(timestamp: string): string {
  const numeric = parseInt(timestamp);
  // Heuristic: timestamps under 10^10 are in seconds, larger are in milliseconds
  const date = numeric > 9_999_999_999
    ? new Date(numeric)
    : new Date(numeric * 1000);
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
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
 * A single row in the checklist table.
 */
function ChecklistRow() {
  return {
    view(vnode: m.Vnode<{ entry: ChecklistEntry; position: number }>) {
      const { entry, position } = vnode.attrs;

      return m("tr.checklist-row", [
        m("td.checklist-number", `${position}`),
        m("td.checklist-name", [
          entry.isIrish ? m("span.checklist-irish-flag", "🇮🇪 ") : null,
          entry.name,
        ]),
        m("td.checklist-species", binomial(entry.birdId)),
        m("td.checklist-first-seen", formatFirstSeen(entry.firstSeen)),
        m("td.checklist-link-cell", [
          m("a.checklist-link", {
            href: `#/thing/bird:${entry.birdId}`,
          }, "→"),
        ]),
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
      vnode: m.Vnode<{ entries: ChecklistEntry[]; filter: string | undefined }>,
    ) {
      const { entries, filter } = vnode.attrs;

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

      return m("table.checklist-table", [
        m("thead", [
          m("tr", [
            m("th.checklist-number", "#"),
            m("th", "Name"),
            m("th", "Species"),
            m("th", "First seen"),
            m("th"),
          ]),
        ]),
        m(
          "tbody",
          displayed.map(({ entry, position }) =>
            m(ChecklistRow, { entry, position })
          ),
        ),
      ]);
    },
  };
}

type ChecklistPageAttrs = {
  entries: ChecklistEntry[];
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
      const { entries, visible, filter } = vnode.attrs;

      const onSelect = (newFilter: string | undefined) => {
        broadcast("navigate", {
          route: newFilter ? `/checklist/${newFilter}` : "/checklist",
        });
      };

      return m("div", {
        class: visible ? "page sidebar-visible" : "page",
      }, [
        m("section.album-metadata", [
          m("h1.albums-header", "Checklist"),
          m(ChecklistDetails, { entries, filter, onSelect }),
        ]),
        m(
          "p.photo-album-description",
          "I am not a very committed birder, but I do like photographing the different species I see. Here's my life list.",
        ),
        m("section.checklist-container", [
          m(ChecklistTable, { entries, filter }),
        ]),
      ]);
    },
  };
}
