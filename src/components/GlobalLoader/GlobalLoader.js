// imports from vendor deps
import React from 'react';

// imports from styles
import './global-loader.scss';


export default class GlobalLoader extends React.Component {
	render() {
		return (
			<div className="global-loader">
				<div className="loader-bg" />
				<i className="fi-arrows-ccw icon" />
			</div>
		);
	}
}
