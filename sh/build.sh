#!/bin/bash
mkdir -p dist
# Remove the dev files
rm -rv dist/*
# Using esbuild to build all JS files
#esbuild --bundle src/index.js --outfile=dist/index.js --minify --sourcemap
#esbuild --bundle src/index.js --target=es6 --outfile=dist/index.es6.js --minify --sourcemap
ls -1 src | while IFS= read -r dir ; do
	if [ -e "src/${dir}/index.js" ] ; then
		shx live $dir > /dev/null
	fi
done
rm -rv dist/*.map
exit
