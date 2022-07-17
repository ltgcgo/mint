import {build} from "https://deno.land/x/dnt/mod.ts";

await build({
	entryPoints: ["./node_modules/dnt.js"],
	outDir: "./proxy/dnt",
	shims: {
		// see JS docs for overview and more options
		deno: true,
		timers: true,
		blob: true,
		domException: true,
		undici: true
	},
	package: {
		"name": "cloudhop",
		"type": "module",
		"version": "0.2",
		"description": "Hopping across the clouds.",
		"license": "MIT",
		"files": [
			"src/node/*.js",
			"!*/vendor/**/*.ts*"
		],
		"devDependencies": {
			"deno2node": "~1.4.0"
		},
		"dependencies": {
			"undici": "^5.7.0"
		}
	}
});
