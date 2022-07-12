# cloudhop
⛈ Simple serverless functions dedicated for load balancing.

## Information spoofing
### User agent
* Platform information is spread out. All user agents requesting for mobile pages are spoofed as a Google Pixel 5 device, and all others are spoofed as a Windows 11 device.
* All Chrome-based browsers are presented as on a random predefined version, all Firefox-based browsers are presented as Firefox LTS, and all others are disguised as Dalvik 2.1.0 on Google Pixel 5.

## Deploy
### Cloudflare Workers
All keys and values below are case sensitive. Before successful deployments, make sure to add the following environment variables (**not adding them in KV store!**).

* `BACKENDS`: Define the actual backends, seperated with commas. Example: `a.example.com` and `a.example.com,b.example.com`
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
* `FULL_INFO`: Whether to spoof as much information as possible.
  * `1`: Send extra information without any spoofing.
  * Any other value would be considered a false value, only providing bare minimum to origins.
* `HEALTH_MAX_TRIES`: _(not implemented)_ Max tries on passive health checks before erroring out. Defaulted to `3`.
* `HEALTH_CRITERIA`: _(not implemented)_ How to behave on passive health checks.
  * `asIs`: (default) Don't perform.
  * `loose`: Only switch to another origin if the worker cannot connect to the chosen one.
  * `500`: Switch to another origin when the above happens, or when the server replies with a status code of `5xx`.
  * `400`: Switch to another origin when the above happens, or when the server replies with a status code of `4xx`.
