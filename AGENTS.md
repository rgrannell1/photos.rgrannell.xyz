- rs build to build
- add ui functionality as mithril components
- no single letter variables. idx, err

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
