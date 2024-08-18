#!/bin/bash

npx esbuild js/views/app.js \
  --bundle                  \
  --outfile=dist/app.js     \
  --format=esm              \
  --minify                  \
  --sourcemap               \
  --watch                   \
