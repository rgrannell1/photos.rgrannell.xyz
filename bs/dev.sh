#!/bin/bash

./bs/build.sh

if [[ "$1" != "--build-only" ]]; then
  python3 -m http.server 3000
fi
