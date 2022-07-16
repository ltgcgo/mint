"use strict";

import {wrapHtml} from "./genHtml.js";

Array.prototype.random = function () {
	return this[Math.floor(Math.random() * this.length)];
};

// Pre-defined
let defaultHeaders = {
	"Server": "Cloud Hop",
	"Content-Type": "text/html"
};

// Fetch environment variables
let debugHeaders = eG("DEBUGGER", "0") == "1";
let origin = eG("BACKENDS", "internal").split(",");
let realHost = eG("BACKHOST", "");
let maskIP = eG("MASK_IP", "give");
let maskUA = eG("MASK_UA", "noBracket");
let tlsIn = eG("FORCE_IN_TLS", "asIs");
let tlsOut = eG("FORCE_OUT_TLS", "asIs");
let adaptBody = eG("ADAPT_BODY", "0") == "1";
let matchLang = eG("MATCH_LANG", "*").split(",");
let maxTries = Math.max(parseInt(eG("HEALTH_MAX_TRIES", "3")), 1);
let activeCheck = self.isPersPlat && Math.max(parseFloat(eG("HEALTH_ACTIVE", "5")), 15) * 1000;
let failCrit = eG("HEALTH_CRITERIA", "asIs");

let handleRequest = async function (request, clientInfo) {
	// Generate a pre-determinted response if nothing is configured.
	if (origin.length == 1 && origin[0] == "internal") {
		return new Response(wrapHtml(`Hey, it works!`,`<span id="c">Cloud Hop</span> is now deployed to this platform. Please refer to the documentation for further configuration.`), {
			status: 503,
			headers: defaultHeaders
		});
	};
	let reqUrl = new URL(request.url);
	let response, backTrace = [];
	return response || new Response("Empty respose.", {status: 500});
};

export {
	handleRequest
};