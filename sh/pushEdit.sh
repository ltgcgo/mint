#!/bin/bash
shx build
git stage -A && git commit --amend && git push --force
exit