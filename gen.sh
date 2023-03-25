#!/usr/bin/env bash
cd $(dirname $0)
mv dist/sample.js dist/sample.js.old
./gendist.py gen.json dist/sample.js
