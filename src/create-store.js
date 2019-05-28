import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { router5Middleware, router5Reducer } from 'redux-router5';
import { createLogger } from 'redux-logger';

import user from 'modules/user';
import users from './modules/users';
import userAccess from './modules/userAccess';
import fields from './modules/fields';
import forms from './modules/forms';
import currentForm from './modules/currentForm';
import colors from './modules/colors';
import plants from './modules/plants';
import notifications from './modules/notifications';
import statistics from './modules/statistics';


export default function configureStore(router, initialState = {}) {
	const createStoreWithMiddleware = applyMiddleware(
		thunk,
		router5Middleware(router),
		createLogger()
	)(createStore);

	const store = createStoreWithMiddleware(
		combineReducers({
			router: router5Reducer,
			user,
			users,
			userAccess,
			fields,
			forms,
			currentForm,
			notifications,
			statistics,
			colors,
			plants
		}),
		initialState,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);

	window.store = store;
	return store;
};
