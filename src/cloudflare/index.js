"use strict";

const allowedProtocols = ["http:", "https:", "ws:", "wss:"];

let rand = function (max, min = 0) {
	let range = max - min;
	return Math.floor(Math.random() * range) + min;
};
String.prototype.test = function (...strings) {
	let upThis = this, result = false;
	strings.forEach(function (e) {
		if (upThis.indexOf(e) > -1) {
			result = true;
		};
	});
	return result;
};
Array.prototype.random = function () {
	return this[rand(this.length)];
};
let genIPv4 = function () {
	return `${rand(256, 1)}.${rand(256, 1)}.${rand(256, 1)}.${rand(256, 1)}`
};
let getBackHost = function (fallback) {
	if (self.BACKHOST) {
		return self.BACKHOST;
	} else {
		return fallback;
	};
};

let getUserAgent = function (uaStr, mode = "noBracket") {
	let lowStr = uaStr?.toLowerCase();
	let isMobile = lowStr?.indexOf("mobile") > 0;
	let useFirefox = lowStr?.test("firefox");
	let useChrome = lowStr?.test("chrom", "safari");
	switch (mode) {
		case "asIs": {
			return uaStr;
			break;
		};
		case "noBracket": {
			let mozillaStart = uaStr.indexOf("Mozilla/5.0 (");
			if (mozillaStart > -1) {
				let mozillaEnd = uaStr.indexOf(")");
				let useDevice = lowStr.test("iphone", "ipad", "ios") ? 2 : (lowStr.test("android", "mobile") ? 1 : 0), detailString = "";
				if (!useDevice) {
					detailString = "Windows NT 10.0; Win64; x64";
				} else if (useDevice == 2) {
					detailString = "iPhone; CPU iPhone OS 14_4 like Mac OS X";
				} else {
					detailString = useFirefox ? "Android 12; Mobile; rv:91.0" : "Linux; Android 12; Pixel 5"
				};
				return (uaStr.slice(0, mozillaStart + 13) + detailString + uaStr.slice(mozillaEnd)) || "Dalvik/2.1.0";
			};
			break;
		};
		case "mimic": {
			let finalStr = "Mozilla/5.0 (";
			if (useFirefox) {
				finalStr += (isMobile) ? "Android 12; Mobile; rv:91.0) Gecko/91.0" : "Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101";
				finalStr += " Firefox/91.0";
			} else if (useChrome) {
				finalStr += (isMobile) ? "Linux; Android 12; Pixel 5" : "Windows NT 10.0; Win64; x64";
				finalStr += ") AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 ";
				finalStr += (isMobile) ? "Mobile " : "";
				finalStr += "Safari/537.36";
			} else {
				return "Dalvik/2.1.0 (Linux; Android 12; Pixel 5)";
			};
			return finalStr;
			break;
		};
		default: {
			return mode?.toString() || "Dalvik/";
		};
	};
};

let origins = BACKENDS.split(",");

let errHandler = function (event, error) {
	event.respondWith(new Response(`<!DOCTYPE html><head><meta charset="utf-8"/><title>Worker exception thrown.</title><style>body{background:#000;color:#ddd;}pre{color:#d00;}</style></head><body><p>Server encountered an error. Details are show below:</p><pre>${error.stack||error}</pre>`, {
		status: 500,
		headers: {
			"Alt-Server": "Cloud Hop",
			"Content-Type": "text/html"
		}
	}));
};
let reqHandler = async function (request) {
	let reqUrl = new URL(request.url);
	let reqHost = origins.random();
	reqUrl.hostname = reqHost;
	let detProtIdx = allowedProtocols.indexOf(reqUrl.protocol);
	if (detProtIdx > -1) {
		switch (self.FORCE_IN_TLS) {
			case "plain": {
				if (detProtIdx % 2 == 1) {
					return new Response(`Using HTTPS on HTTP server.`, {
						status: 400,
						headers: {
							"Alt-Server": "Cloud Hop",
							"Content-Type": "text/plain"
						}
					});
				};
				break;
			};
			case "tls": {
				if (detProtIdx % 2 == 0) {
					return new Response(`Using HTTP on HTTPS server.`, {
						status: 400,
						headers: {
							"Alt-Server": "Cloud Hop",
							"Content-Type": "text/plain"
						}
					});
				};
				break;
			};
		};
		switch (self.FORCE_OUT_TLS) {
			case "tls": {
				reqUrl.protocol = allowedProtocols[(detProtIdx >> 1 << 1) + 1] || reqUrl.protocol;
				break;
			};
			case "plain": {
				reqUrl.protocol = allowedProtocols[detProtIdx >> 1 << 1] || reqUrl.protocol;
				break;
			};
		};
	};
	let newReq = new Request(reqUrl.toString(), request);
	let fakeRequester = genIPv4();
	newReq.headers.delete("Origin");
	newReq.headers.set("Host", getBackHost(reqHost));
	newReq.headers.set("X-Online-Host", getBackHost(reqHost));
	newReq.headers.set("X-Forwarded-For", `${fakeRequester}:${rand(65536,1024)}`);
	newReq.headers.set("X-Real-IP", fakeRequester);
	newReq.headers.set("X-Forwarded-Proto", reqUrl.protocol.replace(":", ""));
	newReq.headers.set("User-Agent", getUserAgent(request.headers.get("User-Agent") || "Dalvik/2.1.0 (Linux; Android 12; Pixel 5)", self.MASK_UA));
	return await fetch(reqUrl, newReq);;
};

addEventListener("fetch", function (event) {
	try {
		event.respondWith(reqHandler(event.request));
	} catch (error) {
		errHandler(event, error);
	};
});