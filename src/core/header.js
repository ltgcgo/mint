"use strict";

Object.forEach = function (object, iterator) {
	let keys = Object.keys(object);
	keys.forEach(function (e) {
		iterator(object[e], e, object);
	});
};

let headerSet = function (arr, mustPresent) {
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

let headerMap = function (arr, mustPresent) {
	let obj = {};
	Object.forEach(mustPresent || {}, function (e, i) {
		obj[i.toLowerCase()] = e;
	});
	arr.split(",").forEach(function (e) {
		let colonAt = e.indexOf("=");
		if (colonAt < e.length - 1) {
			obj[e.slice(0, colonAt).toLowerCase()] = e.slice(colonAt + 1);
		};
	});
	return obj;
};

let adaptReqHeaders = function (header, opts) {
	let headerObj = {};
	// Header copying
	header.forEach(function (value, key) {
		headerObj[key.toLowerCase()] = value;
	});
	// Header stripping
	if (opts?.strip?.size > 0) {
		opts.strip.forEach(function (e) {
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
	return headerObj;
};

let adaptResp = async function (response, filter, opts = {}) {
	// This implementation cannot handle when there are multiple same headers with different values
	// Also, this implementation doesn't yet handle case differences in headers
	let headerObj = {}, target = response.body;
	if (filter?.constructor != Function) {
		filter = function (key, value) {
			return [key, value];
		};
	};
	response.headers.forEach(function (value, key) {
		let newHeader = filter(key.toLowerCase(), value);
		headerObj[newHeader[0].toLowerCase()] = newHeader[1];
	});
	// Header stripping
	if (opts?.strip?.size > 0) {
		opts.strip.forEach(function (e) {
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
	headerMap,
	adaptReqHeaders,
	adaptResp
};