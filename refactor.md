# ts/ refactor

Tracking document for the architectural clean-up of `ts/`. Each item comes from
the survey of 2026-07-05. Status: `todo` / `in-progress` / `done` / `proposal`.

## 1. Collapse the twelve `*App` wrappers — `done`

`ts/app.ts` defined one wrapper component per route, each repeating the same
shell (`div.photos-app` → header → `app-container` → sidebar → page). Replaced
with a data-driven route table: each route is a `PageEntry` (an `onmatch` hook
for per-navigation work, a `resolve` function that builds page attrs each
redraw), rendered through one shared `routeResolver` using Mithril's
RouteResolver `render` — the documented way to wrap a layout, and the reason
the earlier attempt failed: passing freshly-created component instances to
`m()` per redraw causes remount loops. Page components stay as module-level
singletons, exactly as before, so no mount/state semantics change.

Behaviour notes:
- Param reads that previously lived in wrapper `oninit` (photo, video, listing,
  map) moved to `onmatch`, which fires on every navigation — this also fixes
  latent staleness when navigating between two URLs served by the same page.
- Error cases ("Album not found" etc.) still render bare, outside the shell.

## 2. Extract the batch renderer — `done`

The incremental-render pattern (`rendered` / `batchScheduled` / `scheduleBatch`
+ `setTimeout` + `m.redraw`) was copy-pasted in `pages/photos.ts`,
`pages/videos.ts`, `pages/listing.ts`, and `pages/thing.ts`. Extracted to a
single `createBatchRenderer` factory.

Decision: the map marker batcher (`pages/map.ts`) is left bespoke. It batches
imperative Leaflet mutations with a recursive `setTimeout` chain and a
completion action (`fitBounds`), not Mithril redraws — forcing it into the same
abstraction would add parameters that only one caller uses.

## 3. Merge the link and list component families — `done`

- `ThingLink`, `FeatureLink`, `UnescoLink` all emit
  `class="thing-link <type>-link"` and differed only in tag, attrs, and label.
  Merged into `components/thing-link.ts` behind one shared render helper. The
  emitted DOM (tags, classes, hrefs, label text) is unchanged.
- `PlacesList`, `FeaturesList`, `UnescoList` shared one shape
  (`read urns → map to <li><Link/></li> → <ul>`). Merged into
  `components/thing-list.ts` as one config-driven component; per-family key
  behaviour preserved exactly.

Decision: `CountryLink` / `PlaceLink` / `LocationLink` (`place-links.ts`) are
left alone. They emit different CSS classes (`country-link`,
`country-link-short`, `place-link`), take parsed entities rather than URNs, and
have flag/name display modes — merging them into the `thing-link` family would
change either the CSS contract or the call-site API for no real dedupe.

## 4. Layer inversions — elaboration

The dependency graph has no clean bottom; three inversions cause it:

1. **`commons/things.ts` imports the view layer.** `toThingLinks` imports
   Mithril and `components/thing-link.ts`, so a "common utility" module depends
   on components. Any module importing a things-helper transitively pulls in
   the UI. The rest of the file (`readThing`, `readParsedThings`,
   `readNamedTypeThings`) is TribbleDB data access, not a generic utility.
   *Path:* move the read functions into `ts/services/things.ts`; move
   `toThingLinks` into `ts/components/` (it is a presenter). `commons/` then
   contains only genuinely generic helpers (arrays, sets, strings, events).
2. **`build/loaders.ts` imports runtime modules.** The build-time
   prefetch/thumbnail logic imports `services/albums.ts`, `semantic/derive.ts`
   and `semantic/data.ts`, and executes top-level `await` file I/O at import
   time. A change to a runtime service can break the build, and nothing in
   `build/` is testable in isolation. *Path:* keep the direction (build →
   runtime is the lesser evil) but make it explicit and side-effect free: wrap
   the top-level work in exported functions called from `build/index.ts`, and
   import runtime code only through `state.ts`'s public loaders.
3. **`types.ts` derives the domain model from `services/parsers.ts`.** Every
   entity type is `ReturnType<typeof parseX>`, so the "bottom" types file
   depends on a mid-layer service. *Path:* declare each entity type next to its
   parser (schema-inferred there) and re-export; `types.ts` keeps only app
   types (`State`, `Services`, `EnvConfig`, events).

Order of attack: (1) is mechanical and safe; (3) is mechanical but touches many
imports; (2) needs care around the build's top-level awaits.

## 5. Dumping grounds (`constants.ts`, `types.ts`) — proposal

`constants.ts` mixes six concerns. Proposed split, keeping one barrel export
temporarily so imports migrate gradually:

- `ts/constants/layout.ts` — `SMALL_DEVICE_WIDTH`, `PHOTO_WIDTH`, other px.
- `ts/constants/cdn.ts` — `ENDPOINT`, `CDN_RELATIONS`, `CURIES`, `CURIE_REGEX`.
- `ts/semantic/vocabulary.ts` — `KnownRelations`, `KnownTypes`, converted from
  static-only classes to plain `const` objects (`as const`); the domain
  rule-sets (`PrunableEntityTypes`, `BinomialTypes`, `NonListableTypes`) move
  here too, since the semantic layer owns them.
- `ts/components/emoji-tables.ts` — `PLACE_FEATURES_TO_EMOJI` and friends
  (presentation data, consumed by `services/emoji.ts`).
- `manifest/` or fetched assets — `ALBUMS_BANNER_MOSAIC` /
  `ABOUT_BANNER_MOSAIC` are ~100-hex-value data blobs, not constants. They
  should be published by mirror alongside the banner images (e.g. a
  `banner-mosaics.json` in the manifest, or triples on a `banner:` URN) and
  read through the normal data path. Until mirror publishes them, they can live
  in a `ts/constants/banner-mosaics.ts` data module so `constants.ts` stops
  being a blob host.
