"use strict";

import {wrapHtml} from "./genHtml.js";
import {headerSet, headerMap, adaptResp, adaptReqHeaders} from "./header.js";
import {langMatch} from "./langMatch.js";
import {uaSpread} from "./uaSpread.js";

// Strings shorthand (only works in bundled results)
String.prototype.has = String.prototype.includes;
Array.prototype.has = Array.prototype.includes;

// Constants
self.pW = "0.3";
const allowedProtos = ["http:", "https:", "ws:", "wss:"],
failureCrits = ["client", "server", "loose", "asIs"];

Array.prototype.random = function () {
	return this[Math.floor(Math.random() * this.length)];
};
Array.prototype.draw = function () {
	return this.splice(Math.floor(Math.random() * this.length), 1);
};

// Fetch environment variables
let debugHeaders = eG("DEBUGGER", "0") == "1";
let origin = eG("BACKENDS", "internal").split(",");
let realHost = eG("BACKHOST", "");
let maskIP = eG("MASK_IP", "strip");
let maskUA = eG("MASK_UA", "noBracket");
let followRedir = eG("FOLLOW_REDIR", "0");
let tlsIn = eG("FORCE_IN_TLS", "asIs");
let tlsOut = eG("FORCE_OUT_TLS", "asIs");
let adaptBody = eG("ADAPT_BODY", "0") == "1";
let matchLang = eG("MATCH_LANG", "*").split(",");
let maxTries = Math.max(parseInt(eG("HEALTH_MAX_TRIES", "3")), 1);
let activeCheck = pP ? parseFloat(eG("HEALTH_ACTIVE", "5")) : 0;
let activePath = eG("HEALTH_PATH");
let failCrit = eG("HEALTH_CRITERIA", "asIs");
let timeoutMs = Math.max(parseInt(eG("TIMEOUT_MS", "0")), 2500);
let headerStripUp = headerSet(eG("STRIP_HEADERS_UP", "").split(","), "host,cf-connecting-ip,cdn-loop,cf-ew-via,cf-visitor,cf-ray,x-forwarded-for,x-real-ip,x-request-id,x-requested-with,accept-language,te,user-agent,sec-ch-lang,sec-ch-save-data,sec-ch-prefers-color-scheme,sec-ch-prefers-reduced-motion,sec-ch-prefers-reduced-transparency,sec-ch-prefers-contrast,sec-ch-forced-colors,sec-ch-ua-full-version,sec-ch-ua-full-version-list,sec-ch-ua-platform-version,sec-ch-ua-arch,sec-ch-ua-bitness,sec-ch-ua-wow64,sec-ch-ua-model,viewport-width,viewport-height,dpr,device-memory,rtt,downlink,ect,sec-ch-viewport-width,sec-ch-viewport-height,sec-ch-dpr,sec-ch-device-memory,sec-ch-rtt,sec-ch-downlink,sec-ch-ect".split(","));
let headerStripDown = headerSet(eG("STRIP_HEADERS", "").split(","), ["alt-svc", "content-encoding", "strict-transport-security"]);
let headerSetUp = headerMap(eG("SET_HEADERS_UP", ""), {"sec-fetch-dest": "document", "sec-fetch-mode": "navigate", "sec-fetch-site": "same-origin"});
let headerSetDown = headerMap(eG("SET_HEADERS", ""));
let idleShutdown = parseInt(eG("IDLE_SHUTDOWN", "0"));

// Parse shutdown
if (idleShutdown > 0) {
	idleShutdown = Math.max(idleShutdown, 60) * 1000;
} else {
	idleShutdown = -1;
};

// Server console messages
console.info(`Debug: ${debugHeaders ? "on" : "off"}`);
console.info(`Backends: ${origin}`);
//console.info(`Host: ${realHost}`);
console.info(`Mask: UA(${maskUA}), IP(${maskIP}), lang(${matchLang})`);
console.info(`TLS: in(${tlsIn}), out(${tlsOut});`);
console.info(`Health: active(${activeCheck}), tries(${maxTries}), crit(${failCrit}), timeout(${timeoutMs}ms), path(${activePath})`);
console.info(`Inactivity shutdown: ${idleShutdown}`);

