import {headerObject, base64Decode} from "../node/utils.js";
import {handleRequest} from "../core/index.js";

export const handler = async function (event, context) {
	// Request section
	let clientIp = event.headers["x-nf-client-connection-ip"];
	let bodyBlob;
	if (event.body) {
		if (event.isBase64Encoded) {
			bodyBlob = base64Decode(event.body);
		} else {
			bodyBlob = event.body;
		};
	};
	let reqOpt = {
		"method": event.httpMethod,
		"headers": event.headers
	};
	if (bodyBlob) {
		reqOpt.body = bodyBlob;
	};
	let request = new Request(event.rawUrl, reqOpt);
	// Response section
	let response;
	let repBody = [];
	try {
		response = await handleRequest(request, clientIp);
		let repBodyStream = response.body.getReader(),
		repBodyFlowing = true;
		while (repBodyFlowing) {
			await repBodyStream.read().then(({done, value}) => {
				if (done) {
					repBodyFlowing = false;
				} else {
					repBody.push(value);
				};
			});
		};
	} catch (err) {
		return {
			statusCode: 500,
			headers: {
				"Content-Type": "text/plain"
			},
			body: err.stack
		};
	};
	return {
		statusCode: response?.status,
		headers: headerObject(response?.headers),
		body: Buffer.concat(repBody).toString("base64"),
		isBase64Encoded: true
	};
};
