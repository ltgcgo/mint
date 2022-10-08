"use strict";let eG=(a,b="")=>{return self[a]||b};let pV="Cloudflare",pE=()=>{},pP=true;(()=>{var Q=function(t){let[o,e]=Object.values(new WebSocketPair);e.accept();let n=e.addEventListener;return Object.defineProperty(e,"addEventListener",{value:function(r,...i){r=="open"?i[0].call(e):n.call(e,r,...i)}}),{socket:e,response:new Response(null,{status:101,webSocket:o})}},b={upgradeWebSocket:Q},y=class{#e={onclose:[],onerror:[],onmessage:[],onopen:[],close(){},readyState:0,isDummy:!0};#t="";#o=async function(t){let o=this,e=AbortSignal.timeout(5e3),n,r=function(){let s=new Error("Bad WebSocket handshake");o.#e?.onerror?.forEach(function(a){a[0](s)}),o.#e?.onclose?.forEach(function(a){a[0]()})};e.addEventListener("abort",function(){(!n||n?.readyState!=1)&&r()}),n=await fetch(t,{headers:{Upgrade:"websocket"}});let i=n.webSocket;i?(this.#e.onclose.forEach(function(s){i.addEventListener("close",...s)}),this.#e.onerror.forEach(function(s){i.addEventListener("error",...s)}),this.#e.onmessage.forEach(function(s){i.addEventListener("message",...s)}),this.#e.onopen.forEach(function(s){i.addEventListener("open",...s)}),i.addEventListener("error",function(){i.close()}),i.accept(),this.#e=i):r()};addEventListener(...t){this.#e.isDummy?this.#e[`on${t[0]}`].push(t.slice(1)):this.#e?.addEventListener(...t)}close(...t){this.#e.close(...t)}send(...t){this.#e?.send(...t)}get url(){return this.#t}get readyState(){return this.#e.readyState}constructor(t){let o=t;t.indexOf("ws")==0&&(o=t.replace("ws","http")),this.#t=o,this.#o(o)}};var f=function(t=200,o="Lorem",e="Blank."){return new Response(`<!DOCTYPE html><head><meta content="true" name="HandheldFriendly"/><title>${o}</title><style>body{font-family:sans-serif;position:absolute;width:100%;height:100%;background:#fff;margin:0;display:flex;align-items:center;justify-content:center;color:#555}#a{width:max-content;max-width:min(450px,80vw)}#b{text-align:center!important;font-weight:bold;font-size:1.5em;color:#333}#c{color:#333}#a>div{hyphens:auto;text-align:justify;padding:4px}a{text-decoration:none}#d{color:#777;font-size:0.75em}pre{overflow:scroll;padding:2px}@media(prefers-color-scheme:dark){html{filter:invert(100%)}}</style></head><body lang="en"><div id="a"><div id="b">${o}</div><div>${e}</div><div id="d"><center>Cloud Hop v${pW}@${pV}</center></div></div></body>`,{status:t,headers:{Server:"Cloud Hop","Content-Type":"text/html"}})};Object.forEach=function(t,o){Object.keys(t).forEach(function(n){o(t[n],n,t)})};var O=function(t,o){let e=new Set;return o?.length>0&&o.forEach(function(n){n.length>0&&e.add(n.toLowerCase())}),t.forEach(function(n){n.length>0&&e.add(n.toLowerCase())}),e},A=function(t,o){let e={};return Object.forEach(o||{},function(n,r){e[r.toLowerCase()]=n}),t.split(",").forEach(function(n){let r=n.indexOf("=");r<n.length-1&&(e[n.slice(0,r).toLowerCase()]=n.slice(r+1))}),e},U=function(t,o){let e={};t.forEach(function(r,i){e[i.toLowerCase()]=r}),o?.strip?.size>0&&o.strip.forEach(function(r){delete e[r]});let n=Object.keys(o?.set||{});return n.length>0&&n.forEach(function(r){e[r.toLowerCase()]=o.set[r]}),e},C=async function(t,o,e={}){let n={},r=t.body;o?.constructor!=Function&&(o=function(s,a){return[s,a]}),t.headers.forEach(function(s,a){let c=o(a.toLowerCase(),s);n[c[0].toLowerCase()]=c[1]}),e?.strip?.size>0&&e.strip.forEach(function(s){delete n[s]});let i=Object.keys(e?.set||{});return i.length>0&&i.forEach(function(s){n[s.toLowerCase()]=e.set[s]}),new Response(r,{status:t.status,headers:n})};var B=function(t,o){let e,n=t.split(",");if(n.forEach(function(r,i,s){let a=r.indexOf(";");a>-1&&(s[i]=r.slice(0,a))}),o.length>n.length){let r=127;n.forEach(function(i,s){let a=o.indexOf(i);a>-1&&a<r&&(e=i,r=a)}),!e&&o.includes("*")&&(e=n[0])}else o.forEach(function(r,i){if(r!="*"){let s=t.indexOf(r);!e&&s>-1&&(e=r)}else e||(e=n[0])});return e||"en"};var I="102.0",F=function(t="noBracket",o="Mozilla/5.0"){let e=o,n=o.toLowerCase().has("mobile");switch(t){case"asIs":break;case"mimic":{e="Mozilla/5.0 (",o.has("Firefox")||o.has("Trident")?(e+=n?"Android 12; Mobile":"Windows NT 10.0; Win64; x64",e+=`; rv:${I}) Gecko/${n?I:20100101} Firefox/${I}`):o.has("Safari")?(e+=n?"Linux; Android 12; Pixel 5":"Windows NT 10.0; Win64; x64",e+=`) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 ${n?"Mobile ":""}Safari/537.36`):e="Dalvik/2.1.0 (Linux; Android 12; Pixel 5)";break}case"noBracket":{let r=o.indexOf("(")+1,i=o.indexOf(")");if(r>-1&&r<i){if(e=o.slice(0,r),o.has("Trident"))e+="Windows NT 10.0; Trident/7.0; rv:11.0";else if(o.has("Firefox")){let s=o.slice(o.indexOf("Firefox/")+8).split(" ")[0];e+=n?"Android 12; Mobile":"Windows NT 10.0; Win64; x64",e+=`; rv:${s}`}else o.has("Chrome")?e+=n?"Linux; Android 12; Pixel 5":"Windows NT 10.0; Win64; x64":o.has("Safari")&&(e+=n?"iPhone; CPU iPhone OS 13_3_1 like Mac OS X":"Macintosh; Intel Mac OS X 10_15_17");e+=o.slice(i)}break}default:e=t}return e};String.prototype.has=String.prototype.includes;Array.prototype.has=Array.prototype.includes;self.pW="0.2";var j=["http:","https:","ws:","wss:"],S=["client","server","loose","asIs"];Array.prototype.random=function(){return this[Math.floor(Math.random()*this.length)]};Array.prototype.draw=function(){return this.splice(Math.floor(Math.random()*this.length),1)};var h=eG("DEBUGGER","0")=="1",H=eG("BACKENDS","internal").split(","),R=eG("BACKHOST",""),Z=eG("MASK_IP","strip"),N=eG("MASK_UA","noBracket"),ee=eG("FOLLOW_REDIR","0"),X=eG("FORCE_IN_TLS","asIs"),M=eG("FORCE_OUT_TLS","asIs"),we=eG("ADAPT_BODY","0")=="1",q=eG("MATCH_LANG","*").split(","),$=Math.max(parseInt(eG("HEALTH_MAX_TRIES","3")),1),z=pP?parseFloat(eG("HEALTH_ACTIVE","5")):0,te=eG("HEALTH_PATH"),k=eG("HEALTH_CRITERIA","asIs"),P=Math.max(parseInt(eG("TIMEOUT_MS","0")),2500),oe=O(eG("STRIP_HEADERS_UP","").split(","),"host,cf-connecting-ip,cdn-loop,cf-ew-via,cf-visitor,cf-ray,x-forwarded-for,x-real-ip,x-requested-with,accept-language,te,user-agent,sec-ch-lang,sec-ch-save-data,sec-ch-prefers-color-scheme,sec-ch-prefers-reduced-motion,sec-ch-prefers-reduced-transparency,sec-ch-prefers-contrast,sec-ch-forced-colors,sec-ch-ua-full-version,sec-ch-ua-full-version-list,sec-ch-ua-platform-version,sec-ch-ua-arch,sec-ch-ua-bitness,sec-ch-ua-wow64,sec-ch-ua-model,viewport-width,viewport-height,dpr,device-memory,rtt,downlink,ect,sec-ch-viewport-width,sec-ch-viewport-height,sec-ch-dpr,sec-ch-device-memory,sec-ch-rtt,sec-ch-downlink,sec-ch-ect".split(",")),ne=O(eG("STRIP_HEADERS","").split(","),["alt-svc"]),v=A(eG("SET_HEADERS_UP",""),{"sec-fetch-dest":"document","sec-fetch-mode":"navigate","sec-fetch-site":"same-origin"}),re=A(eG("SET_HEADERS","")),m=parseInt(eG("IDLE_SHUTDOWN","0"));m>0?m=Math.max(m,60)*1e3:m=-1;console.info(`Debug mode: ${h?"on":"off"}`);console.info(`Backends: ${H}`);console.info(`Host: ${R}`);console.info(`Masking: UA(${N}), IP(${Z}), lang(${q})`);console.info(`TLS: in(${X}), out(${M});`);console.info(`Health: active(${z}), tries(${$}), crit(${k}), timeout(${P}ms), path(${te})`);console.info(`Inactivity shutdown: ${m}`);var G=Date.now();pP&&(console.info("Platform persistence available."),m>0&&setInterval(function(){Date.now()-G>m&&(console.info("Requested idle shutdown."),pE())},1e3),z>0&&console.info("Active health checking enabled, but not implemented."));var K=async function(t,o){if(m>0&&(G=Date.now()),H.length==1&&H[0]=="internal")return f(503,"Hey, it works!",'<span id="c">Cloud Hop</span> is now deployed to this platform. Please refer to the documentation for further configuration.');let e=new URL(t.url),n=j.indexOf(e.protocol);if(n==-1)return f(400,"Unsupported",`Protocol "${e.protocol}" is not supported by <span id="c">Cloud Hop</span>.`);switch(X){case"plain":{if(n%2==1)return f(400,"HTTPS only","Only HTTPS connections are allowed.");break}case"tls":{if(n%2==0)return f(400,"HTTP only","Only HTTP connections are allowed.");break}}switch(M){case"tls":case"plain":{e.protocol=j[(n>>1<<1)+ +(M=="tls")]||e.protocol;break}}let r=t.headers.get("Host")||"",i=re||{},s="",a=t.headers.get("Accept-Language")||"";s=B(a,q),s?.length>0&&(v["Accept-Language"]=s),v["User-Agent"]=F(N,t.headers.get("User-Agent"));let c,w=[],p=!0,x=$,L,W;for(;x>=0&&p;){(L?.length<1||!L)&&(L=H.slice());let u=L.draw(),ie=u.lastIndexOf("]"),se=u.lastIndexOf(":");if(w.push(u),e.hostname=u,e.port="",h&&console.info(`Tries: ${x}, lang: ${s||"blank"}, target: ${t.method} ${e.protocol}//${u}/`),t.headers.get("Upgrade")?.toLowerCase()=="websocket"){let{socket:l,response:J}=b.upgradeWebSocket(t);h&&console.info("Upgrading to a WebSocket connection...");let g,T=[];l.addEventListener("open",function(){g=new y(e.toString().replace("http","ws")),g.addEventListener("close",function(){console.info(5),l.close(),console.info(6)}),g.addEventListener("open",function(){T.length>0&&(T.forEach(function(d){g.send(d)}),T=void 0),h&&console.info("WebSocket connection established.")}),g.addEventListener("error",function(d){h&&(console.info(1),console.error(`WebSocket transmission error on remote${d.message?": ":""}${d.message||""}.`),console.info(2))}),g.addEventListener("message",function(d){l.readyState==1&&l.send(d.data)})});try{l.addEventListener("close",function(){console.error("WebSocket transmission closed."),g?.close()}),l.addEventListener("error",function(d){h&&console.error(`WebSocket transmission error on Cloud Hop: ${d.name}`)}),l.addEventListener("message",function(d){g?.readyState==1?g.send(d.data):T.push(d.data)})}catch(d){console.error(d.stack)}return J}let E={};E.method=t.method,t.bodyUsed&&(E.body=t.body),v.Host=`${R?.length>2?R:u}`;let _=t.headers.get("origin"),D=t.headers.get("referer");_?.length>0&&(v.Origin=_.replaceAll(r,u)),D?.length>0&&(v.Referer=D.replaceAll(r,u)),E.headers=U(t.headers,{strip:oe,set:v}),h&&(W=E.headers),ee=="0"&&(E.redirect="manual");let V=AbortSignal.timeout(P);E.signal=V;let Y=new Request(e.toString(),E);try{switch(c=await fetch(e.toString(),Y),Math.floor(c.status/100)){case 2:{p=!1;break}case 3:{let l=c.headers.get("location");c=f(c.status,"Redirection",`Origin issued an redirect to: <a href="${l}">${l}</a>.`),p=!1;break}case 4:{p=S.indexOf(k)==0;break}case 5:{p=S.indexOf(k)<=1;break}default:p=S.indexOf(k)<=2,p||(c=f(502,"Bad gateway",`All origins are down.${h?" Trace: "+w:""}`))}}catch(l){if(p=S.indexOf(k)<=2,!p)switch(console.error(l.stack),l.constructor.name){case"TypeError":{c=f(502,"Bad gateway",`The last origin is down.${h?" Trace: "+w:""}<br/><pre>${l.stack}</pre>`);break}case"DOMException":{c=f(504,"Timeout",`Gateway timeout after ${P} ms.${h?" Trace: "+w:""}`);break}default:c=f(500,"Unknown error",`<pre>${l.stack}</pre>`)}}if(m>0&&(G=Date.now()),h&&(i["X-CloudHop-Target"]=u,i["X-CloudHop-Health"]=`${x}/${$}`,i["X-CloudHop-Trace"]=w.toString(),i["X-CloudHop-Up"]=JSON.stringify(W)),x<=1&&!c)return c=f(502,"Bad gateway",`Passive health check count exceeded${h?": "+w:""}.`),i["X-CloudHop-Health"]=`0/${$}`,await C(c,!1,{set:i});x--}return await C(c,!1,{strip:ne,set:i})||f(500,"Empty response",`${p?"Successful":"Failed"} empty response from trace: ${w}.<br/>Last requested URL: ${e.toString()}`)};addEventListener("fetch",async function(t){let o=t.request,e=o.headers.get("cf-connecting-ip");t.respondWith(K(o,e))});})();
