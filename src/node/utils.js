"use strict";

let headerObject = function (headers) {
	let object = {};
	headers?.forEach((v, k) => {
		object[k] = v;
	});
	return object;
};

let base64Decode = function (source) {
	let sliceIndex = source.indexOf("=");
	let rawString = atob(source);
	let buffer = new Uint8Array(rawString.length);
	for (let i = 0; i < rawString.length; i ++) {
		buffer[i] = rawString.charCodeAt(i);
	};
	return buffer;
};

export {
	headerObject,
	base64Decode
};
