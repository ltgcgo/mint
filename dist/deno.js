"use strict";import {serve} from "https://deno.land/std/http/server.ts";(()=>{var s=async function(t,e){return new Response(e)};serve(async function(t,e){let n=e.remoteAddr.hostname;return await s(t,n)});})();
//# sourceMappingURL=deno.js.map
