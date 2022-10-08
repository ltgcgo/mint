#!/bin/bash
cd examples
wrangler dev --local --port 8000 ../dist/cloudflare.js
exit