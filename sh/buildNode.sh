#!/bin/bash
rm -rf proxy/nodeOut/proxy
rm -rf proxy/dnt
#npm install undici
# Use D2N to build
d2n tsconfig.json
esbuild --platform=node --bundle proxy/nodeOut/proxy/node/index.js --outfile=dist/node.d2n.cjs --minify
# Use DNT to build
dnt
esbuild --platform=node --bundle proxy/dnt/src/dnt.js --outfile=dist/node.dnt.cjs --minify
exit