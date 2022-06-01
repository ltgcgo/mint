# cloudhop
⛈ Simple serverless functions dedicated for load balancing.

## Deploy
### Cloudflare Workers
Before successful deployments, make sure to add the following environment variables (**not adding them in KV store!**).

* `BACKENDS`: Define the actual backends, seperated with commas. Example: `a.example.com` and `a.example.com,b.example.com`
* `BACKHOST`: _(not working correctly)_ The real `Host` header to send to the servers.
* `MASK_UPSTREAM`: _(not implemented)_ How to treat upstream information.
  * `strip`: Do not send any upstream information
  * `asIs`: Try not to tamper.
  * `spoof`: (default) Send randomly-generated upstream information.
* `FORCE_TLS`: _(not implemented)_ How to treat TLS on outgoing connections.
  * `tls`: Enforce HTTPS
  * `plain`: Enforce plain-text HTTP
  * `asIs`: (default) Follow upstream.
* `BALANCING`: _(not implemented)_ How to choose origins.
  * `random`: (default) Randomly choose an origin.
  * `time:`: Choose origins based on time. Define cycles in seconds after the colon. For example, `time:5` sweeps through all origins every 5 seconds.
* `HEALTH_MAX_TRIES`: _(not implemented)_ Max tries on passive health checks before erroring out. Defaulted to `3`.
* `HEALTH_CRITERIA`: _(not implemented)_ How to behave on passive health checks.
  * `asIs`: (default) Don't perform.
  * `loose`: Only switch to another origin if the worker cannot connect to the chosen one.
  * `500`: Switch to another origin when the above happens, or when the server replies with a status code of `5xx`.
  * `400`: Switch to another origin when the above happens, or when the server replies with a status code of `4xx`.
