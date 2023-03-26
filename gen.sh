#!/usr/bin/env bash
cd $(dirname $0)
if [ -e dist/sample.js ] ; then
 mv dist/sample.js dist/sample.js.old
fi
./gendist.py gen.json dist/sample.js
