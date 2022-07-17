## Deploy
### Environment variables
All keys and values below are case sensitive. Before successful deployments, make sure to add the following environment variables (**not adding them in KV stores!**).

* `DEBUGGER`: Add some headers useful in debugging situations.
  * `1`: Enable.
* `BACKENDS`: Define the actual backends, seperated with commas. Example: `a.example.com` and `a.example.com,b.example.com`
* `BACKHOST`: Define the actual host used. Cannot be used on Cloudflare Workers.
* `MASK_IP`: How to treat upstream information.
  * `strip`: Do not send any upstream information
  * `give`: Send the real IP address of upstream.
  * `spoof`: (default) Send randomly-generated upstream information.
  * `mask:<v4>:<v6>`: Send the masked IP address of upstream, with the masked parts generated randomly. `spoof` acts the same as `mask:32:128`.
  * Any other value would be sent as the fake IP address.
* `MASK_UA`: How to deal with user agent strings of upstreams.
  * `asIs`: Do not modify.
  * `noBracket`: (default) Remove any information inside the brackets, and replace them with fake ones correspondingly.
  * `mimic`: Provide fake user agents correspondingly.
  * Any other value would be sent as user agent strings.
* `FORCE_IN_TLS`: How to treat TLS on incoming connections. Cannot be used on Deno Deploy.
  * `tls`: Block plain-text HTTP requests.
  * `plain`: Block HTTPS requests.
  * `asIs`: (default) Don't discriminate.
* `FORCE_OUT_TLS`: How to treat TLS on outgoing connections.
  * `tls`: Enforce HTTPS.
  * `plain`: Enforce plain-text HTTP.
  * `asIs`: (default) Follow upstream.
* `STRIP_HEADERS_UP`: Headers to strip when going upstream. Case insensitive, and seperated with `,`.
* `STRIP_HEADERS`: Headers to strip in responses. Case insensitive, and seperated with `,`.
* `SET_HEADERS_UP`: _(not implemented)_ Headers to add/set when going upstream. Keys are case insensitive, define values with `=`, and seperated with `,`.
* `SET_HEADERS`: _(not implemented)_ Headers to add/set in responses. Keys are case insensitive, define values with `=`, and seperated with `,`.
* `ADAPT_BODY`: Whether to replace all origin domains into the worker domain.
  * `1`: Enabled.
  * Any other value would be considered a false value.
* `MATCH_LANG`: Match the languages against the user agent provided list, and only give the server matched ones. Seperate with commas. `*` for the first user-provided language.
  * Example: `en` for any English variants, `en_CA` for Canadian English, and `en_GB,en,fr` to match the three languages.
* `HEALTH_ACTIVE`: _(not implemented)_ Enable active health checks on persistent serverless deployments.
* `HEALTH_MAX_TRIES`: Max tries on passive health checks before erroring out. Defaulted to `3`.
* `HEALTH_CRITERIA`: How to behave on passive health checks.
  * `asIs`: (default) Don't perform.
  * `loose`: Only switch to another origin if the worker cannot connect to the chosen one.
  * `server`: Switch to another origin when the above happens, or when the server replies with a status code of `5xx`.
  * `client`: Switch to another origin when the above happens, or when the server replies with a status code of `4xx`.
* `TIMEOUT_MS`: Maximum waiting time in milliseconds until cancellation. Must be a number over `2500`.
* `IDLE_SHUTDOWN`: Maximum idle time in seconds until exit. Must be either a negative number for disabling, or a number over `60`.