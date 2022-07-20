# cloudhop
⛈ Easy-to-configure load balancing, available as serverless functions.

## Information stripping/spoofing
A question to developers: why the heck will you need users' information to begin with? Can you just leave it be?

### Origin IP address
* Not yet implemented.
* Unless specified, sent IP addresses are always either stripped away or inaccurate, and some can become out-right fake.

### User agent
* Not yet implemented.
* Platform information is spread out. Requesters for mobile pages are spoofed as a Google Pixel 5 device, and desktops are spoofed as a Windows 11 device.
* All Chromium-based browsers are spoofed as on a predefined version, Firefox-based ones are spoofed as Firefox LTS, and all others are disguised as Dalvik 2.1.0 on Google Pixel 5.

### Languages
* Only provide the most prioritized language. If `MATCH_LANG` is set, the result will be the most prioritized available language instead.

### Request fetcher
* Not yet implemented.
* Request could be sent as is, all disguised as browser navigation, or all disguised as fetch requests.
* If not explicitly allowed, fetching user will always be `?1`.

### Client hints
* Only provide spoofed values when essential. Non-essential values are stripped away.

## Documentation
See [/docs](docs/README.md).

## Deployment support
### Platforms
| Platform | File | Supported | Instructions |
| -------- | ---- | --------- | ------------ |
| _Your own machine_ | `deno.js` | [x] | [Read](docs/deploy/deno.md) |
| AWS Lambda | `node.js` | [ ] | N/A |
| Cloudflare Workers | `cloudflare.js` | [x] | [Read](docs/deploy/cloudflare.md) |
| Deno Deploy | `deno.js` | [x] | [Read](docs/deploy/denoDeploy.md) |
| Fly.io | `deno.js` | [ ] | [Read](docs/deploy/flyIo.md) |
| Netlify | `denoWrap.js` | [ ] | [Read](docs/deploy/netlify.md) |
