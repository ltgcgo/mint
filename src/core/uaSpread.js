"use strict";

const ffVer = "102.0";

let uaSpread = function (mode = "noBracket", uaStr = "Mozilla/5.0") {
	let result = uaStr,
	isMobile = uaStr.toLowerCase().has("mobile");
	switch (mode) {
		case "asIs": {
			break;
		};
		case "mimic": {
			result = "Mozilla/5.0 (";
			if (uaStr.has("Firefox") || uaStr.has("Trident")) {
				// Yes, I need to hide Internet Explorer somehow...
				result += isMobile ? "Android 12; Mobile": "Windows NT 10.0; Win64; x64";
				result += `; rv:${ffVer}) Gecko/${isMobile ? ffVer : 20100101} Firefox/${ffVer}`;
			} else if (uaStr.has("Safari")) {
				// Both Chrome and Safari are now Chrome
				result += isMobile ? "Linux; Android 12; Pixel 5" : "Windows NT 10.0; Win64; x64";
				result += `) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 ${isMobile ? "Mobile " : ""}Safari/537.36`;
			} else {
				// Nah, an Android device sounds good.
				result = "Dalvik/2.1.0 (Linux; Android 12; Pixel 5)";
			};
			break;
		};
		case "noBracket": {
			let detStart = uaStr.indexOf("(") + 1,
			detEnd = uaStr.indexOf(")");
			if (detStart > -1 && detStart < detEnd) {
				// Initialize
				result = uaStr.slice(0, detStart);
				// Fill in the blanks
				if (uaStr.has("Trident")) {
					result += "Windows NT 10.0; Trident/7.0; rv:11.0";
				} else if (uaStr.has("Firefox")) {
					let instFfVer = uaStr.slice(uaStr.indexOf("Firefox/") + 8).split(" ")[0];
					result += isMobile ? "Android 12; Mobile" : "Windows NT 10.0; Win64; x64";
					result += `; rv:${instFfVer}`;
				} else if (uaStr.has("Chrome")) {
					result += isMobile ? "Linux; Android 12; Pixel 5" : "Windows NT 10.0; Win64; x64";
				} else if (uaStr.has("Safari")) {
					result += isMobile ? "iPhone; CPU iPhone OS 13_3_1 like Mac OS X" : "Macintosh; Intel Mac OS X 10_15_17";
				};
				// Finishing touch
				result += uaStr.slice(detEnd);
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