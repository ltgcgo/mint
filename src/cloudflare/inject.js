"use strict";

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

export {
	Deno
};
