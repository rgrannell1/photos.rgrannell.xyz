#! /usr/bin/env bash

PORT=3030
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REPORTER=base
SKIP_BUILD=0

for arg in "$@"; do
  [[ "$arg" == "--quiet" ]] && REPORTER=silent
  [[ "$arg" == "--skip-build" ]] && SKIP_BUILD=1
done

if [[ "$SKIP_BUILD" == "0" ]]; then
  "$PROJECT_ROOT/bs/build.sh"
fi

python3 -m http.server $PORT --directory "$PROJECT_ROOT" &>/dev/null &
SERVER_PID=$!

trap "kill $SERVER_PID 2>/dev/null" EXIT

for idx in $(seq 1 20); do
  if nc -z localhost $PORT 2>/dev/null; then
    break
  fi
  sleep 0.25
done

if ! nc -z localhost $PORT 2>/dev/null; then
  echo "Error: server did not start on port $PORT"
  exit 1
fi

npx tap --reporter=$REPORTER --disable-coverage tests/browser/root.test.js
