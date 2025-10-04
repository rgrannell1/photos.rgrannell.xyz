#!/bin/bash

find ts css index_fork.html | entr -r ./bs/build_fork.sh
