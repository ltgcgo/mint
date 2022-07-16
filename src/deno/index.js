/*

"use strict" is already included.

This file isn't only for Deno Deploy, but all of the one-shot Deno serverless deployments.

*/

//import {envGet} from "./env.js";
import {handleRequest} from "../core/index.js";
//import {stripHeader} from "./strip.js";

serve(async function (request, connInfo) {
	let clientInfo = connInfo.remoteAddr;
	return await handleRequest(request, clientInfo);
});