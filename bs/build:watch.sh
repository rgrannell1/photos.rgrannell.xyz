#!/bin/bash

find ts css | entr -r ./bs/build.sh
