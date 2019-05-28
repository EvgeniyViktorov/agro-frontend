import { createReducer } from './../utils/modules';
import { fetchAPI } from './../utils/api';

const initialState = {
	list: [],
	loading: false,
	error: null,
	timestamp: null,
};

const LOADING = 'users/LOADING';
const SUCCESS = 'users/SUCCESS';
const ERROR = 'users/ERROR';
const RESET = 'users/RESET';

// reducers
export default createReducer(initialState, {
	[LOADING]: () => ({
		loading: true,
		error: null,
	}),
	[SUCCESS]: (state, payload) => ({
		list: payload,
		loading: false,
		error: null,
		timestamp: Date.now(),
	}),
	[ERROR]: (state, error) => ({
		loading: false,
		error,
		timestamp: null,
	}),
	[RESET]: () => ({
		...initialState,
	}),
});

function fetchRequest() { return { type: LOADING };}
function fetchSuccess(payload) { return { type: SUCCESS, payload };}
function fetchFailure(error) { return { type: ERROR, error };}
function reset() { return { type: RESET };}

// actions

export function getAllUsers() {
	return (dispatch) => {
		dispatch(fetchRequest());
		return fetchAPI('/users/all')
			.then(json => {
				dispatch(fetchSuccess(json));
				return json;
			})
			.catch(error => {
				dispatch(fetchFailure(error));
				return Promise.reject(error);
			});
	};
}

export function resetAllUsers() {
	return (dispatch) => {
		dispatch(reset());
	}
}
