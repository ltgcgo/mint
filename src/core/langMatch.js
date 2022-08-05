"use strict";

// This implementation will actually ignore the Q value of each language.

let langMatch = function (target, mask) {
	let result,
	candidates = target.split(",");
	// Rid the Q value.
	candidates.forEach(function (e, i, a) {
		let semiColon = e.indexOf(";");
		if (semiColon > -1) {
			a[i] = e.slice(0, semiColon);
		};
	});
	if (mask.length > candidates.length) {
		let resultIdx = 127;
		candidates.forEach(function (e, i) {
			let langIdx = mask.indexOf(e);
			if (langIdx > -1 && langIdx < resultIdx) {
				result = e;
				resultIdx = langIdx;
			};
		});
		if (!result && mask.includes("*")) {
			result = candidates[0];
		};
	} else {
		mask.forEach(function (e, i) {
			if (e != "*") {
				let langIdx = target.indexOf(e);
				if (!result && langIdx > -1) {
					result = e;
				};
			} else {
				if (!result) {
					result = candidates[0];
				};
			};
		});
	};
	return result || "en";
};

export {
	langMatch
};