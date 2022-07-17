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
let maskIP = eG("MASK_IP", "strip");
let maskUA = eG("MASK_UA", "noBracket");
let tlsIn = eG("FORCE_IN_TLS", "asIs");
let tlsOut = eG("FORCE_OUT_TLS", "asIs");
let adaptBody = eG("ADAPT_BODY", "0") == "1";
let matchLang = eG("MATCH_LANG", "*").split(",");
let maxTries = Math.max(parseInt(eG("HEALTH_MAX_TRIES", "3")), 1);
let activeCheck = self.isPersPlat && Math.max(parseFloat(eG("HEALTH_ACTIVE", "5")), 15) * 1000;
let failCrit = eG("HEALTH_CRITERIA", "asIs");
let timeoutMs = Math.max(parseInt(eG("TIMEOUT_MS", "0")), 2500);
let headerStripUp = eG("STRIP_HEADERS_UP", "sec-fetch-user").split(",");
let headerStripDown = eG("STRIP_HEADERS_DOWN", "alt-svc").split(",");
let idleShutdown = parseInt(eG("IDLE_SHUTDOWN", "60"));

// Parse shutdown
if (idleShutdown > 0) {
	idleShutdown = Math.max(idleShutdown, 60) * 1000;
} else {
	idleShutdown = -1;
};

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
	let response, backTrace = [], keepGoing = true, localTries = maxTries;
	while (localTries >= 0 && keepGoing) {
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
		// Report the selected origin
		if (debugHeaders) {
			console.info(`Tries: ${localTries}, target: ${request.method} ${reqUrl.protocol}//${reqHost}/`);
		};
		// Partially clone the request object
		let repRequest = {};
		repRequest.method = request.method;
		if (request.bodyUsed) {
			repRequest.body = request.body;
		};
		// Request header manipulation
		repRequest.headers = request.headers;
		// Add an abort controller
		let abortCtrl = AbortSignal.timeout(timeoutMs);
		repRequest.signal = abortCtrl;
		// Initiate a new request
		let newReq = new Request(reqUrl.toString(), repRequest);
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
						response = wrapHtml(502, "Bad gateway", `All origins are down.${debugHeaders ? " Trace: " + backTrace : ""}`);
					};
				};
			};
		} catch (err) {
			keepGoing = failureCrits.indexOf(failCrit) <= 2;
			if (!keepGoing) {
				console.error(err.stack);
				switch (err.constructor.name) {
					case "TypeError": {
						response = wrapHtml(502, "Bad gateway", `The last origin is down.${debugHeaders ? " Trace: " + backTrace : ""}<br/><pre>${err.stack}</pre>`);
						break;
					};
					case "DOMException": {
						response = wrapHtml(504, "Timeout", `Gateway timeout after ${timeoutMs} ms.${debugHeaders ? " Trace: " + backTrace : ""}`);
						break;
					};
					default: {
						response = wrapHtml(500, "Unknown error", `<pre>${err.stack}</pre>`);
					};
				};
			};
		};
		localTries --;
	};
	return response || wrapHtml(500, "Empty response", `${keepGoing ? "Successful" : "Failed"} empty response from trace: ${backTrace}.<br/>Last requested URL: ${reqUrl.toString()}`);
};

export {
	handleRequest
};