"use strict";

/*
Middleware for environment variable shim.
*/

let envGet = function (name, fallback) {
	return self[name] || fallback;
};

export {
	envGet
};