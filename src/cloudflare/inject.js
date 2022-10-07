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
	#target;
	#url = "";
	#getWsObj = async function (url) {
		let reply = await fetch(url, {
			headers: {
				"Upgrade": "websocket"
			}
		});
		let handle = reply.webSocket;
		if (handle) {
			this.#target = handle;
			handle.accept();
		} else {
			throw Error("Bad WebSocket handshake");
		};
	};
	addEventListener(...args) {
		this.#target.addEventListener(...args);
	};
	close(...args) {
		this.#target.close(...args);
	};
	send(...args) {
		this.#target.send(...args);
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
