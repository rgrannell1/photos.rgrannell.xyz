#!/bin/bash

npx esbuild sw.js         \
  --bundle                \
  --outfile=dist/js/sw.js \
  --format=esm            \
  --minify                \
  --sourcemap             \
  --watch=forever &

npx esbuild js/views/app.js \
  --bundle                  \
  --outfile=dist/js/app.js  \
  --format=esm              \
  --minify                  \
  --sourcemap               \
  --watch=forever &

npx esbuild css/style.css      \
  --bundle                     \
  --loader:.ttf=file           \
  --loader:.woff2=file         \
  --outfile=dist/css/style.css \
  --watch=forever &

deno run -A --watch build.ts > index.html
