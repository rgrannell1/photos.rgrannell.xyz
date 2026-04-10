- rs build to build
- add ui functionality as mithril components
- no single letter variables. idx, err

## Album banners

The backend (mirror) selects the banner photo per album — highest rated, tiebroken by style (landscape > cityscape > wildlife) — and publishes two triples: `album_banner` on the album URN (pointing to the photo URN) and `mosaic_banner` on the photo URN (10×10 hex colour string). The album page reads `album.albumBanner`, looks up that photo, and passes its `mosaicBanner` and `midImageLossyUrl` to `AlbumBanner`, which renders mosaic-then-full-load via `ImagePair`.
