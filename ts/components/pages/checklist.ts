import m from "mithril";
import { broadcast } from "../../commons/events.ts";
import { ImagePair } from "../media/photo.ts";
import { thumbHashDataUrl } from "../../services/photos.ts";
import type { Photo } from "../../types.ts";
import type { ChecklistEntry, NemesisSpecies } from "../../services/stats.ts";
import { PHOTO_WIDTH } from "../../constants/layout.ts";
import { FlagIcon } from "../flag.ts";

/*
 * Parse a Unix timestamp, in either seconds or milliseconds.
 */
function parseFirstSeen(timestamp: string): Date {
  const numeric = parseInt(timestamp);
  // timestamps under 10^10 are in seconds, larger are in milliseconds
  return numeric > 9_999_999_999 ? new Date(numeric) : new Date(numeric * 1000);
}

function formatFirstSeen(timestamp: string): string {
  return parseFirstSeen(timestamp).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function firstSeenYear(timestamp: string): number {
  return parseFirstSeen(timestamp).getFullYear();
}

function isWild(entry: ChecklistEntry): boolean {
  return entry.isWild;
}

function isIrishWild(entry: ChecklistEntry): boolean {
  return entry.isIrish && entry.isWild;
}

type ChecklistDetailsAttrs = {
  entries: ChecklistEntry[];
  filter: string | undefined;
  onSelect: (filter: string) => void;
};

function viewChecklistDetails(
  vnode: m.Vnode<ChecklistDetailsAttrs>,
): m.Children {
  const { entries, filter, onSelect } = vnode.attrs;

  const irishWildCount = entries.filter(isIrishWild).length;
  const wildCount = entries.filter(isWild).length;
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
      onclick: onSelect.bind(null, "ireland"),
    }, m(FlagIcon, { name: "Ireland" })),
    " ",
    m("span.listing-filter-flag", {
      title: "All wild species",
      class: filter === "wild" ? "listing-filter-flag--selected" : undefined,
      onclick: onSelect.bind(null, "wild"),
    }, "🗺️"),
    " ",
    m("span.listing-filter-flag", {
      title: "All species including captive",
      class: filter === "all" ? "listing-filter-flag--selected" : undefined,
      onclick: onSelect.bind(null, "all"),
    }, "all"),
    ` · ${displayCount} species`,
  );
}

/*
 * Details line above the checklist. Filters to Irish wild, all wild, or all
 * species including captive ones.
 */
function ChecklistDetails() {
  return { view: viewChecklistDetails };
}

type ChecklistPhotoAttrs = {
  cover: Photo | undefined;
  href: string;
  label: string;
};

function viewChecklistPhoto(vnode: m.Vnode<ChecklistPhotoAttrs>): m.Children {
  const { cover, href, label } = vnode.attrs;

  if (!cover) {
    return m("div.checklist-card-empty");
  }

  return m(ImagePair, {
    href,
    label,
    thumbnailUrl: cover.thumbnailUrl,
    thumbnailDataUrl: thumbHashDataUrl(cover.mosaicColours),
    loading: "lazy",
    onclick: undefined,
    width: PHOTO_WIDTH,
    height: PHOTO_WIDTH,
  });
}

/*
 * The per-species cover image. Renders an empty block when a species has no
 * cover photo.
 */
function ChecklistPhoto() {
  return { view: viewChecklistPhoto };
}

/*
 * Inline status tags after a species name. Target and nemesis always show.
 * Scarce shows in the Irish view only.
 */
function speciesTags(
  entry: { scarce: boolean; nemesis: boolean; target: boolean },
  showScarce: boolean,
): m.Children[] {
  const tags: m.Children[] = [];
  if (entry.nemesis) {
    tags.push(m("span.checklist-tag.checklist-tag--nemesis", "nemesis"));
  }
  if (entry.target) {
    tags.push(m("span.checklist-tag.checklist-tag--target", "target"));
  }
  if (showScarce && entry.scarce) {
    tags.push(m("span.checklist-tag.checklist-tag--scarce", "scarce"));
  }
  return tags;
}

type ChecklistCardAttrs = {
  entry: ChecklistEntry;
  cover: Photo | undefined;
  position: number;
  showScarce: boolean;
};

