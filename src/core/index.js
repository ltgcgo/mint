"use strict";

import {wrapHtml} from "./genHtml.js";

// Constants
self.pW = "0.2";
const allowedProtos = ["http:", "https:", "ws:", "wss:"],
failureCrits = ["client", "server", "loose", "asIs"];

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
let timeoutMs = Math.max(parseInt(eG("TIMEOUT_MS", "4000")), 4000);

// Server console messages
console.info(`Debug mode: ${debugHeaders ? "on" : "off"}`);
console.info(`Backends: ${origin}`);

let handleRequest = async function (request, clientInfo) {
	// Generate a pre-determinted response if nothing is configured.
	if (origin.length == 1 && origin[0] == "internal") {
		return wrapHtml(503, `Hey, it works!`,`<span id="c">Cloud Hop</span> is now deployed to this platform. Please refer to the documentation for further configuration.`);
	};
	let reqUrl = new URL(request.url);
	// Give an error page when protocol mismatch
	let detProtIdx = allowedProtos.indexOf(reqUrl.protocol);
	if (detProtIdx == -1) {
		return wrapHtml(400, `Unsupported`, `Protocol "${reqUrl.protocol}" is not supported by <span id="c">Cloud Hop</span>.`);
	};
	// Testing inbound TLS settings
	switch (tlsIn) {
		case "plain": {
			if (detProtIdx % 2 == 1) {
				return wrapHtml(400, `HTTPS only`, `Only HTTPS connections are allowed.`);
			};
			break;
		};
		case "tls": {
			if (detProtIdx % 2 == 0) {
				return wrapHtml(400, `HTTP only`, `Only HTTP connections are allowed.`);
			};
			break;
		};
	};
	// Enforce outbound TLS
	switch (tlsOut) {
		case "tls":
		case "plain": {
			reqUrl.protocol = [(detProtIdx >> 1 << 1) + +(tlsOut == "tls")] || reqUrl.protocol;
			break;
		};
	};
	// Generate fake origin if it's set
	// Match languages
	// Passive health check
	let response, backTrace = [], keepGoing = true, localMaxTries = maxTries;
	while (localMaxTries >= 0 && keepGoing) {
		console.info(`Remaining tries: ${maxTries}`);
		// Give an error if tried too many times
		if (maxTries <= 0) {
			return wrapHtml(502, `Bad gateway`, `All origins are down${debugHeaders ? ": " + backTrace : ""}.`);
		};
		// Randomly choose an origin
		let reqHost = origin.random();
		let v6EndIdx = reqHost.lastIndexOf("]"),
		portIdx = reqHost.lastIndexOf(":");
		backTrace.push(reqHost);
		reqUrl.hostname = reqHost;
		reqUrl.port = "";
		// Initiate a new request
		let newReq = new Request(reqUrl.toString(), request);
		// Send the request
		try {
			response = await fetch(reqUrl, newReq);
			// Test if the response matches criteria
			switch(Math.floor(response.status / 100)) {
				case 2: {
					keepGoing = false;
					break;
				};
				case 3: {
					let redirLoc = response.headers.get("location");
					response = wrapHtml(response.status, "Redirection", `Origin issued an redirect to: <a href="${redirLoc}">${redirLoc}</a>.`);
					keepGoing = false;
					break;
				};
				case 4: {
					keepGoing = failureCrits.indexOf(failCrit) == 0;
					break;
				};
				case 5: {
					keepGoing = failureCrits.indexOf(failCrit) <= 1;
					break;
				};
				default: {
					keepGoing = failureCrits.indexOf(failCrit) <= 2;
					if (!keepGoing) {
						response = wrapHtml(502, "Bad gateway", `Origin down.${debugHeaders ? " Trace: " + backTrace : ""}`);
					};
				};
			};
		} catch (err) {
			keepGoing = failureCrits.indexOf(failCrit) <= 2;
			if (!keepGoing) {
				response = wrapHtml(502, "Bad gateway", `Origin down.${debugHeaders ? " Trace: " + backTrace : ""}<br/><pre>${err.stack}</pre>`);
			};
		};
		localMaxTries --;
	};
	return response || wrapHtml(500, "Empty response", `${keepGoing ? "Successful" : "Failed"} empty response from trace: ${backTrace}.<br/>Last requested URL: ${reqUrl.toString()}`);
};

export {
	handleRequest
};