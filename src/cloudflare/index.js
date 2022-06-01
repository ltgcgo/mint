"use strict";

let rand = function (max, min = 0) {
	let range = max - min;
	return Math.floor(Math.random() * range) + min;
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
	let newReq = new Request(reqUrl.toString(), request);
	let fakeRequester = genIPv4();
	newReq.headers.delete("Origin");
	newReq.headers.set("Host", getBackHost(reqHost));
	newReq.headers.set("X-Online-Host", getBackHost(reqHost));
	newReq.headers.set("X-Forwarded-For", `${fakeRequester}:${rand(65536,1024)}`);
	newReq.headers.set("X-Real-IP", fakeRequester);
	newReq.headers.set("X-Forwarded-Proto", reqUrl.protocol.replace(":", ""));
	return await fetch(reqUrl, newReq);;
};

addEventListener("fetch", function (event) {
	try {
		event.respondWith(reqHandler(event.request));
	} catch (error) {
		errHandler(event, error);
	};
});