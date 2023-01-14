/*
"use strict" is already included.
*/

// Script import section
import {handleRequest} from "../core/index.js";
//import {stripHeader} from "./strip.js";

let listenPort = parseInt(eG("LISTEN_PORT")) || 8006;

let server = http.createServer(async function (requester, responder) {
	// Request section
	let clientIp = requester.headers["x-real-ip"] || requester.headers["x-forwarded-for"] || requester.socket.remoteAddress;
	if (clientIp.indexOf("::ffff:") == 0) {
		clientIp = clientIp.slice(clientIp.lastIndexOf("::ffff:") + 7);
	};
	let readStreamController;
	let bodyStream = new ReadableStream({
		type: "bytes",
		start: (controller) => {
			readStreamController = controller;
		},
		cancel: (reason) => {},
		autoAllocateChunkSize: 65536
	});
	let reqOpt = {
		"method": requester.method,
		"headers": requester.headers
	};
	let bodyUsed = ["GET", "HEAD"].indexOf(reqOpt.method) == -1;
	requester.on("data", (chunk) => {
		readStreamController.enqueue(chunk);
	}).on("end", () => {
		readStreamController.close();
	});
	if (bodyUsed) {
		reqOpt.body = bodyStream;
		reqOpt.duplex = "half";
	};
	let request = new Request(`${requester.headers["x-forwarded-proto"] || "http"}://${requester.headers.host}${requester.url}`, reqOpt);
	// Reply section
	let response = await handleRequest(request, clientIp);
	response?.headers?.forEach((v, k) => {
		responder.setHeader(k, v);
	});
	responder.statusCode = response?.status || 200;
	if (response?.statusText) {
		responder.statusMessage = response.statusText;
	};
	responder.flushHeaders();
	let repBodyStream = response.body.getReader(),
	repBodyFlowing = true;
	while (repBodyFlowing) {
		await repBodyStream.read().then(({done, value}) => {
			if (done) {
				responder.end();
				repBodyFlowing = false;
			} else {
				responder.write(value);
			};
		});
	};
});
server.listen(listenPort, "127.0.0.1", () => {
	console.info(`Listening on http://localhost:${listenPort}/`);
});
