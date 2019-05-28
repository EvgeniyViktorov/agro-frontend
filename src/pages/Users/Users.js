// vendors
import React, { Component } from 'react';
import toBe from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash/fp';
import classNames from 'classnames';

// styles
import './users.scss';

// constants
import { SUCCESS_MESSAGE } from 'constants/common';

// modules
import { getAllUsers } from 'modules/users';
import { updateUser } from 'modules/user';
import { addNotifications } from 'modules/notifications';

// utils
import { isUserAdmin } from 'utils/common';


export class Users extends Component {
  static propTypes = {
    user: toBe.object,
    users: toBe.object,
  };

	static contextTypes = {
		router: toBe.object,
	};

  componentDidMount() {
  	this.props.getAllUsers();
  }

  onUserChange(fieldName, { firstName, lastName, id }, e) {
	  const value = e.target.checked;
	  this.props.updateUser({ id, [fieldName]: value })
		  .then(() => {
			  this.props.addNotifications({
				  level: SUCCESS_MESSAGE,
				  message: `Пользователю <strong>${firstName} ${lastName}</strong> дан доступ к системе.`
			  });
			  this.props.getAllUsers();
		  });
  }

  renderUsersList(list) {
  	return list.map(user => {
		  const computedClassName = classNames('description', {
			  '-is-admin': isUserAdmin(user),
		  });
		  return (
			  <li key={user.id} className="user">
				  { !user.isVerified && (
					  <input
						  className="input-checkbox"
						  type="checkbox"
						  checked={user.isVerified}
						  onChange={this.onUserChange.bind(this, 'isVerified', user )}
					  />
				  ) }

				  <span className={computedClassName}>
						{ `${user.firstName} ${user.lastName} (${user.id}) ` }
					  <a className="email" href="mailto:webmaster@example.com">{ user.email }</a>
					</span>
			  </li>
		  );
	  });
  }

  render() {
    const { users: { list, isLoading }, user } = this.props;
    const verifiedUsers = list.filter(user => user.isVerified);
    const unverifiedUsers = list.filter(user => !user.isVerified);

    return (
      <div className="users-page page">
	      { !_.isEmpty(unverifiedUsers) && isUserAdmin(user.item) && !isLoading && (
		      <div className="unverified-users">
			      <h2>Новые заявки на получение доступа ({unverifiedUsers.length})</h2>
			      <div className="users-holder">
				      <ol className="users-list">
					      { this.renderUsersList(unverifiedUsers) }
				      </ol>
			      </div>
		      </div>
	      ) }

	      <h2>
		      Пользователи&nbsp;
		      { !isLoading && !_.isEmpty(verifiedUsers) && <span>({verifiedUsers.length})</span> }
		    </h2>
	      { !_.isEmpty(verifiedUsers) && (
		      <div className="unverified-users">
			      <div className="users-holder">
				      <ol className="users-list">
					      { !_.isEmpty(list) && this.renderUsersList(verifiedUsers) }
				      </ol>
			      </div>
		      </div>
	      ) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  users: state.users,
  userAccess: state.user.item.userAccess
});

const mapDispatchToProps = {
	getAllUsers,
	updateUser,
	addNotifications,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
