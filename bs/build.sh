#!/bin/bash

rm dist/css/*
rm dist/js/*

build_id="$(date +%Y%m%d%H%M%S | sha256sum | cut -c1-16)"
jq --arg build_id "$build_id" '.build_id = $build_id' ./manifest/env.json > ./manifest/env.json.tmp && mv ./manifest/env.json.tmp ./manifest/env.json

publication_id="$(jq -r .publication_id ./manifest/env.json)"
deno run -A /home/rg/Code/tribbledb/cli.ts stringify < "./manifest/triples.${publication_id}.json" > "./manifest/tribbles.${publication_id}.txt"

npx esbuild js/views/app.ts \
  --bundle                  \
  --outfile=dist/js/app.$build_id.js  \
  --format=esm              \
  --minify                  \
  --sourcemap

npx esbuild sw.js         \
  --bundle                \
  --outfile=dist/js/sw.$build_id.js \
  --format=esm            \
  --minify                \
  --sourcemap

npx esbuild css/style.css      \
  --bundle                     \
  --loader:.ttf=file           \
  --loader:.woff2=file         \
  --outfile=dist/css/style.$build_id.css

npx esbuild css/photo-album.css      \
  --bundle                     \
  --loader:.ttf=file           \
  --loader:.woff2=file         \
  --outfile=dist/css/photo-album.$build_id.css

deno run -A build.ts > index.html
