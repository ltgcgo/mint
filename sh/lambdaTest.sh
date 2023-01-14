#!/bin/bash
export LISTEN_PORT=8005
cd examples/lambda
sam local start-lambda -p $LISTEN_PORT -n env.json
exit
