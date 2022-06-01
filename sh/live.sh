#!/bin/bash
rm -rv dist/${1:default}*
esbuild --bundle src/${1:-default}/index.js --outfile=dist/${1:-default}.js --sourcemap --minify
cat dist/${1:-default}.js
exit
