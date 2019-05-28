import _ from 'lodash/fp';

function serializePair(k, v, arrayAsJoinedString = true) {
	return _.isUndefined(v) ? null : `"${k}": ${serializeVal(v, arrayAsJoinedString)}`; // eslint-disable-line
}

function escapeString(string) {
	return string
		.replace(/\\/g, '\\\\')
		.replace(/\//g, '\\/')
		.replace(/"/g, '\\"');
}

export function serializeVal(val, arrayAsJoinedString = true) {
	if (_.isPlainObject(val)) {
		const insideStr = Object.keys(val)
			.map(k => serializePair(k, val[k], arrayAsJoinedString))
			.filter(x => x !== null)
			.join(', ');

		return '{' + insideStr + '}';
	}
	if (_.isArray(val)) {
		return arrayAsJoinedString
			? `"${val.join(', ')}"`
			: `[${val.join(', ')}]`;
	}
	if (_.isString(val)) { return `"${escapeString(val)}"`; }
	if (_.isUndefined(val)) { return ''; }

	return val;
}

function serializeParam(val, arrayAsJoinedString = true) {
	if (_.isPlainObject(val)) {
		return serializeVal(val, arrayAsJoinedString);
	}

	return val;
}

export function serializeParams(params, arrayAsJoinedString = true) {
	return (_.size(params) ? '?' : '') + Object.keys(params).map(prop => {
		return `${prop}=${encodeURIComponent(
			serializeParam(params[prop], arrayAsJoinedString)
		)}`;
	}).join('&');
}

export const canHaveBody = (methodToCheck) =>
	!_.includes(methodToCheck, ['options', 'get', 'head']);

export const handleFetchError = () => {
	// When we get a 404 or a 500 error, fetch doesn't throw an error, we get a valid response
	// This catch is used for cases when user is logged out or lost internet connection
	window.location.reload(true);
	// Redirecting to root URL
	// Or so that user sees a "no internet" message from their browser
};

export const checkStatus = (response, request) => {
	if (response.status >= 200 && response.status < 300) {
		return response.json();
	} else {
		// const error = new Error(response.statusText); // TODO: fix this
		// error.response = response.clone();
		// error.request = request;
		// throw error;
		throw { status: response.status, response: 'error', request: 'request' };
	}
};
