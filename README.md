# cloudhop
⛈ Simple serverless functions dedicated for load balancing.

## Information spoofing
A question for all developers: why the heck will you need users' information to begin with? Can you just leave it be?

### User agent
* Platform information is spread out. All user agents requesting for mobile pages are spoofed as a Google Pixel 5 device, and all others are spoofed as a Windows 11 device.
* All Chrome-based browsers are presented as on a random predefined version, all Firefox-based browsers are presented as Firefox LTS, and all others are disguised as Dalvik 2.1.0 on Google Pixel 5.

### Languages
* Only provide the most prioritized language. If `MATCH_LANG` is set, the result will be the most prioritized available language instead.

## Documentation
See [/docs](docs/README.md).

## Deployment support
### Platforms
| Platform | Persistent | File |
| -------- | ---------- | ---- |
| AWS Lambda | No | `serverlessNode.js` |
| Cloudflare Workers | No | `cloudflare.js` |
| Deno Deploy | No | `deno.js` |
| Fly.io | Yes | `fly.js` |