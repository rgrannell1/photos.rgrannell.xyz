
## bs/ scripts

- `bs/lint.sh` — type-check with `tsc --noEmit`
- `bs/build.sh` — full build (CSS, JS, tribbles)
- `bs/dev.sh` / `bs/dev:watch.sh` — local dev server
- `bs/test.sh` — run tests
- `bs/deploy.sh` — deploy to production

## Project

- run `rs build` to build
- add ui functionality as mithril components
- add CSS to the css file
- no single letter variables. idx, err
- `/home/rg/Code/mirror` is the photo processing workflow that publishes here. The triples which back the photo website are created here. It has photos.md, albums.md, things.toml that define most semantic information; some is derived in the python workflow

## Album banners

The backend (mirror) selects the banner photo per album — highest rated,
tiebroken by style (landscape > cityscape > wildlife) — and publishes two
triples: `album_banner` on the album URN (pointing to the photo URN) and
`mosaic_banner` on the photo URN (10×10 hex colour string). The album page reads
`album.albumBanner`, looks up that photo, and passes its `mosaicBanner` and
`midImageLossyUrl` to `AlbumBanner`, which renders mosaic-then-full-load via
`ImagePair`.

## Listing covers

The backend (mirror) selects one cover photo per top-level listing type (bird,
mammal, reptile, amphibian, fish, insect, plane, train, car, place, country) via
`ListingCoverReader` and publishes a `cover` triple:
`urn:ró:photo:<id> cover urn:ró:listing:<type>`. For place and country the best
landscape photo is preferred (falling back to highest-rated); all other types
use highest-rated only. The listings page calls
`services.readCategoryCover(type)` which does a direct triple lookup — no
scoring at runtime.
- Do not remove my docstrings
- Do not delete comments, it's annoying. I use them to make it obvious what a block of code is intended to do
- use the constants file for constants. document with a plain english line comment what the thing represents. group constants in a block of related terms.
- Avoid deeply nested lines
- Do not write large functions. Split into subfunctions
- Do not write inner functions; use partial application instead
- Avoid using optional, or `X | None = None` unless there's a direct need for it
- Add short descriptions to each file of the intent of the contents
- Factor out shared test setup code to a conftest.py
- Factor out types to <module_name>_types.py
- Avoid using python lambdas, except in .sort(). never use multiple lambdas in one call
- Factor out complex type definitions into named type definitions.