function viewChecklistCard(vnode: m.Vnode<ChecklistCardAttrs>): m.Children {
  const { entry, cover, position, showScarce } = vnode.attrs;
  const href = `#/thing/${entry.speciesType}:${entry.speciesId}`;

  return m("div.checklist-card", [
    m("span.checklist-card-badge", `#${position}`),
    m(ChecklistPhoto, { cover, href, label: entry.name }),
    m("div.checklist-card-metadata", [
      m("p.checklist-card-name", [
        entry.isIrish
          ? m("span.checklist-irish-flag", [m(FlagIcon, { name: "Ireland" }), " "])
          : null,
        m("a.checklist-name-link", { href }, entry.name),
        ...speciesTags(entry, showScarce),
      ]),
      m("p.checklist-first-seen", formatFirstSeen(entry.firstSeen)),
    ]),
  ]);
}

function ChecklistCard() {
  return { view: viewChecklistCard };
}

type ChecklistMysteryCardAttrs = {
  species: NemesisSpecies;
  glyph: string;
};

function viewChecklistMysteryCard(
  vnode: m.Vnode<ChecklistMysteryCardAttrs>,
): m.Children {
  const { species, glyph } = vnode.attrs;

  return m("div.checklist-card.checklist-card--mystery", [
    m("div.mystery-bird", m("span.mystery-bird-glyph", glyph)),
    m("div.checklist-card-metadata", [
      m("p.checklist-card-name", [
        m("span.checklist-mystery-name", species.name),
        m("span.checklist-tag.checklist-tag--nemesis", "nemesis"),
      ]),
      m("p.checklist-first-seen.checklist-first-seen--pending", "yet to photograph"),
    ]),
  ]);
}

/*
 * A "yet to see" card for an unphotographed nemesis species. A mystery
 * silhouette stands in for the photo.
 */
function ChecklistMysteryCard() {
  return { view: viewChecklistMysteryCard };
}

type ChecklistGridAttrs = {
  entries: ChecklistEntry[];
  covers: Map<string, Photo>;
  nemesisSpecies: NemesisSpecies[];
  mysteryGlyph: string;
  filter: string | undefined;
};

type PositionedEntry = {
  entry: ChecklistEntry;
  position: number;
};

function toPositionedEntry(
  entry: ChecklistEntry,
  idx: number,
): PositionedEntry {
  return { entry, position: idx + 1 };
}

function positionedIsIrishWild(positioned: PositionedEntry): boolean {
  return isIrishWild(positioned.entry);
}

function positionedIsWild(positioned: PositionedEntry): boolean {
  return isWild(positioned.entry);
}

function drawChecklistCard(
  covers: Map<string, Photo>,
  irishView: boolean,
  positioned: PositionedEntry,
): m.Children {
  const { entry, position } = positioned;
  return m(ChecklistCard, {
    key: `card-${entry.speciesType}-${entry.speciesId}`,
    entry,
    cover: covers.get(entry.speciesId),
    position,
    showScarce: irishView,
  });
}

function drawMysteryCard(
  mysteryGlyph: string,
  species: NemesisSpecies,
): m.Children {
  return m(ChecklistMysteryCard, {
    key: `mystery-${species.speciesId}`,
    species,
    glyph: mysteryGlyph,
  });
}

function viewChecklistGrid(vnode: m.Vnode<ChecklistGridAttrs>): m.Children {
  const { entries, covers, nemesisSpecies, mysteryGlyph, filter } = vnode.attrs;

  // scarce tags and "yet to see" birds show in the Irish view only
  const irishView = filter === "ireland";

  // position numbers come from the full unfiltered list
  const withPositions = entries.map(toPositionedEntry);
  const displayed = filter === "ireland"
    ? withPositions.filter(positionedIsIrishWild)
    : filter === "all"
    ? withPositions
    : withPositions.filter(positionedIsWild);

  return m("div.checklist-grid", [
    ...displayed.map(drawChecklistCard.bind(null, covers, irishView)),
    ...(irishView
      ? nemesisSpecies.map(drawMysteryCard.bind(null, mysteryGlyph))
      : []),
  ]);
}

function ChecklistGrid() {
  return { view: viewChecklistGrid };
}

