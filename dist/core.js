"use strict";(()=>{var f=function(r=200,n="Lorem",e="Blank."){return new Response(`<!DOCTYPE html><head><meta content="true" name="HandheldFriendly"/><title>${n}</title><style>body{font-family:sans-serif;position:absolute;width:100%;height:100%;background:#fff;margin:0;display:flex;align-items:center;justify-content:center;color:#555}#a{width:max-content;max-width:min(450px,80vw)}#b{text-align:center!important;font-weight:bold;font-size:1.5em;color:#333}#c{color:#333}#a>div{hyphens:auto;text-align:justify;padding:4px}a{text-decoration:none}#d{color:#777;font-size:0.75em}pre{overflow:scroll;padding:2px}@media(prefers-color-scheme:dark){html{filter:invert(100%)}}</style></head><body lang="en"><div id="a"><div id="b">${n}</div><div>${e}</div><div id="d"><center>Mint Flower v${pW}@${pV}</center></div></div></body>`,{status:r,headers:{Server:"Mint Flower","Content-Type":"text/html"}})};Object.forEach=function(r,n){Object.keys(r).forEach(function(t){n(r[t],t,r)})};var L=function(r,n){let e=new Set;return n?.length>0&&n.forEach(function(t){t.length>0&&e.add(t.toLowerCase())}),r.forEach(function(t){t.length>0&&e.add(t.toLowerCase())}),e},A=function(r,n){let e={};return Object.forEach(n||{},function(t,o){e[o.toLowerCase()]=t}),r.split(",").forEach(function(t){let o=t.indexOf("=");o<t.length-1&&(e[t.slice(0,o).toLowerCase()]=t.slice(o+1))}),e},_=function(r,n){let e={};r.forEach(function(o,i){e[i.toLowerCase()]=o}),n?.strip?.size>0&&n.strip.forEach(function(o){delete e[o]});let t=Object.keys(n?.set||{});return t.length>0&&t.forEach(function(o){e[o.toLowerCase()]=n.set[o]}),e},O=async function(r,n,e={}){let t={},o=r.body;n?.constructor!=Function&&(n=function(a,h){return[a,h]}),r.headers.forEach(function(a,h){let c=n(h.toLowerCase(),a);t[c[0].toLowerCase()]=c[1]}),e?.strip?.size>0&&e.strip.forEach(function(a){delete t[a]});let i=Object.keys(e?.set||{});return i.length>0&&i.forEach(function(a){t[a.toLowerCase()]=e.set[a]}),new Response(o,{status:r.status,headers:t})};var D=function(r,n){let e,t=r.split(",");if(t.forEach(function(o,i,a){let h=o.indexOf(";");h>-1&&(a[i]=o.slice(0,h))}),n.length>t.length){let o=127;t.forEach(function(i,a){let h=n.indexOf(i);h>-1&&h<o&&(e=i,o=h)}),!e&&n.includes("*")&&(e=t[0])}else n.forEach(function(o,i){if(o!="*"){let a=r.indexOf(o);!e&&a>-1&&(e=o)}else e||(e=t[0])});return e||"en"};var H="102.0",U=function(r="noBracket",n="Mozilla/5.0"){let e=n,t=n.toLowerCase().has("mobile");switch(r){case"asIs":break;case"mimic":{e="Mozilla/5.0 (",n.has("Firefox")||n.has("Trident")?(e+=t?"Android 12; Mobile":"Windows NT 10.0; Win64; x64",e+=`; rv:${H}) Gecko/${t?H:20100101} Firefox/${H}`):n.has("Safari")?(e+=t?"Linux; Android 12; Pixel 5":"Windows NT 10.0; Win64; x64",e+=`) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 ${t?"Mobile ":""}Safari/537.36`):e="Dalvik/2.1.0 (Linux; Android 12; Pixel 5)";break}case"noBracket":{let o=n.indexOf("(")+1,i=n.indexOf(")");if(o>-1&&o<i){if(e=n.slice(0,o),n.has("Trident"))e+="Windows NT 10.0; Trident/7.0; rv:11.0";else if(n.has("Firefox")){let a=n.slice(n.indexOf("Firefox/")+8).split(" ")[0];e+=t?"Android 12; Mobile":"Windows NT 10.0; Win64; x64",e+=`; rv:${a}`}else n.has("Chrome")?e+=t?"Linux; Android 12; Pixel 5":"Windows NT 10.0; Win64; x64":n.has("Safari")&&(e+=t?"iPhone; CPU iPhone OS 13_3_1 like Mac OS X":"Macintosh; Intel Mac OS X 10_15_17");e+=n.slice(i)}break}default:e=r}return e};String.prototype.has=String.prototype.includes;Array.prototype.has=Array.prototype.includes;self.pW="0.3";var W=["http:","https:","ws:","wss:"],$=["client","server","loose","asIs"];Array.prototype.random=function(){return this[Math.floor(Math.random()*this.length)]};Array.prototype.draw=function(){return this.splice(Math.floor(Math.random()*this.length),1)};var l=eG("DEBUGGER","0")=="1",v=eG("BACKENDS","internal").split(","),F=eG("BACKHOST",""),q=eG("MASK_IP","strip"),B=eG("MASK_UA","noBracket"),Y=eG("FOLLOW_REDIR","0"),N=eG("FORCE_IN_TLS","asIs"),M=eG("FORCE_OUT_TLS","asIs"),fe=eG("ADAPT_BODY","0")=="1",j=eG("MATCH_LANG","*").split(","),S=Math.max(parseInt(eG("HEALTH_MAX_TRIES","3")),1),X=pP?parseFloat(eG("HEALTH_ACTIVE","5")):0,J=eG("HEALTH_PATH"),E=eG("HEALTH_CRITERIA","asIs"),I=Math.max(parseInt(eG("TIMEOUT_MS","0")),2500),Q=L(eG("STRIP_HEADERS_UP","").split(","),"host,cf-connecting-ip,cdn-loop,cf-ew-via,cf-visitor,cf-ray,x-forwarded-for,x-real-ip,x-request-id,x-requested-with,accept-language,te,user-agent,forwarded,x-country,x-language,x-nf-account-id,x-nf-client-connection-ip,x-nf-request-id,x-nf-site-id,sec-ch-lang,sec-ch-save-data,sec-ch-prefers-color-scheme,sec-ch-prefers-reduced-motion,sec-ch-prefers-reduced-transparency,sec-ch-prefers-contrast,sec-ch-forced-colors,sec-ch-ua-full-version,sec-ch-ua-full-version-list,sec-ch-ua-platform-version,sec-ch-ua-arch,sec-ch-ua-bitness,sec-ch-ua-wow64,sec-ch-ua-model,viewport-width,viewport-height,dpr,device-memory,rtt,downlink,ect,sec-ch-viewport-width,sec-ch-viewport-height,sec-ch-dpr,sec-ch-device-memory,sec-ch-rtt,sec-ch-downlink,sec-ch-ect".split(",")),Z=L(eG("STRIP_HEADERS","").split(","),["alt-svc","content-encoding","strict-transport-security"]),b=A(eG("SET_HEADERS_UP",""),{"sec-fetch-dest":"document","sec-fetch-mode":"navigate","sec-fetch-site":"same-origin"}),ee=A(eG("SET_HEADERS","")),g=parseInt(eG("IDLE_SHUTDOWN","0"));g>0?g=Math.max(g,60)*1e3:g=-1;console.info(`Debug: ${l?"on":"off"}`);console.info(`Backends: ${v}`);console.info(`Mask: UA(${B}), IP(${q}), lang(${j})`);console.info(`TLS: in(${N}), out(${M});`);console.info(`Health: active(${X}), tries(${S}), crit(${E}), timeout(${I}ms), path(${J})`);console.info(`Inactivity shutdown: ${g}`);var R=Date.now();pP&&(console.info("Platform persistence available."),g>0&&setInterval(function(){Date.now()-R>g&&(console.info("Requested idle shutdown."),pE())},1e3),X>0&&console.info("Active health checking enabled, but not implemented."));var he=async function(r,n){if(g>0&&(R=Date.now()),v.length==1&&v[0]=="internal")return f(503,"Hey, it works!",'<a id="c" href="https://github.com/ltgcgo/mint/" target="_blank">Mint</a> is now deployed to this platform. Please refer to the documentation for further configuration.');let e=new URL(r.url),t=W.indexOf(e.protocol);if(t==-1)return f(400,"Unsupported",`Protocol "${e.protocol}" is not supported by <span id="c">Mint</span>.`);switch(N){case"plain":{if(t%2==1)return f(400,"HTTPS only","Only HTTPS connections are allowed.");break}case"tls":{if(t%2==0)return f(400,"HTTP only","Only HTTP connections are allowed.");break}}switch(M){case"tls":case"plain":{e.protocol=W[(t>>1<<1)+ +(M=="tls")]||e.protocol;break}}let o=r.headers.get("Host")||"",i=ee||{},a="",h=r.headers.get("Accept-Language")||"";a=D(h,j),a?.length>0&&(b["Accept-Language"]=a),b["User-Agent"]=U(B,r.headers.get("User-Agent"));let c,m=[],p=!0,y=S,T,C;for(;y>=0&&p;){(T?.length<1||!T)&&(T=v.slice());let w=T.draw(),te=w.lastIndexOf("]"),ne=w.lastIndexOf(":");if(m.push(w),e.hostname=w,e.port="",l&&console.info(`Tries: ${y}, lang: ${a||"blank"}, target: ${r.method} ${e.protocol}//${w}/`),r.headers.get("Upgrade")?.toLowerCase()=="websocket"||r.headers.has("Sec-WebSocket-Key")){let{socket:s,response:V}=Deno.upgradeWebSocket(r),u,k=[];s.addEventListener("open",function(){u=new WebSocket(e.toString().replace("http","ws")),u.addEventListener("close",function(){s.close()}),u.addEventListener("open",function(){k.length>0&&(k.forEach(function(d){u.send(d)}),k=void 0),l&&console.info("WebSocket connection established.")}),u.addEventListener("error",function(d){l&&console.error(`WebSocket transmission error on remote${d.message?": ":""}${d.message||""}.`)}),u.addEventListener("message",function(d){s.readyState==1&&s.send(d.data)})});try{s.addEventListener("close",function(){l&&console.error("WebSocket transmission closed."),u?.close()}),s.addEventListener("error",function(d){l&&console.error(`WebSocket transmission error on Mint: ${d.message}`)}),s.addEventListener("message",function(d){u?.readyState==1?u.send(d.data):k.push(d.data)})}catch(d){console.error(d.stack)}return V}let x={};x.method=r.method,r.bodyUsed&&(x.body=r.body),b.Host=`${F?.length>2?F:w}`;let P=r.headers.get("origin"),G=r.headers.get("referer");P?.length>0&&(b.Origin=P.replaceAll(o,w)),G?.length>0&&(b.Referer=G.replaceAll(o,w)),x.headers=_(r.headers,{strip:Q,set:b}),l&&(C=x.headers),Y=="0"&&(x.redirect="manual");let K=AbortSignal.timeout(I);x.signal=K;let z=new Request(e.toString(),x);try{switch(c=await fetch(e.toString(),z),Math.floor(c.status/100)){case 2:{p=!1;break}case 3:{let s=c.headers.get("location");c=f(c.status,"Redirection",`Origin issued an redirect to: <a href="${s}">${s}</a>.`),p=!1;break}case 4:{p=$.indexOf(E)==0;break}case 5:{p=$.indexOf(E)<=1;break}default:p=$.indexOf(E)<=2,p||(c=f(502,"Bad gateway",`All origins are down.${l?" Trace: "+m:""}`))}}catch(s){if(p=$.indexOf(E)<=2,p)c=f(500,"Internal error",`${l?"Tried to access: "+e.href+"<br/>":""}<pre>${s}${l&&s.stack?`
`+s.stack:""}</pre>`);else switch(console.error(s.stack),s.constructor.name){case"TypeError":{c=f(502,"Bad gateway",`The last origin is down.${l?" Trace: "+m:""}<br/><pre>${s.stack}</pre>`);break}case"DOMException":{c=f(504,"Timeout",`Gateway timeout after ${I} ms.${l?" Trace: "+m:""}`);break}default:c=f(500,"Unknown error",`<pre>${s.stack}</pre>`)}}if(g>0&&(R=Date.now()),l&&(i["X-MintFlower-Target"]=e.toString(),i["X-MintFlower-Health"]=`${y}/${S}`,i["X-MintFlower-Trace"]=m.toString(),i["X-MintFlower-Up"]=JSON.stringify(C)),y<=1&&!c)return c=f(502,"Bad gateway",`Passive health check count exceeded${l?": "+m:""}.`),i["X-MintFlower-Health"]=`0/${S}`,await O(c,!1,{set:i});y--}return await O(c,!1,{strip:Z,set:i})||f(500,"Empty response",`${p?"Successful":"Failed"} empty response from trace: ${m}.<br/>Last requested URL: ${e.toString()}`)};})();
