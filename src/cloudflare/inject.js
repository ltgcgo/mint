"use strict";

// Deno API shim

let upgradeWebSocket = function (request) {
	let [client, socket] = Object.values(new WebSocketPair());
	socket.accept();
	return {
		socket,
		response: new Response(null, {
			status: 101,
			webSocket: client
		})
	};
};

let Deno = {
	upgradeWebSocket
};

// Other shims

let WebSocket = class {
	#target = {
		onclose: [],
		onerror: [],
		onmessage: [],
		onopen: [],
		isDummy: true
	};
	#url = "";
	#getWsObj = async function (url) {
		let reply = await fetch(url, {
			headers: {
				"Upgrade": "websocket"
			}
		});
		let handle = reply.webSocket;
		if (handle) {
			this.#target.onclose.forEach(function (e) {
				handle.addEventListener("close", ...e);
			});
			this.#target.onerror.forEach(function (e) {
				handle.addEventListener("error", ...e);
			});
			this.#target.onmessage.forEach(function (e) {
				handle.addEventListener("message", ...e);
			});
			this.#target.onopen.forEach(function (e) {
				handle.addEventListener("open", ...e);
			});
			this.#target = handle;
			handle.accept();
		} else {
			if (this.#target.onerror?.length > 0) {
				this.#target.onerror.forEach(function (e) {
					e[0]();
				});
			};
			if (this.#target.onclose?.length > 0) {
				this.#target.onclose.forEach(function (e) {
					e[0]();
				});
			};
			throw Error("Bad WebSocket handshake");
		};
	};
	addEventListener(...args) {
		if (this.#target.isDummy) {
			this.#target[`on${args[0]}`].push(args.slice(1));
		} else {
			this.#target?.addEventListener(...args);
		};
	};
	close(...args) {
		this.#target?.close(...args);
	};
	send(...args) {
		this.#target?.send(...args);
	};
	get url() {
		return this.#url;
	};
	constructor(url) {
		let wsTarget = url,
		protIdx = url.indexOf("ws");
		if (protIdx == 0) {
			wsTarget = protIdx.replace("ws", "http");
		};
		this.#url = url;
		this.#getWsObj(wsTarget);
	};
};

export {
	Deno,
	WebSocket
};
