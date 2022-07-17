#!/bin/bash
rm -rfv proxy/nodeOut
npm install undici
d2n tsconfig.json
shx esbuild --platform=node --bundle proxy/nodeOut/proxy/node/index.js --outfile=dist/node.cjs --minify
exit