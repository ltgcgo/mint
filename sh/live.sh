#!/bin/bash
rm -rv proxy/${1:default}*
inject=" "
format="iife"
ext="js"
if [ -e "src/${1:-default}/inject.js" ] ; then
	inject="--inject:src/${1:-default}/inject.js"
fi
if [ -e "src/${1:-default}/index.mjs" ] ; then
	format="esm"
	#ext="mjs"
fi
esbuild --bundle src/${1:-default}/index.js $inject --format=$format --outfile=proxy/${1:-default}.js ${2:---minify-whitespace --minify-syntax --sourcemap}
cat proxy/${1:-default}.js
exit
