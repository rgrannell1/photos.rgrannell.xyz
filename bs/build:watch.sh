#!/bin/bash

find ts css index.html | entr -r ./bs/build.sh
