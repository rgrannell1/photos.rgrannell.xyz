#!/bin/bash

find ts css manifest | entr -r ./bs/build.sh
