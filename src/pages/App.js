// vendors
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import MobileDetect from 'mobile-detect';

// components
import Notifications from 'components/Notifications/Notifications';
import PageChooser from 'components/PageChooser/PageChooser';

// styles
import './app.scss';

// additionalCode
const MD = new MobileDetect(window.navigator.userAgent);
const MOBILE_OS = ['AndroidOS', 'BlackBerryOS', 'PalmOS', 'SymbianOS', 'WindowsMobileOS', 'WindowsPhoneOS', 'iOS', 'MeeGoOS', 'MaemoOS', 'JavaOS', 'webOS', 'badaOS', 'BREWOS'];
const isMobile = MOBILE_OS.includes(MD.os());


export class App extends Component {
  static propTypes = {
	  route: PropTypes.object
  };

  render() {
	  const computedClassName = classNames({
		  '-night': this.props.user.item.isNightMode,
		  '-day': !this.props.user.item.isNightMode,
		  '-not-mobile': !isMobile,
	  });
		return (
			<div id="app" className={computedClassName}>
				<main className="main-holder">
					<Notifications />
					<PageChooser />
				</main>
			</div>
		);
  }
}

const mapStateToProps = state => ({
	user: state.user
});

export default connect(mapStateToProps)(App);
