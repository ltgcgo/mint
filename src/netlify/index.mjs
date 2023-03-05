"use strict";

export const handler = async function (event, context) {
	return {
		statusCode: 200,
		body: `{"message":"${JSON.stringify(event)}"`
	};
};
