#! /usr/bin/env bash
set -e

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TRIBBLEDB_CLI="$PROJECT_ROOT/../../tribbledb/cli.ts"

function clear_javascript() {
  timeout 10 rm -f "$PROJECT_ROOT"/dist/js/*
}

function build_tribbles() {
  local publication_id
  local triples_path
  local tribbles_path

  publication_id="$(timeout 10 jq -r .publication_id ./manifest/env.json)"
  triples_path="./manifest/triples.${publication_id}.json"
  tribbles_path="./manifest/tribbles.${publication_id}.txt"
  timeout 60 deno run -A "$TRIBBLEDB_CLI" stringify \
    < "$triples_path" > "$tribbles_path"
}

function build_application() {
  timeout 120 deno run -A ts/build/index.ts
}

function report_build() {
  echo -e "\033[1;32m✓ reloaded at $(date +%H:%M)\033[0m"
}

function main() {
  cd "$PROJECT_ROOT"
  clear_javascript
  build_tribbles
  build_application
  report_build
}

main "$@"
