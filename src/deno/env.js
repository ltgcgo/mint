"use strict";

/*
Middleware for environment variable shim.
*/

let envGet = function (name, fallback) {
	return Deno.env.get(name) || fallback;
};

export {
	envGet
};