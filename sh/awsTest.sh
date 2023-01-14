#!/bin/bash
export LISTEN_PORT=8005
sam local start-lambda -p $LISTEN_PORT -n examples/lambdaEnv.json
exit
