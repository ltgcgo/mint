"use strict";

const ffVer = "102.0";

let uaSpread = function (mode = "noBracket", uaStr = "Mozilla/5.0") {
	let result = uaStr;
	switch (mode) {
		case "asIs": {
			break;
		};
		case "mimic": {
			result = "Mozilla/5.0 (";
			let isMobile = uaStr.has("Mobile");
			if (uaStr.has("Firefox")) {
				result += isMobile ? "Android 12; Mobile": "Windows NT 10.0; Win64; x64";
				result += `; rv:${ffVer}) Gecko/`;
				result += isMobile ? ffVer : "20100101";
				result += ` Firefox/${ffVer}`;
			} else if (uaStr.has("Safari")) {} else {
				result = "Dalvik/2.1";
			};
			break;
		};
		default: {
			result = mode;
		};
	};
	return result;
};

export {
	uaSpread
};