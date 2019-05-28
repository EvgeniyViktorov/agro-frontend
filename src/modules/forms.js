import { createReducer } from './../utils/modules';
import { fetchAPI } from './../utils/api';

const initialState = {
	list: [],
	loading: false,
	error: null,
	timestamp: null
};

const LOADING = 'forms/LOADING';
const SUCCESS = 'forms/SUCCESS';
const ERROR = 'forms/ERROR';
const RESET = 'forms/RESET';

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

export function getAllForms() {
	return (dispatch) => {
		dispatch(fetchRequest());
		return fetchAPI('/form/all')
			.then(json => {
				dispatch(fetchSuccess(json));
				return json;
			})
			.catch(error => {
				return dispatch(fetchFailure(error));
			});
	};
}

export function resetForms() {
	return (dispatch) => {
		dispatch(reset());
	}
}
