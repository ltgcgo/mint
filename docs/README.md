## Documentation
Read before deploying Cloud Hop to your desired platforms.

### Configuration
* [Environment variables](env.md)

### Deployment
- [x] [Deno](deploy/deno.md) (Deno)
- [ ] [Node.js](deploy/node.md) (Node)
- [x] [Cloudflare Workers](deploy/cloudflare.md) (Service Worker)
- [x] [Deno Deploy](deploy/denoDeploy.md) (Deno)
- [ ] [AWS Lambda](deploy/lambda.md) (Node)
- [ ] [Azure Functions](deploy/azure.md) (Node)
- [ ] [Netlify](deploy/netlify.md) (Node)
- [ ] [Vercel](deploy/vercel.md) (Node)

### FAQ
#### What's platform persistency?
Platform persistency means, that serverless instances are run continuously, until the platform decides to shut them down. This is critical for active health checking and proper WebSocket support.

Persistency status is available at the beginning of deployment guides.

#### Does all persistent platforms support WebSocket?
Not really, it depends on how the platforms implement serverless functions.

WebSocket support status is available at the beginning of deployment guides.

#### I want to run Cloud Hop with X on Y, is it possible?
|      | ix86 | amd64 | armv7 | arm64 | riscv |
| ---- | ---- | ----- | ----- | ----- | ----- |
| Deno | ✓    | ✓     | ✕     | ✕     | ✕     |
| Node | ✓    | ✓     | ✓     | ✓     | ✕     |