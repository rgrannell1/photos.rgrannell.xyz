#!/bin/bash

./bs/build.sh

python3 -m http.server 3030 &
SERVER_PID=$!
trap "kill $SERVER_PID" EXIT

find ts css manifest | entr -r ./bs/build.sh
