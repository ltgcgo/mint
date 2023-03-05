"use strict";let eG=(a,b="")=>{return process.env[a]||b};let pV="Netlify",pE=process.exit.bind();let self=globalThis;let pP=true;
let http=require("node:http");var e=async function(t,s){return{statusCode:200,body:`{"message":"${JSON.stringify(t)}"`}};export{e as handler};
