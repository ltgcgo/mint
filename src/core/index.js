"use strict";

let handleRequest = async function (request, clientInfo) {
	let response = new Response(clientInfo.ip);
	return response;
};

export {
	handleRequest
};