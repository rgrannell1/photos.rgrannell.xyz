# `photos.rgrannell.xyz`

My personal photo hosting website. The photo library is curated with a second
project, [mirror](https://github.com/rgrannell1/mirror).

This site is a SPA that reads semantic information from the `manifest/` folder. It shows
photo albums, pictures, metadata based on this information.

---

## Files

```
css/                   stylesheets
icons/                 progressive web app icons
fonts/                 fonts used by the site
.gitignore             list of files ignored by version control
favicon.ico            website icon
index.html             the html for the site
site.webmanifest       PWA definitions
robots.txt             a file to make the robots go away
sw.js                  a service-worker, which cache's assets where possible

manifest/
  atom/                 XML feeds are published here by mirror
  env.json              build details
  stats.<id>.json       statistics on albums, photos, used during site generation
  tribbles.<id>.txt     tribble-encoded triple information, primary way data is ingested by this site.
  triples.<id>.json     triple information, primary way data is ingested by this site.

ts/
  build/               automates the website build
  commons/             utility code
  components/          view components comprising pages
  models/              data structures
  pages/               SPA website subpages
  parsers/             parses TribbleDB data onto typed TS schemas
  semantic/            load and process tribble data
  services/            website service layer (data processing and storing)
```
