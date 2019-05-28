// vendors
import React, { Component } from 'react';
import toBe from 'prop-types';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';

// styles
import './page-chooser.scss';

// pages
import Login from 'pages/Login/Login';
import Settings from 'pages/Settings/Settings';
import Info from 'pages/Info/Info';
import InfoArticle from 'pages/InfoArticle/InfoArticle';
import Fields from 'pages/Fields/Fields';
import Field from 'pages/Field/Field';
import Forms from 'pages/Forms/Forms';
import Form from 'pages/Form/Form';
import Users from 'pages/Users/Users';
import FormsConstructor from 'pages/FormsConstructor/FormsConstructor';
import Statistics from 'pages/Statistics/Statistics';
import StatisticsList from 'pages/StatisticsList/StatisticsList';
import NotFound from 'pages/NotFound/NotFound';

import GlobalLoader from 'components/GlobalLoader/GlobalLoader';

// components
import Navigation from 'components/Navigation/Navigation';

// constants
import { ROUTES } from 'constants/router';
import JSCookie from "js-cookie";

// modules
import { getUser, resetUser } from 'modules/user';
import { getAllForms, resetForms } from 'modules/forms';
import { getAllFields, resetFields } from 'modules/fields';
import { getAllColors, resetColors } from 'modules/colors';
import { getAllPlants, resetPlants } from 'modules/plants';
import { resetUserAccess } from 'modules/userAccess';
import { resetAllUsers } from 'modules/users';

// additional code
function choosePage(topRouteName) { // TODO: switch or object
	switch(topRouteName) {
		case ROUTES.SETTINGS:
			return <Settings />;
		case ROUTES.LOGIN:
			return <Login />;
		case ROUTES.INFO:
			return <Info />;
		case ROUTES.INFO_ARTICLE:
			return <InfoArticle />;
		case ROUTES.FIELDS:
			return <Fields />;
		case ROUTES.FIELD:
		  return <Field />;
		case ROUTES.FORMS:
			return <Forms />;
		case ROUTES.FORM:
			return <Form />;
		case ROUTES.STATISTICS_LIST:
			return <StatisticsList />;
		case ROUTES.STATISTICS:
			return <Statistics />;

		// admin pages
		case ROUTES.USERS:
			return <Users />;
		case ROUTES.FORMS_CONSTRUCTOR:
			return <FormsConstructor />;

		default:
			return <NotFound/>;
	}
}

class PageChooser extends Component {
	static propTypes = {
		user: toBe.object,
		users: toBe.object,
		fields: toBe.object,
		forms: toBe.object,
		colors: toBe.object,
		plants: toBe.object,
		currentForm: toBe.object,
	};

	static contextTypes = {
		router: toBe.object,
	};

	componentDidMount() {
		const { forms, fields, colors, plants } = this.props;
		const accessToken = JSCookie.get('AT');
		const email = JSCookie.get('GE');
		if(accessToken && email) {
			this.props.getUser({ email })
				.then(() => {
					!forms.timestamp && this.props.getAllForms();
					!fields.timestamp && this.props.getAllFields();
					!colors.timestamp && this.props.getAllColors();
					!plants.timestamp && this.props.getAllPlants();
				})
				.catch((response) => {
					if(!response.id) {
						this.context.router.navigate(ROUTES.LOGIN, { reload: true });
						JSCookie.remove('AT');
						JSCookie.remove('GE');
						this.resetEverything();
					}
				});
		} else {
			this.context.router.navigate(ROUTES.LOGIN, { reload: true });
			this.resetEverything();
		}
	}

	resetEverything = () => {
		this.props.resetFields();
		this.props.resetForms();
		this.props.resetUser();
		this.props.resetUserAccess();
		this.props.resetAllUsers();
		this.props.resetColors();
		this.props.resetPlants();
	};

	render() {
		const { route, user, forms, fields, currentForm, users } = this.props;
		const topRouteName = route ? route.name : null;
		const loading = user.loading
			|| forms.loading
			|| fields.loading
			|| currentForm.loading
			|| users.loading;

		return (
			<div className="page-chooser">
				{ topRouteName !== 'login' && <aside><Navigation/></aside> }
				{ loading && <GlobalLoader /> }
				{ choosePage(topRouteName) }
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	...routeNodeSelector('page-chooser')(state),
	user: state.user,
	users: state.users,
	fields: state.fields,
	forms: state.forms,
	colors: state.colors,
	plants: state.plants,
	currentForm: state.currentForm,
});

const mapDispatchToProps = {
	getUser,
	resetUser,
	getAllForms,
	getAllFields,
	getAllColors,
	getAllPlants,
	resetFields,
	resetForms,
	resetAllUsers,
	resetColors,
	resetPlants,
	resetUserAccess,
};


export default connect(mapStateToProps, mapDispatchToProps)(PageChooser);;
