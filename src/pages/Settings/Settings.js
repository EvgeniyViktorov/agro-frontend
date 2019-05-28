// vendors
import React, { Component } from 'react';
import toBe from 'prop-types';
import { connect } from 'react-redux';
import JSCookie from 'js-cookie';

// components
import Profile from './Profile';

// styles
import './settings.scss';

// constants
import { ROUTES } from 'constants/router';

// modules
import { getUser, resetUser, updateUser } from 'modules/user';
import { resetFields } from 'modules/fields';
import { resetAllUsers } from 'modules/users';
import { resetUserAccess } from 'modules/userAccess';
import { resetForms } from 'modules/forms';
import { resetColors } from 'modules/colors';
import { resetPlants } from 'modules/plants';

class Settings extends Component {
	static contextTypes = {
		router: toBe.object,
	};

	onLogoutSuccess = () => {
		JSCookie.remove('AT');
	};

	onLogoutFailure = () => {
		JSCookie.remove('AT');
		this.context.router.navigate(ROUTES.LOGIN, { reload: true });
		console.warning('Не удалось выйти из учетной записи.');
	};

	toggleNightMode = () => {
		const { user: { item: { isNightMode, id } } } = this.props;
		this.props.updateUser({ id, isNightMode: !isNightMode });
	};

	onGoogleButtonClick = () => {
		JSCookie.remove('AT');
		this.context.router.navigate(ROUTES.LOGIN, { reload: true });
		this.resetEverything();
	};

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
		const { user: { item: { isNightMode } } } = this.props;

		return (
			<div className="page settings-page">
				<Profile
					onGoogleButtonClick={this.onGoogleButtonClick}
					user={this.props.user.item}
					onLogoutSuccess={this.onLogoutSuccess}
					onLogoutFailure={this.onLogoutFailure}
				/>

				<div className="settings-holder">
					<h2>Настройки</h2>
					<div className="settings-item">
						<label className="label">Ночной режим</label>

						<label className='toggle-switch'>
							<input
								type='checkbox'
								className="input-checkbox"
								checked={isNightMode}
								onChange={this.toggleNightMode}
							/>
							<span className='back'>
							<span className='toggle' />
							<span className='label on'>ВКЛ</span>
							<span className='label off'>ВЫКЛ</span>
						</span>
						</label>

					</div>
				</div>

			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	user: state.user,
	userAccess: state.userAccess
});

const mapDispatchToProps = {
	getUser,
	resetUser,
	updateUser,
	resetFields,
	resetForms,
	resetAllUsers,
	resetColors,
	resetPlants,
	resetUserAccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
