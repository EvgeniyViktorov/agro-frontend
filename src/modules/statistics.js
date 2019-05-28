import { createReducer } from 'utils/modules';
import { fetchAPI } from 'utils/api';

import { addNotifications } from 'modules/notifications';

import { ERROR_MESSAGE } from 'constants/common';

const initialState = {
	loading: false,
	error: null,
	items: [],
	timestamp: null,
};

const LOADING = 'statistics/LOADING';
const SUCCESS = 'statistics/SUCCESS';
const ERROR = 'statistics/ERROR';
const RESET = 'statistics/RESET';

// reducers
export default createReducer(initialState, {
	[LOADING]: () => ({
		loading: true,
		error: null,
	}),
	[SUCCESS]: (state, payload) => ({
		items: payload,
		loading: false,
		error: null,
		timestamp: Date.now(),
	}),
	[ERROR]: (state, error) => ({
		loading: false,
		error,
		timestamp: null,
	}),
	[RESET]: () => ({ ...initialState }),
});

function fetchRequest() { return { type: LOADING };}
function fetchSuccess(payload) { return { type: SUCCESS, payload };}
function fetchFailure(error) { return { type: ERROR, error };}
function resetStore() { return { type: RESET };}

// actions

export function getStatisticsByField(id) {
	return (dispatch) => {
		dispatch(fetchRequest());
		return fetchAPI(`/field/${id}/stats`)
			.then(json => {
				dispatch(fetchSuccess(json));
				return json;
			})
			.catch(error => {
				const errorMessage = 'Статистика по данному полю не найдена.';
				dispatch(addNotifications({ level: ERROR_MESSAGE, message: errorMessage }));
				dispatch(fetchFailure(error));
				return Promise.reject(error);
			});
	};
}

export function resetStatistics() {
	return (dispatch) => {
		dispatch(resetStore());
	};
}
