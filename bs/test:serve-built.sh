#! /usr/bin/env bash

set -e

function serve_built_site() {
  exec timeout 180 python3 -m http.server 3030 >/dev/null 2>&1
}

function main() {
  serve_built_site
}

main "$@"
