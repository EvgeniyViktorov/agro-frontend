import _ from 'lodash/fp';
import JSCookie from 'js-cookie';

import { serializeParams, canHaveBody, handleFetchError, checkStatus } from './../utils/params';
import { API_HOST } from './../constants/env';

export const fetchAPI = (url, {
	params = {},
	method = 'get',
	body = '',
	options = {},
	headers = {},
	isText = false
} = {}) => {
	if (isText) {
		return Promise.resolve();
	}

	const fetchOptions = {
		credentials: 'include',
		method,
		headers: {
			'Content-Type': 'application/json',
			'Bearer': JSCookie.get('AT'),
			...headers,
		},
		...options,
	};
	const fetchParams = {
		...params,
	};
	if (canHaveBody(method)) {
		fetchOptions.body = JSON.stringify(body);
	}
	const urlString = API_HOST + url + serializeParams(_.pickBy(_.identity, fetchParams));

	return fetch(urlString, fetchOptions)
		.catch(handleFetchError)
		.then(checkStatus)
		// .then(parseAndHandleHTMLRedirect)
		.catch(e => {
			throw e;
		});
	// TODO: update token if needed and attempt the request again ?
};