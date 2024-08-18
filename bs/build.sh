#!/bin/bash

npx esbuild js/views/app.js \
  --bundle                  \
  --outfile=dist/app.js     \
  --format=esm              \
  --minify                  \
  --sourcemap

npx esbuild sw.js      \
  --bundle             \
  --outfile=dist/sw.js \
  --format=esm         \
  --minify             \
  --sourcemap
