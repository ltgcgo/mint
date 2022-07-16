"use strict";

let handleRequest = async function (request, clientInfo) {
	let response = new Response(clientInfo);
	return response;
};

export {
	handleRequest
};