#! /usr/bin/env bash
# Vendor flag assets from the vexilla build into flags/vendor/.
# Big flags over the byte budget are excluded; they need approval first.
set -e
cd "$(dirname "$0")/.."

VEXILLA_DIST="$HOME/Code/vexilla/dist"
# wire-size budget: gzip bytes per big flag, as the CDN serves it
BIG_FLAG_BUDGET=30720

if [ ! -f "$VEXILLA_DIST/sprite.avif" ]; then
  echo "vexilla dist is missing; run bs/build.zsh in ~/Code/vexilla first" >&2
  exit 1
fi

rm -rf flags/vendor
mkdir -p flags/vendor/big

cp "$VEXILLA_DIST/sprite.avif" "$VEXILLA_DIST/sprite.json" flags/vendor/

skipped=0
for flag in "$VEXILLA_DIST"/big/*.svg; do
  size=$(gzip -9 -c "$flag" | wc -c)
  if [ "$size" -le "$BIG_FLAG_BUDGET" ]; then
    cp "$flag" flags/vendor/big/
  else
    skipped=$((skipped + 1))
  fi
done

count=$(ls flags/vendor/big | wc -l)
echo "synced sprite and $count big flags; $skipped over budget, not vendored"
