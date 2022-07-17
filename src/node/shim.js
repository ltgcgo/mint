// Provided as default by deno2node

export {Blob} from "buffer";
export {webcrypto as crypto} from "crypto";

export {fetch, File, FormData, Headers, Request, Response} from "undici";
export {Deno} from "@deno/shim-deno";

//export {alert, confirm, prompt} from "@deno/shim-prompts";