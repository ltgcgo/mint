"use strict";

Array.prototype.random = function () {
	return this[Math.floor(Math.random() * this.length)];
};

// Pre-defined
let defaultHeaders = {
	"Server": "Cloud Hop",
	"Content-Type": "text/html"
};

// Fetch environment variables
let debugHeaders = envGet("DEBUGGER", "0") == "1";
let origin = envGet("BACKENDS", "internal").split(",");
let realHost = envGet("BACKHOST", "");
let maskIP = envGet("MASK_IP", "give");
let maskUA = envGet("MASK_UA", "noBracket");
let tlsIn = envGet("FORCE_IN_TLS", "asIs");
let tlsOut = envGet("FORCE_OUT_TLS", "asIs");
let adaptBody = envGet("ADAPT_BODY", "0") == "1";
let matchLang = envGet("MATCH_LANG", "*").split(",");
let maxTries = Math.max(parseInt(envGet("HEALTH_MAX_TRIES", "3")), 1);
let activeCheck = self.isPersPlat && Math.max(parseFloat(envGet("HEALTH_ACTIVE", "5")), 15) * 1000;
let failCrit = envGet("HEALTH_CRITERIA", "asIs");

let handleRequest = async function (request, clientInfo) {
	// Generate a pre-determinted response if nothing is configured.
	if (origin.length == 1 && origin[0] == "internal") {
		return new Response(`<!DOCTYPE html><head><title>Cloud Hop: It works!</title><style>*{font-family:sans-serif}a{text-decoration:none}</style></head><body>Cloud Hop is now deployed to this platform. Please refer to the documentation for further configuration.</body>`, {
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