type ChecklistPageAttrs = {
  entries: ChecklistEntry[];
  covers: Map<string, Photo>;
  regularCount: number;
  nemesisBirds: NemesisSpecies[];
  mammalEntries: ChecklistEntry[];
  mammalCovers: Map<string, Photo>;
  irishMammalCount: number;
  nemesisMammals: NemesisSpecies[];
  visible: boolean;
  filter: string | undefined;
};

/*
 * Bird intro line. Null until there is an Irish wild sighting.
 */
function lifeListPreamble(
  entries: ChecklistEntry[],
  regularCount: number,
): string | null {
  const irishWild = entries.filter(isIrishWild);
  if (irishWild.length === 0) {
    return null;
  }

  // entries are sorted earliest-first, so the first Irish entry is the earliest
  const sinceYear = firstSeenYear(irishWild[0].firstSeen);

  return `I've photographed ${irishWild.length} wild species in Ireland since ` +
    `${sinceYear}; Ireland regularly records about ${regularCount}.`;
}

/*
 * Mammal intro line. Null until there is an Irish wild sighting.
 */
function mammalPreamble(
  mammalEntries: ChecklistEntry[],
  irishMammalCount: number,
): string | null {
  const irishWild = mammalEntries.filter(isIrishWild);
  if (irishWild.length === 0) {
    return null;
  }

  return `I've photographed ${irishWild.length} wild Irish mammal species; ` +
    `the island has about ${irishMammalCount}.`;
}

type MammalSectionAttrs = {
  mammalEntries: ChecklistEntry[];
  mammalCovers: Map<string, Photo>;
  irishMammalCount: number;
  nemesisMammals: NemesisSpecies[];
};

function viewMammalSection(vnode: m.Vnode<MammalSectionAttrs>): m.Children {
  const { mammalEntries, mammalCovers, irishMammalCount, nemesisMammals } =
    vnode.attrs;

  const preamble = mammalPreamble(mammalEntries, irishMammalCount);

  return [
    m("section.album-metadata", [
      m("h2.albums-header", "Mammals"),
    ]),
    preamble ? m("p.photo-album-description", preamble) : null,
    m("section.checklist-container", [
      m(ChecklistGrid, {
        entries: mammalEntries,
        covers: mammalCovers,
        nemesisSpecies: nemesisMammals,
        mysteryGlyph: "🐾",
        filter: "ireland",
      }),
    ]),
  ];
}

/*
 * The Irish mammal section, below the bird table in the Irish view.
 */
function MammalSection() {
  return { view: viewMammalSection };
}

function selectLifeListFilter(newFilter: string): void {
  broadcast("navigate", { route: `/life-list/${newFilter}` });
}

function viewChecklistPage(vnode: m.Vnode<ChecklistPageAttrs>): m.Children {
  const {
    entries,
    covers,
    regularCount,
    nemesisBirds,
    mammalEntries,
    mammalCovers,
    irishMammalCount,
    nemesisMammals,
    visible,
    filter,
  } = vnode.attrs;

  const preamble = lifeListPreamble(entries, regularCount);
  const description = "I am not a very committed birder, but I do like " +
    "photographing the different species I see. Here's my life list.";

  // the mammal section shows in the Irish view only. Other views stay birds-only
  const irishView = filter === "ireland";

  return m("main", {
    class: visible ? "page sidebar-visible" : "page",
  }, [
    m("section.album-metadata", [
      m("h1.albums-header", "Life List"),
      m(ChecklistDetails, { entries, filter, onSelect: selectLifeListFilter }),
    ]),
    preamble ? m("p.photo-album-description", preamble) : null,
    m(
      "p.photo-album-description",
      description,
    ),
    m("section.checklist-container", [
      m(ChecklistGrid, {
        entries,
        covers,
        nemesisSpecies: nemesisBirds,
        mysteryGlyph: "🐦",
        filter,
      }),
    ]),
    irishView
      ? m(MammalSection, {
        mammalEntries,
        mammalCovers,
        irishMammalCount,
        nemesisMammals,
      })
      : null,
  ]);
}

/*
 * The life-list page. Birds first, then Irish mammals in the Irish view.
 */
export function ChecklistPage() {
  return { view: viewChecklistPage };
}