let lastActive = Date.now();
if (pP) {
	console.info("Platform persistence available.");
	if (idleShutdown > 0) {
		setInterval(function () {
			let currentTime = Date.now();
			if (currentTime - lastActive > idleShutdown) {
				console.info("Requested idle shutdown.");
				pE();
			};
		}, 1000);
	};
	// Parse active health checking interval
	if (activeCheck > 0) {
		console.info("Active health checking enabled, but not implemented.");
	};
};

let handleRequest = async function (request, clientInfo) {
	if (idleShutdown > 0) {
		lastActive = Date.now();
	};
	// Generate a pre-determinted response if nothing is configured.
	if (origin.length == 1 && origin[0] == "internal") {
		return wrapHtml(503, `Hey, it works!`, `<a id="c" href="https://github.com/ltgcgo/mint/" target="_blank">Mint</a> is now deployed to this platform. Please refer to the documentation for further configuration.`);
	};
	let reqUrl = new URL(request.url);
	// Give an error page when protocol mismatch
	let detProtIdx = allowedProtos.indexOf(reqUrl.protocol);
	if (detProtIdx == -1) {
		return wrapHtml(400, `Unsupported`, `Protocol "${reqUrl.protocol}" is not supported by <span id="c">Mint</span>.`);
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
			reqUrl.protocol = allowedProtos[(detProtIdx >> 1 << 1) + +(tlsOut == "tls")] || reqUrl.protocol;
			break;
		};
	};
	// Get deployment host
	let depHost = request.headers.get("Host") || "";
	// Prepare for header manipulation
	let localHeaders = headerSetDown || {};
	// Match languages
	let useLang = "", reqLangList = request.headers.get("Accept-Language") || "";
	useLang = langMatch(reqLangList, matchLang);
	if (useLang?.length > 0) {
		headerSetUp["Accept-Language"] = useLang;
	};
	// Mask user agent strings
	headerSetUp["User-Agent"] = uaSpread(maskUA, request.headers.get("User-Agent"));
	// Passive health check
	let response, backTrace = [], keepGoing = true, localTries = maxTries, localOrigin, sentHeaders;
	while (localTries >= 0 && keepGoing) {
		if (localOrigin?.length < 1 || !localOrigin) {
			localOrigin = origin.slice();
		};
		// Randomly choose an origin
		let reqHost = localOrigin.draw();
		let v6EndIdx = reqHost.lastIndexOf("]"),
		portIdx = reqHost.lastIndexOf(":");
		backTrace.push(reqHost);
		reqUrl.hostname = reqHost;
		reqUrl.port = "";
		// Report the selected origin
		if (debugHeaders) {
			console.info(`Tries: ${localTries}, lang: ${useLang || "blank"}, target: ${request.method} ${reqUrl.protocol}//${reqHost}/`);
		};
		// Let the WebSocket forwarder deal with WS connections
		if (
			request.headers.get("Upgrade")?.toLowerCase() == "websocket" ||
			request.headers.has("Sec-WebSocket-Key")
		) {
			let {socket, response} = Deno.upgradeWebSocket(request);
			let remoteWsService, dataQueue = [];
			socket.addEventListener("open", function () {
				remoteWsService = new WebSocket(reqUrl.toString().replace("http", "ws"));
				remoteWsService.addEventListener("close", function () {
					socket.close();
				});
				remoteWsService.addEventListener("open", function () {
					if (dataQueue.length > 0) {
						dataQueue.forEach(function (e) {
							remoteWsService.send(e);
						});
						dataQueue = undefined;
					};
					if (debugHeaders) {
						console.info(`WebSocket connection established.`);
					};
				});
				remoteWsService.addEventListener("error", function (ev) {
					if (debugHeaders) {
						console.error(`WebSocket transmission error on remote${ev.message ? ": " : ""}${ev.message || ""}.`);
					};
				});
				remoteWsService.addEventListener("message", function (ev) {
					if (socket.readyState == 1) {
						socket.send(ev.data);
					};
				});
			});
			try {
			socket.addEventListener("close", function () {
				if (debugHeaders) {
					console.error(`WebSocket transmission closed.`);
				};
				remoteWsService?.close();
			});
			socket.addEventListener("error", function (ev) {
				if (debugHeaders) {
					console.error(`WebSocket transmission error on Mint: ${ev.message}`);
				};
			});
			socket.addEventListener("message", function (ev) {
				if (remoteWsService?.readyState == 1) {
					remoteWsService.send(ev.data);
				} else {
					dataQueue.push(ev.data);
				};
			});} catch (err) {
				console.error(err.stack);
			};
			return response;
		};
		// Partially clone the request object
		let repRequest = {};
		repRequest.method = request.method;
		if (request.bodyUsed) {
			repRequest.body = request.body;
		};
		// Request header manipulation
		// Use the correct Host header
		headerSetUp["Host"] = `${realHost?.length > 2 ? realHost : reqHost}`;
		// Match Origin and Referer
		// Port can be a great problem!!
		let reqOrigin = request.headers.get("origin");
		let reqReferer = request.headers.get("referer");
		if (reqOrigin?.length > 0) {
			headerSetUp["Origin"] = reqOrigin.replaceAll(depHost, reqHost);
		};
		if (reqReferer?.length > 0) {
			headerSetUp["Referer"] = reqReferer.replaceAll(depHost, reqHost);
		};
		// Apply header modifications
		repRequest.headers = adaptReqHeaders(request.headers, {strip: headerStripUp, set: headerSetUp});
		if (debugHeaders) {
			sentHeaders = repRequest.headers;
		};
		// Throw an error if received redirects
		if (followRedir == "0") {
			repRequest.redirect = "manual";
		};
		// Add an abort controller
		let abortCtrl = AbortSignal.timeout(timeoutMs);
		repRequest.signal = abortCtrl;
		// Initiate a new request
		let newReq = new Request(reqUrl.toString(), repRequest);
		// Send the request
		try {
			response = await fetch(reqUrl.toString(), newReq);
			// Test if the response matches criteria
			//backTrace[backTrace.length - 1] = `${reqHost}(${response.status?.toString() || "000"})`;
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
						//backTrace[backTrace.length - 1] = `${reqHost}(DWN)`;
						break;
					};
					case "DOMException": {
						response = wrapHtml(504, "Timeout", `Gateway timeout after ${timeoutMs} ms.${debugHeaders ? " Trace: " + backTrace : ""}`);
						//backTrace[backTrace.length - 1] = `${reqHost}(TMO)`;
						break;
					};
					default: {
						response = wrapHtml(500, "Unknown error", `<pre>${err.stack}</pre>`);
						//backTrace[backTrace.length - 1] = `${reqHost}(UNK)`;
					};
				};
			} else {
				response = wrapHtml(500, "Internal error", `${debugHeaders ? "Tried to access: " + reqUrl.href + "<br/>" : ""}<pre>${err}${debugHeaders && err.stack ? "\n" + err.stack : ""}</pre>`);
			};
		};
		if (idleShutdown > 0) {
			lastActive = Date.now();
		};
		// Add informative headers
		if (debugHeaders) {
			localHeaders["X-MintFlower-Target"] = reqUrl.toString();
			localHeaders["X-MintFlower-Health"] = `${localTries}/${maxTries}`;
			localHeaders["X-MintFlower-Trace"] = backTrace.toString();
			localHeaders["X-MintFlower-Up"] = JSON.stringify(sentHeaders);
		};
		// Give an error if tried too many times
		if (localTries <= 1 && !response) {
			response = wrapHtml(502, `Bad gateway`, `Passive health check count exceeded${debugHeaders ? ": " + backTrace : ""}.`);
			localHeaders["X-MintFlower-Health"] = `0/${maxTries}`;
			return await adaptResp(response, false, {set: localHeaders});
		};
		localTries --;
	};
	return await adaptResp(response, false, {strip: headerStripDown, set: localHeaders}) || wrapHtml(500, "Empty response", `${keepGoing ? "Successful" : "Failed"} empty response from trace: ${backTrace}.<br/>Last requested URL: ${reqUrl.toString()}`);
};

export {
	handleRequest
};
