/*
"use strict" is already included.
*/

// Script import section
import {handleRequest} from "../core/index.js";
//import {stripHeader} from "./strip.js";

/* serve(async function (request, connInfo) {
	let clientIp = connInfo.remoteAddr.hostname;
	return await handleRequest(request, clientIp);
}); */
let server = http.createServer(function (request, response) {
	response.writeHead(200, new Headers({"X-Platform": pV}));
	response.write("Test body.");
	response.end();
});
