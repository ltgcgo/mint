"use strict";

let handleRequest = async function (request, clientInfo) {
	let response = new Response(clientInfo.hostname);
	return response;
};

export {
	handleRequest
};