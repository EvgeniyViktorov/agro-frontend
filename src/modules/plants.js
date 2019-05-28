import { createReducer } from 'utils/modules';
import { fetchAPI } from 'utils/api';

import { addNotifications } from 'modules/notifications';

import { SUCCESS_MESSAGE, ERROR_MESSAGE } from 'constants/common';

const initialState = {
	loading: false,
	error: null,
	list: [],
	timestamp: null,
};

const LOADING = 'plants/LOADING';
const SUCCESS = 'plants/SUCCESS';
const ERROR = 'plants/ERROR';
const RESET = 'plants/RESET';

// reducers
export default createReducer(initialState, {
	[LOADING]: () => ({
		loading: true,
		error: null,
	}),
	[SUCCESS]: (state, payload) => ({
		loading: false,
		list: payload,
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

export function getAllPlants(body) {
	return (dispatch) => { // (dispatch, getState)
		dispatch(fetchRequest());
		return fetchAPI('/plant/all', { body, method: 'get' })
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

export function addPlant(body) {
	return (dispatch) => {
		dispatch(fetchRequest());
		return fetchAPI('/plant/add', { body, method: 'post' })
			.then(json => {
				dispatch(fetchSuccess(json));
				dispatch(
					addNotifications({ level: SUCCESS_MESSAGE, message: 'Растение было добавлено.' })
				);
				return json;
			})
			.catch(error => {
				dispatch(fetchFailure(error));
				dispatch(
					addNotifications({ level: ERROR_MESSAGE, message: 'Не удалось добавить растение. Попробуйте позже или свяжитесь с администратором.' })
				);
			})
	};
}

export function resetPlants() {
	return (dispatch) => {
		dispatch(reset());
	}
}
