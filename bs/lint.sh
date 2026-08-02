#! /usr/bin/env bash
set -e

deno check ts/ workers/
deno lint
