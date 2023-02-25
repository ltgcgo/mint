import {headerObject, base64Decode} from "../node/utils.js";
import {handleRequest} from "../core/index.js";

const stayPlain = ["", "text/plain", "text/html", "application/json"]

let main = async function (ev) {
	let clientIp = ev?.http?.headers["cf-connecting-ip"] || "127.3.2.1";
	let bodyBlob;
	if (ev?.http?.body?.length) {
		if (ev.http.isBase64Encoded) {
			bodyBlob = base64Decode(ev.http.body);
		} else {
			bodyBlob = ev.http.body;
		};
	};
	let response, repBody = [];
	try {
		let reqOpt = {
			"method": ev.http.method,
			"headers": ev.http.headers
		};
		if (bodyBlob) {
			reqOpt.body = bodyBlob;
		};
		let fullUrl = `${ev.http.headers["x-forwarded-proto"]}://${ev.http.headers["host"]}${ev.http.path}`;
		if (ev.http.queryString?.length > 0) {
			fullUrl += `?${ev.http.queryString}`;
		};
		let request = new Request(fullUrl, reqOpt);
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
	let finalReply = {
		statusCode: response?.status,
		headers: headerObject(response?.headers)
	};
	if (stayPlain.dexOf(response?.headers.get("Content-Type") || "") != -1) {
		// Return the body as-is
		finalReply.body = Buffer.concat(repBody).toString();
	} else {
		finalReply.body = Buffer.concat(repBody).toString("base64");
	};
	return finalReply;
};

export {
	main
};
