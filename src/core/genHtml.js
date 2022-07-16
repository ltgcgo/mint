"use strict";

let wrapHtml = function (status = 200, title = "Lorem", content = "Blank.") {
	return new Response(`<!DOCTYPE html><head><meta content="true" name="HandheldFriendly"/><title>${title}</title><style>*{font-family:sans-serif;color:#555}body{position:absolute;width:100%;height:100%;background:#fff;margin:0;display:flex;align-items:center;justify-content:center}#a{width:max-content;max-width:min(450px,80vw)}#b{text-align:center!important;font-weight:bold;font-size:2em;color:#333}#c{color:#333}#a>div{hyphens:auto;text-align:justify;padding:4px}a{text-decoration:none}</style></head><body lang="en"><div id="a"><div id="b">${title}</div><div>${content}</div></div></body>`, {
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