"use strict";import {serve} from "https://deno.land/std/http/server.ts";(()=>{var r=async function(t,e){return new Response(e.ip)};serve(async function(t,e){let n=e.remoteAddr;return await r(t,n)});})();
//# sourceMappingURL=deno.js.map
