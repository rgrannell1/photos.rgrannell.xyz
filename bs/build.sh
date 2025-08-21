#!/bin/bash

publication="$(jq -r .publication_id ./manifest/env.json)"
deno run -A /home/rg/Code/tribbledb/cli.ts stringify < "./manifest/triples.${publication}.json" > "./manifest/tribbles.${publication}.txt"

npx esbuild js/views/app.ts \
  --bundle                  \
  --outfile=dist/js/app.js  \
  --format=esm              \
  --minify                  \
  --sourcemap

npx esbuild sw.js         \
  --bundle                \
  --outfile=dist/js/sw.js \
  --format=esm            \
  --minify                \
  --sourcemap

npx esbuild css/style.css      \
  --bundle                     \
  --loader:.ttf=file           \
  --loader:.woff2=file         \
  --outfile=dist/css/style.css


deno run -A --watch build.ts > index.html