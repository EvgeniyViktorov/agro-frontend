// vendors
import React from 'react';
import toBe from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router5';

// styles
import './navigation.scss';

// constants
import { ROUTES } from 'constants/router';

// utils
import { isUserAdmin, isUserSupervisor, isUser } from 'utils/common';

class Navigation extends React.Component {
	static propTypes = {
		user: toBe.object
	};

	static contextTypes = {
		router: toBe.object,
	};

	renderUserMenu() {
		const { router } = this.context;

		return (
			[
				<Link
					router={router}
					routeName={ROUTES.FIELDS}
					key={ROUTES.FIELDS}
					className="navigation-tab"
					routeOptions={{ reload: true }}
				>
					<div className="icon-holder">
						<i className="icon fi-map-o" />
					</div>
				</Link>,
				<Link
					router={router}
					routeName={ROUTES.FORMS}
					key={ROUTES.FORMS}
					className="navigation-tab"
					routeOptions={{ reload: true }}
				>
					<div className="icon-holder">
						<i className="icon fi-edit" />
					</div>
				</Link>,
				<Link
					router={router}
					routeName={ROUTES.INFO}
					key={ROUTES.INFO}
					className="navigation-tab"
					routeOptions={{ reload: true }}
				>
					<div className="icon-holder">
						<i className="icon fi-info-1" />
					</div>
				</Link>
			]
		);
	}

	renderUserSupervisorMenu() {
		return (
			<Link
				router={this.context.router}
				routeName={ROUTES.STATISTICS_LIST}
				key={ROUTES.STATISTICS_LIST}
				className="navigation-tab"
				routeOptions={{ reload: true }}
			>
				<div className="icon-holder">
					<i className="icon fi-chart-line" />
				</div>
			</Link>
		);
	}

	renderSupervisorAdminMenu() {
		return (
			<Link
				router={this.context.router}
				routeName={ROUTES.USERS}
				key={ROUTES.USERS}
				className="navigation-tab"
				routeOptions={{ reload: true }}
			>
				<div className="icon-holder">
					<i className="icon fi-users" />
				</div>
			</Link>
		);
	}

	renderAdminMenu() {
		return (
			<Link
				router={this.context.router}
				routeName={ROUTES.FORMS_CONSTRUCTOR}
				key={ROUTES.FORMS_CONSTRUCTOR}
				className="navigation-tab"
				routeOptions={{ reload: true }}
			>
				<div className="icon-holder">
					<i className="icon fi-wrench" />
				</div>
			</Link>
		);
	}

	render() {
		const { user } = this.props;
		const { router } = this.context;
		const showForAdmin = isUserAdmin(user.item);
		const showForUser = isUser(user.item);
		const showForSupervisor = isUserSupervisor(user.item);

		return (
			<nav className="navigation">
				<Link
					router={router}
					routeName={ROUTES.SETTINGS}
					className="navigation-tab"
					routeOptions={{ reload: true }}
				>
					<div className="icon-holder">
						<i className="icon fi-sliders" />
					</div>
				</Link>
				{ showForAdmin && this.renderAdminMenu() }
				{ !showForAdmin && this.renderUserSupervisorMenu() }
				{ showForUser && this.renderUserMenu() }
				{ (showForAdmin || showForSupervisor) && this.renderSupervisorAdminMenu() }
			</nav>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		router: state.router,
		user: state.user
	};
};

export default connect(mapStateToProps)(Navigation);
