"use strict";(()=>{var s=async function(t,e){return new Response(e.ip)};addEventListener("fetch",async function(t){let e=t.request,n={ip:e.headers.get("cf-connecting-ip")};return await s(e,n)});})();
//# sourceMappingURL=cloudflare.js.map
