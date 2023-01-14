# cloudhop
⛈ Easy-to-configure load balancing, available as serverless functions.

## Information stripping/spoofing
A question to developers: why the heck will you need users' information to begin with? Can you just leave it be?

See [spoofing.md](docs/spoofing.md).

## Documentation
See [/docs](docs/README.md).

## Deployment support
### Platforms
| Platform | File | Supported | Instructions |
| -------- | ---- | --------- | ------------ |
| Deno | `deno.js` | ✓ | [Read](docs/deploy/deno.md) |
| Node.js | `node.js` | ✕ | [Read](docs/deploy/node.md) |
| Cloudflare Workers | `cloudflare.js` | ✓ | [Read](docs/deploy/cloudflare.md) |
| Deno Deploy | `deno.js` | ✓ | [Read](docs/deploy/denoDeploy.md) |
| AWS Lambda | `lambda.js` | ✕ | [Read](docs/deploy/lambda.md) |
| Azure Functions | `azure.js` | ✕ | [Read](docs/deploy/azure.md) |
| Netlify | `denoWrap.js` | ✕ | [Read](docs/deploy/netlify.md) |
| Vercel | `vercel.js` | ✕ | [Read](docs/deploy/vercel.md) |