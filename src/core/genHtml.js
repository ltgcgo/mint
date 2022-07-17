"use strict";

let wrapHtml = function (status = 200, title = "Lorem", content = "Blank.") {
	return new Response(`<!DOCTYPE html><head><meta content="true" name="HandheldFriendly"/><title>${title}</title><style>body{font-family:sans-serif;position:absolute;width:100%;height:100%;background:#fff;margin:0;display:flex;align-items:center;justify-content:center;color:#555}#a{width:max-content;max-width:min(450px,80vw)}#b{text-align:center!important;font-weight:bold;font-size:1.5em;color:#333}#c{color:#333}#a>div{hyphens:auto;text-align:justify;padding:4px}a{text-decoration:none}#d{color:#777;font-size:0.75em}pre{overflow:scroll;padding:2px}@media(prefers-color-scheme:dark){html{filter:invert(100%)}}</style></head><body lang="en"><div id="a"><div id="b">${title}</div><div>${content}</div><div id="d"><center>Cloud Hop v${pW}@${pV}</center></div></div></body>`, {
		status: status,
		headers: {
			"Server": "Cloud Hop",
			"Content-Type": "text/html"
		}
	});
};

export {
	wrapHtml
};