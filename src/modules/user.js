import { createReducer } from 'utils/modules';
import { fetchAPI } from 'utils/api';

import { addNotifications } from 'modules/notifications';

import { ERROR_MESSAGE } from 'constants/common';

const initialState = {
	loading: false,
	error: null,
	item: {},
	timestamp: null,
};

const LOADING = 'user/LOADING';
const SUCCESS = 'user/SUCCESS';
const ERROR = 'user/ERROR';
const RESET = 'user/RESET';

// reducers
export default createReducer(initialState, {
	[LOADING]: () => ({
		loading: true,
		error: null,
	}),
	[SUCCESS]: (state, payload) => ({
		item: payload,
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

export function getUser(body) {
	return (dispatch) => { // (dispatch, getState)
		dispatch(fetchRequest());
		return fetchAPI('/users/find', { body, method: 'post' })
			.then(json => {
				dispatch(fetchSuccess(json));
				return json;
			})
			.catch(error => {
				const errorMessage = [401, 404].includes(error.status)
					? 'Вы зарегистрированы в системе. Ожидайте письмо с подтверджением доступа.'
					: 'Произошла ошибка. Обратитесь к администратору.';
				dispatch(addNotifications({ level: ERROR_MESSAGE, message: errorMessage }));
				dispatch(fetchFailure(error));
				return Promise.reject(error);
			});
	};
}

export function updateUser(body) {
	return (dispatch) => {
		dispatch(fetchRequest());
		return fetchAPI('/users/update', { body, method: 'put' })
			.then(json => {
				dispatch(fetchSuccess(json));
				return json;
			})
			.catch(error => {
				dispatch(fetchFailure(error));
				dispatch(
					addNotifications({ level: ERROR_MESSAGE, message: 'Не удалось сохранить обновление.' })
				);
			})
	};
}

export function resetUser() {
	return (dispatch) => {
		dispatch(reset());
	}
}
