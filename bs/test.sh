#! /usr/bin/env bash

set -e

function run_deno_tests() {
  timeout 120 deno test -A tests/*.test.ts
}

function run_browser_tests() {
  timeout 180 ./bs/test:browser.zsh
}

function main() {
  run_deno_tests
  run_browser_tests
}

main "$@"
