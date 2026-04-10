#! /usr/bin/env bash

rm dist/css/*
rm dist/js/*

cp fonts/* dist/fonts/

publication_id="$(jq -r .publication_id ./manifest/env.json)"

deno run -A /home/rg/Code/tribbledb/cli.ts stringify < "./manifest/triples.${publication_id}.json" > "./manifest/tribbles.${publication_id}.txt"
deno run -A ts/build/index.ts
