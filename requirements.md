On mobile devices (viewport width ≤ 500px), the album page should display a full-width banner image that touches the very top of the screen. The navbar should float over the banner as a transparent overlay with a subtle dark gradient so the navigation text remains legible against light or dark photos. The banner should occupy roughly 60% of the viewport height. Currently the album banner is hidden on mobile and this feature is desktop-only.

On mobile devices, videos render full-screen (edge-to-edge, matching the behaviour of photos on mobile). Video controls are hidden by default and appear only after the user first interacts with the video.

On mobile devices, the map renders full-width (edge-to-edge), matching the treatment applied to photos and videos.

The build system produces cache-busting filenames for CSS, JavaScript, and service-worker assets using a two-part ID composed of the publication ID (from manifest/env.json, tied to photo publishing) and the current git short hash (tied to code changes). Data files (tribbles, stats, triples) continue to use the publication ID alone. This ensures that a code-only deploy always produces new asset URLs and browsers do not serve stale assets.

The project has a browser integration test suite using Puppeteer. The test runner starts the development server, launches a headless browser, and runs tests against the live local site — catching regressions that unit tests cannot detect. The first test checks that the root page renders an H1 element with the text "Albums".

The integration test suite covers five additional page-level checks: the albums page displays at least one album card (verifying the data pipeline, not just page render); an album page shows its title H1; the navbar is present on the root page; the listings page renders; and a photo page shows its image. Each check lives in its own file and all files share a common type signature for the test function.
