## Deploy
### Environment variables
All keys and values below are case sensitive. Before successful deployments, make sure to add the following environment variables (**not adding them in KV stores!**).

* `BACKENDS`: Define the actual backends, seperated with commas. Example: `a.example.com` and `a.example.com,b.example.com`
* `BACKHOST`: Define the actual host used.
* `MASK_IP`: How to treat upstream information.
  * `strip`: Do not send any upstream information
  * `give`: Send the real IP address of upstream.
  * `spoof`: (default) Send randomly-generated upstream information.
  * `mask:<v4>:<v6>`: _(not implemented yet)_ Send the masked IP address of upstream, with the masked parts generated randomly. `spoof` acts the same as `mask:32:128`.
  * Any other value would be sent as the fake IP address.
* `MASK_UA`: How to deal with user agent strings of upstreams.
  * `asIs`: Do not modify.
  * `noBracket`: (default) Remove any information inside the brackets, and replace them with fake ones correspondingly.
  * `mimic`: Provide fake user agents correspondingly.
  * Any other value would be sent as user agent strings.
* `FORCE_IN_TLS`: How to treat TLS on incoming connections.
  * `tls`: Block plain-text HTTP requests.
  * `plain`: Block HTTPS requests.
  * `asIs`: (default) Don't discriminate.
* `FORCE_OUT_TLS`: How to treat TLS on outgoing connections.
  * `tls`: Enforce HTTPS.
  * `plain`: Enforce plain-text HTTP.
  * `asIs`: (default) Follow upstream.
* `ADAPT_BODY`: Whether to replace all origin domains into the worker domain.
  * `1`: Enabled.
  * Any other value would be considered a false value.
* `MATCH_LANG`: Match the languages against the user agent provided list, and only give the server matched ones. Seperate with commas. `*` for the first user-provided language.
  * Example: `en` for any English variants, `en_CA` for Canadian English, and `en_GB,en,fr` to match the three languages.
* `HEALTH_ACTIVE`: _(not implemented)_ Enable active health checks on persistent serverless deployments.
* `HEALTH_MAX_TRIES`: _(not implemented)_ Max tries on passive health checks before erroring out. Defaulted to `3`.
* `HEALTH_CRITERIA`: _(not implemented)_ How to behave on passive health checks.
  * `asIs`: (default) Don't perform.
  * `loose`: Only switch to another origin if the worker cannot connect to the chosen one.
  * `500`: Switch to another origin when the above happens, or when the server replies with a status code of `5xx`.
  * `400`: Switch to another origin when the above happens, or when the server replies with a status code of `4xx`.
