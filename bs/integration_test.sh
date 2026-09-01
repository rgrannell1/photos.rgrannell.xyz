#! /usr/bin/env bash

set -e

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

function collect_browser_options() {
  BROWSER_OPTIONS=()
  for argument in "$@"; do
    case "$argument" in
      --quiet)
        BROWSER_OPTIONS+=("--reporter=dot")
        ;;
      --skip-build)
        BROWSER_OPTIONS+=("--config=playwright.built.config.js")
        ;;
      *)
        BROWSER_OPTIONS+=("$argument")
        ;;
    esac
  done
}

function run_browser_tests() {
  timeout 180 "$PROJECT_ROOT/bs/test:browser.zsh" "${BROWSER_OPTIONS[@]}"
}

function main() {
  cd "$PROJECT_ROOT"
  collect_browser_options "$@"
  run_browser_tests
}

main "$@"
