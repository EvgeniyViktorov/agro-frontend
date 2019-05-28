import { createReducer } from 'utils/modules';
import { fetchAPI } from 'utils/api';

const initialState = {
	list: [],
	loading: false,
	error: null,
	timestamp: null,
};

const LOADING = 'fields/LOADING';
const SUCCESS = 'fields/SUCCESS';
const ERROR = 'fields/ERROR';
const RESET = 'fields/RESET';

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

export function getAllFields() {
	return (dispatch) => {
		dispatch(fetchRequest());
		return fetchAPI('/field/all')
			.then(json => {
				dispatch(fetchSuccess(json));
				return json;
			})
			.catch(error => {
				dispatch(fetchFailure(error));
			});
	};
}

export function resetFields() {
	return (dispatch) => {
		dispatch(reset());
	}
}
