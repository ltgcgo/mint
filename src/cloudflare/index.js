"use strict";
//import {envGet} from "./env.js";
import {handleRequest} from "../core/index.js";
//import {stripHeader} from "./strip.js";

addEventListener("fetch", async function (event) {
	let request = event.request;
	let clientInfo = {
		hostname: request.headers.get("cf-connecting-ip")
	};
	return await handleRequest(request, clientInfo);
});