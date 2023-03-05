"use strict";let eG=(a,b="")=>{return process.env[a]||b};let pV="AWS Lambda",pE=process.exit.bind();let self=globalThis;let pP=true;var _=function(t){let o={};return t?.forEach((e,r)=>{o[r]=e}),o},D=function(t){let o=t.indexOf("="),e=atob(t),r=new Uint8Array(e.length);for(let n=0;n<e.length;n++)r[n]=e.charCodeAt(n);return r};var p=function(t=200,o="Lorem",e="Blank."){return new Response(`<!DOCTYPE html><head><meta content="true" name="HandheldFriendly"/><title>${o}</title><style>body{font-family:sans-serif;position:absolute;width:100%;height:100%;background:#fff;margin:0;display:flex;align-items:center;justify-content:center;color:#555}#a{width:max-content;max-width:min(450px,80vw)}#b{text-align:center!important;font-weight:bold;font-size:1.5em;color:#333}#c{color:#333}#a>div{hyphens:auto;text-align:justify;padding:4px}a{text-decoration:none}#d{color:#777;font-size:0.75em}pre{overflow:scroll;padding:2px}@media(prefers-color-scheme:dark){html{filter:invert(100%)}}</style></head><body lang="en"><div id="a"><div id="b">${o}</div><div>${e}</div><div id="d"><center>Mint Flower v${pW}@${pV}</center></div></div></body>`,{status:t,headers:{Server:"Mint Flower","Content-Type":"text/html"}})};Object.forEach=function(t,o){Object.keys(t).forEach(function(r){o(t[r],r,t)})};var L=function(t,o){let e=new Set;return o?.length>0&&o.forEach(function(r){r.length>0&&e.add(r.toLowerCase())}),t.forEach(function(r){r.length>0&&e.add(r.toLowerCase())}),e},v=function(t,o){let e={};return Object.forEach(o||{},function(r,n){e[n.toLowerCase()]=r}),t.split(",").forEach(function(r){let n=r.indexOf("=");n<r.length-1&&(e[r.slice(0,n).toLowerCase()]=r.slice(n+1))}),e},U=function(t,o){let e={};t.forEach(function(n,i){e[i.toLowerCase()]=n}),o?.strip?.size>0&&o.strip.forEach(function(n){delete e[n]});let r=Object.keys(o?.set||{});return r.length>0&&r.forEach(function(n){e[n.toLowerCase()]=o.set[n]}),e},H=async function(t,o,e={}){let r={},n=t.body;o?.constructor!=Function&&(o=function(a,l){return[a,l]}),t.headers.forEach(function(a,l){let s=o(l.toLowerCase(),a);r[s[0].toLowerCase()]=s[1]}),e?.strip?.size>0&&e.strip.forEach(function(a){delete r[a]});let i=Object.keys(e?.set||{});return i.length>0&&i.forEach(function(a){r[a.toLowerCase()]=e.set[a]}),new Response(n,{status:t.status,headers:r})};var W=function(t,o){let e,r=t.split(",");if(r.forEach(function(n,i,a){let l=n.indexOf(";");l>-1&&(a[i]=n.slice(0,l))}),o.length>r.length){let n=127;r.forEach(function(i,a){let l=o.indexOf(i);l>-1&&l<n&&(e=i,n=l)}),!e&&o.includes("*")&&(e=r[0])}else o.forEach(function(n,i){if(n!="*"){let a=t.indexOf(n);!e&&a>-1&&(e=n)}else e||(e=r[0])});return e||"en"};var M="102.0",B=function(t="noBracket",o="Mozilla/5.0"){let e=o,r=o.toLowerCase().has("mobile");switch(t){case"asIs":break;case"mimic":{e="Mozilla/5.0 (",o.has("Firefox")||o.has("Trident")?(e+=r?"Android 12; Mobile":"Windows NT 10.0; Win64; x64",e+=`; rv:${M}) Gecko/${r?M:20100101} Firefox/${M}`):o.has("Safari")?(e+=r?"Linux; Android 12; Pixel 5":"Windows NT 10.0; Win64; x64",e+=`) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 ${r?"Mobile ":""}Safari/537.36`):e="Dalvik/2.1.0 (Linux; Android 12; Pixel 5)";break}case"noBracket":{let n=o.indexOf("(")+1,i=o.indexOf(")");if(n>-1&&n<i){if(e=o.slice(0,n),o.has("Trident"))e+="Windows NT 10.0; Trident/7.0; rv:11.0";else if(o.has("Firefox")){let a=o.slice(o.indexOf("Firefox/")+8).split(" ")[0];e+=r?"Android 12; Mobile":"Windows NT 10.0; Win64; x64",e+=`; rv:${a}`}else o.has("Chrome")?e+=r?"Linux; Android 12; Pixel 5":"Windows NT 10.0; Win64; x64":o.has("Safari")&&(e+=r?"iPhone; CPU iPhone OS 13_3_1 like Mac OS X":"Macintosh; Intel Mac OS X 10_15_17");e+=o.slice(i)}break}default:e=t}return e};String.prototype.has=String.prototype.includes;Array.prototype.has=Array.prototype.includes;self.pW="0.3";var F=["http:","https:","ws:","wss:"],S=["client","server","loose","asIs"];Array.prototype.random=function(){return this[Math.floor(Math.random()*this.length)]};Array.prototype.draw=function(){return this.splice(Math.floor(Math.random()*this.length),1)};var f=eG("DEBUGGER","0")=="1",O=eG("BACKENDS","internal").split(","),j=eG("BACKHOST",""),J=eG("MASK_IP","strip"),N=eG("MASK_UA","noBracket"),Z=eG("FOLLOW_REDIR","0"),q=eG("FORCE_IN_TLS","asIs"),I=eG("FORCE_OUT_TLS","asIs"),ge=eG("ADAPT_BODY","0")=="1",X=eG("MATCH_LANG","*").split(","),A=Math.max(parseInt(eG("HEALTH_MAX_TRIES","3")),1),K=pP?parseFloat(eG("HEALTH_ACTIVE","5")):0,ee=eG("HEALTH_PATH"),T=eG("HEALTH_CRITERIA","asIs"),C=Math.max(parseInt(eG("TIMEOUT_MS","0")),2500),te=L(eG("STRIP_HEADERS_UP","").split(","),"host,cf-connecting-ip,cdn-loop,cf-ew-via,cf-visitor,cf-ray,x-forwarded-for,x-real-ip,x-request-id,x-requested-with,accept-language,te,user-agent,forwarded,x-country,x-language,x-nf-account-id,x-nf-client-connection-ip,x-nf-request-id,x-nf-site-id,sec-ch-lang,sec-ch-save-data,sec-ch-prefers-color-scheme,sec-ch-prefers-reduced-motion,sec-ch-prefers-reduced-transparency,sec-ch-prefers-contrast,sec-ch-forced-colors,sec-ch-ua-full-version,sec-ch-ua-full-version-list,sec-ch-ua-platform-version,sec-ch-ua-arch,sec-ch-ua-bitness,sec-ch-ua-wow64,sec-ch-ua-model,viewport-width,viewport-height,dpr,device-memory,rtt,downlink,ect,sec-ch-viewport-width,sec-ch-viewport-height,sec-ch-dpr,sec-ch-device-memory,sec-ch-rtt,sec-ch-downlink,sec-ch-ect".split(",")),re=L(eG("STRIP_HEADERS","").split(","),["alt-svc","content-encoding","strict-transport-security"]),E=v(eG("SET_HEADERS_UP",""),{"sec-fetch-dest":"document","sec-fetch-mode":"navigate","sec-fetch-site":"same-origin"}),oe=v(eG("SET_HEADERS","")),w=parseInt(eG("IDLE_SHUTDOWN","0"));w>0?w=Math.max(w,60)*1e3:w=-1;console.info(`Debug: ${f?"on":"off"}`);console.info(`Backends: ${O}`);console.info(`Mask: UA(${N}), IP(${J}), lang(${X})`);console.info(`TLS: in(${q}), out(${I});`);console.info(`Health: active(${K}), tries(${A}), crit(${T}), timeout(${C}ms), path(${ee})`);console.info(`Inactivity shutdown: ${w}`);var R=Date.now();pP&&(console.info("Platform persistence available."),w>0&&setInterval(function(){Date.now()-R>w&&(console.info("Requested idle shutdown."),pE())},1e3),K>0&&console.info("Active health checking enabled, but not implemented."));var z=async function(t,o){if(w>0&&(R=Date.now()),O.length==1&&O[0]=="internal")return p(503,"Hey, it works!",'<a id="c" href="https://github.com/ltgcgo/mint/" target="_blank">Mint</a> is now deployed to this platform. Please refer to the documentation for further configuration.');let e=new URL(t.url),r=F.indexOf(e.protocol);if(r==-1)return p(400,"Unsupported",`Protocol "${e.protocol}" is not supported by <span id="c">Mint</span>.`);switch(q){case"plain":{if(r%2==1)return p(400,"HTTPS only","Only HTTPS connections are allowed.");break}case"tls":{if(r%2==0)return p(400,"HTTP only","Only HTTP connections are allowed.");break}}switch(I){case"tls":case"plain":{e.protocol=F[(r>>1<<1)+ +(I=="tls")]||e.protocol;break}}let n=t.headers.get("Host")||"",i=oe||{},a="",l=t.headers.get("Accept-Language")||"";a=W(l,X),a?.length>0&&(E["Accept-Language"]=a),E["User-Agent"]=B(N,t.headers.get("User-Agent"));let s,u=[],d=!0,m=A,x,k;for(;m>=0&&d;){(x?.length<1||!x)&&(x=O.slice());let b=x.draw(),ne=b.lastIndexOf("]"),ie=b.lastIndexOf(":");if(u.push(b),e.hostname=b,e.port="",f&&console.info(`Tries: ${m}, lang: ${a||"blank"}, target: ${t.method} ${e.protocol}//${b}/`),t.headers.get("Upgrade")?.toLowerCase()=="websocket"||t.headers.has("Sec-WebSocket-Key")){let{socket:c,response:Y}=Deno.upgradeWebSocket(t),g,$=[];c.addEventListener("open",function(){g=new WebSocket(e.toString().replace("http","ws")),g.addEventListener("close",function(){c.close()}),g.addEventListener("open",function(){$.length>0&&($.forEach(function(h){g.send(h)}),$=void 0),f&&console.info("WebSocket connection established.")}),g.addEventListener("error",function(h){f&&console.error(`WebSocket transmission error on remote${h.message?": ":""}${h.message||""}.`)}),g.addEventListener("message",function(h){c.readyState==1&&c.send(h.data)})});try{c.addEventListener("close",function(){f&&console.error("WebSocket transmission closed."),g?.close()}),c.addEventListener("error",function(h){f&&console.error(`WebSocket transmission error on Mint: ${h.message}`)}),c.addEventListener("message",function(h){g?.readyState==1?g.send(h.data):$.push(h.data)})}catch(h){console.error(h.stack)}return Y}let y={};y.method=t.method,t.bodyUsed&&(y.body=t.body),E.Host=`${j?.length>2?j:b}`;let P=t.headers.get("origin"),G=t.headers.get("referer");P?.length>0&&(E.Origin=P.replaceAll(n,b)),G?.length>0&&(E.Referer=G.replaceAll(n,b)),y.headers=U(t.headers,{strip:te,set:E}),f&&(k=y.headers),Z=="0"&&(y.redirect="manual");let V=AbortSignal.timeout(C);y.signal=V;let Q=new Request(e.toString(),y);try{switch(s=await fetch(e.toString(),Q),Math.floor(s.status/100)){case 2:{d=!1;break}case 3:{let c=s.headers.get("location");s=p(s.status,"Redirection",`Origin issued an redirect to: <a href="${c}">${c}</a>.`),d=!1;break}case 4:{d=S.indexOf(T)==0;break}case 5:{d=S.indexOf(T)<=1;break}default:d=S.indexOf(T)<=2,d||(s=p(502,"Bad gateway",`All origins are down.${f?" Trace: "+u:""}`))}}catch(c){if(d=S.indexOf(T)<=2,d)s=p(500,"Internal error",`${f?"Tried to access: "+e.href+"<br/>":""}<pre>${c}${f&&c.stack?`
`+c.stack:""}</pre>`);else switch(console.error(c.stack),c.constructor.name){case"TypeError":{s=p(502,"Bad gateway",`The last origin is down.${f?" Trace: "+u:""}<br/><pre>${c.stack}</pre>`);break}case"DOMException":{s=p(504,"Timeout",`Gateway timeout after ${C} ms.${f?" Trace: "+u:""}`);break}default:s=p(500,"Unknown error",`<pre>${c.stack}</pre>`)}}if(w>0&&(R=Date.now()),f&&(i["X-MintFlower-Target"]=e.toString(),i["X-MintFlower-Health"]=`${m}/${A}`,i["X-MintFlower-Trace"]=u.toString(),i["X-MintFlower-Up"]=JSON.stringify(k)),m<=1&&!s)return s=p(502,"Bad gateway",`Passive health check count exceeded${f?": "+u:""}.`),i["X-MintFlower-Health"]=`0/${A}`,await H(s,!1,{set:i});m--}return await H(s,!1,{strip:re,set:i})||p(500,"Empty response",`${d?"Successful":"Failed"} empty response from trace: ${u}.<br/>Last requested URL: ${e.toString()}`)};var ye=async function(t,o){let e=t.requestContext,r=e.http.sourceIp,n;t.body&&(t.isBase64Encoded?n=D(t.body):n=t.body);let i={method:e.http.method,headers:t.headers};n&&(i.body=n);let a=`${t.headers["x-forwarded-proto"]}://${e.domainName}${t.rawPath}`;t.rawQueryString?.length>0&&(a+=`?${t.rawQueryString}`);let l=new Request(a,i),s,u=[];try{s=await z(l,r);let d=s.body.getReader(),m=!0;for(;m;)await d.read().then(({done:x,value:k})=>{x?m=!1:u.push(k)})}catch(d){return{statusCode:500,headers:{"Content-Type":"text/plain"},body:d.stack}}return{statusCode:s?.status,headers:_(s?.headers),body:Buffer.concat(u).toString("base64"),isBase64Encoded:!0}};export{ye as handler};
