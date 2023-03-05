#!/bin/bash
# Build the project
shx build
# Some project-specific commands
#cp dist/node.js examples/vercel/index.js
#cp package.json examples/vercel/
# Push the project
shx commit
exit