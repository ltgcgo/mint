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
let genSegv6 = function () {
	return `${rand(65536).toString(16)}`
};
let getBackHost = function (fallback) {
	if (self.BACKHOST) {
		return self.BACKHOST;
	} else {
		return fallback;
	};
};

let filterHeaders = async function (response, filter, altThis) {
	let headerObj = {};
	response.headers.forEach(function (hV, hK) {
		let newVal = filter(hK, hV);
		headerObj[newVal[0]] = newVal[1];
	});
	let target = response.body;
	if (self.ADAPT_BODY == "1" && response.headers.get("Content-Type")?.toLowerCase().test("text/html", "text/html; charset=utf-8", "text/css")) {
		target = await response.text();
		target = target.replaceAll(altThis.from, altThis.to);
		headerObj["CloudHop-AdaptBody"] = "1";
	};
	return new Response(target, {
		status: response.status,
		headers: headerObj
	});
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
				return (uaStr.slice(0, mozillaStart + 13) + detailString + uaStr.slice(mozillaEnd));
			} else {
				return "Dalvik/2.1.0";
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

let errGenerator = function (error) {
	return new Response(`<!DOCTYPE html><head><meta charset="utf-8"/><title>Worker exception thrown.</title><style>body{background:#000;color:#ddd;}pre{color:#d00;}</style></head><body><p>Server encountered an error. Details are show below:</p><pre>${error.stack||error}</pre>`, {
		status: 500,
		headers: {
			"Alt-Server": "Cloud Hop",
			"Content-Type": "text/html"
		}
	})
};
let errHandler = function (event, error) {
	event.respondWith(errGenerator(error));
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
	let fakeRequester = genIPv4(), proto = reqUrl.protocol.replace(":", "");
	let workerHost = request.headers.get("CF-Workers") || "workers.dev";
	if (request.headers.has("Host")) {
		workerHost = request.headers.get("Host");
	};
	if (request.headers.has("Origin")) {
		newReq.headers.set("Origin", `${reqUrl.protocol}//${reqHost}/`);
	} else {
		newReq.headers.delete("Origin");
	};
	if (request.headers.has("Referer")) {
		let refUrl = new URL(request.headers.get("Referer"));
		newReq.headers.set("Referer", `${reqUrl.protocol}//${reqHost}${refUrl.pathname}`);
	} else {
		newReq.headers.delete("Referer");
	};
	if ((self.FULL_INFO || "0") != "1" && request.headers.has("Accept-Language")) {
		newReq.headers.set("Accept-Language", request.headers.get("Accept-Language").split(",")[0]);
	};
	newReq.headers.set("Host", getBackHost(reqHost));
	newReq.headers.set("X-Host", getBackHost(reqHost));
	newReq.headers.set("X-Real-IP", fakeRequester);
	newReq.headers.set("X-Forwarded-For", `${fakeRequester}:${rand(65536,1024)}`);
	newReq.headers.set("X-Forwarded-Proto", proto);
	newReq.headers.set("CF-Connecting-IP", fakeRequester);
	newReq.headers.set("Cf-Ew-Via", "0");
	newReq.headers.set("Cf-Ray", "${genSegv6()}${genSegv6()}${genSegv6()}${genSegv6()}-FRA");
	newReq.headers.set("Cf-Visitor", `{"scheme":"${proto}"}`);
	//newReq.headers.set("Cf-Worker", "workers.dev");
	//newReq.headers.set("Cdn-Loop", "cloudflare; subreqs=2");
	newReq.headers.set("Mod-Rewrite", "Off");
	newReq.headers.set("X-Hcl-Forwarded-Port", (proto == "https") ? "443" : "80");
	newReq.headers.set("X-Hcl-Forwarded-Proto", proto);
	newReq.headers.set("X-Scheme", "https");
	newReq.headers.set("User-Agent", getUserAgent(request.headers.get("User-Agent") || "Dalvik/2.1.0 (Linux; Android 12; Pixel 5)", self.MASK_UA));
	let response = await fetch(reqUrl, newReq);
	if (response.status >= 300 && response.status < 400) {
		let repHeaders = "";
		response.headers.forEach(function (e, i) {
			repHeaders += `${i}: ${e}\n`;
		});
		return new Response(`Remote responded with ${response.status}. Headers:\n${repHeaders}`, {
			status: 502
		});
	};
	if (response?.headers?.has("Content-Security-Policy")) {
		return await filterHeaders(response, function (header, value) {
			let headerLow = header.toLowerCase();
			if (headerLow == "content-security-policy") {
				value = value.replaceAll(reqHost, workerHost);
			};
			return [header, value];
		}, {from: reqHost, to: workerHost});
	};
	return response;
};

addEventListener("fetch", function (event) {
	try {
		event.respondWith(reqHandler(event.request));
	} catch (error) {
		errHandler(event, error);
	};
});