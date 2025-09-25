#!/bin/bash

find js css fonts icons index.mustache.html | entr -r ./bs/build.sh
