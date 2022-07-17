#!/bin/bash
export BACKENDS=localhost
export DEBUGGER=1
export FORCE_OUT_TLS=tls
export STRIP_HEADERS_UP=Sec-Fetch-User,Sec-Fetch-Site,Sec-Fetch-Mode,Sec-Fetch-Dest
export STRIP_HEADERS=expect-ct,nel,report-to
export SET_HEADERS_UP=sec-ch-dalvik=Dalvik/2.1
export SET_HEADERS=x-cloudhop-debug=experimental
export HEALTH_MAX_TRIES=4
export HEALTH_CRITERIA=loose
export TIMEOUT_MS=4000
export IDLE_SHUTDOWN=0
deno run --allow-net --allow-env dist/deno.js
exit