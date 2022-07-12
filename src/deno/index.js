"use strict";

import {serve} from "https://deno.land/std/http/server.ts";

serve(function (request) {
	return new Response("Example placeholder.");
});