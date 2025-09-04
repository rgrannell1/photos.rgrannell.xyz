#! /usr/bin/env bash

if ! nc -z localhost 5501; then
  echo "Error: Port 5501 is not open."
  exit 1
fi

npx tap run
