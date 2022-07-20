/*

"use strict" is already included.

This file isn't only for Deno Deploy, but all of the one-shot Deno serverless deployments.

*/

import {handleRequest} from "../core/index.js";
//import {stripHeader} from "./strip.js";

let serve = async function (request, connInfo) {
	let clientIp = connInfo.remoteAddr.hostname;
	return await handleRequest(request, clientIp);
};

export {
	serve
};
/*export default */