/*
"use strict" is already included.
*/

// Script import section
import {handleRequest} from "../core/index.js";
//import {stripHeader} from "./strip.js";

let listenPort = parseInt(eG("LISTEN_PORT")) || 8006;

self.WebSocket = WebSocket;
let WebSocketServer = class {
	#attached;
	#url;
	#closed = false;
	#dataQueue = [];
	#events = {
		open: [],
		message: [],
		error: [],
		close: []
	};
	addEventListener(type, handler) {
		if (this.#attached) {
			if (type != "open") {
				this.#attached.addEventListener(type, handler);
			} else {
				handler(new Event("open"));
			};
		} else {
			this.#events[type].push(handler);
		};
	};
	get binaryType () {
		return this.#attached?.binaryType || "";
	};
	get bufferedAmount () {
		return this.#attached?.bufferedAmount || 0;
	};
	get extensions () {
		return this.#attached?.extensions || "";
	};
	get readyState () {
		return this.#attached?.readyState || 0;
	};
	get url () {
		return this.#attached?.url || this.#url;
	};
	attach (wsService) {
		if (this.#closed) {
			return false;
		};
		if (this.#attached) {
			throw(new Error("Already attached a WebSocket object"));
			return false;
		};
		this.#attached = wsService;
		let upThis = this;
		switch (wsService.readyState) {
			case 0:
			case 1: {
				for (let type in this.#events) {
					this.#events[type].forEach((e) => {
						wsService.addEventListener(type, e);
					});
				};
				let openEvent = new Event("open");
				this.#events.open.forEach((e) => {
					e(openEvent);
				});
				break;
			};
			case 2:
			case 3: {
				upThis.dispatchEvent(new Event("close"));
				break;
			};
		};
	};
	close (...args) {
		this.#closed = true;
		return this.#attached?.close(...args);
	};
	send (data) {
		if (this.#attached) {
			this.#attached.send(data);
		} else {
			this.#dataQueue.push(data);
		};
	};
	constructor (request) {
		this.#url = request.url.replace("http", "ws");
		this.addEventListener("open", (ev) => {
			// Send everything in the queue
			while (this.#dataQueue.length > 0) {
				this.#attached.send(this.#dataQueue.shift());
			};
		});
	};
};
self.Deno = {
	upgradeWebSocket: (req) => {
		let wsUpgrader = new WebSocketService({noServer: true});
		let wsServer = new WebSocketServer(req);
		wsUpgrader.handleUpgrade(req.raw.requester, req.raw.socket, req.raw.head, function (ws) {
			wsServer.attach(ws);
		});
		return {
			socket: wsServer,
			response: new Response(null, {
				status: 200
			})
		};
	}
};

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
server.on("upgrade", async (requester, socket, head) => {
	let clientIp = requester.headers["x-real-ip"] || requester.headers["x-forwarded-for"] || requester.socket.remoteAddress;
	if (clientIp.indexOf("::ffff:") == 0) {
		clientIp = clientIp.slice(clientIp.lastIndexOf("::ffff:") + 7);
	};
	let reqOpt = {
		"method": requester.method,
		"headers": requester.headers
	};
	let request = new Request(`${requester.headers["x-forwarded-proto"] || "http"}://${requester.headers.host}${requester.url}`, reqOpt);
	request.raw = {
		requester,
		socket,
		head
	};
	// Reply section
	let response = await handleRequest(request, clientIp);
});
server.listen(listenPort, "127.0.0.1", () => {
	console.info(`Listening on http://localhost:${listenPort}/`);
});
