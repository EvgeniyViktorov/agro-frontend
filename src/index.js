import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router5';
import ReactDOM from 'react-dom';
import App from './pages/App';
import createRouter from './create-router';
import configureStore from './create-store';
import './style.scss';

const router = createRouter([], {
	allowNotFound: false,
	autoCleanUp: true,
	defaultRoute: 'login',
	defaultParams: {},
	queryParams: {
		arrayFormat: 'default',
		nullFormat: 'default',
		booleanFormat: 'default'
	},
	queryParamsMode: 'default',
	trailingSlashMode: 'default',
	strictTrailingSlash: false,
	caseSensitive: false
});
const store = configureStore(router);

const wrappedApp = (
  <Provider store={store}>
    <RouterProvider router={router}>
      <App router={router} />
    </RouterProvider>
  </Provider>
);

router.start((err, state) => {
  ReactDOM.render(wrappedApp, document.getElementById('root'))
});
