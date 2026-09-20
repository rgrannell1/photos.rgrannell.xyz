#! /usr/bin/env bash

set -e

function build_site() {
  timeout 120 ./bs/build.sh
}

function serve_site() {
  exec timeout 180 python3 -m http.server 3030 >/dev/null 2>&1
}

function main() {
  build_site
  serve_site
}

main "$@"
