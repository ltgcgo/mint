"use strict";let eG=(a,b="")=>{return Bun.env[a]||b};let pV="Bun",pE=()=>{},pP=true;(()=>{var d=function(n=200,t="Lorem",e="Blank."){return new Response(`<!DOCTYPE html><head><meta content="true" name="HandheldFriendly"/><title>${t}</title><style>body{font-family:sans-serif;position:absolute;width:100%;height:100%;background:#fff;margin:0;display:flex;align-items:center;justify-content:center;color:#555}#a{width:max-content;max-width:min(450px,80vw)}#b{text-align:center!important;font-weight:bold;font-size:1.5em;color:#333}#c{color:#333}#a>div{hyphens:auto;text-align:justify;padding:4px}a{text-decoration:none}#d{color:#777;font-size:0.75em}pre{overflow:scroll;padding:2px}@media(prefers-color-scheme:dark){html{filter:invert(100%)}}</style></head><body lang="en"><div id="a"><div id="b">${t}</div><div>${e}</div><div id="d"><center>Cloud Hop v${pW}@${pV}</center></div></div></body>`,{status:n,headers:{Server:"Cloud Hop","Content-Type":"text/html"}})};Object.forEach=function(n,t){Object.keys(n).forEach(function(o){t(n[o],o,n)})};var L=function(n,t){let e=new Set;return t?.length>0&&t.forEach(function(o){o.length>0&&e.add(o.toLowerCase())}),n.forEach(function(o){o.length>0&&e.add(o.toLowerCase())}),e},S=function(n,t){let e={};return Object.forEach(t||{},function(o,r){e[r.toLowerCase()]=o}),n.split(",").forEach(function(o){let r=o.indexOf("=");r<o.length-1&&(e[o.slice(0,r).toLowerCase()]=o.slice(r+1))}),e},_=function(n,t){let e={};n.forEach(function(r,i){e[i.toLowerCase()]=r}),t?.strip?.size>0&&t.strip.forEach(function(r){delete e[r]});let o=Object.keys(t?.set||{});return o.length>0&&o.forEach(function(r){e[r.toLowerCase()]=t.set[r]}),e},A=async function(n,t,e={}){let o={},r=n.body;t?.constructor!=Function&&(t=function(a,h){return[a,h]}),n.headers.forEach(function(a,h){let c=t(h.toLowerCase(),a);o[c[0].toLowerCase()]=c[1]}),e?.strip?.size>0&&e.strip.forEach(function(a){delete o[a]});let i=Object.keys(e?.set||{});return i.length>0&&i.forEach(function(a){o[a.toLowerCase()]=e.set[a]}),new Response(r,{status:n.status,headers:o})};var D=function(n,t){let e,o=n.split(",");if(o.forEach(function(r,i,a){let h=r.indexOf(";");h>-1&&(a[i]=r.slice(0,h))}),t.length>o.length){let r=127;o.forEach(function(i,a){let h=t.indexOf(i);h>-1&&h<r&&(e=i,r=h)}),!e&&t.includes("*")&&(e=o[0])}else t.forEach(function(r,i){if(r!="*"){let a=n.indexOf(r);!e&&a>-1&&(e=r)}else e||(e=o[0])});return e||"en"};var O="102.0",U=function(n="noBracket",t="Mozilla/5.0"){let e=t,o=t.toLowerCase().has("mobile");switch(n){case"asIs":break;case"mimic":{e="Mozilla/5.0 (",t.has("Firefox")||t.has("Trident")?(e+=o?"Android 12; Mobile":"Windows NT 10.0; Win64; x64",e+=`; rv:${O}) Gecko/${o?O:20100101} Firefox/${O}`):t.has("Safari")?(e+=o?"Linux; Android 12; Pixel 5":"Windows NT 10.0; Win64; x64",e+=`) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 ${o?"Mobile ":""}Safari/537.36`):e="Dalvik/2.1.0 (Linux; Android 12; Pixel 5)";break}case"noBracket":{let r=t.indexOf("(")+1,i=t.indexOf(")");if(r>-1&&r<i){if(e=t.slice(0,r),t.has("Trident"))e+="Windows NT 10.0; Trident/7.0; rv:11.0";else if(t.has("Firefox")){let a=t.slice(t.indexOf("Firefox/")+8).split(" ")[0];e+=o?"Android 12; Mobile":"Windows NT 10.0; Win64; x64",e+=`; rv:${a}`}else t.has("Chrome")?e+=o?"Linux; Android 12; Pixel 5":"Windows NT 10.0; Win64; x64":t.has("Safari")&&(e+=o?"iPhone; CPU iPhone OS 13_3_1 like Mac OS X":"Macintosh; Intel Mac OS X 10_15_17");e+=t.slice(i)}break}default:e=n}return e};String.prototype.has=String.prototype.includes;Array.prototype.has=Array.prototype.includes;self.pW="0.3";var W=["http:","https:","ws:","wss:"],v=["client","server","loose","asIs"];Array.prototype.random=function(){return this[Math.floor(Math.random()*this.length)]};Array.prototype.draw=function(){return this.splice(Math.floor(Math.random()*this.length),1)};var f=eG("DEBUGGER","0")=="1",H=eG("BACKENDS","internal").split(","),B=eG("BACKHOST",""),Y=eG("MASK_IP","strip"),F=eG("MASK_UA","noBracket"),J=eG("FOLLOW_REDIR","0"),N=eG("FORCE_IN_TLS","asIs"),C=eG("FORCE_OUT_TLS","asIs"),he=eG("ADAPT_BODY","0")=="1",j=eG("MATCH_LANG","*").split(","),$=Math.max(parseInt(eG("HEALTH_MAX_TRIES","3")),1),X=pP?parseFloat(eG("HEALTH_ACTIVE","5")):0,Q=eG("HEALTH_PATH"),E=eG("HEALTH_CRITERIA","asIs"),I=Math.max(parseInt(eG("TIMEOUT_MS","0")),2500),Z=L(eG("STRIP_HEADERS_UP","").split(","),"host,cf-connecting-ip,cdn-loop,cf-ew-via,cf-visitor,cf-ray,x-forwarded-for,x-real-ip,x-requested-with,accept-language,te,user-agent,sec-ch-lang,sec-ch-save-data,sec-ch-prefers-color-scheme,sec-ch-prefers-reduced-motion,sec-ch-prefers-reduced-transparency,sec-ch-prefers-contrast,sec-ch-forced-colors,sec-ch-ua-full-version,sec-ch-ua-full-version-list,sec-ch-ua-platform-version,sec-ch-ua-arch,sec-ch-ua-bitness,sec-ch-ua-wow64,sec-ch-ua-model,viewport-width,viewport-height,dpr,device-memory,rtt,downlink,ect,sec-ch-viewport-width,sec-ch-viewport-height,sec-ch-dpr,sec-ch-device-memory,sec-ch-rtt,sec-ch-downlink,sec-ch-ect".split(",")),ee=L(eG("STRIP_HEADERS","").split(","),["alt-svc"]),y=S(eG("SET_HEADERS_UP",""),{"sec-fetch-dest":"document","sec-fetch-mode":"navigate","sec-fetch-site":"same-origin"}),te=S(eG("SET_HEADERS","")),g=parseInt(eG("IDLE_SHUTDOWN","0"));g>0?g=Math.max(g,60)*1e3:g=-1;console.info(`Debug: ${f?"on":"off"}`);console.info(`Backends: ${H}`);console.info(`Mask: UA(${F}), IP(${Y}), lang(${j})`);console.info(`TLS: in(${N}), out(${C});`);console.info(`Health: active(${X}), tries(${$}), crit(${E}), timeout(${I}ms), path(${Q})`);console.info(`Inactivity shutdown: ${g}`);var R=Date.now();pP&&(console.info("Platform persistence available."),g>0&&setInterval(function(){Date.now()-R>g&&(console.info("Requested idle shutdown."),pE())},1e3),X>0&&console.info("Active health checking enabled, but not implemented."));var z=async function(n,t){if(g>0&&(R=Date.now()),H.length==1&&H[0]=="internal")return d(503,"Hey, it works!",'<span id="c">Cloud Hop</span> is now deployed to this platform. Please refer to the documentation for further configuration.');let e=new URL(n.url),o=W.indexOf(e.protocol);if(o==-1)return d(400,"Unsupported",`Protocol "${e.protocol}" is not supported by <span id="c">Cloud Hop</span>.`);switch(N){case"plain":{if(o%2==1)return d(400,"HTTPS only","Only HTTPS connections are allowed.");break}case"tls":{if(o%2==0)return d(400,"HTTP only","Only HTTP connections are allowed.");break}}switch(C){case"tls":case"plain":{e.protocol=W[(o>>1<<1)+ +(C=="tls")]||e.protocol;break}}let r=n.headers.get("Host")||"",i=te||{},a="",h=n.headers.get("Accept-Language")||"";a=D(h,j),a?.length>0&&(y["Accept-Language"]=a),y["User-Agent"]=U(F,n.headers.get("User-Agent"));let c,w=[],p=!0,x=$,T,M;for(;x>=0&&p;){(T?.length<1||!T)&&(T=H.slice());let m=T.draw(),oe=m.lastIndexOf("]"),ne=m.lastIndexOf(":");if(w.push(m),e.hostname=m,e.port="",f&&console.info(`Tries: ${x}, lang: ${a||"blank"}, target: ${n.method} ${e.protocol}//${m}/`),n.headers.get("Upgrade")?.toLowerCase()=="websocket"){let{socket:s,response:q}=Deno.upgradeWebSocket(n),u,k=[];s.addEventListener("open",function(){u=new WebSocket(e.toString().replace("http","ws")),u.addEventListener("close",function(){s.close()}),u.addEventListener("open",function(){k.length>0&&(k.forEach(function(l){u.send(l)}),k=void 0),f&&console.info("WebSocket connection established.")}),u.addEventListener("error",function(l){f&&console.error(`WebSocket transmission error on remote${l.message?": ":""}${l.message||""}.`)}),u.addEventListener("message",function(l){s.readyState==1&&s.send(l.data)})});try{s.addEventListener("close",function(){console.error("WebSocket transmission closed."),u?.close()}),s.addEventListener("error",function(l){f&&console.error(`WebSocket transmission error on Cloud Hop: ${l.message}`)}),s.addEventListener("message",function(l){u?.readyState==1?u.send(l.data):k.push(l.data)})}catch(l){console.error(l.stack)}return q}let b={};b.method=n.method,n.bodyUsed&&(b.body=n.body),y.Host=`${B?.length>2?B:m}`;let P=n.headers.get("origin"),G=n.headers.get("referer");P?.length>0&&(y.Origin=P.replaceAll(r,m)),G?.length>0&&(y.Referer=G.replaceAll(r,m)),b.headers=_(n.headers,{strip:Z,set:y}),f&&(M=b.headers),J=="0"&&(b.redirect="manual");let K=AbortSignal.timeout(I);b.signal=K;let V=new Request(e.toString(),b);try{switch(c=await fetch(e.toString(),V),Math.floor(c.status/100)){case 2:{p=!1;break}case 3:{let s=c.headers.get("location");c=d(c.status,"Redirection",`Origin issued an redirect to: <a href="${s}">${s}</a>.`),p=!1;break}case 4:{p=v.indexOf(E)==0;break}case 5:{p=v.indexOf(E)<=1;break}default:p=v.indexOf(E)<=2,p||(c=d(502,"Bad gateway",`All origins are down.${f?" Trace: "+w:""}`))}}catch(s){if(p=v.indexOf(E)<=2,p)c=d(500,"Internal error",`${f?"Tried to access: "+e.href+"<br/>":""}<pre>${s}${f&&s.stack?`
`+s.stack:""}</pre>`);else switch(console.error(s.stack),s.constructor.name){case"TypeError":{c=d(502,"Bad gateway",`The last origin is down.${f?" Trace: "+w:""}<br/><pre>${s.stack}</pre>`);break}case"DOMException":{c=d(504,"Timeout",`Gateway timeout after ${I} ms.${f?" Trace: "+w:""}`);break}default:c=d(500,"Unknown error",`<pre>${s.stack}</pre>`)}}if(g>0&&(R=Date.now()),f&&(i["X-CloudHop-Target"]=e.toString(),i["X-CloudHop-Health"]=`${x}/${$}`,i["X-CloudHop-Trace"]=w.toString(),i["X-CloudHop-Up"]=JSON.stringify(M)),x<=1&&!c)return c=d(502,"Bad gateway",`Passive health check count exceeded${f?": "+w:""}.`),i["X-CloudHop-Health"]=`0/${$}`,await A(c,!1,{set:i});x--}return await A(c,!1,{strip:ee,set:i})||d(500,"Empty response",`${p?"Successful":"Failed"} empty response from trace: ${w}.<br/>Last requested URL: ${e.toString()}`)};var ge=Bun.serve({fetch:async function(n){let t=n.headers.get("cf-connecting-ip");return z(n,t)}});})();