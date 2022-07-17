"use strict";

let headerSet = function(arr, mustPresent) {
	let set = new Set();
	if (mustPresent?.length > 0) {
		mustPresent.forEach(function (e) {
			if (e.length > 0) {
				set.add(e.toLowerCase());
			};
		});
	};
	arr.forEach(function (e) {
		if (e.length > 0) {
			set.add(e.toLowerCase());
		};
	});
	return set;
};

let adaptResp = async function (response, filter, opts = {}) {
	// This implementation cannot handle when there are multiple same headers with different values
	// Also, this implementation doesn't yet handle case differences in headers
	let headerObj = {},
	target = response.body;
	if (filter?.constructor != Function) {
		filter = function (key, value) {
			return [key, value];
		};
	};
	response.headers.forEach(function (value, key) {
		let newHeader = filter(key.toLowerCase(), value);
		headerObj[newHeader[0]] = newHeader[1];
	});
	// Header stripping
	if (opts?.strip?.size > 0) {
		opts.strip.forEach(function (e) {
			console.debug(`Removed header: ${e}`);
			delete headerObj[e];
		});
	};
	// Header setting
	let setHeaders = Object.keys(opts?.set || {});
	if (setHeaders.length > 0) {
		setHeaders.forEach(function (e) {
			headerObj[e.toLowerCase()] = opts.set[e];
		});
	};
	return new Response(target, {
		status: response.status,
		headers: headerObj
	});
};

export {
	headerSet,
	adaptResp
};