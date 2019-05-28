// import _ from 'lodash/fp';

import { createReducer } from 'utils/modules';
import { fetchAPI } from 'utils/api';


const initialState = {
	loading: false,
	error: null,
	item: {},
	originalItem: {},
	timestamp: null,
};

const LOADING = 'form/LOADING';
const SUCCESS = 'form/SUCCESS';
const ERROR = 'form/ERROR';
const EDIT_FORM_VALUE = 'form/EDIT_ANSWER';
const RESET_FORM_VALUES_TO_DEFAULTS = 'form/reset_values';

// reducers
export default createReducer(initialState, {
	[LOADING]: () => ({
		loading: true,
		error: null,
	}),
	[EDIT_FORM_VALUE]: (state, payload) => {
		const { fieldName, value } = payload;
		return {
			...state,
			item: {
				...state.item,
				[fieldName]: value,
			}
		}
	},
	[RESET_FORM_VALUES_TO_DEFAULTS]: state => ({
		...state,
		item: state.originalItem,
	}),
	[SUCCESS]: (state, payload) => ({
		loading: false,
		item: payload,
		originalItem: payload,
		error: null,
		timestamp: Date.now(),
	}),
	[ERROR]: (state, error) => ({
		loading: false,
		error,
		timestamp: null
	}),
});

function fetchRequest() { return { type: LOADING };}
function fetchSuccess(payload) { return { type: SUCCESS, payload };}
function fetchFailure(error) { return { type: ERROR, error };}
function editForm(fieldName, value) {
	return { type: EDIT_FORM_VALUE, payload: { fieldName, value } };
}
function resetForm(payload) { return { type: RESET_FORM_VALUES_TO_DEFAULTS, payload };}


// actions
export function getCurrentForm(id) {
	return (dispatch) => {
		dispatch(fetchRequest());
		return fetchAPI(`/form/get/${id}`)
			.then(json => {
				dispatch(fetchSuccess(json));
				return json;
			});
	};
}

export function editFormValue(fieldName, value) {
	return (dispatch) => {
		dispatch(editForm(fieldName, value));
	}
}

export function resetCurrentForm(formValues = {}) {
	return (dispatch) => {
		dispatch(resetForm(formValues));
	}
}

export function createNewForm(body) {
	return (dispatch) => {
		dispatch(fetchRequest());
		return fetchAPI('/form/structure/add', { body, method: 'post' })
			.then(json => {
				dispatch(fetchSuccess(json));
				return json;
			})
			.catch(error => {
				dispatch(fetchFailure(error));
				return Promise.reject();
			});
	};
}

export function saveFormValues(body) {
	return (dispatch) => {
		dispatch(fetchRequest());
		return fetchAPI('/form/assign', { body, method: 'post' })
			.then(json => {
				dispatch(fetchSuccess(json));
				return json;
			})
			.catch(error => {
				return dispatch(fetchFailure(error));
				return Promise.reject();
			});
	};
}
