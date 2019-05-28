// vendors
import React, { Component } from 'react';
import toBe from 'prop-types';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import JSCookie from 'js-cookie';
import _ from 'lodash/fp';

// constants
import { GOOGLE_CLIENT_ID } from 'constants/env';
import { WARNING_MESSAGE, ERROR_MESSAGE } from 'constants/common';
import { ROUTES } from 'constants/router';

// styles
import './login.scss';

// assets
import logo from 'assets/images/logo-light.png';

// modules
import { getUser } from 'modules/user';
import { getUserAccess } from 'modules/userAccess';
import { addNotifications } from 'modules/notifications';
import { getAllForms } from 'modules/forms';
import { getAllFields } from 'modules/fields';
import { getAllColors } from 'modules/colors';
import { getAllPlants } from 'modules/plants';


export class Login extends Component {
  static propTypes = {
	  user: toBe.object,
	  userAccess: toBe.array,
  };

	static contextTypes = {
		router: toBe.object,
	};

  componentDidMount() {
	  const accessToken = JSCookie.get('AT');
	  const email = JSCookie.get('GE');
	  if(accessToken && email) {
		  this.props.getUser({ email })
			  .then((response) => {
			  	if(!_.isEmpty(response.item)) {
					  this.context.router.navigate(ROUTES.SETTINGS, { reload: true });
				  } else {
					  JSCookie.remove('AT');
					  JSCookie.remove('GE');
				  }
		    });
	  }
  }

  onLoginSuccess = (googleResponse) => {
    if (googleResponse.accessToken) {
      this.props.getUser({ email: googleResponse.profileObj.email })
	      .then(response => {
	      	const { isVerified, firstName, lastName, email } = response;
	      	if (isVerified) {
			      JSCookie.set('AT', googleResponse.accessToken);
			      JSCookie.set('GE', googleResponse.profileObj.email);
			      this.props.getAllForms();
			      this.props.getAllFields();
			      this.props.getAllColors();
			      this.props.getAllPlants();
			      this.context.router.navigate(ROUTES.SETTINGS, { reload: true });
		      } else {
			      this.props.getUserAccess({ firstName, lastName, email });
		      }
        });
    } else {
	    this.props.addNotifications({
		    level: WARNING_MESSAGE,
		    message: 'Для работы с приложением нужно иметь действующую почту в Google и получить доступ.'
	    });
    }
  };

	onLoginFailure = () => {
		this.props.addNotifications({
			level: ERROR_MESSAGE,
			message: 'Не удалось войти в учетную запись Google. Попробуйте позже.'
		});
	};

  render() {
    return (
      <div className="login-page">
        <div className="login-holder">
	        <img className="logo-main" src={logo} alt="Agro logo"/>

	        <div className="login">
		        <div className="google-login-button">
			        <GoogleLogin
				        clientId={GOOGLE_CLIENT_ID}
				        onSuccess={this.onLoginSuccess}
				        onFailure={this.onLoginFailure}
			        >
				        Войти с помощью Google
			        </GoogleLogin>
		        </div>
	        </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  userAccess: state.user.item.userAccess
});

const mapDispatchToProps = {
	getUserAccess,
	getUser,
	addNotifications,
	getAllForms,
	getAllFields,
	getAllColors,
	getAllPlants,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
