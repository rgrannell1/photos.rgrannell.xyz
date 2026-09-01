#! /usr/bin/env zsh

set -e

function run_browser_tests() {
  timeout 180 npx playwright test "$@"
}

function main() {
  run_browser_tests "$@"
}

main "$@"
