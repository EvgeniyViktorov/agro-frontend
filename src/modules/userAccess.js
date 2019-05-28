import _ from 'lodash/fp';

import { createReducer } from './../utils/modules';
import { fetchAPI } from './../utils/api';

const initialState = {
	userAccessCode: null,
	loading: false,
	error: null,
	timestamp: null,
};

const LOADING = 'userAccess/LOADING';
const SUCCESS = 'userAccess/SUCCESS';
const ERROR = 'userAccess/ERROR';
const RESET = 'userAccess/RESET';

// reducers
export default createReducer(initialState, {
	[LOADING]: () => ({
		loading: true,
		error: null,
	}),
	[SUCCESS]: (state, payload) => ({
		userAccessCode: payload,
		loading: false,
		error: null,
		timestamp: Date.now(),
	}),
	[ERROR]: (state, data) => ({
		loading: false,
		error: _.get('error', data),
	}),
	[RESET]: () => ({
		...initialState,
	}),
});

function fetchUserAccessRequest() { return { type: LOADING };}
function fetchUserAccessSuccess() { return { type: SUCCESS };}
function fetchUserAccessFailure() { return { type: ERROR };}
function reset() { return { type: ERROR };}

// actions
export function getUserAccess(body) {
	return (dispatch, getState) => {
		dispatch(fetchUserAccessRequest());
		return fetchAPI('/users/add', { body, method: 'post' })
			.then(json => dispatch(fetchUserAccessSuccess(json)))
			// .catch(error => dispatch(handleServerError(error)))
			.catch(error => dispatch(fetchUserAccessFailure(error)));
	};
}

export function resetUserAccess() {
	return (dispatch) => {
		dispatch(reset());
	}
}

