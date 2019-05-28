// vendors
import React from 'react';
import toBe from 'prop-types';
import { GoogleLogout } from 'react-google-login';

// constants
import { GOOGLE_CLIENT_ID } from 'constants/env';

// utils
import { isUserAdmin, isUserSupervisor } from 'utils/common';


export default class Profile extends React.Component {
	static propTypes = {
		user: toBe.object,
		onLogoutSuccess: toBe.func,
		onLogoutFailure: toBe.func,
		onGoogleButtonClick: toBe.func,
	};

	static defaultProps = {
		user: {},
	};

	render() {
		const { onLogoutSuccess, onLogoutFailure, user, onGoogleButtonClick } = this.props;

		return (
			<div className="profile">
				<h2>
					Профиль&nbsp;
					<span className="is-courier">
						{ isUserAdmin(user) ? 'admin' : isUserSupervisor(user) && 'supervisor' }
					</span>
			  </h2>
				<div className="profile-info-holder">
					<div className="avatar">
						<i className="icon fi-child" />
					</div>
					<div className="info">
						<p>Имя: <strong>{ user.firstName } { user.lastName }</strong></p>
						<p>Email: <strong className="is-courier">{ user.email }</strong></p>
					</div>
				</div>

				<div className="google-logout-button" onClick={onGoogleButtonClick}>
					<GoogleLogout
						clientId={GOOGLE_CLIENT_ID}
						onLogoutSuccess={onLogoutSuccess}
						onLogoutFailure={onLogoutFailure}
					>
						Выйти из учетной записи
					</GoogleLogout>
				</div>
			</div>
		);
	}
}
