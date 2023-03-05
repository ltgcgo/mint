"use strict";let eG=(a,b="")=>{return process.env[a]||b};let pV="Node",pE=process.exit.bind();let self=globalThis;let pP=true;
// Node.js import section
import http from "node:http";import{WebSocket,WebSocketServer as WebSocketService}from"ws";(()=>{var u=function(e=200,r="Lorem",t="Blank."){return new Response(`<!DOCTYPE html><head><meta content="true" name="HandheldFriendly"/><title>${r}</title><style>body{font-family:sans-serif;position:absolute;width:100%;height:100%;background:#fff;margin:0;display:flex;align-items:center;justify-content:center;color:#555}#a{width:max-content;max-width:min(450px,80vw)}#b{text-align:center!important;font-weight:bold;font-size:1.5em;color:#333}#c{color:#333}#a>div{hyphens:auto;text-align:justify;padding:4px}a{text-decoration:none}#d{color:#777;font-size:0.75em}pre{overflow:scroll;padding:2px}@media(prefers-color-scheme:dark){html{filter:invert(100%)}}</style></head><body lang="en"><div id="a"><div id="b">${r}</div><div>${t}</div><div id="d"><center>Mint Flower v${pW}@${pV}</center></div></div></body>`,{status:e,headers:{Server:"Mint Flower","Content-Type":"text/html"}})};Object.forEach=function(e,r){Object.keys(e).forEach(function(n){r(e[n],n,e)})};var A=function(e,r){let t=new Set;return r?.length>0&&r.forEach(function(n){n.length>0&&t.add(n.toLowerCase())}),e.forEach(function(n){n.length>0&&t.add(n.toLowerCase())}),t},L=function(e,r){let t={};return Object.forEach(r||{},function(n,o){t[o.toLowerCase()]=n}),e.split(",").forEach(function(n){let o=n.indexOf("=");o<n.length-1&&(t[n.slice(0,o).toLowerCase()]=n.slice(o+1))}),t},_=function(e,r){let t={};e.forEach(function(o,s){t[s.toLowerCase()]=o}),r?.strip?.size>0&&r.strip.forEach(function(o){delete t[o]});let n=Object.keys(r?.set||{});return n.length>0&&n.forEach(function(o){t[o.toLowerCase()]=r.set[o]}),t},O=async function(e,r,t={}){let n={},o=e.body;r?.constructor!=Function&&(r=function(i,c){return[i,c]}),e.headers.forEach(function(i,c){let a=r(c.toLowerCase(),i);n[a[0].toLowerCase()]=a[1]}),t?.strip?.size>0&&t.strip.forEach(function(i){delete n[i]});let s=Object.keys(t?.set||{});return s.length>0&&s.forEach(function(i){n[i.toLowerCase()]=t.set[i]}),new Response(o,{status:e.status,headers:n})};var U=function(e,r){let t,n=e.split(",");if(n.forEach(function(o,s,i){let c=o.indexOf(";");c>-1&&(i[s]=o.slice(0,c))}),r.length>n.length){let o=127;n.forEach(function(s,i){let c=r.indexOf(s);c>-1&&c<o&&(t=s,o=c)}),!t&&r.includes("*")&&(t=n[0])}else r.forEach(function(o,s){if(o!="*"){let i=e.indexOf(o);!t&&i>-1&&(t=o)}else t||(t=n[0])});return t||"en"};var H="102.0",D=function(e="noBracket",r="Mozilla/5.0"){let t=r,n=r.toLowerCase().has("mobile");switch(e){case"asIs":break;case"mimic":{t="Mozilla/5.0 (",r.has("Firefox")||r.has("Trident")?(t+=n?"Android 12; Mobile":"Windows NT 10.0; Win64; x64",t+=`; rv:${H}) Gecko/${n?H:20100101} Firefox/${H}`):r.has("Safari")?(t+=n?"Linux; Android 12; Pixel 5":"Windows NT 10.0; Win64; x64",t+=`) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 ${n?"Mobile ":""}Safari/537.36`):t="Dalvik/2.1.0 (Linux; Android 12; Pixel 5)";break}case"noBracket":{let o=r.indexOf("(")+1,s=r.indexOf(")");if(o>-1&&o<s){if(t=r.slice(0,o),r.has("Trident"))t+="Windows NT 10.0; Trident/7.0; rv:11.0";else if(r.has("Firefox")){let i=r.slice(r.indexOf("Firefox/")+8).split(" ")[0];t+=n?"Android 12; Mobile":"Windows NT 10.0; Win64; x64",t+=`; rv:${i}`}else r.has("Chrome")?t+=n?"Linux; Android 12; Pixel 5":"Windows NT 10.0; Win64; x64":r.has("Safari")&&(t+=n?"iPhone; CPU iPhone OS 13_3_1 like Mac OS X":"Macintosh; Intel Mac OS X 10_15_17");t+=r.slice(s)}break}default:t=e}return t};String.prototype.has=String.prototype.includes;Array.prototype.has=Array.prototype.includes;self.pW="0.3";var F=["http:","https:","ws:","wss:"],S=["client","server","loose","asIs"];Array.prototype.random=function(){return this[Math.floor(Math.random()*this.length)]};Array.prototype.draw=function(){return this.splice(Math.floor(Math.random()*this.length),1)};var f=eG("DEBUGGER","0")=="1",T=eG("BACKENDS","internal").split(","),B=eG("BACKHOST",""),Z=eG("MASK_IP","strip"),N=eG("MASK_UA","noBracket"),q=eG("FOLLOW_REDIR","0"),j=eG("FORCE_IN_TLS","asIs"),M=eG("FORCE_OUT_TLS","asIs"),we=eG("ADAPT_BODY","0")=="1",X=eG("MATCH_LANG","*").split(","),$=Math.max(parseInt(eG("HEALTH_MAX_TRIES","3")),1),z=pP?parseFloat(eG("HEALTH_ACTIVE","5")):0,ee=eG("HEALTH_PATH"),k=eG("HEALTH_CRITERIA","asIs"),I=Math.max(parseInt(eG("TIMEOUT_MS","0")),2500),te=A(eG("STRIP_HEADERS_UP","").split(","),"host,cf-connecting-ip,cdn-loop,cf-ew-via,cf-visitor,cf-ray,x-forwarded-for,x-real-ip,x-request-id,x-requested-with,accept-language,te,user-agent,forwarded,x-country,x-language,x-nf-account-id,x-nf-client-connection-ip,x-nf-request-id,x-nf-site-id,sec-ch-lang,sec-ch-save-data,sec-ch-prefers-color-scheme,sec-ch-prefers-reduced-motion,sec-ch-prefers-reduced-transparency,sec-ch-prefers-contrast,sec-ch-forced-colors,sec-ch-ua-full-version,sec-ch-ua-full-version-list,sec-ch-ua-platform-version,sec-ch-ua-arch,sec-ch-ua-bitness,sec-ch-ua-wow64,sec-ch-ua-model,viewport-width,viewport-height,dpr,device-memory,rtt,downlink,ect,sec-ch-viewport-width,sec-ch-viewport-height,sec-ch-dpr,sec-ch-device-memory,sec-ch-rtt,sec-ch-downlink,sec-ch-ect".split(",")),ne=A(eG("STRIP_HEADERS","").split(","),["alt-svc","content-encoding","strict-transport-security"]),E=L(eG("SET_HEADERS_UP",""),{"sec-fetch-dest":"document","sec-fetch-mode":"navigate","sec-fetch-site":"same-origin"}),re=L(eG("SET_HEADERS","")),m=parseInt(eG("IDLE_SHUTDOWN","0"));m>0?m=Math.max(m,60)*1e3:m=-1;console.info(`Debug: ${f?"on":"off"}`);console.info(`Backends: ${T}`);console.info(`Mask: UA(${N}), IP(${Z}), lang(${X})`);console.info(`TLS: in(${j}), out(${M});`);console.info(`Health: active(${z}), tries(${$}), crit(${k}), timeout(${I}ms), path(${ee})`);console.info(`Inactivity shutdown: ${m}`);var R=Date.now();pP&&(console.info("Platform persistence available."),m>0&&setInterval(function(){Date.now()-R>m&&(console.info("Requested idle shutdown."),pE())},1e3),z>0&&console.info("Active health checking enabled, but not implemented."));var C=async function(e,r){if(m>0&&(R=Date.now()),T.length==1&&T[0]=="internal")return u(503,"Hey, it works!",'<a id="c" href="https://github.com/ltgcgo/mint/" target="_blank">Mint</a> is now deployed to this platform. Please refer to the documentation for further configuration.');let t=new URL(e.url),n=F.indexOf(t.protocol);if(n==-1)return u(400,"Unsupported",`Protocol "${t.protocol}" is not supported by <span id="c">Mint</span>.`);switch(j){case"plain":{if(n%2==1)return u(400,"HTTPS only","Only HTTPS connections are allowed.");break}case"tls":{if(n%2==0)return u(400,"HTTP only","Only HTTP connections are allowed.");break}}switch(M){case"tls":case"plain":{t.protocol=F[(n>>1<<1)+ +(M=="tls")]||t.protocol;break}}let o=e.headers.get("Host")||"",s=re||{},i="",c=e.headers.get("Accept-Language")||"";i=U(c,X),i?.length>0&&(E["Accept-Language"]=i),E["User-Agent"]=D(N,e.headers.get("User-Agent"));let a,w=[],h=!0,d=$,x,P;for(;d>=0&&h;){(x?.length<1||!x)&&(x=T.slice());let b=x.draw(),se=b.lastIndexOf("]"),ie=b.lastIndexOf(":");if(w.push(b),t.hostname=b,t.port="",f&&console.info(`Tries: ${d}, lang: ${i||"blank"}, target: ${e.method} ${t.protocol}//${b}/`),e.headers.get("Upgrade")?.toLowerCase()=="websocket"||e.headers.has("Sec-WebSocket-Key")){let{socket:l,response:J}=Deno.upgradeWebSocket(e),g,v=[];l.addEventListener("open",function(){g=new WebSocket(t.toString().replace("http","ws")),g.addEventListener("close",function(){l.close()}),g.addEventListener("open",function(){v.length>0&&(v.forEach(function(p){g.send(p)}),v=void 0),f&&console.info("WebSocket connection established.")}),g.addEventListener("error",function(p){f&&console.error(`WebSocket transmission error on remote${p.message?": ":""}${p.message||""}.`)}),g.addEventListener("message",function(p){l.readyState==1&&l.send(p.data)})});try{l.addEventListener("close",function(){f&&console.error("WebSocket transmission closed."),g?.close()}),l.addEventListener("error",function(p){f&&console.error(`WebSocket transmission error on Mint: ${p.message}`)}),l.addEventListener("message",function(p){g?.readyState==1?g.send(p.data):v.push(p.data)})}catch(p){console.error(p.stack)}return J}let y={};y.method=e.method,e.bodyUsed&&(y.body=e.body),E.Host=`${B?.length>2?B:b}`;let G=e.headers.get("origin"),W=e.headers.get("referer");G?.length>0&&(E.Origin=G.replaceAll(o,b)),W?.length>0&&(E.Referer=W.replaceAll(o,b)),y.headers=_(e.headers,{strip:te,set:E}),f&&(P=y.headers),q=="0"&&(y.redirect="manual");let Q=AbortSignal.timeout(I);y.signal=Q;let Y=new Request(t.toString(),y);try{switch(a=await fetch(t.toString(),Y),Math.floor(a.status/100)){case 2:{h=!1;break}case 3:{let l=a.headers.get("location");a=u(a.status,"Redirection",`Origin issued an redirect to: <a href="${l}">${l}</a>.`),h=!1;break}case 4:{h=S.indexOf(k)==0;break}case 5:{h=S.indexOf(k)<=1;break}default:h=S.indexOf(k)<=2,h||(a=u(502,"Bad gateway",`All origins are down.${f?" Trace: "+w:""}`))}}catch(l){if(h=S.indexOf(k)<=2,h)a=u(500,"Internal error",`${f?"Tried to access: "+t.href+"<br/>":""}<pre>${l}${f&&l.stack?`
`+l.stack:""}</pre>`);else switch(console.error(l.stack),l.constructor.name){case"TypeError":{a=u(502,"Bad gateway",`The last origin is down.${f?" Trace: "+w:""}<br/><pre>${l.stack}</pre>`);break}case"DOMException":{a=u(504,"Timeout",`Gateway timeout after ${I} ms.${f?" Trace: "+w:""}`);break}default:a=u(500,"Unknown error",`<pre>${l.stack}</pre>`)}}if(m>0&&(R=Date.now()),f&&(s["X-MintFlower-Target"]=t.toString(),s["X-MintFlower-Health"]=`${d}/${$}`,s["X-MintFlower-Trace"]=w.toString(),s["X-MintFlower-Up"]=JSON.stringify(P)),d<=1&&!a)return a=u(502,"Bad gateway",`Passive health check count exceeded${f?": "+w:""}.`),s["X-MintFlower-Health"]=`0/${$}`,await O(a,!1,{set:s});d--}return await O(a,!1,{strip:ne,set:s})||u(500,"Empty response",`${h?"Successful":"Failed"} empty response from trace: ${w}.<br/>Last requested URL: ${t.toString()}`)};var K=parseInt(eG("LISTEN_PORT"))||8006;self.WebSocket=WebSocket;var oe=class{#e;#r;#o=!1;#n=[];#t={open:[],message:[],error:[],close:[]};addEventListener(e,r){this.#e?e!="open"?this.#e.addEventListener(e,r):r(new Event("open")):this.#t[e].push(r)}get binaryType(){return this.#e?.binaryType||""}get bufferedAmount(){return this.#e?.bufferedAmount||0}get extensions(){return this.#e?.extensions||""}get readyState(){return this.#e?.readyState||0}get url(){return this.#e?.url||this.#r}attach(e){if(this.#o)return!1;if(this.#e)throw new Error("Already attached a WebSocket object");this.#e=e;let r=this;switch(e.readyState){case 0:case 1:{for(let n in this.#t)this.#t[n].forEach(o=>{e.addEventListener(n,o)});let t=new Event("open");this.#t.open.forEach(n=>{n(t)});break}case 2:case 3:{r.dispatchEvent(new Event("close"));break}}}close(...e){return this.#o=!0,this.#e?.close(...e)}send(e){this.#e?this.#e.send(e):this.#n.push(e)}constructor(e){this.#r=e.url.replace("http","ws"),this.addEventListener("open",r=>{for(;this.#n.length>0;)this.#e.send(this.#n.shift())})}};self.Deno={upgradeWebSocket:e=>{let r=new WebSocketService({noServer:!0}),t=new oe(e);return r.handleUpgrade(e.raw.requester,e.raw.socket,e.raw.head,function(n){t.attach(n)}),{socket:t,response:new Response(null,{status:200})}}};var V=http.createServer(async function(e,r){let t=e.headers["x-real-ip"]||e.headers["x-forwarded-for"]||e.socket.remoteAddress;t.indexOf("::ffff:")==0&&(t=t.slice(t.lastIndexOf("::ffff:")+7));let n,o=new ReadableStream({type:"bytes",start:d=>{n=d},cancel:d=>{},autoAllocateChunkSize:65536}),s={method:e.method,headers:e.headers},i=["GET","HEAD"].indexOf(s.method)==-1;e.on("data",d=>{n.enqueue(d)}).on("end",()=>{n.close()}),i&&(s.body=o,s.duplex="half");let c=new Request(`${e.headers["x-forwarded-proto"]||"http"}://${e.headers.host}${e.url}`,s),a=await C(c,t);a?.headers?.forEach((d,x)=>{r.setHeader(x,d)}),r.statusCode=a?.status||200,a?.statusText&&(r.statusMessage=a.statusText),r.flushHeaders();let w=a.body.getReader(),h=!0;for(;h;)await w.read().then(({done:d,value:x})=>{d?(r.end(),h=!1):r.write(x)})});V.on("upgrade",async(e,r,t)=>{let n=e.headers["x-real-ip"]||e.headers["x-forwarded-for"]||e.socket.remoteAddress;n.indexOf("::ffff:")==0&&(n=n.slice(n.lastIndexOf("::ffff:")+7));let o={method:e.method,headers:e.headers},s=new Request(`${e.headers["x-forwarded-proto"]||"http"}://${e.headers.host}${e.url}`,o);s.raw={requester:e,socket:r,head:t};let i=await C(s,n)});V.listen(K,"127.0.0.1",()=>{console.info(`Listening on http://localhost:${K}/`)});})();