- `CAMERA_MODELS` / `PHONE_MODELS` — personal inventory; belongs in mirror's
  semantic data, not client source. Short-term: `ts/constants/equipment.ts`.

`types.ts` splits along the same lines as item 4.3: entity types move next to
their parsers; `isACountry` (runtime code) moves to `services/places.ts`;
`types.ts` keeps `State`, `Services`, `Stats`, `EnvConfig`, `AppWindow`,
`ApplicationEvents`. The `State` TODO (sum type for the `current*` fields)
stands — after item 1, the wrappers are the only writers of those fields, so
they can likely be deleted instead.

## 6. Pages must read through `services` — `done`

Two parallel access paths existed: readers bound into `state.services`, and
readers imported directly by `app.ts`/pages. All page/wrapper data access now
goes through `state.services`; `loadServices` gained the missing bindings
(`readAllAlbums`, `readAlbumPhotosByAlbumId`, `readAlbumVideosByAlbumId`,
`readThingsByAlbumId`, `readTripAlbums`, `readAllVideos`, `readAllPhotoUrns`,
`readWildBirdChecklist`, `readNamedTypeThings`). The unused raw
`tdb.readThing` passthrough is replaced by the parsed `readThing` helper.
Constraint recorded in `AGENTS.md`.

Pure functions over already-read values (e.g. `albumYear(album)`) are not
reads and may still be imported directly.

## 7. Move domain analytics out of `readers.ts` — `done`

`readBirdStats`, `readMammalStats`, `readWildBirdChecklist` (and their types)
move to `ts/services/stats.ts`; `readAllCountries` moves to
`ts/services/places.ts`. `readers.ts` keeps only the parser-to-reader registry.

## 8. Explicit derivation-pass ordering — `done`

`postIndexing` ran seven mutating passes whose ordering constraints lived in
prose comments. The passes are now data: a list of
`{ name, after: [...], run }` records ordered by a small stable topological
sort. Reordering the list cannot silently corrupt data — a missing or cyclic
dependency throws at startup.

## Bugs fixed in passing

- `formatExifDate` (`services/dates.ts`) destructured a string as if it were an
  array, returning garbage. It was unused (nothing called it), so it was later
  deleted outright along with the equally-unused `parse` helper, rather than
  kept fixed. Only `formatCreatedAt` remains in `services/dates.ts`.
- `canonicaliseUrns` / `URN_ALIASES` (`semantic/derive.ts`): the alias map has
  been empty since commit 435924d4 ("removes countries") deliberately dropped
  the usa→united-states alias after the data was fixed upstream in mirror. Not
  a bug, but an undocumented dormant mechanism doing per-triple work. It now
  short-circuits when the map is empty and the comment records that it is an
  intentionally-kept extension point.

## Verification

- `bs/lint.sh` (tsc) clean; `dist/` rebuilt.
- `deno test --no-check`: 10/10 pass (3 data tests + 7 new unit regression
  tests for `formatExifDate` and `orderPasses` in `tests/units.test.ts`).
- `bs/integration_test.sh`: 28/28 browser assertions pass against the rebuilt
  dist.
- Playwright walkthrough of /albums, /album/:id, /thing/place:7,
  /listing/bird, /checklist (+ filter), /map, /photos, /photo/:id — all render
  with zero console errors; batch rendering and URL-driven filters work.

Pre-existing issues found while verifying (not introduced here):

- `bs/test.sh` (plain `deno test`, with type-checking) fails with 47 errors on
  main too: `node_modules/@rgrannell1/tribbledb` is npm-linked to
  `~/Code/tribbledb`, whose `dist/*.d.ts` files re-export from `.ts` paths
  that do not exist in dist (e.g `mod.d.ts` → `./urn.ts`), so Deno cannot see
  `asUrn` etc. Fix belongs in tribbledb's declaration emit; that checkout has
  uncommitted v2 work so it was left untouched.
- `deno lint` has a backlog (~106 problems, mostly `no-explicit-any`); this
  refactor reduced the count from 113 and added no new problems.

## Not yet started

- Item 4 (layer inversions) and item 5 (dumping-ground splits) are documented
  above as proposals; no code moved yet.
- `models/triples.ts` is near-vestigial; fold into callers when next touched.

## Small dedupes

- `albumRoute` + `onAlbumClick` were byte-identical in `pages/albums.ts` and
  `pages/thing.ts`. Extracted to `ts/commons/album-nav.ts` (no view imports, so
  it stays a clean common).
- Count-pluralisation (`n === 1 ? …`) was reimplemented in
  `pages/photos.ts`, `pages/videos.ts`, and `pages/album.ts`. Replaced by
  `countLabel(count, noun)` in `commons/strings.ts`, which reuses `pluralise`.
- The album-card country-flag construction repeated in `pages/albums.ts`,
  `pages/album.ts`, and `pages/thing.ts`. Extracted to `countryFlagLinks(albumId,
  countries)` in `components/place-links.ts`. The "seen-in" list in `thing.ts`
  (mode `name`, different key scheme) still uses `CountryLink` directly.

## Dead code removed

- `ts/components/album-things.ts` (`AlbumThings`, empty-`view` stub, no imports).
- `ts/components/year-cursor.ts` (`YearCursor`, only referenced by a
  commented-out line) plus that comment in `pages/albums.ts` and the orphaned
  `#year-cursor` CSS rules.
- `_ThingPlaces` / `_ThingTypeLink` empty stubs in `pages/thing.ts`.
- Unused `parse` and `formatExifDate` in `services/dates.ts` (see bugs section).
