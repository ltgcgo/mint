# Mint
⛈ Easy-to-configure load balancing, available as serverless functions.

**Cloud Hop** has been renamed to **Mint** to follow naming consistency, and to avoid certain confusion.

The name "Mint" is a reference to _Split Horizon_ (aka _Mint Flower_) in [Shed My Skin](https://www.fimfiction.net/story/406711/shed-my-skin), a changeling willing to risk his everything to save his girlfriend.

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
| Node.js | `node.js` | ✓ | [Read](docs/deploy/node.md) |
| Cloudflare Workers | `cloudflare.js` | ✓ | [Read](docs/deploy/cloudflare.md) |
| Deno Deploy | `deno.js` | ✓ | [Read](docs/deploy/denoDeploy.md) |
| AWS Lambda | `lambda.js` | ✕ | [Read](docs/deploy/lambda.md) |
| Azure Functions | `azure.js` | ✕ | [Read](docs/deploy/azure.md) |
| Netlify Edge | `netlify.js` | ✕ | [Read](docs/deploy/netlify.md) |
| Vercel Edge | `vercel.js` | ✕ | [Read](docs/deploy/vercel.md) |