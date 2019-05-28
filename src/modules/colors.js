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

const LOADING = 'colors/LOADING';
const SUCCESS = 'colors/SUCCESS';
const ERROR = 'colors/ERROR';
const RESET = 'colors/RESET';

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
export function getAllColors(body) {
	return (dispatch) => { // (dispatch, getState)
		dispatch(fetchRequest());
		return fetchAPI('/color/all', { body, method: 'get' })
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

export function addColor(body) {
	return (dispatch) => {
		dispatch(fetchRequest());
		return fetchAPI('/color/add', { body, method: 'post' })
			.then(json => {
				dispatch(fetchSuccess(json));
				dispatch(
					addNotifications({ level: SUCCESS_MESSAGE, message: 'Цвет был добавлен.' })
				);
				return json;
			})
			.catch(error => {
				dispatch(fetchFailure(error));
				dispatch(
					addNotifications({ level: ERROR_MESSAGE, message: 'Не удалось добавить цвет. Попробуйте позже или свяжитесь с администратором.' })
				);
			})
	};
}

export function resetColors() {
	return (dispatch) => {
		dispatch(reset());
	}
}
