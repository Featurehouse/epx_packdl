#!/usr/bin/env bash
cd $(dirname $0)

if [ -e dist/sample.js ] ; then
 mv dist/sample.js dist/sample.js.old
fi

if [ -e version.txt ] ; then
 rm version.txt
fi
date -Iseconds >> version.txt

./gendist.py gen.json dist/sample.js
