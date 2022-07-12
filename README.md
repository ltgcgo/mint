# cloudhop
⛈ Simple serverless functions dedicated for load balancing.

## Information spoofing
### User agent
* Platform information is spread out. All user agents requesting for mobile pages are spoofed as a Google Pixel 5 device, and all others are spoofed as a Windows 11 device.
* All Chrome-based browsers are presented as on a random predefined version, all Firefox-based browsers are presented as Firefox LTS, and all others are disguised as Dalvik 2.1.0 on Google Pixel 5.

## Deployment support
### Platforms
| Platform | Persistent | File |
| -------- | ---------- | ---- |
| AWS Lambda | No | `serverlessNode.js` |
| Cloudflare Workers | No | `cloudflare.js` |
| Deno Deploy | No | `deno.js` |
| Fly.io | Yes | `fly.js` |