#!/bin/bash
rm -rv proxy/${1:default}*
inject=" "
prefix=""
affix=""
platform=""
format="iife"
ext="js"
if [ -e "src/${1:-default}/inject.js" ] ; then
	inject="--inject:src/${1:-default}/inject.js"
fi
if [ -e "src/${1:-default}/prefix.js" ] ; then
	Aprefix="--banner:js='$(cat src/${1:-default}/prefix.js)'"
fi
if [ -e "src/${1:-default}/affix.js" ] ; then
	Aaffix="--footer:js=src/${1:-default}/affix.js"
fi
if [ -e "src/${1:-default}/.node" ] ; then
	platform="--platform=node"
fi
if [ -e "src/${1:-default}/.cjs" ] ; then
	format="cjs"
fi
if [ -e "src/${1:-default}/index.mjs" ] ; then
	format="esm"
	ext="mjs"
fi
esbuild --bundle src/${1:-default}/index.${ext} $platform $prefix $affix $inject --charset=utf8 --format=$format --outfile=proxy/${1:-default}.${ext} ${2:---minify-whitespace --minify-syntax --sourcemap}
cat proxy/${1:-default}.${ext}
exit
