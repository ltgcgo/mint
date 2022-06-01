# cloudhop
⛈ Simple serverless functions dedicated for load balancing.

## Deploy
### Cloudflare Workers
Before successful deployments, make sure to add the following environment variables (**not adding them in KV store!**).

* `BACKENDS`: Define the actual backends, seperated with commas. Example: `a.example.com` and `a.example.com,b.example.com`
* `BACKHOST`: _(not working correctly)_ The real `Host` header to send to the servers.
* `FORCETLS`: _(not implemented)_ Define whether to enforce HTTPS or enforce plain-text HTTP on the outgoing connections. Set to `tls` for enforced HTTPS, `plain` for plain-text HTTP, and `asIs` to follow upstream.
