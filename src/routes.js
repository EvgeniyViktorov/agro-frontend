import { ROUTES } from './constants/router';

export default [
	{ name: ROUTES.LOGIN, path: '/', children: [] },
	{ name: ROUTES.SETTINGS, path: '/settings', children: [] },
	{ name: ROUTES.PROFILE, path: '/settings/profile/' },
	{ name: ROUTES.FORMS, path: '/forms' },
	{ name: ROUTES.FORM, path: '/form/:id' },
	{ name: ROUTES.FIELDS, path: '/fields' },
	{ name: ROUTES.FIELD, path: '/field/:id' },
	{ name: ROUTES.INFO, path: '/info' },
	{ name: ROUTES.INFO_ARTICLE, path: '/article/:id' },
	{ name: ROUTES.USERS, path: '/users' },
	{ name: ROUTES.FORMS_CONSTRUCTOR, path: '/forms-constructor' },
	{ name: ROUTES.STATISTICS_LIST, path: '/statistics' },
	{ name: ROUTES.STATISTICS, path: '/statistics/:id' },
];
