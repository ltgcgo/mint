import {handleRequest} from "../core/index.js";
//import {stripHeader} from "./strip.js";

let listenPort = parseInt(eG("LISTEN_PORT"));

let bunServer = Bun.serve({
	fetch: async function (request) {
		let clientInfo = request.headers.get("cf-connecting-ip");
		return handleRequest(request, clientInfo);
	},
	port: listenPort
});
console.info(`Listening on http://localhost:${listenPort}/`);