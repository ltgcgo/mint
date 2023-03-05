#!/bin/bash
# Build the project
shx build
# Some project-specific commands
cp dist/node.js examples/vercel/api/handler.js
# Push the project
shx commit
exit