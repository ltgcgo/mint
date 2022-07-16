"use strict";

let envGet = [function (name, fallback) {
	return self[name] || fallback;
}, function (name, fallback) {
	return Deno.env.get(name) || fallback;
}];
let getPlatformEnvGetter = function (platform) {
	return envGet["global,deno".split(",").indexOf(platform)];
};

export {
	getPlatformEnvGetter
};